<template lang="pug">
  section.Showcase__section-custom.Showcase__small-large
    .Showcase__left-third(v-html="marked(section.leftSideTextBox)") 
    .Showcase__right-image(:style="{ backgroundImage: 'url(' + section.rightSideImage.fields.file.url + ')'}")
</template>

<script>
export default {
  props: ['section']
}
</script>