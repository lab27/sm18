<template lang="pug">
  .container
    CloseButton(:link="'/#clients'")
    .client-body
      //- p(v-if="company") {{company}}
      p(v-for="thing in cases")
        span {{ thing.fields.title }}
      //-   p ***********************
      //- p {{ cases }}
      //- div(v-html="marked(client.fields.body)")
</template>

<script>
import client from '~/plugins/contentful';
import CloseButton from '~/components/CloseButton/CloseButton';
export default {
  components: {
    CloseButton
  },
  data () {
    return {
      cases: []
    }
  },
  asyncData({ params, error, payload }) {
    if (payload) return { cases: payload };
    return client
      .getEntries({
        content_type: 'blogPost'
      })
      .then(entries => {
        const cases = entries.items.filter(e => e.fields.client.fields.slug === params.slug)
        const client = entries.items.find(e => e.fields.client.fields.slug === params.slug).fields.client
        console.log('client', client)
        return { cases, client }
      })
      .catch(e => console.log(e));
  },

  head() {
    return {
      title: this.client.fields.title
    };
  },
};
</script>
