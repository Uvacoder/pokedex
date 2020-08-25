<template>
  <b-container class="PokeDetails">
    <b-row>
      <b-col>
        <h1 class="caps">
          <span class="text-muted small">Details: </span>
          {{ pokemon.name }}
        </h1>
        <hr class="mb-md-4" />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" md="6">
        <img :src="pokemon.picture" :alt="pokemon.name" class="img-fluid">
      </b-col>
      <b-col cols="12" md="6">
        <h2>Basic Information</h2>
        <hr />
        <ul>
          <li>Species: <span class="caps">{{ pokemon.species }}</span></li>
          <li>ID: {{ pokemon.id }}</li>
          <li>Order #: {{ pokemon.order }}</li>
          <li>Types:<br>
            <ul>
              <li v-for="(type, index) in pokemon.type" :key="index" class="caps">{{ type }}</li>
            </ul>
          </li>
        </ul>
        <h2>Stats</h2>
        <hr />
        <ul>
          <li v-for="(stat, index) in pokemon.stats" :key="index" class="caps">
            {{ stat.name }}: {{ stat.value }}
          </li>
        </ul>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <h2>Abilities</h2>
        <hr />
        <ul class="mb-4">
          <li v-for="(skill, index) in pokemon.abilities" :key="index" class="caps">
            {{ skill }}
          </li>
        </ul>
      </b-col>
      <b-col cols="12">
        <h2>Moves</h2>
        <hr />
        <div class="d-flex flex-wrap">
          <b-button pill size="sm" v-for="(move, index) in pokemon.moves" :key="index" class="caps m-1" disabled>{{ move }}</b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PokemonDetail } from "@/types";

@Component
export default class PokeDetails extends Vue {
  private pokemon: PokemonDetail = Object.create({});

  get pokemonID(): string {
    return this.$route.params.name;
  }

  mounted() {
    this.getPokemonDetails(this.pokemonID);
  }

  async getPokemonDetails(id: string): Promise<void> {
    // get the general pokemon data again, more properties needed this time
    // also makes sure we have the data in case of direct navigation to this page
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const returnData = await data.json();

    // prepare the data

    const pokeAbilities: Array<string> = returnData.abilities.map((el: any) => {return el.ability.name});

    const pokeMoves: Array<string> = returnData.moves.map((el: any) => {return el.move.name});

    const pokeStats: Array<object> = returnData.stats.map((el: any) => {
      const tmp = {name: '', value:''};
      tmp.name = el.stat.name;
      tmp.value = el.base_stat;
      return tmp;
    });

    const pokeTypes: Array<string> = returnData.types.map((el: any) => {return el.type.name});

    // shape the data

    const thePokemon: PokemonDetail = {
      abilities: pokeAbilities.sort(),
      evolution: [''],
      id: returnData.id,
      moves: pokeMoves.sort(),
      name: returnData.name,
      order: returnData.order,
      picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${returnData.id}.png`, // the 'official-artwork' key made problems due to the dash in its name
      species: returnData.species.name,
      stats: pokeStats,
      type: pokeTypes.sort()
    };

    this.pokemon = Object.assign({}, thePokemon);
  }
};
</script>
