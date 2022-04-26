<template>
  <!DOCTYPE html>
  <html lang="ru">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="preload"
        href="fonts/roboto-bold.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-regular.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-light.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-bold.woff"
        as="font"
        type="font/woff"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-regular.woff"
        as="font"
        type="font/woff"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-light.woff"
        as="font"
        type="font/woff"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="css/style.min.css" />
      <title>V!U!E! Pizza - главная</title>
    </head>
    <AppLayout>
      <template #header>
        <Header :cartPrice="pizza.price" />
      </template>
      <main class="content">
        <form action="#" method="post">
          <div class="content__wrapper">
            <h1 class="title title--big">Конструктор пиццы</h1>

            <div class="content__dough">
              <BuilderDoughSelector
                :dough="staticPizza.dough"
                @doughChanged="updatePizzaComponents({ dough: $event })"
              />
            </div>

            <div class="content__diameter">
              <BuilderSizeSelector
                :sizes="staticPizza.sizes"
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
                @ingredientChange="updatePizzaComponents($event)"
                @sauceChange="updatePizzaComponents({ sauce: $event })"
              />
            </div>

            <div class="content__pizza">
              <label class="input">
                <span class="visually-hidden">Название пиццы</span>
                <input
                  type="text"
                  name="pizza_name"
                  placeholder="Введите название пиццы"
                  :value="pizza.name"
                  @input="pizza.name = $event.target.value"
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
                <BuilderPriceCounter :price="pizza.price" />
                <button type="button" class="button" :disabled="!isReadyToCook">
                  Готовьте!
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </AppLayout>
  </html>
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
import AppLayout from "../layouts/AppLayout.vue";
import Header from "../modules/Header.vue";

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

export default {
  name: "IndexComponent",
  components: {
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    AppLayout,
    Header,
  },
  data() {
    return {
      staticMisc,
      staticPizza,
      staticUser,
      ingredientsMap,
      sauceMap,
      doughMap,
      isReadyToCook: false,
      pizza: {
        name: undefined,
        components: { dough: {}, ingredients: {}, size: {}, sauce: {} },
        price: 0,
      },
    };
  },
  methods: {
    updatePizzaComponents: function (data) {
      return Object.assign(this.pizza.components, data);
    },
    countPizzaPrice: function () {
      let pizza = this.pizza;
      let staticPizza = this.staticPizza;
      let multiplier = 1;
      let doughPrice = 0;
      let saucePrice = 0;
      let pizzaIngredients = pizza.components.ingredients;
      let staticIngredients = staticPizza.ingredients;
      let ingredientsPrice = 0;

      // count DOUGH price
      staticPizza.dough.forEach((dough) =>
        dough.id == pizza.components.dough ? (doughPrice = dough.price) : null
      );

      // count SAUCE price
      staticPizza.sauces.forEach((sauce) =>
        sauce.id == pizza.components.sauce ? (saucePrice = sauce.price) : null
      );

      // count MULTIPLIER
      staticPizza.sizes.forEach((size) =>
        size.id == pizza.components.size ? (multiplier = size.multiplier) : null
      );

      // count DOUGH price
      if (Object.keys(pizzaIngredients).length > 0) {
        Object.keys(pizzaIngredients).forEach((ingredient) => {
          Object.keys(staticIngredients).forEach((staticKey) => {
            let staticIngredient = staticIngredients[staticKey];
            if (ingredient == staticIngredient.id) {
              ingredientsPrice +=
                pizzaIngredients[ingredient] * staticIngredient.price;
            }
          });
        });
      }

      let totalPrice =
        (doughPrice + ingredientsPrice + saucePrice) * multiplier;
      return (this.pizza.price = totalPrice);
    },
    checkPizzaReady: function () {
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
      return (this.isReadyToCook =
        (this.pizza.name == undefined ? false : this.pizza.name.length > 0) &&
        isEnoughComponents);
    },
  },
  watch: {
    pizza: {
      handler: function () {
        return this.countPizzaPrice();
      },
      deep: true,
      immediate: true,
    },
    "pizza.name": {
      handler: function () {
        return this.checkPizzaReady();
      },
      immediate: true,
    },
    "pizza.components": {
      handler: function () {
        return this.checkPizzaReady();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
