<template lang="pug">
  .Person(ref="person" :style="`background-image: url(${personImage}?q=30)`" @click="togglePersonOpen" :class="{slide: isMobile }")
    h2.Person__name
      span.Person__first-name {{person.fields.firstName}}
      br
      span.Person__last-name {{person.fields.lastName}}
    transition(name="fade")
      h3.Person__title(v-if="!opened || !isMobile") {{person.fields.title}}
    transition(name="fade")
      .Person__info(v-show="!isMobile && opened")
        .Person__bio(v-show="opened" v-html="person.fields.shortBio")
        .Person__email(v-show="opened")
          a(:href="'mailto:' + person.fields.email") {{person.fields.email}}
    .Person__info-mobile(v-show="isMobile")
      .Person__bio(v-html="person.fields.shortBio")
      .Person__email
        a(:href="'mailto:' + person.fields.email") {{person.fields.email}}
      .Person__back-btn Back

</template>

<script>

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
      this.opened = !this.opened
      if (this.isMobile) {
        // in mobile mode
        console.log('i am a mobile person', this.$refs.person);
        $(this.$refs.person).toggleClass('open')
      } else {
        const self = this;
        if(!this.userIsDragging) {
          const viewWidth = window.innerWidth / 4 * 3
          $('.Person').removeClass('open')
            if(!this.isOpen) {
              $(this.$refs.person).addClass('open')
            }
          this.$parent.$refs.team.scroll({
            top: 0,
            left: this.index * viewWidth,
            behavior: 'smooth'
          })
          this.$store.commit('setTeamOffset', this.myOffset)
          this.$store.commit('setOpenPerson', this.isOpen ? false : this.index)
        }
      }
    }
  }
}
</script>

<style src="./Person.scss" lang="scss"></style>
