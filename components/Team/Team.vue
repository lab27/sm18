<template lang="pug">
    section#team-section.Team
      div.Team__scroll-wrap(ref="team")
        div.Team__wrap(:style="{ width: teamWidth }")
          Person(v-for="person, index in team" :key="person.id" :person="person" :index="index")
</template>

<script>
import Person from '~/components/Person/Person'
// import { TweenMax } from 'gsap'
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
      scrollLength: 0,
      openend: false
    }
  },
  beforeMount() {
    let teamWidth = this.team.length * 75 + 'vw'
    this.$store.commit('setTeamWidth', teamWidth)
  },
  mounted () {
    var movable = document.querySelector('#team-section');
    const self = this;
    interact(movable)
    .draggable({
      restrict: {
        restriction: parent,
        endOnly: true
      },
      inertia: {
        smoothEndDuration: 0
      },
      onmove: function (event) {
        self.userStartsDragging()
        self.scroll(event)
      },
      onend: function (event) {
        setTimeout(function () {
          self.userEndsDragging()
        }, 100)
      }
    })
    // might want this later!
    // movable.onscroll = function (e) {
    //   if (self.$store.state.openPerson && !self.openend) {
    //     setTimeout(function () {
    //       self.openend = true
    //     }, 800);
    //   }

    //   if (self.openend) {
    //     self.openend = false
    //     $('.Person').removeClass('open')
    //     self.$store.commit('setOpenPerson', false)
    //   }
    // }
  },
  methods: {
    scroll (event) {
      if ((event.dx > 10 || event.dx < -10)) {
        this.$refs.team.scrollLeft = this.$refs.team.scrollLeft - (event.dx)
        this.scrollLength = event.clientX

        // var coords = { x: this.$refs.team.scrollLeft }; // Start at (0, 0)
        // var tween = new TWEEN.Tween(coords)
        //   .to({ x: this.$refs.team.scrollLeft - (event.dx) }, 1000) // Move to (300, 200) in 1 second.
        //   .onUpdate(function() {
        //     this.$refs.team.scrollLeft = cords.x
        //   })
        //   .start();
        //
        // requestAnimationFrame(animate);
        //
        // var animate = function (time) {
        //   requestAnimationFrame(animate);
        //   TWEEN.update(time);
        // }
      }
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
