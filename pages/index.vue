<template lang="pug">
  main.scroll-wrapper(v-on:wheel="onScroll" v-touch:swipe="swipeHandler" :style="{ height: totalHeight + 'px', top: -containerOffset + 'px' }")
    BGVid
    Splash(:claim="claim" :style="{ top: 0 }" v-scroll="onScroll")
    SMLogo
    Competencies(:competencies="competencies" :style="{ top: (totalHeight / 5) * 1 + 'px'}")
    Team(:team="team" :style="{ top: (totalHeight / 5) * 2 + 'px'}")
    //- Cases(:cases="cases")
    Clients(:clients="clients" :style="{ top: (totalHeight / 5) * 3 + 'px'}")
    //- Jobs(:jobs="jobs")
    Contact(:contact="contact" :style="{ top: (totalHeight / 5) * 4 + 'px'}")
    .section-name {{currentSection}}
</template>


<script>
import client from '~/plugins/contentful';
import Splash from '~/components/Splash/Splash.vue';
import Team from '~/components/Team/Team.vue';
import Cases from '~/components/Cases/Cases.vue';
import Clients from '~/components/Clients/Clients.vue';
import Competencies from '~/components/Competencies/Competencies.vue';
import Jobs from '~/components/Jobs/Jobs.vue';
import Contact from '~/components/Contact/Contact.vue';
import BGVid from '~/components/BGVid/BGVid.vue';
import SMLogo from '~/components/SMLogo/SMLogo.vue';

export default {
  components: {
    Team,
    Splash,
    Competencies,
    Cases,
    Clients,
    Jobs,
    Contact,
    BGVid,
    SMLogo
  },
  asyncData ({params}) {
    return Promise.all([
      client.getEntries({
        content_type: 'claim'
      }),
      client.getEntries({
        content_type: 'competencyArea'
      }),
      client.getEntries({
        // get cases
        content_type: 'blogPost',
        order: '-sys.createdAt'
      }),
      client.getEntries({
        // get showcase clients
        content_type: 'showcaseClient',
        order: '-sys.createdAt'
      }),
      client.getEntries({
        // get people
        content_type: 'person'
      }),
      client.getEntries({
        // get people
        content_type: 'job'
      }),
      client.getEntries({
        // get contact
        content_type: 'contactPage'
      })
    ]).then(([claim, competencies, cases, clients, team, jobs, contact]) => {
      // return data that should be available
      // in the template
      return {
        claim: claim.items[0],
        competencies: competencies.items,
        cases: cases.items,
        clients: clients.items,
        team: team.items,
        jobs: jobs.items,
        contact: contact.items[0]
      }
    }).catch(console.error)
  },
  data () {
    return {
      currentSection: 0,
      scrollTriggerDistance: 300,
      scrollDirection: String,
      screenHeight: 0
    }
  },
  head: {
    // title: 'Latest Posts',
  },
  computed: {
    totalHeight() {
      return this.screenHeight * 5
    },
    containerOffset() {
      return this.currentSection * this.screenHeight
    }
  },
  methods: {
    onWaypoint ({ going, direction }) {
      // going: in, out
      // direction: top, right, bottom, left
      if (going === this.$waypointMap.GOING_IN) {
        console.log('waypoint going in!')
      }

      if (direction === this.$waypointMap.DIRECTION_TOP) {
        console.log('waypoint going top!')
      }
    },
    onScroll (e) {
      console.log('scroll', e)
      console.log('currentSection', this.currentSection)
      //  if it's less than - the amount, go up
      if (e.deltaY < -this.scrollTriggerDistance) {
        if (this.currentSection > 0) {
          console.log('go up');

          this.currentSection = this.currentSection - 1
          // this.$store.commit('setScrollDirection', 'up')
          // this.$router.push(this.sections[this.currentSection - 1].slug)
        }
      }
      //  if it's more than the amount, go down
      if (e.deltaY > this.scrollTriggerDistance) {
        if (this.currentSection < 4) {
          console.log('go down');
          this.currentSection = this.currentSection + 1
          // this.$store.commit('setScrollDirection', 'down')
          // this.$router.push(this.sections[this.currentSection + 1].slug)
        }
      }
    },
    swipeHandler (e) {
      console.log('swipe', e)
      if (e === 'bottom') {
         if (this.currentSection > 0) {
          this.$store.commit('setScrollDirection', 'up')
          // this.$router.push(this.sections[this.currentSection - 1].slug)
        }
      }

      if (e === 'top') {
        if (this.currentSection < this.sections.length -1) {
          this.$store.commit('setScrollDirection', 'down')
          // this.$router.push(this.sections[this.currentSection + 1].slug)
        }
      }
    },
    handleWindowResize() {
      this.screenHeight = window.innerHeight
      this.$store.commit('setWindowWidth', window.innerWidth)
      this.$store.commit('setWindowHeight', window.innerHeight)
      if (window.innerWidth >= window.innerHeight) {
        this.$store.commit('setMobile', false)
      } else {
        this.$store.commit('setMobile', true)
      }
    }
  },
  mounted() {
    // set Mobile or not before app mounts
    this.handleWindowResize()
    // bind the resize event
    let that = this
    window.addEventListener('resize', function(e) {
      that.handleWindowResize()
    })
  }
}
</script>


<style lang="scss" scoped>
.scroll-wrapper {
  position: fixed;
  transition: top .3s ease-in-out;
}

.section-name {
  position: fixed;
  z-index: 1000;
  color: red;
  top: 2rem;
  right: 2rem;
}
</style>
