<template>
  <div class="counter counter--orange" :class="className">
    <button
      type="button"
      class="counter__button counter__button--minus"
      disabled
      @click="decreaseHandler"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      type="button"
      class="counter__button counter__button--plus"
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
          this.$el.querySelector(".counter__input").value = v;
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
  },
  methods: {
    increaseHandler: function () {
      this.counter++;
    },
    decreaseHandler: function () {
      this.counter--;
      this.incrementButton.removeAttribute("disabled");
    },
    valueWatcher: function () {
      this.counterValue == this.maxValue
        ? this.incrementButton.setAttribute("disabled", true)
        : this.decrementButton.removeAttribute("disabled");
      this.counterValue == 0
        ? this.decrementButton.setAttribute("disabled", true)
        : false;
      this.$emit("valueChange", this.counterValue);
    },
  },
  watch: {
    counterValue: function () {
      this.valueWatcher();
    },
    value: function () {
      this.counter = this.value;
      this.valueWatcher();
    },
  },
};
</script>
