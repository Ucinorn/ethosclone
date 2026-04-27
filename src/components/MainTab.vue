<script setup>
import { computed, ref } from 'vue'
import { gameStore } from '../store/gameStore'
import { eventBus, GAME_EVENTS } from '../events/eventBus'

const unlockedEras = computed(() => gameStore.eras.slice(0, gameStore.progress.currentEraIndex + 1))
const visibleEraIndex = computed(() => Math.min(gameStore.ui.mainEraIndex, unlockedEras.value.length - 1))
const sliderOffset = computed(() => `translateX(-${visibleEraIndex.value * 100}%)`)

const touchStartX = ref(0)
const touchEndX = ref(0)

function selectEra(index) {
  if (index < 0 || index > unlockedEras.value.length - 1) {
    return
  }

  gameStore.ui.mainEraIndex = index
}

function startResearch(technologyId) {
  gameStore.progress.activeResearch = {
    eraIndex: visibleEraIndex.value,
    technologyId,
  }
  eventBus.emit(GAME_EVENTS.TECH_SELECTED, {
    technologyId,
    eraIndex: visibleEraIndex.value,
  })
}

function progressPercent(technology) {
  return Math.min(100, (technology.progress / technology.researchRequired) * 100)
}

function onTouchStart(event) {
  touchStartX.value = event.changedTouches[0].clientX
}

function onTouchEnd(event) {
  touchEndX.value = event.changedTouches[0].clientX
  const distance = touchEndX.value - touchStartX.value

  if (Math.abs(distance) < 40) {
    return
  }

  if (distance < 0) {
    selectEra(visibleEraIndex.value + 1)
    return
  }

  selectEra(visibleEraIndex.value - 1)
}
</script>

<template>
  <section class="tab-page">
    <div class="age-tabs">
      <button
        v-for="(era, index) in unlockedEras"
        :key="era.id"
        type="button"
        class="age-tab"
        :class="{ active: index === visibleEraIndex }"
        @click="selectEra(index)"
      >
        <span class="icon">{{ era.icon }}</span>
        <small>{{ era.name }}</small>
      </button>
    </div>
    <h2>{{ unlockedEras[visibleEraIndex]?.name }}</h2>
    <p class="info">
      Population: {{ Math.floor(gameStore.population.current) }} | Research/sec: {{ Math.floor(gameStore.population.current) }}
    </p>
    <div class="era-viewport" @touchstart="onTouchStart" @touchend="onTouchEnd">
      <div class="era-track" :style="{ transform: sliderOffset }">
        <div v-for="(era, eraIndex) in unlockedEras" :key="era.id" class="era-panel">
          <div class="tech-list">
            <button
              v-for="technology in era.technologies"
              :key="technology.id"
              class="tech-card"
              :class="[
                technology.color,
                {
                  active:
                    gameStore.progress.activeResearch?.technologyId === technology.id &&
                    gameStore.progress.activeResearch?.eraIndex === eraIndex,
                },
              ]"
              type="button"
              @click="startResearch(technology.id)"
            >
              <div class="row">
                <strong>{{ technology.name }}</strong>
                <span>Lv {{ technology.level }}</span>
              </div>
              <p>{{ technology.effectText }}</p>
              <p>{{ Math.floor(technology.progress) }} / {{ technology.researchRequired }}</p>
              <div class="progress-shell">
                <div class="progress-fill" :style="{ width: `${progressPercent(technology)}%` }" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tab-page {
  padding: 1rem;
  display: grid;
  gap: 0.75rem;
}

.age-tabs {
  display: flex;
  gap: 0.45rem;
  overflow-x: auto;
}

.age-tab {
  border: 1px solid #343a45;
  border-radius: 0.65rem;
  background: #171b20;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.55rem;
  white-space: nowrap;
}

.age-tab.active {
  border-color: #f9fafb;
}

.icon {
  font-size: 0.95rem;
}

.info {
  color: #9aa4b2;
  font-size: 0.9rem;
}

.era-viewport {
  overflow: hidden;
  touch-action: pan-y;
}

.era-track {
  display: flex;
  width: 100%;
  transition: transform 220ms ease;
}

.era-panel {
  min-width: 100%;
}

.tech-list {
  display: grid;
  gap: 0.75rem;
}

.tech-card {
  text-align: left;
  border: 1px solid #343a45;
  border-radius: 0.75rem;
  background: #171b20;
  color: #f3f4f6;
  padding: 0.8rem;
}

.tech-card.active {
  border-color: #f9fafb;
}

.row {
  display: flex;
  justify-content: space-between;
}

.red {
  border-left: 4px solid #ef4444;
}

.yellow {
  border-left: 4px solid #f59e0b;
}

.blue {
  border-left: 4px solid #3b82f6;
}

.progress-shell {
  height: 0.4rem;
  border-radius: 999px;
  background: #0d1117;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #8b5cf6;
}
</style>
