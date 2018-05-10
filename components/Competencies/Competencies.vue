<template lang="pug">
    section#competencies.competencies
      .card-wrapper(v-for="area, index in competencies" :key="index")
        .card
          h2 {{area.fields.title}}
          ul 
            li(v-for="item, index in area.fields.competencyList" :key="index") {{item}}
          
</template>

<script>
export default {
  name: 'Competencies',
  props: ['competencies']
}
</script>

<style src="./Competencies.scss" lang="scss"></style>
