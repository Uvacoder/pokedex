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
      <b-col cols="12" md="6">
        <h2>Abilities</h2>
        <hr />
        <ul class="mb-4">
          <li v-for="(skill, index) in pokemon.abilities" :key="index" class="caps">{{ skill }}</li>
        </ul>
      </b-col>
      <b-col cols="12" md="6">
        <h2>Evolution</h2>
        <hr />
        <ul v-if="pokemon.evolution.length > 0" class="list-inline mb-4">
          <li v-for="(evo, index) in pokemon.evolution" :key="index" class="caps list-inline-item">
            <router-link
              :to="{name: 'details', params: {name: evo.name}}"
              :class="{
                'bg-dark text-light disabled': evo.name === pokemon.name
              }"
              class="btn btn-sm btn-outline-dark mb-2"
            >{{ evo.name }}</router-link>
            <b-icon-caret-right v-if="index + 1 < pokemon.evolution.length" class="mx-2" />
          </li>
        </ul>
        <p v-else class="text-danger">Error: couldn't get evolution data.</p>
      </b-col>
      <b-col cols="12">
        <h2>Moves</h2>
        <hr />
        <div class="d-flex flex-wrap">
          <b-button
            pill
            size="sm"
            v-for="(move, index) in pokemon.moves"
            :key="index"
            class="caps m-1"
            disabled
          >{{ move }}</b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";
  import Loading from "@/components/Loading.vue";

  import { PokemonDetail } from "@/types";

  @Component({
    components: {
      Loading
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

        // get evolution data; i.e. resolve the promise coming from that function
        const pokeEvolution = await this.getPokemonEvolution(thePokemon.id);
        // assign evolution data to the shaped pokemon
        thePokemon.evolution = pokeEvolution;
        // inject the shaped data into the Vue instance's pokemon object
        this.pokemon = Object.assign({}, thePokemon);
      }
    }

    async getPokemonEvolution(speciesId: number): Promise<Array<object>> {
      let returnEvoChain;
      try {
        // let's get the species first
        const species: Response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${speciesId}`
        );
        const returnSpecies = await species.json();
        // then get the species' evolution chain, i.e. what other pokemon it can evolve into
        const evoChain: Response = await fetch(
          `${returnSpecies["evolution_chain"].url}`
        );
        returnEvoChain = await evoChain.json();
      } catch (err) {
        console.log(err);
      }

      if (returnEvoChain) {
        // now go through that nested data - see: https://stackoverflow.com/questions/39112862/pokeapi-angular-how-to-get-pokemons-evolution-chain
        const pokeEvolution: Array<object> = [];
        let evoData = returnEvoChain.chain;
        do {
          const numberOfEvolutions = evoData["evolves_to"].length;

          pokeEvolution.push({
            name: evoData.species.name
          });

          if (numberOfEvolutions > 1) {
            for (let i = 1; i < numberOfEvolutions; i++) {
              pokeEvolution.push({
                name: evoData["evolves_to"][i].species.name
              });
            }
          }

          evoData = evoData["evolves_to"][0];
        } while (
          !!evoData &&
          Object.prototype.hasOwnProperty.call(evoData, "evolves_to")
        );

        return pokeEvolution;
      } else {
        // nothing came out of the function call and that's exactly what we'll return -> displays a message to the user
        return [];
      }
    }
  }
</script>
