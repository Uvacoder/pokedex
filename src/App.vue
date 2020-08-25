<template>
  <div id="app" class="d-flex flex-column h-100">
    <Navbar class="mb-5" />
    <router-view :pokeList="pokeList" @load-more="loadMorePokemon()" class="flex-grow-1 flex-shrink-0" />
    <Footer :pokeCount="pokeCount" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

import { Pokemon } from "@/types";

@Component({
  components: {
    Navbar,
    Footer
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
