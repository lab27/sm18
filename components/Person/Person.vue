<template lang="pug">
  .Person(ref="person" style="background-image: url(img/portraits/mauri.jpg)" @click="togglePersonOpen" :class="{ open: isOpen }")
    h2 {{person.fields.name}}
    p(v-if="isOpen")  {{person.fields.title}}
    p(v-if="isOpen")  {{person.fields.shortBio}}
</template>

<script>
export default {
  props: ['person', 'index'],
  data() {
    return {
      isOpen: false,
      widthMultiplier: 75
    }
  },
  computed: {
    teamWidth() {
      return this.$store.state.teamWidth
    },
    myOffset() {
      return -(this.widthMultiplier * this.index)
    }
  },
  methods: {
    togglePersonOpen() {
      console.log('i click you open betch', this.myOffset);
      console.log('my index', this.index);
      console.log('my width', this.teamWidth);
      console.log('mscroll', window.pageXOffset);
      const viewWidth = window.innerWidth / 4 * 3
      console.log('HWAT', this.index * viewWidth,)
      this.$parent.$refs.team.scroll({
        top: 0,
        left: this.index * viewWidth,
        behavior: 'smooth'
      })
      this.$store.commit('setTeamOffset', this.myOffset)
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style src="./Person.scss" lang="scss"></style>
