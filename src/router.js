import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Authentification from "./views/Authentification.vue";
import Inscription from "./views/Inscription.vue";
import Planning from "./views/Planning.vue";
import Annonce from "./views/Annonce.vue";
import Profil from "./views/Profil.vue";
import Details_facture_client from "./views/Details_facture_client.vue";
import Details_facture_coach from "./views/Details_facture_coach.vue";
import Prix_seance from "./views/Prix_seance.vue";
import Coach from "./views/Coach";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/annonce",
      name: "annonce",
      component: Annonce
    },
    {
      path: "/Prix_seance",
      name: "Prix_seance",
      component: Prix_seance
    },
    {
      path: "/Details_facture_client",
      name: "Details_facture_client",
      component: Details_facture_client
    },
    {
      path: "/Details_facture_coach",
      name: "Details_facture_coach",
      component: Details_facture_coach
    },
    {
      path: "/profil",
      name: "profil",
      component: Profil
    },
    {
      path: "/login",
      name: "authentification",
      component: Authentification
    },
    {
      path: "/coach",
      name: "coach",
      component: Coach
    },
    {
      path: "/inscription",
      name: "inscription",
      component: Inscription
    },
    {
      path: "/planning",
      name: "planning",
      component: Planning
    }
  ]
});
