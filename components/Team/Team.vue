<template lang="pug">
    section.Team
      div#team.Team__scroll-wrap(ref="team")
        div.Team__wrap(:style="{ width: teamWidth }")
          Person(v-for="person, index in team" :key="person.id" :person="person" :index="index")
</template>

<script>
import Person from '~/components/Person/Person'
const interact = require('interactjs');
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
  data () {
    return {
      scrollLength: 0
    }
  },
  beforeMount() {
    let teamWidth = this.team.length * 75 + 'vw'
    this.$store.commit('setTeamWidth', teamWidth)
  },
  mounted () {
    var movable = document.querySelector('#team');
    const self = this;
    interact(movable)
    .draggable({
      inertia: true,
      restrict: {
        restriction: "parent",
        endOnly: true
      },
      autoScroll: true,
      onmove: function (event) {
        self.userStartsDragging()
        self.scroll(event)
      },
      onend: function (event) {
        setTimeout(function () {
          self.userEndsDragging()
        }, 500);
      }
    })
  },
  methods: {
    scroll (event) {
      if ((event.dx > 10 || event.dx < -10))
      this.$refs.team.scrollLeft = this.$refs.team.scrollLeft - (event.dx)
      this.scrollLength = event.clientX
    },
    checkDirection () {
      if (event.clientX > this.scrollLength) {
        return '+'
      } else {
        return '-'
      }
    },
    userStartsDragging () {
      this.$store.commit('setUserDragging', true)
    },
    userEndsDragging () {
      this.$store.commit('setUserDragging', false)
    }
  },
  watch: {
    teamOffset() {
      // this.$refs.team.scrollLeft = this.teamOffset + 'px'
    }
  }
}
</script>

<style src="./Team.scss" lang="scss"></style>
