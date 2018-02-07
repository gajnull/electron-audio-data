export default class Vent {
  constructor(evs) {
    this.evs = evs
  }

  on(ev, fn) {
    this.evs[ev].push(fn)
  }

  off(ev, fn) {
    this.evs[ev] = this.evs[ev].filter(function(fnEv) {
      return fnEv !== fn
    })
  }

  publish(ev, data) {
    //console.log(ev)
    //console.log(evs)
    //console.log(data)
    this.evs[ev].forEach(function(fnEv) {
      fnEv(data)
    })
  }
}


//   evs = {
//     loadLngt: [],
//     saveLngt: [],
//     loadAudio: []
//   }
