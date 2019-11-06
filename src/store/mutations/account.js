import { REGISTER_REQUEST, LOGIN_REQUEST } from "../types/mutation-types.js";

const mutations = {
  [REGISTER_REQUEST](state, user) {
    state.status = user;
  },
  [LOGIN_REQUEST](state, user) {
    state.status = user;
  }
};

export default mutations;
