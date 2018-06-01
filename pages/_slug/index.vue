<template lang="pug">
  section.Client
    nuxt-link.Client__back(v-on:click.native="currentCase && currentCase.fields ? closeCurrentCase() : null" :to="currentCase && currentCase.fields && client ? '/' + client.fields.clientReference.fields.slug : '/#clients'") Back
    .Client__teaser-wrap(v-if="!videoIsPlaying")
      .Client__column.Client__logo-container(:class="currentCase ? 'is-closed' : ''")
      transition(name="u-anim-fade")
        PlayButton(v-show="currentCase && !videoIsPlaying" v-on:click.native="playVideo")
        //- img.Client__logo(:src="client.fields.icon.fields.file.url")
      nuxt-link.Client__column.Client__header(
        v-for="(thing, index) in cases" :style="{ backgroundImage: 'url(' + thing.fields.heroImage.fields.file.url + ')'}"
        v-if="thing.fields.slug"
        v-on:click.native="findAndSaveCaseBySlug(thing.fields.slug)"
        :to="'/' + client.fields.clientReference.fields.slug + '/' + thing.fields.slug" :key="index"
        :class="currentCase && currentCase.fields && currentCase.fields.slug === thing.fields.slug ? ' is-open' : (currentCase ? 'is-closed' : '') ")
    Video(v-if="currentCase && currentCase.fields && videoIsPlaying" :vidUrl="currentCase.fields.heroVideo")
    .Client__content-wrap(v-if="currentCase && currentCase.fields")
        ShowCase(:showcase="currentCase.fields")
</template>

<script>
import client from '~/plugins/contentful';
import CloseButton from '~/components/CloseButton/CloseButton';
import ShowCase from '~/components/ShowcaseCustom/ShowCase';
import PlayButton from '~/components/ShowcaseCustom/PlayButton';
import Video from '~/components/Video/Video';

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
    CloseButton,
    ShowCase,
    PlayButton,
    Video
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
      videoIsPlaying: false
    }
  },
  asyncData({ params, error, payload }) {
    if (payload) return { cases: payload };
    return Promise.all([
      client.getEntries({
        content_type: 'showcaseClient'
      }),
      client.getEntries({
        content_type: 'showcase'
      })
    ]).then(([clients, showcase]) => {
        // console.log('wat', clients)
        const cases = showcase.items.filter(e => e.fields.clientName.fields.clientName === 'Allianz')
        const client = clients.items.filter(e => e.fields.clientName === 'Allianz')
        console.log('cases', cases)
        return { client: client[0], cases: cases }

        // return { showcase }
      })
      .catch(e => console.log(e));
  },
  watch: {
    '$route': function () {
      console.log('sroute', this.$route.params)
      if (this.$route.params.slug2) {
        this.findAndSaveCaseBySlug()
      } else {
        this.closeCurrentCase()
      }
    }
  },
  mounted () {
    this.findAndSaveCaseBySlug()
    // console.log('video', this.currentCase.fields.heroVideo)
  },
  methods: {
    playVideo() {
      console.log('clicked play')
      this.videoIsPlaying = true
    },
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
@import '../../assets/css/global';

.Client {

  &__teaser-wrap {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    @include mq($from: medium) {
      flex-flow: row nowrap;
    }

    .play-btn {
      cursor: pointer;
      position: absolute;
      width: px-to-rem(64px);
      height: px-to-rem(64px);
    }
  }

  &__back {
    position: fixed;
    left: inherit;
    bottom: inherit;
    top: px-to-rem($s-size-spacer-medium);
    right: px-to-rem($s-size-spacer-medium);
    text-decoration: none;

    @include mq($from: medium) {
      left: px-to-rem($s-size-spacer-small);
      bottom: px-to-rem($s-size-spacer-small);
    }

    &:hover,
    &:focus {
      color: black;
    }
  }

  &__header {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  &__column {
    width: 100vw;
    height: 25vh;
    transition: all 0.4s;

    @include mq($from: medium) {
      width: 25vw;
      height: 100vh;
    }

    &.is-open {
      height: 100vw;

      @include mq($from: medium) {
        width: 100vw;
      }
    }

    &.is-closed {
      height: 0;

      @include mq($from: medium) {
        width: 0;
      }
    }
  }
}

</style>
