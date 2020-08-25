import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PokeList from "@/views/PokeList.vue";

if (!process || process.env.NODE_ENV !== 'test') {
  // to prevent conflicts with read-only router instances
  Vue.use(VueRouter)
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: PokeList
  },
  {
    path: "/details/:name",
    name: "details",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "pokedetails" */ "@/views/PokeDetails.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
