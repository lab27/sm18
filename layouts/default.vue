<template>
  <div>
    <nuxt v-if="!dataLoading"/>
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
    computed: {
      dataLoading () {
        return this.$store.state.dataLoading
      }
    },
    watch: {
      '$route': function (from, to) {
        if (from.path === to.path && from.hash && to.hash) {
          return
        } else if (!this.$route.params.slug || this.$route.params.slug2) {
          this.removeMultipleFullpageInstance()
        }
      }
    },
    beforeMount() {
      this.removeMultipleFullpageInstance()
    },
    methods: {
      removeMultipleFullpageInstance () {
        if($('html').hasClass('fp-enabled')){
          $.fn.fullpage.destroy('all');
          $.fn.fullpage.setResponsive(true);
        }
      }
    },
    head () {
      return {
        titleTemplate: '%s - SiR MaRy!'
      }
    }
  }
</script>
