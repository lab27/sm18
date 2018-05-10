<template lang="pug">
  .container
    CloseButton(:link="'/#clients'")
    .client-body
      //- p(v-if="company") {{company}}
      p(v-for="thing in cases") 
        span {{thing.fields.client.fields.slug}}
        p ***********************
      //- div(v-html="marked(client.fields.body)") 
</template>

<script>
import client from '~/plugins/contentful';
import CloseButton from '~/components/CloseButton/CloseButton';
export default {
  components: {
    CloseButton
  },
   asyncData({ params, error, payload }) {
    if (payload) return { cases: payload };
    return client
      .getEntries({
        content_type: 'blogPost',
        // 'fields.client.fields.title': params.slug,
      })
      .then(entries => {
        return { cases: entries.items };
      })
      .catch(e => console.log(e));
  },

  head() {
    return {
      // title: this.client.fields.title,
    };
  },
};
</script>