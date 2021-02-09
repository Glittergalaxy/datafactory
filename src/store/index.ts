import { createStore } from 'vuex';

export default createStore({
  state: {
    userInfo: {
      // username: '',
      // role: '',
      // rolename: '',
    },
  },
  mutations: {
    update(state, payload) {
      state.userInfo = payload;
    },
  },
});
