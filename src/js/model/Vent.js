
const evs = {
  //lngt events
  loadedLngt: [], //publish - {name, path, size, content}
  savedLngt: [], //publish - {name, path}
  changeStateEdit: [], //publish - {stateEdit}
  //audio events
  decodedAudio: [], //publish - {}
  changedPoz: [], //publish - {}
  changeStateAudio: [] //publish - {}
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
    // if(ev !=='changedPoz') {console.log(ev); console.log(evs[ev]);}
    if(ev in evs) {
      evs[ev].forEach(function(fnEv) {
        fnEv(data);
      })
    } else {
      console.log('ошибка в vent.publish - события ' + ev + ' нет');
    }
  }

}

export default vent;
