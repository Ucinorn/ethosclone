<script setup>
import { computed } from 'vue'
import { gameStore } from '../store/gameStore'

const prestigeMilestones = [
  { title: 'Tribe', population: 100 },
  { title: 'Hamlet', population: 300 },
  { title: 'Village', population: 800 },
]

const nextMilestone = computed(() =>
  prestigeMilestones.find((milestone) => gameStore.population.current < milestone.population),
)

const projectedPrestige = computed(() => Math.ceil(Math.sqrt(gameStore.population.current)))
const currentPopulation = computed(() => Math.floor(gameStore.population.current))
</script>

<template>
  <section class="tab-page">
    <h2>Prestige</h2>
    <p>Population: {{ currentPopulation }}</p>
    <p>Projected Prestige: {{ projectedPrestige }}</p>
    <p v-if="nextMilestone">
      Next milestone: {{ nextMilestone.title }} at {{ nextMilestone.population }} population
    </p>
    <p v-else>All starter milestones reached.</p>
    <button class="disabled" type="button" disabled>Prestige (not wired yet)</button>
  </section>
</template>

<style scoped>
.tab-page {
  padding: 1rem;
  display: grid;
  gap: 0.75rem;
}

p {
  margin: 0;
  color: #d1d5db;
}

.disabled {
  border: 1px solid #3b4049;
  background: #20242c;
  color: #9aa4b2;
  border-radius: 0.7rem;
  padding: 0.7rem;
}
</style>
