<template>
  <b-col cols="12">
    <h2>Moves</h2>
    <hr />
    <div class="d-flex flex-wrap">
      <b-button
        pill
        size="sm"
        v-for="(move, index) in data"
        :key="index"
        class="caps m-1"
        disabled
      >{{ move }}</b-button>
    </div>
  </b-col>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component
  export default class Moves extends Vue {
    @Prop({ required: true }) data!: string[];
  }
</script>