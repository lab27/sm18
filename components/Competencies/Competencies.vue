<template lang="pug">
    section#competencies.competencies
      transition(appear name="u-anim-fade-delayed")
      div.competencies__wrap(:class="{ expanded: isExpanded }")
        transition(name="u-anim-fade-delayed")
          h2.competencies__heading(v-if="!isExpanded") {{headingSimple}}
          h2.competencies__heading.expanded(v-if="isExpanded") {{headingExpanded}}
        .competencies__cards(:class="{ expanded: isExpanded }")
          .competencies__card-wrap(v-for="area, index in competencies" :key="index" :class="[isExpanded ? 'expanded' : '', isExpanded && clickedCard !== index ? 'hide' : 'full-width']")
            .competencies__back(v-show="isExpanded" @click="isExpanded ? handleExpand(index) : null") Back
            .competencies__card(@click="handleExpand(index)" :ref="'card-' + index")
              h3.competencies__card-title {{area.fields.title}}
              transition(name="u-anim-fade-delayed")
                ul.competencies__card-list(v-if="isExpanded")
                  li.competencies__card-list-item(v-for="item, index in area.fields.competencyList" :key="index") {{item}}
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
      isExpanded: false,
      clickedCard: null
    }
  },
  methods: {
    handleExpand(index) {
      this.isExpanded = !this.isExpanded
      this.clickedCard = (this.expanded ? null : index)
    }
  }
}
</script>

<style src="./Competencies.scss" lang="scss"></style>
