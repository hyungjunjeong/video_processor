import Vue from "vue";
import Vuex from "vuex";
import { getModule } from "vuex-module-decorators";
import MovieModule from "./modules/MovieModule";

interface Store {
  MovieModule: MovieModule;
}
Vue.use(Vuex);

const store = new Vuex.Store<Store>({
  mutations: {},
  actions: {},
  modules: {
    MovieModule,
  },
});

export default store;

// Vuex modules and store must be linked for actions to work properly.
getModule(MovieModule, store);
