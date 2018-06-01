<template lang="pug">
  section.Splash
    we-decomplex.Splash__title
    h3.Splash__claim {{claim.fields.claim}}
</template>

<script>
import WeDecomplexDigital from '~/components/WeDecomplexDigital/WeDecomplexDigital'
export default {
  props: ['claim'],
  components: {
    'we-decomplex': WeDecomplexDigital
  }
}
</script>

<style src="./Splash.scss" lang="scss"></style>
