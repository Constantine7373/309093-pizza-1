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
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="counterValue"
    />
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
    counterId: {
      type: Number,
      required: true,
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
  data() {
    return {
      counterValue: this.value,
    };
  },
  computed: {
    counter: {
      get: function () {
        return this.counterValue;
      },
      set: function (v) {
        if (0 <= v && v <= this.maxValue) {
          return (this.counterValue = v);
        }
      },
    },
    incrementButton: function () {
      return this.$el.querySelector(".counter__button--plus");
    },
    decrementButton: function () {
      return this.$el.querySelector(".counter__button--minus");
    },
    increaseDisabled: function () {
      return this.counterValue == this.maxValue;
    },
    decreaseDisabled: function () {
      return this.counterValue == 0;
    },
  },
  methods: {
    increaseHandler: function () {
      this.counter++;
    },
    decreaseHandler: function () {
      this.counter--;
    },
  },
  watch: {
    counterValue: function () {
      this.$emit("valueChange", this.counterValue);
    },
  },
};
</script>
