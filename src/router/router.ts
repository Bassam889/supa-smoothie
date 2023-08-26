import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Create from "../views/Create.vue";
import Update from "../views/Update.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/create",
      name: "create",
      component: Create,
    },
    {
      path: "/:id",
      name: "update",
      component: Update,
    },
  ],
});
