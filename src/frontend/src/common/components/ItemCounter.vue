<template>
  <div class="counter counter--orange" :class="className">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="decreaseDisabled"
      @click="decreaseHandler"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="increaseDisabled"
      @click="increaseHandler"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    className: {
      type: String,
      required: false,
    },
    value: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      required: false,
      default: Infinity,
    },
  },
  computed: {
    incrementButton: function () {
      return this.$el.querySelector(".counter__button--plus");
    },
    decrementButton: function () {
      return this.$el.querySelector(".counter__button--minus");
    },
    increaseDisabled: function () {
      return this.value == this.maxValue;
    },
    decreaseDisabled: function () {
      return this.value == 0;
    },
  },
  methods: {
    increaseHandler: function () {
      this.$emit("valueChange", this.value + 1);
    },
    decreaseHandler: function () {
      this.$emit("valueChange", this.value - 1);
    },
  },
};
</script>
