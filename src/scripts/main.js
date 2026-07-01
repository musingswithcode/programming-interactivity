import {$$, toCamelCase, observable} from './base.js'
import * as components from './components.js'

document.addEventListener('DOMContentLoaded', () => {
  const $sections = $$('[data-section]')
  for (let $section of $sections) {
    initSection($section)
  }

  const $components = $$('[data-component]')
  for (let $component of $components) {
    initComponent($component)
  }
})

function initSection($section) {
  $section.bind(observable())
  const fn = toCamelCase($section.data.section)
  if (fn in window) window[fn]($section)
}

function initComponent($component) {
  const type = $component.data.component
  components[type]($component)
}
