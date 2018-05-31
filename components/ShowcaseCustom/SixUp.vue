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

<style lang="scss" scoped>
.Showcase__six-up {
  display: flex;
  flex-flow: row wrap;
  &--item {
    width: calc(100%/3);
    height: calc(100vw/3);
    background-position: center center;
    background-size: cover;
    background-color: white;
  }
}
</style>
