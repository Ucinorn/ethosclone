<script setup>
import { gameStore } from '../store/gameStore'

const tabs = [
  { id: 'main', label: 'Main', icon: '🏛️' },
  { id: 'upgrades', label: 'Upgrades', icon: '⬆️' },
  { id: 'stats', label: 'Stats', icon: '📊' },
  { id: 'prestige', label: 'Prestige', icon: '✨' },
]
</script>

<template>
  <nav class="bottom-nav">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      class="nav-button"
      :class="{ active: gameStore.ui.activeTab === tab.id }"
      @click="gameStore.ui.activeTab = tab.id"
    >
      <span>{{ tab.icon }}</span>
      <small>{{ tab.label }}</small>
    </button>
  </nav>
</template>

<style scoped>
.bottom-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid #2d3138;
  background: #12151a;
}

.nav-button {
  border: 0;
  background: transparent;
  color: #9aa4b2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.7rem 0.4rem;
}

.active {
  color: #f9fafb;
  background: #1a1e24;
}
</style>
