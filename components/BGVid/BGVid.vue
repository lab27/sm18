<template>
    <div class="BGVid__wrapper">
      <div class="BGVid mobileVideo" v-if="isMobile">
        <iframe src="https://player.vimeo.com/video/269142013?background=1" width="640" height="1136" frameborder="0" allowfullscreen></iframe>
      </div>
      <div class="BGVid desktopVideo" v-if="!isMobile" :style="{ height: windowHeight + 'px'}">
        <iframe src="https://player.vimeo.com/video/269142330?background=1"  frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
</template>

<script>
export default {
  name: 'BGVid',
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
    windowHeight() {
      return this.$store.state.windowHeight
    }
  }
}
</script>

<style src="./BGVid.scss" lang="scss"></style>
