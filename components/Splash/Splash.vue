<template lang="pug">
  section#splash
    h1 We decomplex digital.
    h3 {{claim.fields.claim}}
</template>

<script>
export default {
  props: ['claim']
}
</script>
