<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :footer-props="{ itemsPerPageOptions }"
    >
      <template v-slot:default="props">
        <v-layout wrap>
          <v-flex v-for="item in props.items" :key="item.name" xs12 sm6 md4 lg3>
            <v-card>
              <v-card-title
                ><h4>{{ item.name }}</h4>
                <v-btn class="mx-2" fab dark small color="orange">
                  <v-icon dark>edit</v-icon>
                </v-btn>
                <v-btn class="mx-2" fab dark small color="red">
                  <v-icon dark>remove</v-icon>
                </v-btn>
              </v-card-title>
              <v-divider></v-divider>

              <MyGroupsMembers :item="item" />
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import MyGroupsMembers from "./MyGroupsMembers";
export default {
  components: {
    MyGroupsMembers
  },
  data: () => ({
    itemsPerPageOptions: [4, 8, 12],
    itemsPerPage: 4,
    items: [
      {
        name: "Groupe 1"
      },
      {
        name: "Groupe 2"
      },
      {
        name: "Groupe 3"
      },
      {
        name: "Groupe 4"
      },
      {
        name: "Groupe 5"
      },
      {
        name: "Groupe 6"
      },
      {
        name: "Groupe 7"
      }
    ]
  })
};
</script>
