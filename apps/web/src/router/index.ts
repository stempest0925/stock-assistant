import { createRouter, createWebHistory } from "vue-router";
import CNStockView from "@/views/CNStockView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/cn",
    },
    {
      path: "/cn",
      name: "cn",
      component: CNStockView,
      children: [
        {
          path: "",
          name: "cn-sector",
          component: () => import("@/views/CNSectorView.vue"),
          meta: { needKeep: true },
        },
        {
          path: "auc", // 只有根节点才有 "/"
          name: "cn-auc",
          component: () => import("@/views/CNAUCView.vue"),
        },
      ],
      // alias: "/" 路由别名，但上面用了重定向方案
    },
    {
      path: "/hk",
      name: "hk",
      component: () => import("@/views/HKStockView.vue"),
    },
    {
      path: "/us",
      name: "us",
      component: () => import("@/views/USStockView.vue"),
    },
  ],
});

export default router;
