<template>
  <div id="app">
    <IndexComponent />
  </div>
</template>

<script>
import IndexComponent from "@/views/Index.vue";

export default {
  name: "App",
  components: {
    IndexComponent,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
