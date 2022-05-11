<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите размер</h2>

    <div class="sheet__content diameter">
      <SelectorItem
        v-for="size in sizes"
        :key="size.id"
        :class="
          'diameter__input diameter__input--' + pizzaSizeMap[size.multiplier]
        "
        :name="'diameter'"
        :value="size.multiplier"
        :isChecked="activeSize == size.id"
        @change="onSizeChange($event)"
      >
        <span>{{ size.name }}</span>
      </SelectorItem>
    </div>
  </div>
</template>

<script>
// Components
import SelectorItem from "@/common/components/SelectorItem";

const pizzaSizeMap = {
  1: "small",
  2: "normal",
  3: "big",
};

export default {
  name: "BuilderSizeSelector",
  components: {
    SelectorItem,
  },
  props: {
    sizes: {
      type: Array,
      required: true,
      validator: (v) => v.length,
    },
    activeSize: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      pizzaSizeMap,
    };
  },
  methods: {
    onSizeChange: function (v) {
      return this.$emit("sizeChanged", v);
    },
  },
};
</script>
