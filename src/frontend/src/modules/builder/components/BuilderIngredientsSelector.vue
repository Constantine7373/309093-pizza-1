<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

    <div class="sheet__content ingredients">
      <div class="ingredients__sauce">
        <p>Основной соус:</p>
        <RadioButton
          v-for="sauce in filling.sauces"
          :key="sauce.id"
          :name="'sauce'"
          :value="sauce.id"
          :isChecked="activeSauce == sauce.id"
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
              :dragDisabled="
                pizzaIngredients[ingredient.id] == ingredientsMaxValue
              "
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
                :maxValue="ingredientsMaxValue"
                :value="
                  pizzaIngredients.hasOwnProperty(ingredient.id)
                    ? pizzaIngredients[ingredient.id]
                    : 0
                "
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
    activeSauce: {
      type: Number,
      required: true,
    },
    pizzaIngredients: {
      type: Object,
      required: true,
    },
    ingredientsMaxValue: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onIngredientChange: function (id, value) {
      this.$emit("ingredientChange", { [id]: value });
    },
    onSauceChange: function (v) {
      return this.$emit("sauceChange", v);
    },
    onFillingDrop: function (id) {
      let value =
        this.pizzaIngredients[id] === undefined ? 0 : this.pizzaIngredients[id];
      value++;
      return this.onIngredientChange(id, value);
    },
  },
};
</script>
