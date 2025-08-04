import { createRouter, createWebHistory } from "vue-router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import Login from "../views/login/Login.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import Usrinfo from "../views/usrinfo/Usrinfo.vue";
import User from "../views/user/User.vue";
import Hotel from "../views/hotel/Hotel.vue";
import Tag from "../views/tag/Tag.vue";
import Deposit from "../views/deposit/Deposit.vue";
import Baselayout from "../layout/Baselayout.vue";

const routes = [
  {
    path: "/login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/",
    component: Baselayout,
    children: [
      {
        path: "dashboard",
        component: Dashboard,
        meta: {
          title: "dashboard.dashboard",
        },
      },
      {
        path: "usrinfo",
        component: Usrinfo,
        meta: {
          title: "usrinfo.title",
        },
      },
      {
        path: "user",
        component: User,
        meta: {
          title: "user.title",
        },
      },
      {
        path: "hotel",
        component: Hotel,
        meta: {
          title: "hotel.title",
        },
      },
      // {
      //   path: "tag",
      //   component: Tag,
      //   meta: {
      //     title: "tag.title",
      //   },
      // },
      {
        path: "deposit",
        component: Deposit,
        meta: {
          title: "deposit.title",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();

  const token = localStorage.getItem("token");

  if (to.path === "/login" && token) {
    next("/dashboard");
  } else if (to.path !== "/login" && !token) {
    next("/login"); // 未登录跳转 login
  } else {
    next(); // 放行
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束进度条
});

export default router;
