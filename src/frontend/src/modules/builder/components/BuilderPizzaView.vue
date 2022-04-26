<template>
  <div :class="'pizza pizza--foundation--' + dough + '-' + sauce">
    <div class="pizza__wrapper">
      <div
        v-for="(filling, index) in fillings"
        :key="index"
        :class="'pizza__filling ' + filling"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",
  props: {
    components: {
      type: Object,
      required: true,
    },
    staticPizza: {
      type: Object,
      required: true,
    },
    ingredientsMap: {
      type: Object,
      required: true,
    },
    sauceMap: {
      type: Object,
      required: true,
    },
    doughMap: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dough: function () {
      let dough;
      Object.keys(this.staticPizza.dough).forEach((key) => {
        if (this.staticPizza.dough[key].id == this.components.dough) {
          dough = this.doughMap[this.staticPizza.dough[key].name];
        }
      });
      return dough;
    },
    sauce: function () {
      let sauce;
      Object.keys(this.staticPizza.sauces).forEach((key) => {
        if (this.staticPizza.sauces[key].id == this.components.sauce) {
          sauce = this.sauceMap[this.staticPizza.sauces[key].name];
        }
      });
      return sauce;
    },
    fillings: function () {
      let curentIngredients = this.components.ingredients;
      let template = "pizza__filling--";
      let modificators = [];
      // перебираем ингредиенты в собранной пицце
      for (let curentIngredientId in curentIngredients) {
        // находим название текущего ингредиента
        let curentIngredientName;
        this.staticPizza.ingredients.forEach((item) => {
          if (item.id == curentIngredientId) {
            curentIngredientName = item.name;
          }
        });
        // Переводим русскоязычное название на англ для подстановки в модификатор дива
        let transIngredientName = this.ingredientsMap[curentIngredientName];
        let modificator = template.concat(transIngredientName);
        modificators.push(modificator);
        // Модификаторы для повторно добавленного ингредиента
        if (curentIngredients[curentIngredientId] >= 2) {
          modificator = modificator.concat(` ${template + "second"}`);
          modificators.push(modificator);
        }
        if (curentIngredients[curentIngredientId] >= 3) {
          modificator = modificator.concat(` ${template + "third"}`);
          modificators.push(modificator);
        }
      }
      return modificators;
    },
  },
};
</script>
