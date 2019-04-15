import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/Index.vue") //logo
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Home.vue") //app首页
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue") //app登录页面
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register.vue") //app注册页面
    },
    {
      path: "/storelist",
      name: "storelist",
      component: () => import("@/views/Storelist.vue") //app店铺列表
    },
    {
      path: "/storeindex",
      name: "storeindex",
      component: () => import("@/views/Storeindex.vue") //app店铺首页客户端
    },
    {
      path: "/classifylist",
      name: "classifylist",
      component: () => import("@/views/Classifylist.vue") //app店铺首页客户端
    },
    {
      path: "/createstore",
      name: "createstore",
      component: () => import("@/views/Createstore.vue") //app创建店铺
    },
    {
      path: "/storesetting",
      name: "storesetting",
      component: () => import("@/views/Storesetting.vue") //app创建店铺
    },
    {
      path: "/mystore",
      name: "mystore",
      component: () => import("@/views/Mystore.vue") //我的店铺
    },
    {
      path: "/addproduct",
      name: "addproduct",
      component: () => import("@/views/Addproduct.vue") //我的店铺
    }
  ]
});
