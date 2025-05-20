import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ComplexSvgLayout from "../views/ComplexSvgLayout.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/complex-svg-layout", component: ComplexSvgLayout },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
