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

          <div v-if="user.admin">
            <v-list-item
              v-for="items_admin in items_admin"
              :key="items_admin.title"
              router
              :to="items_admin.route"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ items_admin.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ items_admin.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div class="pa-2">
              <v-btn block @click="logout">Déconnection</v-btn>
            </div>
          </div>

          <div v-else-if="user.client">
            <v-list-item
              v-for="items_client in items_client"
              :key="items_client.title"
              router
              :to="items_client.route"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ items_client.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ items_client.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div class="pa-2">
              <v-btn block @click="logout">Déconnection</v-btn>
            </div>
          </div>

          <div v-else>
            <v-list-item
              v-for="items_coach in items_coach"
              :key="items_coach.title"
              router
              :to="items_coach.route"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ items_coach.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ items_coach.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div class="pa-2">
              <v-btn block @click="logout">Déconnection</v-btn>
            </div>
          </div>
        </div>
        <div v-else>
          <v-list-item
            v-for="items_noauth in items_noauth"
            :key="items_noauth.title"
            router
            :to="items_noauth.route"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ items_noauth.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ items_noauth.title }}</v-list-item-title>
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
      items_admin: [
        // https://cdn.materialdesignicons.com/1.1.34/
        { title: "Profil", icon: "mdi-account", route: "/profil" },
        { title: "Planning", icon: "mdi-calendar-text", route: "/planning" },
        { title: "Annonces", icon: "mdi-calendar-text", route: "/annonce" },
        {
          title: "details facture client",
          icon: "mdi-receipt",
          route: "/Details_facture_client"
        },
        {
          title: "details facture coach",
          icon: "mdi-receipt",
          route: "/Details_facture_coach"
        },
        { title: "Prix Séance", icon: "mdi-settings", route: "/Prix_seance" },
        //{ title: "Coach", icon: "mdi-dumbbell", route: "/coach"},
        {
          title: "Inscription",
          icon: "mdi-account-plus",
          route: "/inscription"
        }
      ],
      items_coach: [
        { title: "Profil", icon: "mdi-account", route: "/profil" },
        { title: "Planning", icon: "mdi-calendar-text", route: "/planning" },
        { title: "Annonces", icon: "mdi-calendar-text", route: "/annonce" }
      ],
      items_client: [
        { title: "Profil", icon: "mdi-account", route: "/profil" },
        { title: "Planning", icon: "mdi-calendar-text", route: "/planning" }
      ],
      items_noauth: [
        { title: "Connexion", icon: "mdi-login", route: "/login" }
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
        admin: "",
        client: "",
        show1: false
      }
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("login");
      window.location.reload();
    }
  },
  async mounted() {
    if (localStorage.token) {
      this.template = true;
    }
    try {
      this.id = localStorage.id;
      let url =
        "https://sportmanagementsystemapi.herokuapp.com/api/user/" + this.id;
      const response = await axios.get(url, {
        headers: {
          token: localStorage.token
        }
      });
      this.user.lastname = response.data.data.nom;
      this.user.firstname = response.data.data.prenom;
      this.user.role = response.data.data.role;
    } catch (err) {
      if (err.response.status === 403 && localStorage.id != null) {
        localStorage.clear();
        await this.$router.push("login");
        window.location.reload();
      }
    }
    if (this.user.role === "admin") {
      this.user.admin = true;
    } else if (this.user.role === "sociéte") {
      this.user.client = true;
    }
  }
};
</script>

<style></style>
