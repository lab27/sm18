<template lang="pug">
  main.Showcase(v-if="showcase")
    section.Showcase__section-info(:style="{ flexDirection: topboxFlexDirection}")
      .Showcase__infobox(v-html="marked(showcase.infobox.fields.content)" :style="{ backgroundColor: showcase.infobox.fields.color }")
      .Showcase__top-text(v-html="marked(showcase.topText)")
    section.Showcase__section-logo
      .Showcase__logo-sidebar
        .Showcase__logo-sidebar--top(:style="{ backgroundImage: 'url(' + showcase.showcaseLogoSidebar.fields.sidebarImage1.fields.file.url + ')'}")
        .Showcase__logo-sidebar--bottom(v-if="showcase.showcaseLogoSidebar.fields.sidebarImage2" :style="{ backgroundImage: 'url(' + showcase.showcaseLogoSidebar.fields.sidebarImage2.fields.file.url + ')'}")
        .Showcase__logo-sidebar--bottom(v-else) {{showcase.showcaseLogoSidebar.fields.sidebarTextBox}}
      .Showcase__logo(v-if="showcase.showcaseLogo" :style="{ backgroundColor:showcase.showcaseLogo.fields.logoBackgroundColor}")
        img(:src="showcase.showcaseLogo.fields.logoImage.fields.file.url")
    component(v-if="showcase.customShowcaseSection1" :is="showcase.customShowcaseSection1.sys.contentType.sys.id" :section="showcase.customShowcaseSection1.fields").Showcase__customOne
    component(v-if="showcase.customShowcaseSection2" :is="showcase.customShowcaseSection2.sys.contentType.sys.id" :section="showcase.customShowcaseSection2.fields").Showcase__customTwo
    component(v-if="showcase.customShowcaseSection3" :is="showcase.customShowcaseSection3.sys.contentType.sys.id" :section="showcase.customShowcaseSection3.fields").Showcase__customThree
    component(v-if="showcase.customShowcaseSection4" :is="showcase.customShowcaseSection4.sys.contentType.sys.id" :section="showcase.customShowcaseSection4.fields").Showcase__customFour
</template>

<script>
import client from '~/plugins/contentful'
import OneLarge from './OneLarge.vue';
import ThreeUp from './ThreeUp.vue';
import SixUp from './SixUp.vue';
import SmallLarge from './SmallLarge.vue';
import PlayButton from './PlayButton.vue';

export default {
  components: {
    'showcaseSectionOneLarge': OneLarge,
    'showcaseSectionSixUp': SixUp,
    'showcaseSectionSmallLarge': SmallLarge,
    'showcaseSectionThreeUp': ThreeUp,
    'PlayButton': PlayButton,
  },
  props: ['showcase'],
  computed: {
    topboxFlexDirection() {
      return this.showcase.infobox.fields.position === 'Right' ? 'row-reverse' : 'row'
    }
  }
}
</script>

<style src="./Showcase.scss" lang="scss"></style>
