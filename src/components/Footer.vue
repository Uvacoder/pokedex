<template>
  <footer class="bg-dark text-light text-center small py-4 mt-5">
    <p class="mb-0">Pok&#233;mon loaded: {{ pokeCount }}</p>
    <p class="text-muted mb-0">
      &copy;
      <a href="https://ttntm.me" target="_blank" class="text-muted">ttntm</a> 2020
    </p>
  </footer>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component
  export default class Navbar extends Vue {
    @Prop({ required: true }) pokeCount!: number;
  }
</script>