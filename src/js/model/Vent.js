// export default class Vent {
//   constructor(evs) {
//     this.evs = evs;
//   }
//
//   on(ev, fn) {
//     this.evs[ev].push(fn);
//   }
//
//   off(ev, fn) {
//     this.evs[ev] = this.evs[ev].filter(function(fnEv) {
//       return fnEv !== fn
//     })
//   }
//
//   publish(ev, data) {
//     this.evs[ev].forEach(function(fnEv) {
//       fnEv(data);
//     })
//   }
// }


const evs = {
  //lngt events
  loadedLngt: [],
  savedLngt: [],
  changeStateEdit: [],
  //audio events
  decodedAudio: [],
  changedPoz: [],
  changeStateAudio: []
}

const vent = {

  on(ev, fn) {
    if(ev in evs) {
      evs[ev].push(fn);
    } else {
      console.log('ошибка в vent.on - события ' + ev + ' нет');
    }
  },

  off(ev, fn) {
    if(ev in evs) {
      evs[ev] = evs[ev].filter(function(fnEv) {
        return fnEv !== fn;
      })
    } else {
      console.log('ошибка в vent.off - события ' + ev + ' нет');
    }
  },

  publish(ev, data) {
    //console.log(ev); console.log(evs)
    // if(ev !=='changedPoz') {console.log(ev); console.log(this.evs[ev]);}
    if(ev in evs) {
      this.evs[ev].forEach(function(fnEv) {
        fnEv(data);
      })
    } else {
      console.log('ошибка в vent.publish - события ' + ev + ' нет');
    }
  }

}

export default vent;
