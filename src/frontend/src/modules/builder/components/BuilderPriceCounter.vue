<template>
  <p>Итого: {{ price }} ₽</p>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    price: {
      type: Number,
      default: 0,
    },
  },
};
</script>
