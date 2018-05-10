<template lang="pug">
    section#cases
      .case(v-for="item, index in cases" :key="index")
        h2 {{item.fields.title}}
        p {{item.fields.description}}
        //- p(v-html="marked(item.fields.body)") 
          
</template>

<script>

export default {
  name: 'Cases',
  props: ['cases']
}
</script>
