import {hover} from '../base.js'
import {words} from '../utilities.js'

export function trigger($el, {targets}) {
  const $section = $el.closest('section')
  const $targets = $section.$$(
    words(targets)
      .map(target => `[data-target~=${target}]`)
      .join(', ')
  )

  function setActive(active) {
    $section.class('has-active', active)
    $targets.forEach($target => $target.class('is-active', active))
  }

  hover($el, {
    enter() {
      setActive(true)
    },
    exit() {
      setActive(false)
    }
  })
}
