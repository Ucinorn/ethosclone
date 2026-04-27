<script setup>
import { computed, ref } from 'vue'
import { gameStore } from '../store/gameStore'

const statList = computed(() => [
  { name: 'Food', value: gameStore.stats.food, formula: 'Population growth driver (placeholder).' },
  { name: 'Industry', value: gameStore.stats.industry, formula: 'Infrastructure growth driver (placeholder).' },
  { name: 'Culture', value: gameStore.stats.culture, formula: 'Happiness contributor (placeholder).' },
  { name: 'Military', value: gameStore.stats.military, formula: 'Unrest reducer (placeholder).' },
  { name: 'Infrastructure', value: gameStore.stats.infrastructure, formula: 'Will gate growth later.' },
  { name: 'Army', value: gameStore.stats.army, formula: 'Will scale with military.' },
  { name: 'Influence', value: gameStore.stats.influence, formula: 'Diplomatic conversion stat.' },
  { name: 'Unrest', value: gameStore.stats.unrest, formula: 'Penalty based on stat imbalance.' },
  { name: 'Happiness', value: gameStore.stats.happiness, formula: 'Bonus based on culture vs military.' },
  { name: 'Land', value: gameStore.stats.land, formula: 'Global growth multiplier.' },
])

const openStats = ref(new Set())

function isOpen(name) {
  return openStats.value.has(name)
}

function toggleOpen(name) {
  if (openStats.value.has(name)) {
    openStats.value.delete(name)
    return
  }

  openStats.value.add(name)
}
</script>

<template>
  <section class="tab-page">
    <h2>Stats</h2>
    <div class="stat-list">
      <article v-for="stat in statList" :key="stat.name" class="stat-card">
        <div class="row compact">
          <div class="stat-title">
            <button class="info-button" type="button" @click="toggleOpen(stat.name)">
              {{ isOpen(stat.name) ? '▾' : '▸' }}
            </button>
            <strong>{{ stat.name }}</strong>
          </div>
          <span>{{ stat.value }}</span>
        </div>
        <p v-if="isOpen(stat.name)">{{ stat.formula }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.tab-page {
  padding: 1rem;
}

.stat-list {
  display: grid;
  gap: 0.75rem;
}

.stat-card {
  border: 1px solid #343a45;
  border-radius: 0.75rem;
  background: #171b20;
  padding: 0.65rem 0.75rem;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.compact {
  min-height: 1.8rem;
}

.stat-title {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.info-button {
  border: 1px solid #3b4049;
  background: #20242c;
  color: #cbd5e1;
  width: 1.45rem;
  height: 1.45rem;
  border-radius: 999px;
  display: grid;
  place-items: center;
  padding: 0;
}

p {
  margin: 0.4rem 0 0;
  color: #9aa4b2;
  font-size: 0.88rem;
}
</style>
