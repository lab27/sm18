<template lang="pug">
  .Person(ref="person" style="background-image: url(img/portraits/mauri.jpg)" @click="togglePersonOpen" :class="{ open: isOpen }")
    h2.Person__name
      span.Person__first-name {{person.fields.firstName}}
      br
      span.Person__last-name {{person.fields.lastName}}
    .Person__info
      p(v-if="isOpen")  {{person.fields.title}}
      p(v-if="isOpen")  {{person.fields.shortBio}}
</template>

<script>
export default {
  props: ['person', 'index'],
  data() {
    return {
      widthMultiplier: 75
    }
  },
  computed: {
    teamWidth() {
      return this.$store.state.teamWidth
    },
    myOffset() {
      return -(this.widthMultiplier * this.index)
    },
    isOpen() {
      return this.$store.state.openPerson === this.index
    },
    userIsDragging() {
      return this.$store.state.userIsDragging
    }
  },
  methods: {
    togglePersonOpen() {
      if(!this.userIsDragging) {
        const viewWidth = window.innerWidth / 4 * 3
        this.$parent.$refs.team.scroll({
          top: 0,
          left: this.index * viewWidth,
          behavior: 'smooth'
        })
        this.$store.commit('setTeamOffset', this.myOffset)
        this.$store.commit('setOpenPerson', this.isOpen ? undefined : this.index)
        // this.isOpen = !this.isOpen
      }
    }
  }
}
</script>

<style src="./Person.scss" lang="scss"></style>
