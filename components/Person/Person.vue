<template lang="pug">
  .Person(style="background-image: url(img/portraits/mauri.jpg)" @click="togglePersonOpen" :class="{ open: isOpen }")
    h2 {{person.fields.name}}
    p(v-if="isOpen")  {{person.fields.title}}
    p(v-if="isOpen")  {{person.fields.shortBio}}
</template>

<script>
export default {
  props: ['person', 'index'],
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    teamWidth() {
      return this.$store.state.teamWidth
    },
    myOffset() {
      return -(75 * this.index)
    }
  },
  methods: {
    togglePersonOpen() {
      console.log('i click you open betch', this.myOffset);
      console.log('my index', this.index);
      console.log('my width', this.teamWidth);
      this.$store.commit('setTeamOffset', this.myOffset)
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style src="./Person.scss" lang="scss"></style>
