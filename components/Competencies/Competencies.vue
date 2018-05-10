<template lang="pug">
    .section#competencies
      .container
        h2(v-for="area, index in competencies" :key="index") {{area.fields.title}}
          ul 
            li(v-for="item, index in area.fields.competencyList" :key="index") {{item}}
          
</template>

<script>
export default {
  name: 'Competencies',
  props: ['competencies']
}
</script>
