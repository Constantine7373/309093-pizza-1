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
    <body>
      <header class="header">
        <div class="header__logo">
          <a href="index.html" class="logo">
            <img
              src="img/logo.svg"
              alt="V!U!E! Pizza logo"
              width="90"
              height="40"
            />
          </a>
        </div>
        <div class="header__cart">
          <a href="cart.html">0 ₽</a>
        </div>
        <div class="header__user">
          <a href="#" class="header__login"><span>Войти</span></a>
        </div>
      </header>

      <main class="content">
        <form action="#" method="post">
          <div class="content__wrapper">
            <h1 class="title title--big">Конструктор пиццы</h1>

            <div class="content__dough">
              <div class="sheet">
                <h2 class="title title--small sheet__title">Выберите тесто</h2>

                <div class="sheet__content dough">
                  <label
                    v-for="(dough, index) in pizza.dough"
                    :key="dough.id"
                    class="dough__input"
                    :class="
                      dough.name == 'Тонкое'
                        ? 'dough__input--light'
                        : 'dough__input--large'
                    "
                  >
                    <input
                      type="radio"
                      name="dought"
                      :value="dough.name == 'Тонкое' ? 'light' : 'large'"
                      class="visually-hidden"
                      :checked="index == 0"
                    />
                    <b>{{ dough.name }}</b>
                    <span>{{ dough.description }}</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="content__diameter">
              <div class="sheet">
                <h2 class="title title--small sheet__title">Выберите размер</h2>

                <div class="sheet__content diameter">
                  <label
                    v-for="(size, index) in pizza.sizes"
                    :key="size.id"
                    class="diameter__input"
                    :class="'diameter__input--' + pizzaSizeMap[size.multiplier]"
                  >
                    <input
                      type="radio"
                      name="diameter"
                      :value="pizzaSizeMap[size.multiplier]"
                      class="visually-hidden"
                      :checked="index == 0"
                    />
                    <span>{{ size.name }}</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="content__ingredients">
              <div class="sheet">
                <h2 class="title title--small sheet__title">
                  Выберите ингредиенты
                </h2>

                <div class="sheet__content ingredients">
                  <div class="ingredients__sauce">
                    <p>Основной соус:</p>

                    <label
                      v-for="(sauce, index) in pizza.sauces"
                      :key="sauce.id"
                      class="radio ingredients__input"
                    >
                      <input
                        type="radio"
                        name="sauce"
                        :value="pizzaSauceMap[sauce.name]"
                        :checked="index == 0"
                      />
                      <span>{{ sauce.name }}</span>
                    </label>
                  </div>

                  <div class="ingredients__filling">
                    <p>Начинка:</p>

                    <ul class="ingredients__list">
                      <li
                        v-for="ingredient in pizza.ingredients"
                        :key="ingredient.id"
                        class="ingredients__item"
                      >
                        <span
                          class="filling"
                          :class="'filling--' + ingredientsMap[ingredient.name]"
                        >
                          {{ ingredient.name }}</span
                        >

                        <div
                          class="counter counter--orange ingredients__counter"
                        >
                          <button
                            type="button"
                            class="counter__button counter__button--minus"
                            disabled
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="content__pizza">
              <label class="input">
                <span class="visually-hidden">Название пиццы</span>
                <input
                  type="text"
                  name="pizza_name"
                  placeholder="Введите название пиццы"
                />
              </label>

              <div class="content__constructor">
                <div class="pizza pizza--foundation--big-tomato">
                  <div class="pizza__wrapper">
                    <div class="pizza__filling pizza__filling--ananas"></div>
                    <div class="pizza__filling pizza__filling--bacon"></div>
                    <div class="pizza__filling pizza__filling--cheddar"></div>
                  </div>
                </div>
              </div>

              <div class="content__result">
                <p>Итого: 0 ₽</p>
                <button type="button" class="button" disabled>Готовьте!</button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </body>
  </html>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";

const pizzaSauceMap = {
  Томатный: "tomato",
  Сливочный: "creamy",
};

const pizzaSizeMap = {
  1: "small",
  2: "normal",
  3: "big",
};

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

export default {
  name: "IndexComponent",
  data() {
    return {
      misc,
      pizza,
      user,
      pizzaSauceMap,
      pizzaSizeMap,
      ingredientsMap,
    };
  },
};
</script>

<style scoped></style>
