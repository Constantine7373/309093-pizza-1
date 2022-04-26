<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

    <div class="sheet__content ingredients">
      <div class="ingredients__sauce">
        <p>Основной соус:</p>
        <RadioButton
          v-for="(sauce, index) in filling.sauces"
          :key="sauce.id"
          :name="'sauce'"
          :value="sauce.id"
          :isChecked="index == 0"
          :textValue="sauce.name"
          @change="onSauceChange($event)"
        />
      </div>

      <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul class="ingredients__list">
          <li
            v-for="ingredient in filling.ingredients"
            :key="ingredient.id"
            class="ingredients__item"
          >
            <draggable
              :dragClass="'.filling'"
              :dropClass="'.pizza'"
              @drop="onFillingDrop(ingredient.id)"
            >
              <span
                class="filling"
                :class="'filling--' + ingredientsMap[ingredient.name]"
              >
                {{ ingredient.name }}</span
              >
              <ItemCounter
                :className="'ingredients__counter'"
                :maxValue="3"
                :counterId="ingredient.id"
                :value="ingredients[ingredient.id]"
                @valueChange="onIngredientChange(ingredient.id, $event)"
              />
            </draggable>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// Components
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";
import draggable from "@/common/components/Draggable";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton,
    ItemCounter,
    draggable,
  },
  props: {
    filling: {
      type: Object,
      required: true,
      validator: (v) => v.sauces && v.ingredients,
    },
    ingredientsMap: {
      type: Object,
      required: true,
    },
    sauceMap: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ingredients: {},
    };
  },
  watch: {
    ingredients: {
      handler: function () {
        this.$emit("ingredientChange", { ingredients: this.ingredients });
      },
      deep: true,
    },
  },
  methods: {
    onIngredientChange: function (id, value) {
      value == 0
        ? this.$delete(this.ingredients, id)
        : this.$set(this.ingredients, id, value);
    },
    onSauceChange: function (v) {
      return this.$emit("sauceChange", v);
    },
    onFillingDrop: function (id) {
      let value = this.ingredients[id] === undefined ? 0 : this.ingredients[id];
      value++;
      return this.onIngredientChange(id, value);
    },
  },
};
</script>
