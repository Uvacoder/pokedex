<template>
  <b-col cols="12" md="6">
    <h2>Abilities</h2>
    <hr />
    <ul class="mb-4">
      <li v-for="(skill, index) in data" :key="index" class="caps">{{ skill }}</li>
    </ul>
  </b-col>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component
  export default class Abilities extends Vue {
    @Prop({ required: true }) data!: string[];
  }
</script>