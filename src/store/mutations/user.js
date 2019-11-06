import { SET_USERS } from "../types/mutation-types.js";

const mutations = {
  [SET_USERS](state, users) {
    state.users = users;
  }
};

export default mutations;
