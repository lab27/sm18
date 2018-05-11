<template lang="pug">
    section#team.Team(ref="team")
      div.Team__wrap(:style="{ width: teamWidth }")
        Person(v-for="person, index in team" :key="person.id" :person="person" :index="index")
</template>

<script>
import Person from '~/components/Person/Person'
export default {
  name: 'Team',
  props: ['team'],
  components: {
    Person
  },
  computed: {
    teamWidth() {
      return this.$store.state.teamWidth
    },
    teamOffset() {
      return this.$store.state.teamOffset
    }
  },
  beforeMount() {
    let teamWidth = this.team.length * 75 + 'vw'
    this.$store.commit('setTeamWidth', teamWidth)
  },
  watch: {
    teamOffset() {
      // this.$refs.team.scrollLeft = this.teamOffset + 'px'
    }
  }
}
</script>

<style src="./Team.scss" lang="scss"></style>
