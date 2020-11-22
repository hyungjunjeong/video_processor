import Vue from "vue";
import Vuex from "vuex";
import { getModule } from "vuex-module-decorators";
import VideoModule from "./modules/VideoModule";

interface Store {
  VideoModule: VideoModule;
}
Vue.use(Vuex);

const store = new Vuex.Store<Store>({
  mutations: {},
  actions: {},
  modules: {
    VideoModule,
  },
});

export default store;

// Vuex modules and store must be linked for actions to work properly.
getModule(VideoModule, store);
