<template>
  <b-col cols="12" md="6">
    <h2>Evolution</h2>
    <hr />
    <ul v-if="data.length > 0" class="list-inline mb-4">
      <li v-for="(evo, index) in data" :key="index" class="caps list-inline-item">
        <router-link
          :to="{name: 'details', params: {name: evo.name}}"
          :class="{
            'bg-dark text-light disabled': evo.name === name
          }"
          class="btn btn-sm btn-outline-dark mb-2"
        >{{ evo.name }}</router-link>
        <b-icon-caret-right v-if="index + 1 < data.length" class="mx-2" />
      </li>
    </ul>
    <Loading v-else />
  </b-col>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  import Loading from "@/components/Loading.vue";

  @Component({
    components: {
      Loading
    }
  })
  export default class Evolution extends Vue {
    @Prop({ required: true }) data!: object[];
    @Prop({ required: true }) id!: number;
    @Prop({ required: true }) name!: string;

    created() {
      // get evolution data; i.e. resolve the promise coming from that function
      this.getPokemonEvolution(this.id);
    }

    async getPokemonEvolution(speciesId: number): Promise<void> {
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

        // assign evolution data to the shaped pokemon
        this.$emit("update:evolution", pokeEvolution);
      }
    }
  }
</script>