import mutations from "../mutations/user";
import actions from "../actions/user";

const state = {
  users: []
};

const users = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default users;
