import { gameStore } from '../store/gameStore'

const SAVE_KEY = 'ethosclone.save.v1'
const INITIAL_STATE = cloneData(gameStore)

function cloneData(value) {
  return JSON.parse(JSON.stringify(value))
}

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function assignByTemplate(target, source) {
  if (Array.isArray(target)) {
    if (!Array.isArray(source)) {
      return
    }

    for (let i = 0; i < target.length; i += 1) {
      const templateValue = target[i]
      const sourceValue = source[i]

      if (sourceValue === undefined) {
        continue
      }

      if (Array.isArray(templateValue) || isObject(templateValue)) {
        assignByTemplate(templateValue, sourceValue)
        continue
      }

      target[i] = sourceValue
    }
    return
  }

  Object.keys(target).forEach((key) => {
    const templateValue = target[key]
    const sourceValue = source?.[key]
    if (sourceValue === undefined) {
      return
    }

    if (Array.isArray(templateValue) || isObject(templateValue)) {
      assignByTemplate(templateValue, sourceValue)
      return
    }

    target[key] = sourceValue
  })
}

export function buildSavePayload() {
  return {
    version: 1,
    savedAt: Date.now(),
    data: cloneData(gameStore),
  }
}

export function saveToLocalStorage() {
  const payload = buildSavePayload()
  localStorage.setItem(SAVE_KEY, JSON.stringify(payload))
  return payload
}

export function loadFromPayload(payload) {
  if (!payload || typeof payload !== 'object' || !payload.data) {
    throw new Error('Invalid save payload.')
  }

  assignByTemplate(gameStore, payload.data)
  gameStore.ui.settingsOpen = false
}

export function loadFromLocalStorage() {
  const raw = localStorage.getItem(SAVE_KEY)
  if (!raw) {
    return false
  }

  const payload = JSON.parse(raw)
  loadFromPayload(payload)
  return true
}

export function stringifySavePayload() {
  return JSON.stringify(buildSavePayload())
}

export function parseSavePayload(text) {
  return JSON.parse(text)
}

export function hardResetSave() {
  assignByTemplate(gameStore, cloneData(INITIAL_STATE))
  localStorage.removeItem(SAVE_KEY)
  saveToLocalStorage()
}
