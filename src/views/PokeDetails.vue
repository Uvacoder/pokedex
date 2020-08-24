<template>
  <div class="PokeDetails container">
    <h1 class="mb-5">This is the template for the details page page</h1>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PokemonDetail } from "@/types";

@Component
export default class PokeDetails extends Vue {
  private pokemon: PokemonDetail = Object.create({});

  get pokemonID(): string {
    // seems like router converts number -> string somehow, so we've got to work with that...
    return this.$route.params.id;
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
      const tmp = {statname: '', statvalue:''};
      tmp.statname = el.stat.name;
      tmp.statvalue = el.base_stat;
      return tmp;
    });

    const pokeTypes: Array<string> = returnData.types.map((el: any) => {return el.type.name});

    // shape the data

    const thePokemon: PokemonDetail = {
      abilities: pokeAbilities,
      evolution: [''],
      id: returnData.id,
      moves: pokeMoves,
      name: returnData.name,
      order: returnData.order,
      picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${returnData.id}.png`, // the 'official-artwork' key made problems due to the dash in its name
      species: returnData.species.name,
      stats: pokeStats,
      type: pokeTypes
    };

    this.pokemon = Object.assign({}, thePokemon);
  }
};
</script>
