import {hover} from '../base.js'

export function trigger($el) {
  const $section = $el.closest('section')
  const $targets = $section.$$(`[data-target~=${$el.data.to}]`)

  function setFocus(active) {
    $section.class('focus', active)
    $targets.forEach($target => $target.class('focus', active))
  }

  hover($el, {
    enter() {
      setFocus(true)
    },
    exit() {
      setFocus(false)
    }
  })
}
