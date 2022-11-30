<template>
  <div class="navbar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo myMenu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item @click="toIndex">
        <img style="width: 140px; height: 50px" src="../assets/luntan.png" />
      </el-menu-item>
      <!-- <el-menu-item index="0" @click="toKen"> 关于本站</el-menu-item> -->
      <!--            <el-menu-item index="1">首页</el-menu-item>-->
      <el-menu-item index="2" @click="toIndex">最新</el-menu-item>
      <el-menu-item index="3" @click="toHot">最热</el-menu-item>
      <el-menu-item index="4" @click="toMessage"
        >消息中心<span v-if="msgCount != 0" class="badge badge-danger ml-3">{{
          msgCount
        }}</span></el-menu-item
      >
      <el-menu-item>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          class="border-radius"
          @keyup.enter="search"
          v-model="keyword"
          style="margin-right:10px ;width: 200px;"
          size="small"
        ></el-input>
        <el-button type="primary" @click="search" size="small">搜索</el-button>
      </el-menu-item>

      <el-menu-item
        @click="login"
        v-show="!$store.state.isLogin"
        class="navInfo"
      >
        <el-button size="small">登录</el-button>
      </el-menu-item>
      <el-menu-item
        @click="register"
        v-show="!$store.state.isLogin"
        class="navInfo"
        ><el-button size="small">注册 </el-button></el-menu-item
      >

      <el-submenu v-show="$store.state.isLogin" index="5" class="navInfo">
        <template slot="title">
          <el-button icon="el-icon-edit" type="success" plain round size="small"
            >创建</el-button
          ></template
        >
        <el-menu-item index="5-2" @click="publish(1)">写文章</el-menu-item>
      </el-submenu>

      <!--头像-->
      <el-submenu v-show="$store.state.isLogin" index="6" class="navInfo">
        <template slot="title">
          <el-avatar
            :size="50"
            :src="this.$store.state.userInfo.avatar"
          ></el-avatar>
        </template>
        <el-menu-item v-text="$store.state.userInfo.username"></el-menu-item>
        <el-menu-item index="6-1" @click="toHome">我的主页</el-menu-item>
        <el-menu-item index="6-2" @click="toSetting">设置</el-menu-item>
        <el-menu-item index="6-2" @click="toCollect">我的收藏</el-menu-item>
        <el-menu-item index="6-3" @click="toUserPost">我的文章</el-menu-item>
        <el-menu-item index="6-4" @click="logout">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    activeIndex: {
      type: String,
      default: "2",
      required: false, //在使用组件不一定传值
    },
  },
  created() {
    // console.log("img", this.$store.state.userInfo.avatar);
  },
  data() {
    return {
      uploadPath: this.$axios.defaults.baseURL,
      isLogin: this.$store.state.isLogin,
      // activeIndex: '2',
      userInfo: this.$store.state.userInfo,
      keyword: "",
      msgCount: 0,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toMessage() {
      if (!this.$store.state.isLogin || this.$store.state.isLogin == "") {
        this.$message.error("要登录才能查看消息哦");
        return;
      }
      //跳转到消息中心
      this.$router.push("/message");
    },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
    logout() {
      this.$router.push("/login");
      this.$store.commit("logout");
    },
    //跳转至发表文章页面，传递参数tag
    publish(flag) {
      if (flag == 0) {
        this.$router.push({
          path: "/post/query",
        });
      } else {
        this.$router.push({
          path: "/post/add",
        });
      }
    },
    toIndex() {
      this.$router.push("/");
    },
    toHome() {
      console.log(this.$route.fullPath);
      console.log(this.$route.path);

      this.$router.push({
        name: "Profile",
        params: {
          uid: this.$store.state.userInfo.id,
        },
      });
      // location.reload();
    },
    toHot() {
      this.$router.push({
        name: "Hot",
      });
    },
    search() {

      this.$router.push({
        name: "Search",
        params: {
          keyword: this.keyword,
        },
      });
    },
    toSetting() {
      this.$router.push("/setting");
    },
    toCollect() {
      this.$router.push({
        name: "Collection",
        params: {
          uid: this.$store.state.userInfo.id,
        },
      });
    },
    toUserPost() {
      this.$router.push({
        name: "UserPosts",
        params: {
          uid: this.$store.state.userInfo.id,
        },
      });
    },
    toKen() {
      this.$router.push("/ken");
    },
  },
};
</script>

<style scoped>
.navbar {
  /* background-color: #409EFF; */
  padding: 0;
  /* width: 80%; */
  background-color: #fff;
  opacity: .85;
}
.navInfo {
  float: right;
  flex: auto;
}
.myMenu {
  width: 70%;
  margin: auto;
}
</style>
