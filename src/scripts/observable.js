export function observable(state = {}) {
  let batching = false
  const subscribers = new Set()

  function notify() {
    if (batching) return
    for (let fn of subscribers) fn()
  }

  function watch(fn, silent = false) {
    subscribers.add(fn)
    if (!silent) fn()
    return () => unwatch(fn)
  }

  function unwatch(fn) {
    subscribers.delete(fn)
  }

  function assign(changes) {
    batching = true
    Object.assign(state, changes)
    batching = false
    notify()
  }

  const proxy = new Proxy(state, {
    get(target, key) {
      if (key === 'watch') return watch
      if (key === 'unwatch') return unwatch
      if (key === 'assign') return assign

      let value = target[key]
      return typeof value === 'function' ? value() : value
    },
    set(target, key, value) {
      if (target[key] === value) return true
      target[key] = value
      notify()
      return true
    }
  })

  return proxy
}
