<template lang="pug">
    section.Team
      .Team__animated
        Person(v-for="person, index in team" :key="person.id" :person="person" :index="index").slide
</template>

<script>
import Person from '~/components/Person/Person'
export default {
  name: 'TeamMobile',
  props: ['team'],
  components: {
    Person
  }
}
</script>

<style src="./Team.scss" lang="scss"></style>
