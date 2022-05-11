<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите тесто</h2>

    <div class="sheet__content dough">
      <SelectorItem
        v-for="dough in dough"
        :key="dough.id"
        :className="doughName(dough.name)"
        name="dough"
        :isChecked="activeDough == dough.id"
        :value="dough.id"
        @change="onDoughChange($event)"
      >
        <b>{{ dough.name }}</b>
        <span>{{ dough.description }}</span>
      </SelectorItem>
    </div>
  </div>
</template>

<script>
// Components
import SelectorItem from "@/common/components/SelectorItem";

export default {
  name: "BuilderDoughSelector",
  components: {
    SelectorItem,
  },
  props: {
    dough: {
      type: Array,
      required: true,
      validator: (v) => v.length,
    },
    activeDough: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onDoughChange: function (v) {
      return this.$emit("doughChanged", v);
    },
    doughName: function (name) {
      return name == "Тонкое"
        ? "dough__input dough__input--light"
        : "dough__input dough__input--large";
    },
  },
};
</script>
