<template lang="pug">
    section#jobs
      .case(v-for="job, index in jobs" :key="index")
        h2 
          nuxt-link(:to="'jobs/' + job.fields.slug" :job="job") {{job.fields.title}}
        //- p(v-html="marked(job.fields.body)")
          
</template>

<script>

export default {
  name: 'Jobs',
  props: ['jobs']
}
</script>
