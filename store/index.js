export const state = () => ({
    claim: 'We decomplex digital.',
    isArrow: false,
    isMobile: true,
    windowHeight: 0,
    windowWidth: 0,
    logoColor: 'white'
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
    }
}
