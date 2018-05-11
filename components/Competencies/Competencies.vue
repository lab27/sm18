<template lang="pug">
    section#competencies.competencies(@click="handleExpand")
      h2(v-if="!isExpanded") {{headingSimple}}
      h2(v-if="isExpanded")  {{headingExpanded}}
      .cards(:class="{ expanded: isExpanded }")
        .card-wrapper(v-for="area, index in competencies" :key="index")
          .card
            h2 {{area.fields.title}}
            ul(v-if="isExpanded")
              li(v-for="item, index in area.fields.competencyList" :key="index") {{item}}

</template>

<script>
export default {
  name: 'Competencies',
  props: ['competencies'],
  data() {
    return {
      // TODO: put these in Contentful!
      headingSimple: 'Sir Mary macht',
      headingExpanded: 'Wir beraten und führen Sie in die digitale Welt und geben Hilfe zur Selbsthilfe.',
      isExpanded: false
    }
  },
  methods: {
    handleExpand() {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<style src="./Competencies.scss" lang="scss"></style>
