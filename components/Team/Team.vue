<template lang="pug">
    section#team
      .container
        .person(v-for="person in team" :key="person.id")
          h2 {{person.fields.name}}
          p  {{person.fields.title}}
          p  {{person.fields.shortBio}}
</template>

<script>
export default {
  name: 'Team',
  props: ['team']
}
</script>
