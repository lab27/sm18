<template>
    <div class="Video__wrapper">
      <div class="Video">
        <iframe :src="vidUrl"  frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
</template>

<script>
export default {
  props: ['vidUrl']
}
</script>

<style src="./Video.scss" lang="scss"></style>
