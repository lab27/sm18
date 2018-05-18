<template lang="pug">
  .Person(ref="person" :style="`background-image: url(${personImage}?q=30)`" class="slide" :class="['Person--' + '' + index + '', '' + index + '', { open: opened }]")
    h2.Person__name
      span.Person__first-name {{person.fields.firstName}}
      br
      span.Person__last-name {{person.fields.lastName}}
    .Person__info
      .title(v-if="isOpen")  {{person.fields.title}}
      .bio(v-if="isOpen")  {{person.fields.shortBio}}
</template>

<script>
const interact = require('interactjs');

export default {
  props: ['person', 'index'],
  data() {
    return {
      widthMultiplier: 75,
      opened: false
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
    },
    personImage() {
      return this.person.fields.portraitLarge ? this.person.fields.portraitLarge.fields.file.url : 'img/empty.jpg'
    },
    isMobile() {
      return this.$store.state.isMobile
    }
  },
  methods: {
    togglePersonOpen(number) {
      if (this.isMobile) {
        // in mobile mode
        console.log('i am a mobile person', this.$refs.person);
        this.opened = !this.opened

      } else {

        // console.log('opent', this.isOpen);
        const self = this;
        if(!this.userIsDragging) {
          const viewWidth = window.innerWidth / 4 * 3
          this.$parent.$refs.team.scroll({
            top: 0,
            left: (number ? number : this.index) * viewWidth,
            behavior: 'smooth'
          })
          this.$store.commit('setTeamOffset', this.myOffset)
          this.$store.commit('setOpenPerson', this.isOpen ? false : number)
          // this.isOpen = !this.isOpen
        }
      }
    }
  },
  mounted() {
    var movable = document.querySelector('#team');
    var self = this;
    const classToLook = '.Person--' + this.index
    interact(classToLook).on('tap', function (event) {
      // this hack makes IOS work? :/
      console.log(event.currentTarget.classList[2]);
      self.togglePersonOpen(parseInt(event.currentTarget.classList[2]))
    })
    console.log('------------------------------------');
    console.log('my width syle', this.$refs.person.style.width);
    console.log('------------------------------------');
  }
}
</script>

<style src="./Person.scss" lang="scss"></style>
