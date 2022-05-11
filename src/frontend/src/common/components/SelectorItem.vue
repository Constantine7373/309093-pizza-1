<template>
  <label :class="className">
    <input
      type="radio"
      :name="name"
      :value="value"
      class="visually-hidden"
      :checked="isChecked"
      @change="onChange"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    className: {
      type: String,
      require: false,
    },
    name: {
      type: String,
      require: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    isChecked: {
      name: Boolean,
      default: false,
    },
  },
  data() {
    return {
      defaultValue: this.isChecked ? this.value : null,
    };
  },
  watch: {
    defaultValue: {
      handler: function () {
        return this.isChecked ? this.$emit("change", this.value) : null;
      },
      immediate: true,
    },
  },
  methods: {
    onChange: function () {
      return this.$emit("change", this.value);
    },
  },
};
</script>
