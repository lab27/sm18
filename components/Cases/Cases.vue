<template lang="pug">
    .section#cases
      .container
        h2(v-for="item, index in cases" :key="index") {{item.fields.title}}
          
</template>

<script>

export default {
  name: 'Cases',
  props: ['cases']
}
</script>
