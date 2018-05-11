export const state = () => ({
    claim: 'We decomplex digital.',
    isArrow: false,
    isMobile: true,
    windowHeight: 0,
    windowWidth: 0,
    logoColor: 'white',
    teamWidth: 0,
    personWidth: 0,
    teamOffset: 0,
    openPerson: null,
    userIsDragging: false
})

export const mutations = {
  setWindowHeight(state, data) {
    state.windowHeight = data
  },
  setWindowWidth(state, data) {
    state.windowWidth = data
  },
  setMobile(state, data) {
    state.isMobile = data
  },
  setTeamWidth(state, data) {
    state.teamWidth = data
  },
  setTeamOffset(state, data) {
    state.teamOffset = data
  },
  setPersonWidth(state, data) {
    state.personWidth = data
  },
  setOpenPerson(state, data) {
    state.openPerson = data
  },
  setUserDragging(state, data) {
    state.userIsDragging = data
  }
}
