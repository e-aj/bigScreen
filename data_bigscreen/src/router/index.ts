import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { message } from "ant-design-vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: import("../views/Home/home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: import("../views/login/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: import("../views/login/register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token && to.name !== "login" && to.name !== "register") {
    message.warning("请登录账号");
    next("/login");
  } else {
    next();
  }
});

export default router;
