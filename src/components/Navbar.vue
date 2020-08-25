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

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
