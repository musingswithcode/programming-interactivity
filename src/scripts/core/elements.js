import {evented} from './events.js'
import {words} from './utilities.js'

export class Element {
  constructor(el) {
    this._el = el
    this._el._view = this
    this.events = evented()
  }

  $(selector) {
    return $(selector, this)
  }

  $$(selector) {
    return $$(selector, this)
  }

  get data() {
    return this._el.dataset
  }

  attr(name, value) {
    if (value === undefined) {
      return this._el.getAttribute(name)
    }

    if (value === null) this._el.removeAttribute(name)
    else this._el.setAttribute(name, value)

    return this
  }

  prop(name, value) {
    if (value === undefined) {
      return this._el[name]
    }

    if (value === null) delete this._el[name]
    else this._el[name] = value

    return this
  }

  class(names, value) {
    const classes = words(names)
    const classList = this._el.classList

    if (value === undefined) {
      for (let cls of classes) {
        if (!classList.contains(cls)) return false
      }
      return true
    }

    for (let cls of classes) {
      value ? classList.add(cls) : classList.remove(cls)
    }

    return this
  }

  style(name, value) {
    if (value === undefined) {
      return window.getComputedStyle(this._el).getPropertyValue(name)
    }

    if (value === null) this._el.style.removeProperty(name)
    else this._el.style.setProperty(name, value)

    return this
  }

  text(value) {
    if (value === undefined) {
      return this._el.textContent
    }

    if (value === null) {
      this._el.textContent = ''
    } else {
      this._el.textContent = value
    }

    return this
  }

  html(value) {
    if (value === undefined) {
      return this._el.innerHTML
    }

    if (value === null) {
      this._el.innerHTML = ''
    } else {
      this._el.innerHTML = value
    }

    return this
  }

  append(tag) {
    const $child = $N(tag)
    this._el.appendChild($child._el)
    return $child
  }

  remove() {
    if (this._el && this._el.parentNode) {
      this._el.parentNode.removeChild(this._el)
    }
    this._el = null
  }

  get parent() {
    return $(this._el.parentElement)
  }

  bind(model) {
    this.model = model
  }

  getParentModel() {
    const parent = this.parent
    return parent?.model || parent.getParentModel()
  }

  on(types, fn) {
    this.events.on(types, fn)
    for (let type of words(types)) {
      this._el.addEventListener(type, fn)
    }
    return this
  }

  off(types, fn) {
    this.events.off(types, fn)
    for (let type of words(types)) {
      this._el.removeEventListener(type, fn)
    }
    return this
  }

  emit(types, ...args) {
    this.events.emit(types, ...args)
    return this
  }
}

const SVG_TAGS = [
  'svg',
  'g',
  'line',
  'path',
  'circle',
  'ellipse',
  'rect',
  'text'
]

export function $(query, context = null) {
  const ctx = context ? context._el : document.documentElement
  const el = typeof query === 'string' ? ctx.querySelector(query) : query

  if (!el) return null
  if (el._view) return el._view
  return new Element(el)
}

export function $$(query, context = null) {
  const ctx = context ? context._el : document.documentElement
  const els = ctx.querySelectorAll(query)
  return Array.from(els, el => $(el))
}

export function $N(tag, props, ...children) {
  const el = SVG_TAGS.includes(tag)
    ? document.createElementNS('http://www.w3.org/2000/svg', tag)
    : document.createElement(tag)

  if (props) Object.assign(el, props)

  for (let child of children) {
    if (typeof child !== 'string') el.appendChild(child)
    else el.appendChild(document.createTextNode(child))
  }

  return $(el)
}
