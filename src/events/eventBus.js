import mitt from 'mitt'

export const GAME_EVENTS = {
  TECH_SELECTED: 'tech:selected',
  TECH_LEVEL_UP: 'tech:level-up',
  ERA_ADVANCED: 'era:advanced',
}

export const eventBus = mitt()
