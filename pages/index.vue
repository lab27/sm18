<template lang="pug">
  main
    Splash(:claim="claim")
    Competencies(:competencies="competencies")
    Team(:team="team")
    Cases(:cases="cases")
</template>


<script>
import client from '~/plugins/contentful';
import Splash from '~/components/Splash/Splash.vue';
import Team from '~/components/Team/Team.vue';
import Cases from '~/components/Cases/Cases.vue';
import Competencies from '~/components/Competencies/Competencies.vue';

export default {
  components: {
    Team,
    Splash,
    Competencies,
    Cases
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
        // get people
        content_type: 'person'
      })
    ]).then(([claim, competencies, cases, team]) => {
      // return data that should be available
      // in the template
      return {
        claim: claim.items[0],
        competencies: competencies.items,
        cases: cases.items,
        team: team.items
      }
    }).catch(console.error)
  },
  head: {
    title: 'Latest Posts',
  },
};
</script>