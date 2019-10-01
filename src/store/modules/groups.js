import mutations from "../mutations/groups";
import actions from "../actions/groups";
import getters from "../getters/groups";

const state = {
  groups: []
};

const groups = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default groups;
