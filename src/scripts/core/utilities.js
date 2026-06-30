export function words(string) {
  return string.split(' ').map(e => e.trim())
}

export function lerp(from, to, t) {
  return t * (to - from) + from
}
