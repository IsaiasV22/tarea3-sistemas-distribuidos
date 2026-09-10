import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import App from "./App.vue";

import "./css/normalize.css";
import "./css/skeleton.css";

import ReviewList from "./ReviewList.vue";
import ReviewDetail from "./ReviewDetail.vue";

const routes = [
  { path: "/", component: ReviewList },
  { path: "/show/:id", component: ReviewDetail, props: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

let app = createApp(App);

app.use(router);

app.mount("#app");
