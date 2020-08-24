<template>
  <div id="app">
    <Navbar class="mb-5" />
    <router-view :pokeList="pokeList" @load-more="loadMorePokemon()" />
    <footer class="bg-dark text-light py-4 mt-5">
      <span class="d-block text-center small">
        No. of Pok&#233;mon loaded: {{ pokeCount }}
      </span>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";

import { Pokemon } from "@/types";

@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {
  private pokeList: Array<object> = [];
  private pokeNum = 10;


  mounted() {
    this.fetchData(this.pokeNum);
  }

  get pokeCount(): number {
    return this.pokeList.length;
  }

  async getPokemon(current: number): Promise<void> {
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${current}`);
    const returnData = await data.json();

    // console.log(returnData);

    const onePokemon: Pokemon = {
      id: returnData.id,
      name: returnData.name,
      order: returnData.order,
      picture: returnData.sprites.front_default,
    };

    this.pokeList.push(onePokemon);
  }

  fetchData(num: number): void {
    let i: number = this.pokeList.length + 1;
    for (i; i <= num; i++) {
      this.getPokemon(i);
    }
  }

  loadMorePokemon():void {
    this.pokeNum = this.pokeCount + 10; // adjust app state
    this.fetchData(this.pokeNum); // get more data!
  }
}
</script>

<style lang="scss">
  .caps {
    text-transform: capitalize;
  }
</style>
