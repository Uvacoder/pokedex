<template>
  <footer class="bg-dark text-light py-4 mt-5">
    <span class="d-block text-center small">
      No. of Pok&#233;mon loaded: {{ pokeCount }}
    </span>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
  @Prop({ required: true}) pokeCount!: number;
}
</script>

<style>

</style>