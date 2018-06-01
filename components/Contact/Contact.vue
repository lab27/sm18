<template lang="pug">
  section#contact.Contact
    .Contact__wrap
      HappyToMeet
      .Contact__claim
        p(v-html="marked(contact.fields.address)")
        br
        p
          a(:href="'mailto:' + contact.fields.eMail") {{contact.fields.eMail}}
        p
          a(:href="'tel:' + contact.fields.telephone") {{contact.fields.telephone}}

</template>

<script>
import HappyToMeet from '~/components/HappyToMeet/HappyToMeet'
export default {
  props: ['contact'],
  components: {'HappyToMeet': HappyToMeet }
}
</script>

<style src="./Contact.scss" lang="scss"></style>
