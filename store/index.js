export const state = () => ({
    claim: 'We decomplex digital.',
    isArrow: false,
    isMobile: true,
    windowHeight: 0,
    windowWidth: 0,
    logoColor: 'white',
    teamWidth: 0,
    personWidth: 0,
    teamOffset: 0
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
      console.log('set team offset', data)
      state.teamOffset = data
    },
    setPersonWidth(state, data) {
      console.log('set person width', data)
      state.personWidth = data
    }
}
