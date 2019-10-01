import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Authentification from "./views/Authentification.vue";
import Inscription from "./views/Inscription.vue";
import Planning from "./views/Planning.vue";
import Annonce from "./views/Annonce.vue";

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
      path: "/login",
      name: "authentification",
      component: Authentification
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
