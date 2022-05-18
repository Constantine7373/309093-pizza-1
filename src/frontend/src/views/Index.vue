<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <BuilderDoughSelector
            :dough="staticPizza.dough"
            :activeDough="pizza.components.dough"
            @doughChanged="updatePizzaComponents({ dough: $event })"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            :sizes="staticPizza.sizes"
            :activeSize="pizza.components.size"
            @sizeChanged="updatePizzaComponents({ size: $event })"
          />
        </div>

        <div class="content__ingredients">
          <BuilderIngredientsSelector
            :filling="{
              sauces: staticPizza.sauces,
              ingredients: staticPizza.ingredients,
            }"
            :ingredientsMap="ingredientsMap"
            :sauceMap="sauceMap"
            :activeSauce="pizza.components.sauce"
            :pizzaIngredients="pizza.components.ingredients"
            :ingredientsMaxValue="ingredientsMaxValue"
            @ingredientChanged="updatePizzaComponents({ ingredients: $event })"
            @sauceChanged="updatePizzaComponents({ sauce: $event })"
          />
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
              v-model="pizzaName"
              required
            />
          </label>

          <div class="content__constructor">
            <BuilderPizzaView
              :components="pizza.components"
              :ingredientsMap="ingredientsMap"
              :sauceMap="sauceMap"
              :doughMap="doughMap"
              :staticPizza="staticPizza"
            />
          </div>

          <div class="content__result">
            <BuilderPriceCounter :price="pizzaPrice" />
            <button type="button" class="button" :disabled="!isReadyToCook">
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import staticMisc from "@/static/misc.json";
import staticPizza from "@/static/pizza.json";
import staticUser from "@/static/user.json";

// Modules
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";

const ingredientsMap = {
  Грибы: "mushrooms",
  Чеддер: "cheddar",
  Салями: "salami",
  Ветчина: "ham",
  Ананас: "ananas",
  Бекон: "bacon",
  Лук: "onion",
  Чили: "chile",
  Халапеньо: "jalapeno",
  Маслины: "olives",
  Томаты: "tomatoes",
  Лосось: "salmon",
  Моцарелла: "mozzarella",
  Пармезан: "parmesan",
  "Блю чиз": "blue_cheese",
};

const sauceMap = {
  Томатный: "tomato",
  Сливочный: "creamy",
};

const doughMap = {
  Толстое: "big",
  Тонкое: "small",
};

const ingredientsMaxValue = 3;

export default {
  name: "IndexComponent",
  components: {
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  data() {
    return {
      staticMisc,
      staticPizza,
      staticUser,
      ingredientsMap,
      ingredientsMaxValue,
      sauceMap,
      doughMap,
      pizza: {
        name: undefined,
        components: { dough: 1, ingredients: {}, size: 1, sauce: 1 },
      },
    };
  },
  computed: {
    pizzaName: {
      get() {
        return this.pizza.name;
      },
      set(v) {
        v == "" ? (this.pizza.name = undefined) : (this.pizza.name = v);
      },
    },
    doughPrice: function () {
      let component = this.pizza.components.dough;
      let price;
      this.staticPizza.dough.forEach((dough) => {
        if (dough.id == component) {
          price = dough.price;
        }
      });
      return price;
    },
    saucePrice: function () {
      let component = this.pizza.components.sauce;
      let price;
      this.staticPizza.sauces.forEach((sauce) => {
        if (sauce.id == component) {
          price = sauce.price;
        }
      });
      return price;
    },
    multiplier: function () {
      let component = this.pizza.components.size;
      let price;
      this.staticPizza.sizes.forEach((size) => {
        if (size.id == component) {
          price = size.multiplier;
        }
      });
      return price;
    },
    ingredientsPrice: function () {
      let ingredients = this.pizza.components.ingredients;
      let ingredientsPrice = 0;
      if (Object.keys(ingredients).length > 0) {
        Object.keys(this.pizza.components.ingredients).forEach((ingredient) => {
          Object.keys(this.staticPizza.ingredients).forEach(
            (staticIngredient) => {
              if (ingredient == staticIngredient) {
                ingredientsPrice +=
                  ingredients[ingredient] *
                  this.staticPizza.ingredients[staticIngredient].price;
              }
            }
          );
        });
      }
      return ingredientsPrice;
    },
    pizzaPrice: function () {
      return (
        (this.doughPrice + this.ingredientsPrice + this.saucePrice) *
        this.multiplier
      );
    },
    isReadyToCook: function () {
      let isEnoughComponents;
      Object.keys(this.pizza.components).forEach((key) => {
        let item = this.pizza.components[key];
        if (isEnoughComponents != false) {
          if (typeof item === "string") {
            isEnoughComponents = item.trim().length > 0;
          } else if (typeof item === "object") {
            isEnoughComponents = Object.keys(item).length > 0;
          } else if (Array.isArray(item)) {
            isEnoughComponents = item.length > 0;
          } else if (typeof item === "number") {
            isEnoughComponents = item > 0;
          }
        }
      });
      return (
        (this.pizza.name == undefined ? false : this.pizza.name.length > 0) &&
        isEnoughComponents
      );
    },
  },
  methods: {
    updatePizzaComponents: function (data) {
      // удаляем нулевые значения ингредиентов \ добавляем реактивные ненулевые
      if (data["ingredients"]) {
        for (let id in data["ingredients"]) {
          let value = data["ingredients"][id];
          return value == 0
            ? this.$delete(this.pizza.components.ingredients, id)
            : this.$set(this.pizza.components.ingredients, id, value);
        }
      }
      Object.assign(this.pizza.components, data);
    },
  },
};
</script>

<style scoped></style>
