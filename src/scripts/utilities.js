export function words(string) {
  return string.split(' ').map(e => e.trim())
}

export function lerp(from, to, t) {
  return t * (to - from) + from
}

export function toCamelCase(string) {
  return string.replace(/-(.)/g, (_, char) => char.toUpperCase())
}

export function range(start, stop, step = 1) {
  let numbers = []
  for (let i = start; i <= stop; i += step) numbers.push(i)
  return numbers
}

export function constrain(value, min, max) {
  return Math.max(Math.min(value, max), min)
}
