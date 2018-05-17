<template>
  <div>
    <nuxt/>
  </div>
</template>

<style src='./layout.scss' lang='scss'></style>

<script>
  import Vue from 'vue';
  import fullpageMixin from 'vue-fullpage.js/dist/mixin.min';

  if (process.browser) {
    window.$ = require('jquery');

    if (!window.FullPageInit) {
      require('fullpage.js');
      require('fullpage.js/dist/jquery.fullpage.js');
      require('fullpage.js/dist/jquery.fullpage.css');
      const FullPage = require('vue-fullpage.js');
      Vue.component('full-page', FullPage.default);
    }
  }

  export default {
    mixins: [fullpageMixin],
    head () {
      return {
        titleTemplate: '%s - SiR MaRy!'
      }
    },
    mounted () {
    }
  }
</script>
