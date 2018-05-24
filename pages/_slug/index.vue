<template lang="pug">
  section.Client
    .Client__teaser-wrap
      nuxt-link.Client__back(v-on:click.native="currentCase && currentCase.fields ? closeCurrentCase() : null" :to="currentCase && currentCase.fields ? '/' + currentCase.fields.client.fields.slug : '/'") Back
      .Client__column.Client__logo-container(:class="currentCase ? 'is-closed' : ''")
        img.Client__logo(:src="client.fields.icon.fields.file.url")
      nuxt-link.Client__column.Client__header(
        v-on:click.native="findAndSaveCaseBySlug(thing.fields.slug)"
        :to="'/' + client.fields.slug + '/' + thing.fields.slug" :key="index"
        v-for="(thing, index) in cases" :style="{ backgroundImage: 'url(' + thing.fields.heroImage.fields.file.url + ')'}"
        :class="currentCase && currentCase.fields && currentCase.fields.slug === thing.fields.slug ? ' is-open' : (currentCase ? 'is-closed' : '') ")
    .Client__content-wrap(v-if="currentCase && currentCase.fields")
        p {{ currentCase.fields }}
</template>

<script>
import client from '~/plugins/contentful';
import CloseButton from '~/components/CloseButton/CloseButton';
export default {
  // set no-transition if we change route from slug to slug2 to make sure we have no flickering
  transition (to, from) {
    if (from && from.params.slug2 && to && to.params.slug2) {
      return 'no-transition'
    } else if (to && to.params.slug && from && from.params.slug) {
      return 'no-transition'
    } else {
      return
    }
  },
  components: {
    CloseButton
  },
  computed: {
    currentCase() {
      return this.$store.state.currentOpenedCase
    }
  },
  data () {
    return {
      cases: [],
      client: {},
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
        return { cases, client }
      })
      .catch(e => console.log(e));
  },
  watch: {
    '$route': function () {
      // Watch changes to $route and check if the page is viewed from a WordPress preview
      if (this.$route.params.slug2) {
        this.findAndSaveCaseBySlug()
      } else {
        this.closeCurrentCase()
      }
    }
  },
  mounted () {
    this.findAndSaveCaseBySlug()
  },
  methods: {
    findAndSaveCaseBySlug (slug) {
      var caseBySlug = this.cases.find((c) => {
        return c.fields.slug === (slug ? slug : this.$route.params.slug2)
      })
      this.$store.commit('setCurrentOpenedCase', caseBySlug)
    },
    closeCurrentCase () {
      this.$store.commit('setCurrentOpenedCase', false)
    }
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

  &__teaser-wrap {
    display: flex;
    flex-flow: row nowrap;
  }

  &__back {
    position: fixed;
    left: 2rem;
    bottom: 4rem;
    text-decoration: none;
  }

  &__header {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  &__column {
    width: 25vw;
    height: 100vh;
    transition: all 0.4s;

    &.is-open {
      width: 100vw;
    }

    &.is-closed {
      width: 0;
    }
  }
}

</style>
