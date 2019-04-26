import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pros: []
  },
  mutations: {
    addcar(state, payload) {
      let flag = true;
      state.pros.map(item => {
        if (item.goods_id === payload.goods_id) {
          item = { ...payload };

          flag = false;
          return;
        }
        return item;
      });
      if (flag) state.pros.push(payload);
    },
    car(state, payload) {
      state = payload;
    }
  },
  actions: {}
});
