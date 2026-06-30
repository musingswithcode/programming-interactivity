import {words} from './utilities.js'

export function evented() {
  const events = new Map()

  return {
    on(types, fn) {
      for (let type of words(types)) {
        if (!events.has(type)) events.set(type, new Set())
        events.get(type).add(fn)
      }
    },

    off(types, fn) {
      for (let type of words(types)) {
        events.get(type)?.delete(fn)
      }
    },

    emit(types, ...args) {
      for (let type of words(types)) {
        if (events.has(type)) {
          events.get(type).forEach(fn => fn(...args))
        }
      }
    }
  }
}

export function touch($el, {down, move, up}) {
  this.style('touch-action', 'none')
  this.on('pointerdown', event => {
    event.preventDefault()
    this._el.setPointerCapture(event.pointerId)
    down?.(event)

    const onMove = event => move?.(event)
    const onUp = event => {
      up?.(event)
      this.off('pointermove', onMove)
      this.off('pointerup pointercancel', onUp)
    }

    this.on('pointermove', onMove)
    this.on('pointerup pointercancel', onUp)
  })
}

export function svgPosition(event, $svg) {
  const ctm = $svg._el.getScreenCTM().inverse()
  const point = $svg._el.createSVGPoint()
  point.x = event.clientX
  point.y = event.clientY
  return point.matrixTransform(ctm)
}
