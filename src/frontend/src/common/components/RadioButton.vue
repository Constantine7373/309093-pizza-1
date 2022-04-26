<template>
  <label class="radio ingredients__input">
    <input
      type="radio"
      :class="className"
      :name="name"
      :value="value"
      :checked="isChecked"
      @change="onChange"
    />
    <span>{{ textValue }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    className: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    isChecked: {
      name: Boolean,
      default: false,
    },
    textValue: {
      type: String,
      required: false,
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
