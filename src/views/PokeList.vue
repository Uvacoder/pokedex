<template>
  <b-container class="PokeList">
    <h1 class="h2">List of Pok&#233;mon</h1>
    <hr />
    <b-list-group>
      <b-list-group-item v-for="pokemon in pokeList" :key="pokemon.id">
        <img :src="pokemon.picture"> #{{ pokemon.order }} - {{ pokemon.name }}
        <router-link :to="{name: 'details', params: {id: pokemon.id}}" class="btn btn-sm btn-outline-dark">Details</router-link>
      </b-list-group-item>
    </b-list-group>
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