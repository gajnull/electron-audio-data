import './scss/style.scss'
// import {something, clog} from './js/empty.js'
// document.body.innerHTML = something
// console.log(clog)

//import {vent} from './js/vent.js'
import {test1, vent} from './js/test1.js'
import {test2} from './js/test2.js'

console.log('before')
console.log(vent.test + ' & ' + vent.x)
test1()
console.log('after test1')
console.log(vent.test + ' & ' + vent.x)
test2()
console.log('after test2')
console.log(vent.test + ' & ' + vent.x)
