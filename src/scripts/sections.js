import {$$, toCamelCase, observable, hover} from './core.js'

document.addEventListener('DOMContentLoaded', () => {
  const $sections = $$('section')
  for (let $section of $sections) {
    initSection($section)
    initTriggers($section)
  }
})

function initSection($section) {
  $section.bind(observable())
  const fn = toCamelCase($section.attr('id'))
  if (fn in window) window[fn]($section)
}

function initTriggers($section) {
  const $triggers = $section.$$('.trigger')
  for (let $trigger of $triggers) {
    const $targets = $section.$$(`[data-target~=${$trigger.data.to}]`)

    function setFocus(active) {
      $section.class('focus', active)
      $targets.forEach($target => $target.class('focus', active))
    }

    hover($trigger, {
      enter() {
        setFocus(true)
      },
      exit() {
        setFocus(false)
      }
    })
  }
}
