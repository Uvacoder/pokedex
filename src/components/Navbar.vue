<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand>
      <router-link to="/" class="navbar-brand">Pokedex0r</router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link to="/" class="nav-link">Home</router-link>
        <b-nav-item href="https://pokeapi.co" target="_blank">PokéAPI</b-nav-item>
        <b-nav-item href="https://pokeapi.co/docs/v2" target="_blank">PokéAPI Docs</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <NavSearch />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import NavSearch from "@/components/NavSearch.vue";

  @Component({
    components: {
      NavSearch
    }
  })
  export default class Navbar extends Vue {}
</script>
