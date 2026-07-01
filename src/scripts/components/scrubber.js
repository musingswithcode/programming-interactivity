import {drag} from '../base.js'
import {constrain} from '../utilities.js'

export function scrubber($el, {name, min, max, step}) {
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
}
