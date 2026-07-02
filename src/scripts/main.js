import {$$, observable} from './base.js'
import * as components from './components.js'
import {toCamelCase} from './utilities.js'

const sections = new Map()

export function registerSection(name, fn) {
  sections.set(name, fn)
}

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

  const $elements = getSectionElements($section)

  const name = toCamelCase($section.data.section)
  if (sections.has(name)) sections.get(name)($section, $elements)
}

function initComponent($component) {
  const type = $component.data.component
  const options = JSON.parse($component.data.options || null)
  components[type]($component, options)
}

function getSectionElements($section) {
  const elementsMap = {}

  const $svg = $section.$('svg')
  elementsMap.$svg = $svg

  const $targets = $section.$$('[data-target]') || []
  $targets.forEach($target => {
    const name = toCamelCase($target.data.target)
    elementsMap[`$${name}`] = $target
  })

  return elementsMap
}
