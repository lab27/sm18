<template lang="pug">
  section.Showcase__section-custom
    .Showcase__left-third(v-html="marked(section.leftSideTextBox)") 
    .Showcase__right-image(:style="{ backgroundImage: 'url(' + section.rightSideImage.fields.file.url + ')'}")
</template>

<script>
export default {
  props: ['section']
}
</script>


<style lang="scss" scoped>
.Showcase__left-third {
    background: lemonchiffon;
    width:33.3333%;
    padding: 2rem;
}

.Showcase__right-image {
    width: 66.67%;
    background-size: cover;
    background-position: center center;
}
</style>
