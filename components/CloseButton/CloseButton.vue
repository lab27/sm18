<template lang="pug">
  nuxt-link(:to="link", class="close-modal", :class="{ sticky: isSticky }", ref="closeButton")
    //- button.arrow(v-show="$store.state.isArrow")
    //-   svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 35")
    //-     line(class="st0" x1="1" y1="17.5" x2="35" y2="17.5")
    //-     line(class="st0" x1="1" y1="17.5" x2="13" y2="5.5")
    //-     line(class="st0" x1="1" y1="17.8" x2="13" y2="29.8")
    button.close x
    //-   svg(xmlns="http://www.w3.org/2000/svg", viewBox="0 0 36 35")
    //-     line(transform="rotate(45 18 17.5)" x1="-1.8" y1="17.5" x2="37.8" y2="17.5")
    //-     line(transform="rotate(-45 18 17.5)" x1="-1.8" y1="17.5" x2="37.8" y2="17.5")
</template>

<script>

export default {
  props: {
    link: {
      default: '/chat',
      type: String
    }
  },
  data () {
    return {
      isSticky: false,
      isArrow: false
    }
  },
  mounted () {
    let closeButton = this.$refs.closeButton
    let $data = this.$data
    let $store = this.$store

    document.body.onscroll = function () {
      if (closeButton.$el.parentElement.getBoundingClientRect().top < 25) {
        $data.isSticky = true
        $store.state.isLogoBlurred = true
      } else {
        $data.isSticky = false
        $store.state.isLogoBlurred = false
      }
    }
  },
  updated () {
    this.isArrow = this.$store.state.isArrow
  }
}
</script>

