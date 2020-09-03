<template>
  <b-col>
    <p v-html="msg" class="text-center mt-5" />
  </b-col>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class Loading extends Vue {
    private msg = "";

    mounted() {
      this.msg = `Loading data...`;
      setTimeout(() => {
        this.msg = `Error retrieving data; timeout or invalid request.`;
      }, 5000);
    }
  }
</script>