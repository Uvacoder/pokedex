<template>
  <b-container class="PokeList mb-5">
    <h1 class="h2 text-center">List of Pok&#233;mon</h1>
    <b-list-group class="my-5">
      <b-list-group-item v-for="pokemon in pokeList" :key="pokemon.id" class="d-flex flex-column flex-md-row align-items-center">
        <img :src="pokemon.picture" class="ml-md-3 mr-md-5">
        <div class="d-flex flex-column mb-4 mb-md-0 mx-md-5">
          <p class="d-inline-block small mb-0">#{{ pokemon.id }}</p>
          <h3 class="d-inline-block caps mb-0">{{ pokemon.name }}</h3>
        </div>
        <div class="mb-4 mb-md-0 ml-md-5">
          <router-link :to="{name: 'details', params: {id: pokemon.id}}" class="btn btn-sm btn-outline-dark">View Details: <span class="caps">{{ pokemon.name }}</span></router-link>
        </div>
      </b-list-group-item>
    </b-list-group>
    <b-button class="btn d-block mx-auto" @click="$emit('load-more')">+ Load More</b-button>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Pokemon } from "@/types";

@Component
export default class PokeList extends Vue {
  @Prop({ required: true}) pokeList!: Array<object>;
};
</script>

<style scoped>

</style>