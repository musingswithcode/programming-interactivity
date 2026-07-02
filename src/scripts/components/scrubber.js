import {drag, hover} from '../base.js'
import {constrain} from '../utilities.js'
import {trigger} from './trigger.js'

export function scrubber($el, {name, min, max, step, targets}) {
  const model = $el.getParentModel()

  model.watch(() => {
    $el.text(model[name])
  })

  let valueAtDown
  drag($el, {
    down() {
      valueAtDown = model[name]
    },
    move(_, {dx}) {
      let value = valueAtDown + (dx / 5) * step
      let rounded = Math.round(value / step) * step
      let constrained = constrain(rounded, min, max)
      model[name] = constrained
    }
  })

  if (targets) {
    trigger($el, {targets})
  }
}
