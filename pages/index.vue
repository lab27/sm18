<template lang="pug">
  main
    BGVid
    SMLogo
    NoSSR
      full-page(:options="options")
        Splash.Page__section.section(:claim="claim")
        Competencies.Page__section.section(:competencies="competencies")
        Team.Page__section.section(:team="team" v-if="!isMobile")
        TeamMobile.Page__section.section(:team="team" v-if="isMobile")
        Clients.Page__section.section(:clients="clients")
        Contact.Page__section.section(:contact="contact")
</template>


<script>
import client from '~/plugins/contentful';
import Splash from '~/components/Splash/Splash.vue';
import Team from '~/components/Team/Team.vue';
import TeamMobile from '~/components/Team/TeamMobile.vue';
import Cases from '~/components/Cases/Cases.vue';
import Clients from '~/components/Clients/Clients.vue';
import Competencies from '~/components/Competencies/Competencies.vue';
import Jobs from '~/components/Jobs/Jobs.vue';
import Contact from '~/components/Contact/Contact.vue';
import BGVid from '~/components/BGVid/BGVid.vue';
import SMLogo from '~/components/SMLogo/SMLogo.vue';
import NoSSR from 'vue-no-ssr';

export default {
  components: {
    NoSSR,
    Team,
    TeamMobile,
    Splash,
    Competencies,
    Cases,
    Clients,
    Jobs,
    Contact,
    BGVid,
    SMLogo
  },
  data () {
    return {
      options: {
        touchSensitivity: 15,
        controlArrows: false
      }
    }
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
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    }
  },
  head: {
    // title: 'Latest Posts',
  },
  methods: {
    handleWindowResize() {
      this.$store.commit('setWindowWidth', window.innerWidth)
      this.$store.commit('setWindowHeight', window.innerHeight)
      if (window.innerWidth >= window.innerHeight) {
        this.$store.commit('setMobile', false)
      } else {
        this.$store.commit('setMobile', true)
      }
    },
    handleSectionLoad() {
      console.log('------------------------------------');
      console.log('section loaded');
      console.log('------------------------------------');
    }
  },
  mounted() {
    // try make it responsive
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
