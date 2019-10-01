import { ADD_GROUP, SET_MY_GROUPS } from "../types/mutation-types.js";

const mutations = {
  [ADD_GROUP](state, group) {
    state.groups.push(group);
  },
  [SET_MY_GROUPS](state, group) {
    state.groups = group;
  }
};

export default mutations;
