<template lang="pug">
  section#splash
    we-decomplex
    h3 {{claim.fields.claim}}
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
