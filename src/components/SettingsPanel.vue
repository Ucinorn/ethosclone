<script setup>
import { ref } from 'vue'
import { gameStore } from '../store/gameStore'
import {
  hardResetSave,
  loadFromPayload,
  parseSavePayload,
  saveToLocalStorage,
  stringifySavePayload,
} from '../saves/saveSystem'

const importText = ref('')
const feedback = ref('')
const isError = ref(false)

function setFeedback(message, error = false) {
  feedback.value = message
  isError.value = error
}

function closeSettings() {
  gameStore.ui.settingsOpen = false
}

function manualSave() {
  saveToLocalStorage()
  setFeedback('Game saved to local storage.')
}

async function exportSave() {
  try {
    const text = stringifySavePayload()
    await navigator.clipboard.writeText(text)
    setFeedback('Save exported to clipboard.')
  } catch {
    setFeedback('Clipboard access failed. Copy manually from browser permissions flow.', true)
  }
}

function importSave() {
  try {
    const payload = parseSavePayload(importText.value)
    loadFromPayload(payload)
    saveToLocalStorage()
    setFeedback('Save loaded successfully.')
  } catch {
    setFeedback('Invalid JSON save data.', true)
  }
}

function resetSave() {
  const accepted = window.confirm('Hard reset all progress? This cannot be undone.')
  if (!accepted) {
    return
  }

  hardResetSave()
  importText.value = ''
  setFeedback('Save reset. New game started.')
}
</script>

<template>
  <div class="settings-overlay" @click.self="closeSettings">
    <section class="settings-panel">
      <div class="title-row">
        <h3>Settings</h3>
        <button type="button" class="close" @click="closeSettings">✕</button>
      </div>

      <div class="actions">
        <button type="button" class="action" @click="manualSave">Save Now</button>
        <button type="button" class="action" @click="exportSave">Export Save JSON</button>
      </div>

      <label for="save-import">Load Save JSON</label>
      <textarea
        id="save-import"
        v-model="importText"
        placeholder="Paste save JSON here..."
        rows="8"
      />
      <button type="button" class="action" @click="importSave">Load from JSON</button>
      <button type="button" class="action danger" @click="resetSave">Hard Reset Save</button>

      <p v-if="feedback" :class="['feedback', { error: isError }]">{{ feedback }}</p>
    </section>
  </div>
</template>

<style scoped>
.settings-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 30;
  display: grid;
  place-items: center;
  padding: 1rem;
}

.settings-panel {
  width: 100%;
  max-width: 420px;
  background: #171b20;
  border: 1px solid #343a45;
  border-radius: 0.8rem;
  padding: 0.9rem;
  display: grid;
  gap: 0.75rem;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  margin: 0;
}

.close,
.action {
  border: 1px solid #3b4049;
  background: #20242c;
  color: #e5e7eb;
  border-radius: 0.55rem;
  padding: 0.55rem 0.7rem;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}

label {
  font-size: 0.85rem;
  color: #9aa4b2;
}

textarea {
  width: 100%;
  background: #0d1117;
  color: #e5e7eb;
  border: 1px solid #3b4049;
  border-radius: 0.55rem;
  padding: 0.6rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  resize: vertical;
}

.feedback {
  margin: 0;
  color: #34d399;
  font-size: 0.86rem;
}

.feedback.error {
  color: #f87171;
}

.danger {
  border-color: #7f1d1d;
  background: #3f1515;
  color: #fecaca;
}
</style>
