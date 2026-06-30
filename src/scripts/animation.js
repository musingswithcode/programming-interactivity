import {lerp} from './utilities.js'

function ease(type, t) {
  switch (type) {
    case 'linear':
      return t

    case 'quad':
      return 1 - (1 - t) ** 2

    case 'cubic':
      return 1 - (1 - t) ** 3

    case 'sine':
      return Math.sin((t * Math.PI) / 2)

    case 'back': {
      const s = 1.70158
      const u = t - 1
      return 1 + u * u * ((s + 1) * u + s)
    }

    case 'elastic': {
      if (t === 0 || t === 1) return t
      const p = 0.3
      return (
        Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1
      )
    }

    default:
      return t
  }
}

function tween(callback, duration = 500, easing = 'sine') {
  return new Promise(resolve => {
    const start = performance.now()

    function tick(now) {
      const t = Math.min(1, (now - start) / duration)
      const eased = ease(easing, t)
      callback(eased, t)

      if (t < 1) requestAnimationFrame(tick)
      else resolve()
    }

    requestAnimationFrame(tick)
  })
}

export function animate($el, attrs, duration, easing) {
  const from = {}
  const to = attrs
  for (let name in attrs) from[name] = $el.attr(name)

  $el.emit('animation:start')
  tween(
    eased => {
      for (let name in attrs) {
        $el.attr(name, lerp(+from[name], +to[name], eased))
      }
    },
    duration,
    easing
  ).then(() => $el.emit('animation:end'))
}
