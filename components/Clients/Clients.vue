<template lang="pug">
    section#clients.Clients
      h3.Clients__heading SiR MaRY arbeitet für die
      .Clients__group
        h3
          nuxt-link(:to="'clients/' + item.fields.clientReference.fields.slug" v-for="item, index in clients" v-if="item.fields.clientReference" :key="index")
            span.Clients__clientName {{item.fields.clientReference.fields.title}}

</template>

<script>

export default {
  name: 'Clients',
  props: ['clients'],
  mounted() {
    console.log('clientRefernce', this.clients);

  }
}
</script>

<style src="./Clients.scss" lang="scss"></style>
