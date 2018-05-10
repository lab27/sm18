<template lang="pug">
  main
    Splash(:claim="claim")
    Competencies(:competencies="competencies")
    Team(:team="team")
    //- Cases(:cases="cases")
    Clients(:clients="clients")
    Jobs(:jobs="jobs")
</template>


<script>
import client from '~/plugins/contentful';
import Splash from '~/components/Splash/Splash.vue';
import Team from '~/components/Team/Team.vue';
import Cases from '~/components/Cases/Cases.vue';
import Clients from '~/components/Clients/Clients.vue';
import Competencies from '~/components/Competencies/Competencies.vue';
import Jobs from '~/components/Jobs/Jobs.vue';

export default {
  components: {
    Team,
    Splash,
    Competencies,
    Cases,
    Clients,
    Jobs
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
      })
    ]).then(([claim, competencies, cases, clients, team, jobs]) => {
      // return data that should be available
      // in the template
      return {
        claim: claim.items[0],
        competencies: competencies.items,
        cases: cases.items,
        clients: clients.items,
        team: team.items,
        jobs: jobs.items
      }
    }).catch(console.error)
  },
  head: {
    title: 'Latest Posts',
  },
};
</script>