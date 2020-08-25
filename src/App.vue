<template>
  <div id="app" class="d-flex flex-column h-100">
    <Navbar class="mb-5" />
    <router-view
      :pokeList="pokeList"
      @load-more="loadMorePokemon()"
      class="flex-grow-1 flex-shrink-0"
    />
    <Footer :pokeCount="currentPokeCount" />
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

    get currentPokeCount(): number {
      return this.pokeList.length;
    }

    mounted() {
      this.fetchData(this.pokeNum);
    }

    async getPokemon(current: number): Promise<void> {
      // gets pokemon IDs from fetchData() and makes a request each; as this is async, it should make the app feel less blocked when loading the initial data
      let returnData;
      try {
        const data: Response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${current}`
        );
        returnData = await data.json();
      } catch (err) {
        console.log(err);
      }

      if (returnData) {
        const onePokemon: Pokemon = {
          id: returnData.id,
          name: returnData.name,
          order: returnData.order,
          picture: returnData.sprites.front_default
        };

        this.pokeList.push(onePokemon);
        // sort when done
        this.pokeList = this.pokeList.sort(this.objSort("id", false));
      }
    }

    fetchData(num: number): void {
      let i: number = this.pokeList.length + 1;
      for (i; i <= num; i++) {
        this.getPokemon(i);
      }
    }

    loadMorePokemon(): void {
      this.pokeNum = this.currentPokeCount + 10; // adjust app state
      this.fetchData(this.pokeNum); // get more data!
    }

    objSort(field: string, reverse: any, primer?: any) {
      // multi-purpose sorting function; ported from recept0r and edited reg. TypeScript requirements
      const key = primer
        ? function(x: any) {
            return primer(x[field]);
          }
        : function(x: any) {
            return x[field];
          };
      reverse = !reverse ? 1 : -1;

      return function(a: any, b: any) {
        return (
          (a = key(a)),
          (b = key(b)),
          reverse * ((((a as any) > b) as any) - (((b as any) > a) as any))
        );
      };
    }
  }
</script>

<style lang="scss">
  .caps {
    text-transform: capitalize;
  }
</style>
