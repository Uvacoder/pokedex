<template>
  <b-container class="PokeDetails">
    <b-row>
      <b-col v-if="loadingState">
        <h1 class="caps">{{ pokemon.name }}</h1>
        <hr class="mb-md-4" />
      </b-col>
      <Loading v-else />
    </b-row>
    <b-row v-if="loadingState">
      <b-col cols="12" md="6">
        <img :src="pokemon.picture" :alt="pokemon.name" class="img-fluid" />
      </b-col>
      <b-col cols="12" md="6">
        <h2>Basic Information</h2>
        <hr />
        <ul>
          <li>
            Species:
            <span class="caps">{{ pokemon.species }}</span>
          </li>
          <li>ID: {{ pokemon.id }}</li>
          <li>Order #: {{ pokemon.order }}</li>
          <li>
            Types:
            <br />
            <ul>
              <li v-for="(type, index) in pokemon.type" :key="index" class="caps">{{ type }}</li>
            </ul>
          </li>
        </ul>
        <h2>Stats</h2>
        <hr />
        <ul>
          <li
            v-for="(stat, index) in pokemon.stats"
            :key="index"
            class="caps"
          >{{ stat.name }}: {{ stat.value }}</li>
        </ul>
      </b-col>
    </b-row>
    <b-row v-if="loadingState">
      <Abilities :data="pokemon.abilities" />
      <Evolution :data="pokemon.evolution" :id="pokemon.id" :name="pokemon.name" @update:evolution="updateEvolution" />
      <Moves :data="pokemon.moves" />
    </b-row>
  </b-container>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";

  import Abilities from "@/components/pokemon/Abilities.vue";
  import Evolution from "@/components/pokemon/Evolution.vue";
  import Loading from "@/components/Loading.vue";
  import Moves from "@/components/pokemon/Moves.vue";

  import { PokemonDetail } from "@/types";

  @Component({
    components: {
      Abilities,
      Evolution,
      Loading,
      Moves
    }
  })
  export default class PokeDetails extends Vue {
    private pokemon: PokemonDetail = Object.create({});

    get pokemonId(): string {
      return this.$route.params.name;
    }

    get loadingState(): boolean {
      return this.pokemon.id ? true : false;
    }

    created() {
      this.getPokemonDetails(this.pokemonId);
    }

    @Watch("pokemonId")
    onPropertyChanged() {
      // load new pokemon data in case of inter-species navigation (evolutions)
      this.pokemon = Object.create({}); // fake navigation effect; make the current data disappear; side effect: force loading state in case of later fetch errors
      this.getPokemonDetails(this.pokemonId);
    }

    async getPokemonDetails(id: string): Promise<void> {
      let returnData;
      try {
        // get the general pokemon data, more properties needed this time
        // also makes sure we have current data in case of direct navigation to this page (i.e. from search input)
        const data: Response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        returnData = await data.json();
      } catch (err) {
        console.log(err);
      }

      if (returnData) {
        // prepare the data
        const pokeAbilities: Array<string> = returnData.abilities.map(
          (el: any) => {
            return el.ability.name;
          }
        );
        const pokeMoves: Array<string> = returnData.moves.map((el: any) => {
          return el.move.name;
        });
        const pokeStats: Array<object> = returnData.stats.map((el: any) => {
          const tmp = { name: "", value: "" };
          tmp.name = el.stat.name;
          tmp.value = el.base_stat;
          return tmp;
        });
        const pokeTypes: Array<string> = returnData.types.map((el: any) => {
          return el.type.name;
        });

        // shape the data
        const thePokemon: PokemonDetail = {
          abilities: pokeAbilities.sort(),
          evolution: [],
          id: returnData.id,
          moves: pokeMoves.sort(),
          name: returnData.name,
          order: returnData.order,
          picture: returnData.sprites.other["official-artwork"].front_default,
          species: returnData.species.name,
          stats: pokeStats,
          type: pokeTypes.sort()
        };

        // inject the shaped data into the Vue instance's pokemon object
        this.pokemon = Object.assign({}, thePokemon);
      }
    }

    updateEvolution(data: object[]): void {
      if (data.length > 0) {
        this.pokemon.evolution = data;
      }
    }
  }
</script>
