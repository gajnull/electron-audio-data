import {vent} from './vent.js'

function test2() {
  vent.test = 3
  vent.x = 'c'
  return vent
}

export test2
