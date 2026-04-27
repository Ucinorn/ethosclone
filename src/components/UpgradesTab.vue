<script setup>
import { gameStore } from '../store/gameStore'
</script>

<template>
  <section class="tab-page">
    <h2>Upgrades</h2>
    <p class="info">Inspiration: {{ gameStore.resources.inspiration }}</p>
    <div class="upgrade-list">
      <article v-for="upgrade in gameStore.upgrades" :key="upgrade.id" class="upgrade-card">
        <strong>{{ upgrade.name }}</strong>
        <p>{{ upgrade.description }}</p>
        <small>Cost scaling and purchase logic comes next.</small>
      </article>
    </div>
  </section>
</template>

<style scoped>
.tab-page {
  padding: 1rem;
}

.info {
  color: #9aa4b2;
}

.upgrade-list {
  display: grid;
  gap: 0.75rem;
}

.upgrade-card {
  border: 1px solid #343a45;
  border-radius: 0.75rem;
  background: #171b20;
  padding: 0.8rem;
}

small {
  color: #9aa4b2;
}
</style>
