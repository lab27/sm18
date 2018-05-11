<template lang="pug">
  .container
    CloseButton(:link="'/#jobs'")
    .job-body
      div(v-html="marked(job.fields.body)") {{job.fields.body}}
</template>

<script>
import client from '~/plugins/contentful';
import CloseButton from '~/components/CloseButton/CloseButton';
export default {
  components: {
    CloseButton
  },
  asyncData({ params, error, payload }) {
    if (payload) return { post: payload };
    return client
      .getEntries({
        content_type: 'job',
        'fields.slug': params.slug,
      })
      .then(entries => {
        return { job: entries.items[0] };
      })
      .catch(e => console.log(e));
  },
  head() {
    return {
      title: this.job.fields.title
    };
  },
};
</script>
