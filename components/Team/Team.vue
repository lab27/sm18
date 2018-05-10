<template lang="pug">
    .section#team
      .container
        h2(v-for="person in team" :key="person.id") {{person.fields.name}}
          
</template>

<script>
export default {
  name: 'Team',
  props: ['team']
}
</script>
