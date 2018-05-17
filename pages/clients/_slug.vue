<template lang="pug">
  section.Client
    nuxt-link(to="/#clients").Client__back Back
    .Client__column.Client__logo-container
      img.Client__logo(:src="client.fields.icon.fields.file.url")
    .Client__column(v-for="thing in cases" :style="{ backgroundImage: 'url(' + thing.fields.heroImage.fields.file.url + ')'}")
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
      cases: [],
      client: {}
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
      // title: this.client.fields.title
    };
  },
};
</script>

<style lang="scss" scoped>
.Client {
  display: flex;
  flex-flow: row nowrap;
  &__back {
    position: absolute;
    left: 2rem;
    bottom: 4rem;
    text-decoration: none;
  }

  &__column {
    width: 25vw;
    height: 100vh;
  }
}

</style>
