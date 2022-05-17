<template>
  <div>
    <Header :cartPrice="cartPrice" />
    <slot />
  </div>
</template>

<script>
import Header from "@/modules/Header.vue";

export default {
  name: "AppLayoutDefault",
  components: { Header },
  props: {
    cartPrice: {
      type: Number,
      default: 0,
    },
  },
};
</script>
