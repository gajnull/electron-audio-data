const vent = {
  evs: {
    changeText: [],
    loadLngt: [],
    saveLngt: [],
    loadAudio: [],
    decodedAudio: []
  },

  on: function (ev, fn) {
    this.evs[ev].push(fn)
  },

  off: function (ev, fn) {
    this.evs[ev] = this.evs[ev].filter(function(fnEv) {
      return fnEv !== fn;
    })
  },

  publish: function (ev, data) {
    this.evs[ev].forEach(function(fnEv) {
      fnEv(data)
    })
  }

}

export {vent}
