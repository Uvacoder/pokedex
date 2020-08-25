<template>
  <b-container class="PokeList mb-5">
    <h1 class="h2 text-center">List of Pok&#233;mon</h1>
    <b-list-group class="my-5">
      <b-list-group-item v-for="pokemon in pokeList" :key="pokemon.id" class="">
        <b-row class="align-items-center">
          <b-col cols="4" md="3">
            <img :src="pokemon.picture" class="px-lg-4" :alt="pokemon.name">
          </b-col>
          <b-col cols="8" md="9">
            <b-row class="align-items-center">
              <b-col cols="12" md="6" lg="5">
                <p class="small mt-3 mt-md-0 mb-0">#{{ pokemon.id }}</p>
                <h3 class="caps mb-0">{{ pokemon.name }}</h3>
              </b-col>
              <b-col cols="12" md="6" lg="7">
                <router-link :to="{name: 'details', params: {name: pokemon.name}}" class="btn btn-sm btn-outline-dark my-3 my-md-0">
                  Details: <span class="caps">{{ pokemon.name }}</span>
                </router-link>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
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