<template lang="pug">
  section.Contact
    .Contact__wrap
      p {{contact.fields.heading}}
      .Contact__claim
        p(v-html="marked(contact.fields.address)")
        br
        p
          a(:href="'mailto:' + contact.fields.eMail") {{contact.fields.eMail}}
        p
          a(:href="'tel:' + contact.fields.telephone") {{contact.fields.telephone}}

    //- h3 {{contact.heading}}
    //- h3 {{claim.fields.claim}}
</template>

<script>
export default {
  props: ['contact']
}
</script>

<style src="./Contact.scss" lang="scss"></style>
