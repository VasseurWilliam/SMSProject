import Vue from "vue";
import Vuex from "vuex";
import accountModule from "./modules/account";
import usersModule from "./modules/user";
import groupsModule from "./modules/groups";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    account: accountModule,
    user: usersModule,
    groups: groupsModule
  }
});
