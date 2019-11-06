import mutations from "../mutations/account";
import actions from "../actions/account";

const state = {
  user: []
};

const account = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default account;
