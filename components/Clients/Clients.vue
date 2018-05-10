<template lang="pug">
    section#clients
      h3 SiR MaRY arbeitet für die 
        nuxt-link(:to="'clients/' + item.fields.clientReference.fields.slug" v-for="item, index in clients" v-if="item.fields.clientReference" :key="index") {{item.fields.clientReference.fields.title}}, 
        span etc.
          
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
