<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gameStore } from '../store/gameStore'
import { eventBus, GAME_EVENTS } from '../events/eventBus'

const statusText = ref('Select a technology to begin.')

function handleTechLevelUp(event) {
  statusText.value = `Tech leveled: ${event.technologyId} Lv ${event.level}`
}

function handleEraAdvance(event) {
  statusText.value = `Advanced to ${event.eraId.replace('-', ' ')}.`
}

onMounted(() => {
  eventBus.on(GAME_EVENTS.TECH_LEVEL_UP, handleTechLevelUp)
  eventBus.on(GAME_EVENTS.ERA_ADVANCED, handleEraAdvance)
})

onBeforeUnmount(() => {
  eventBus.off(GAME_EVENTS.TECH_LEVEL_UP, handleTechLevelUp)
  eventBus.off(GAME_EVENTS.ERA_ADVANCED, handleEraAdvance)
})
</script>

<template>
  <header class="top-bar">
    <div class="title-wrap">
      <strong>Ethos Clone</strong>
      <span>{{ gameStore.eras[gameStore.progress.currentEraIndex].name }}</span>
      <span class="status">{{ statusText }}</span>
    </div>
    <button class="menu-button" type="button" @click="gameStore.ui.settingsOpen = !gameStore.ui.settingsOpen">☰</button>
  </header>
</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #2d3138;
}

.title-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.title-wrap span {
  color: #9aa4b2;
  font-size: 0.8rem;
}

.status {
  font-size: 0.72rem;
}

.menu-button {
  border: 1px solid #3a404a;
  background: #1a1e24;
  color: #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.4rem 0.6rem;
}
</style>
