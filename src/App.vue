<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue'
import TopBar from './components/TopBar.vue'
import BottomNav from './components/BottomNav.vue'
import MainTab from './components/MainTab.vue'
import UpgradesTab from './components/UpgradesTab.vue'
import StatsTab from './components/StatsTab.vue'
import PrestigeTab from './components/PrestigeTab.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import { gameStore } from './store/gameStore'
import { eventBus, GAME_EVENTS } from './events/eventBus'
import { loadFromLocalStorage, saveToLocalStorage } from './saves/saveSystem'

const tabComponents = {
  main: MainTab,
  upgrades: UpgradesTab,
  stats: StatsTab,
  prestige: PrestigeTab,
}

const activeTab = computed(() => tabComponents[gameStore.ui.activeTab] ?? MainTab)
const activeResearch = computed(() => gameStore.progress.activeResearch)
const activeTech = computed(() => {
  if (!activeResearch.value) {
    return null
  }

  const researchEra = gameStore.eras[activeResearch.value.eraIndex]
  if (!researchEra) {
    return null
  }

  return researchEra.technologies.find((tech) => tech.id === activeResearch.value.technologyId) ?? null
})

let loopId
let autoSaveId
let lastTickTime = 0

function updateTechnologyProgress(deltaSeconds) {
  if (!activeTech.value) {
    return
  }

  const researchPerSecond = gameStore.population.current * gameStore.modifiers.researchMultiplier
  const researchToAdd = researchPerSecond * deltaSeconds
  activeTech.value.progress += researchToAdd

  if (activeTech.value.progress >= activeTech.value.researchRequired) {
    activeTech.value.progress -= activeTech.value.researchRequired
    activeTech.value.level += 1
    gameStore.resources.inspiration += 1

    activeTech.value.effects.forEach((effect) => {
      gameStore.stats[effect.stat] += effect.amount
    })

    eventBus.emit(GAME_EVENTS.TECH_LEVEL_UP, {
      technologyId: activeTech.value.id,
      level: activeTech.value.level,
    })
  }
}

function updatePopulation(deltaSeconds) {
  const growthPercent = 0.01 + gameStore.stats.food * 0.0005
  const growth = gameStore.population.current * growthPercent * deltaSeconds
  gameStore.population.current = Math.max(10, gameStore.population.current + growth)
}

function tryAdvanceEra() {
  const eraIndex = gameStore.progress.currentEraIndex
  const era = gameStore.eras[eraIndex]
  const completedInEra = era.technologies.some((technology) => technology.level >= 10)

  if (!completedInEra || eraIndex >= gameStore.eras.length - 1) {
    return
  }

  gameStore.progress.currentEraIndex += 1
  gameStore.progress.activeResearch = null
  gameStore.ui.mainEraIndex = gameStore.progress.currentEraIndex
  eventBus.emit(GAME_EVENTS.ERA_ADVANCED, {
    eraId: gameStore.eras[gameStore.progress.currentEraIndex].id,
  })
}

function runGameTick() {
  const now = performance.now()
  const deltaSeconds = Math.max(0, (now - lastTickTime) / 1000)
  lastTickTime = now

  updatePopulation(deltaSeconds)
  updateTechnologyProgress(deltaSeconds)
  tryAdvanceEra()
}

onMounted(() => {
  try {
    loadFromLocalStorage()
  } catch {
    // Keep default state if save data is corrupt.
  }

  lastTickTime = performance.now()
  loopId = window.setInterval(runGameTick, 100)
  autoSaveId = window.setInterval(saveToLocalStorage, 10000)
  window.addEventListener('beforeunload', saveToLocalStorage)
})

onBeforeUnmount(() => {
  window.clearInterval(loopId)
  window.clearInterval(autoSaveId)
  window.removeEventListener('beforeunload', saveToLocalStorage)
  saveToLocalStorage()
})
</script>

<template>
  <div class="app-shell">
    <TopBar />
    <main class="content">
      <component :is="activeTab" />
    </main>
    <SettingsPanel v-if="gameStore.ui.settingsOpen" />
    <BottomNav />
  </div>
</template>
