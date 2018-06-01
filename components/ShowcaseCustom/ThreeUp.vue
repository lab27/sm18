<template lang="pug">
  section.Showcase__section.Showcase__three-up
    .Showcase__one-third.Showcase__one-third--image(v-if="section.threeUpImage1" :style="{ backgroundImage: 'url(' + section.threeUpImage1.fields.file.url + ')'}")
    .Showcase__one-third.Showcase__one-third--image(v-if="section.threeUpImage2" :style="{ backgroundImage: 'url(' + section.threeUpImage2.fields.file.url + ')'}")
    .Showcase__one-third.Showcase__one-third--text(v-if="section.threeUpText" v-html="marked(section.threeUpText)")
    .Showcase__one-third.Showcase__one-third--image(v-else :style="{ backgroundImage: 'url(' + section.threeUpImage2.fields.file.url + ')'}")
    
</template>

<script>
export default {
  props: ['section']
}
</script>