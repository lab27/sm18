<template lang="pug">
  main.Showcase
    section.Showcase__video(v-if="showcase.fields.heroVideo") {{showcase.fields.heroVideo}}
      img.Showcase__hero(v-if="showcase.fields.heroImage" :src="showcase.fields.heroImage.fields.file.url")
      .Showcase__title {{showcase.fields.title}}
    section.Showcase__section-info(:style="{ flexDirection: topboxFlexDirection}")
      .Showcase__infobox(v-html="marked(showcase.fields.infobox.fields.content)" :style="{ backgroundColor: showcase.fields.infobox.fields.color }")
      .Showcase__top-text(v-html="marked(showcase.fields.topText)") 
    section.Showcase__section-logo
      .Showcase__logo-sidebar 
        .Showcase__logo-sidebar--top(:style="{ backgroundImage: 'url(' + showcase.fields.showcaseLogoSidebar.fields.sidebarImage1.fields.file.url + ')'}") place
        .Showcase__logo-sidebar--bottom(v-if="showcase.fields.showcaseLogoSidebar.fields.sidebarImage2" :style="{ backgroundImage: 'url(' + showcase.fields.showcaseLogoSidebar.fields.sidebarImage2.fields.file.url + ')'}") place
        .Showcase__logo-sidebar--bottom(v-else) {{showcase.fields.showcaseLogoSidebar.fields.sidebarTextBox}}
      .Showcase__logo(v-if="showcase.fields.showcaseLogo" :style="{ backgroundColor:showcase.fields.showcaseLogo.fields.logoBackgroundColor}") 
        img(:src="showcase.fields.showcaseLogo.fields.logoImage.fields.file.url")
      

      //- .show {{showcase.fields.topText}}
</template>

<script>
import client from '~/plugins/contentful'
export default {
  data () {
    return {
      showcase: {}
    }
  },
  computed: {
    topboxFlexDirection() {
      return this.showcase.fields.infobox.fields.position === 'Right' ? 'row-reverse' : 'row'
    }
  },
  asyncData({ params, error, payload }) {
    if (payload) return { cases: payload };
    return client
      .getEntries({
        content_type: 'showcase'
      })
      .then(entries => {
        const cases = entries.items.filter(e => e.fields.slug === params.slug)
        const showcase = cases[0]
        console.log('sjopw', entries);
        
        return { showcase }
      })
      .catch(e => console.log(e));
  },
  mounted() {
    console.log('logo', this.showcase.fields.showcaseLogoSidebar);
    
  }
}
</script>

<style lang="scss">
.Showcase {
  img {
    width: 100%;
  }
  section {
    min-height: 100vh;
    max-width: 100vw;
    display: flex;
  }

  &__title {
    position: absolute;
    left: 4rem;
    bottom: 4rem;
  }

  &__hero {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
  }
}
</style>
