<template>
  <b-nav-form>
    <b-form-input v-model="query" ref="input" size="sm" class="mr-sm-2" placeholder="Pokemon name"></b-form-input>
    <b-button
      id="searchBtn"
      @click.prevent="doSearch(query)"
      size="sm"
      class="my-2 my-sm-0"
      type="submit"
    >Search</b-button>
  </b-nav-form>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class NavSearch extends Vue {
    private query = "";

    // see: https://github.com/vuejs/vue-class-component/issues/94
    $refs!: {
      input: HTMLFormElement;
    };

    doSearch(q: string): void {
      const path = `/details/${q}`;
      this.$router.push(path);
      this.query = "";
      this.$refs.input.blur();
    }
  }
</script>