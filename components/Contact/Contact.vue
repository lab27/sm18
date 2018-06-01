<template lang="pug">
  section#contact
    HappyToMeet
    p(v-html="marked(contact.fields.address)")
    p
      a(:href="'mailto:' + contact.fields.eMail") {{contact.fields.eMail}}
    p
      a(:href="'tel:' + contact.fields.telephone") {{contact.fields.telephone}}

    //- h3 {{contact.heading}}
    //- h3 {{claim.fields.claim}}
</template>

<script>
import HappyToMeet from '~/components/HappyToMeet/HappyToMeet'
export default {
  props: ['contact'],
  components: {'HappyToMeet': HappyToMeet }
}
</script>
