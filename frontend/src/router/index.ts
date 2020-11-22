import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Play from "@/views/Play.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      reload: true,
    },
  },
  {
    path: "/play",
    name: "play",
    component: Play,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  router
    .push({
      path: "/",
    })
    .catch((e) => console.log(e));
}

export default router;
