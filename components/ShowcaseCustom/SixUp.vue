<template lang="pug">
  section.Showcase__section.Showcase__six-up
    .Showcase__six-up--item(v-for="item in section.gridImages" :style="{ backgroundImage: 'url(' + item.fields.file.url + ')'}")
</template>

<script>
export default {
  props: ['section'],
  mounted() {
    console.log('section', this.section);
  }
}
</script>
