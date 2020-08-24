<template>
  <div id="app">
    <Navbar class="mb-5" />
    <b-container>
      <button @click.prevent="fetchData(pokeNum)" class="mb-3">Get Data</button>
    </b-container>
    <router-view :pokeList="pokeList" />
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


  // created() {
  //   this.fetchData(this.pokeNum);
  // }

  async getPokemon(current: number): Promise<void> {
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${current}`);
    const returnData = await data.json();

    // console.log(returnData);

    const onePokemon: Pokemon = {
      id: returnData.id,
      name: returnData.name,
      order: returnData.order,
      picture: returnData.sprites.front_default
    };

    this.pokeList.push(onePokemon);
  }

  fetchData(num: number): void {
    for (let i = 1; i < num; i++) {
      this.getPokemon(i);
    }
  }
}
</script>

<style lang="scss"></style>
