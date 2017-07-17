import {vent} from './vent.js'

function test1() {
  vent.test = 2
  vent.x = 'b'
}

export {test1}
export {vent}
