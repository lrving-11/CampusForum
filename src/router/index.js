import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/post/Index.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/loginAndRegister/Register.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/loginAndRegister/Login.vue"),
  },
  {
    path: "/post/add",
    name: "PostAdd",
    component: () => import("../views/post/PostAdd.vue"),
  },
  {
    path: "/profile/:uid",
    name: "Profile",
    component: () => import("../views/user/Profile.vue"),
  },
  {
    path: "/post/:pid",
    name: "PostDetail",
    component: () => import("../views/post/PostDetail.vue"),
  },
  {
    path: "/followers/:userId",
    name: "Followers",
    component: () => import("../views/user/fans.vue"),
  },
  {
    path: "/followees/:userId",
    name: "Followees",
    component: () => import("../views/user/Followees.vue"),
  },
  {
    path: "/notice",
    name: "Notice",
    component: () => import("../views/Notice.vue"),
  },
  {
    path: "/notice/:topic",
    name: "NoticeDetail",
    component: () => import("../views/NoticeDetail.vue"),
  },
  {
    path: "/search/:keyword",
    name: "Search",
    component: () => import("../views/post/Search.vue"),
  },
  {
    path: "/data",
    name: "Data",
    component: () => import("../views/Data.vue"),
  },
  {
    path: "/hot",
    name: "Hot",
    component: () => import("../views/post/Hot.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("../views/Setting.vue"),
  },
  {
    path: "/collect/:uid",
    name: "Collection",
    component: () => import("../views/user/Collection.vue"),
  },
  {
    path: "/userPost/:uid",
    name: "UserPosts",
    component: () => import("../views/user/UserPosts.vue"),
  },

  {
    path: "/myAdmin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/forget",
    name: "Forget",
    component: () => import("../views/loginAndRegister/Forget.vue"),
  },
  {
    path: "/message",
    name: "Message",
    component: () => import("../views/Message.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
