<template>
  <div>
    <h1>COUCOU</h1>
    <v-list dense>
      <v-list-item>
        <v-list-item-content>Calories:</v-list-item-content>
        <v-list-item-content class="align-end">{{
          item.calories
        }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Fat:</v-list-item-content>
        <v-list-item-content class="align-end">{{
          item.fat
        }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Carbs:</v-list-item-content>
        <v-list-item-content class="align-end">{{
          item.carbs
        }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Protein:</v-list-item-content>
        <v-list-item-content class="align-end">{{
          item.protein
        }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Sodium:</v-list-item-content>
        <v-list-item-content class="align-end">{{
          item.sodium
        }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Calcium:</v-list-item-content>
        <v-list-item-content class="align-end">{{
          item.calcium
        }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Iron:</v-list-item-content>
        <v-list-item-content class="align-end">{{
          item.iron
        }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data: () => ({
    items: [
      {
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: "14%",
        iron: "1%"
      },
      {
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: "8%",
        iron: "1%"
      },
      {
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        sodium: 337,
        calcium: "6%",
        iron: "7%"
      },
      {
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: "3%",
        iron: "8%"
      },
      {
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        sodium: 327,
        calcium: "7%",
        iron: "16%"
      },
      {
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        sodium: 50,
        calcium: "0%",
        iron: "0%"
      },
      {
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        sodium: 38,
        calcium: "0%",
        iron: "2%"
      },
      {
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        sodium: 562,
        calcium: "0%",
        iron: "45%"
      },
      {
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        sodium: 326,
        calcium: "2%",
        iron: "22%"
      },
      {
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        sodium: 54,
        calcium: "12%",
        iron: "6%"
      }
    ]
  })
};
</script>
