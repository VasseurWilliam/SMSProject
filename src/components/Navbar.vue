<template>
  <div>
    <v-app-bar flat app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="drawer"
      :color="color"
      :expand-on-hover="false"
      :right="false"
      absolute
      dark
    >
      <v-list dense nav class="py-0">
        <div v-if="template">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title
                >{{ user.lastname }} {{ user.firstname }}</v-list-item-title
              >
              <v-list-item-subtitle>{{ user.role }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            router
            :to="item.route"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <div class="pa-2">
            <v-btn block @click="logout">Déconnection</v-btn>
          </div>
        </div>
        <div v-else>
          <v-list-item
            v-for="item_1 in items_1"
            :key="item_1.title"
            router
            :to="item_1.route"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item_1.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item_1.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      drawer: false,
      items: [
        // https://cdn.materialdesignicons.com/1.1.34/
        { title: "Planning", icon: "mdi-calendar-text", route: "/planning" },
        {
          title: "Inscription",
          icon: "mdi-account-plus",
          route: "/inscription"
        }
      ],
      items_1: [
        { title: "Connexion", icon: "mdi-login", route: "/login" },
        { title: "Annonces", icon: "mdi-calendar-text", route: "/annonce" }
      ],
      color: "black",
      colors: ["primary", "blue", "success", "red", "teal"],
      template: "",
      token: "",
      id: "",
      user: {
        lastname: "",
        firstname: "",
        role: "",
        show1: false
      }
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      window.location.reload();
      this.$router.push("login");
    }
  },
  async mounted() {
    if (localStorage.token) {
      this.template = true;
    }
    try {
      this.id = localStorage.id;
      var url = "https://sportmanagementsystemapi.herokuapp.com/api/user/" + id;
      const response = await axios.get(url, {
        headers: {
          token: localStorage.token
        }
      });
      this.user.lastname = response.data.data.nom;
      this.user.firstname = response.data.data.prenom;
      this.user.role = response.data.data.role;
    } catch (err) {}
  }
};
</script>

<style></style>
