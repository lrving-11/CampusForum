<template>
  <div class="navbar">
    <div class="bgbtn" @click="changeBg">
      <svg width="100" height="100" class="icon" aria-hidden="true">
        <use xlink:href="#icon-fengche"></use>
      </svg>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo myMenu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item  @click.native.stop="toIndex">
        <img style="width: 140px; height: 50px" src="../assets/luntan.png" />
      </el-menu-item>
      <!-- <el-menu-item index="0" @click="toKen"> 关于本站</el-menu-item> -->
      <!--            <el-menu-item index="1">首页</el-menu-item>-->
      <el-menu-item index="2"  @click.native.stop="toIndex">最新</el-menu-item>
      <el-menu-item index="3"  @click.native.stop="toHot">最热</el-menu-item>
      <el-menu-item index="4"  @click.native.stop="toMessage"
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
        <el-button type="primary"  @click.native.stop="search" size="small">搜索</el-button>
      </el-menu-item>

      <el-menu-item
        @click.native.stop="login"
        v-show="!$store.state.isLogin"
        class="navInfo"
      >
        <el-button size="small">登录</el-button>
      </el-menu-item>
      <el-menu-item
         @click.native.stop="register"
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
        <el-menu-item index="5-2"  @click.native.stop="publish(1)">写文章</el-menu-item>
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
        <el-menu-item index="6-1"  @click.native.stop="toHome">我的主页</el-menu-item>
        <el-menu-item index="6-2"  @click.native.stop="toSetting">设置</el-menu-item>
        <el-menu-item index="6-2"  @click.native.stop="toCollect">我的收藏</el-menu-item>
        <el-menu-item index="6-3"  @click.native.stop="toUserPost">我的文章</el-menu-item>
        <el-menu-item index="6-4"  @click.native.stop="logout">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { BCardGroup } from "bootstrap-vue";

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
    // this.changeBg();
  },
  data() {
    return {
      uploadPath: this.$axios.defaults.baseURL,
      isLogin: this.$store.state.isLogin,
      // activeIndex: '2',
      userInfo: this.$store.state.userInfo,
      keyword: "",
      msgCount: 0,
      bgList: [
        "url(" + require("../assets/bg1.jpg") + ")",
        "url(" + require("../assets/bg2.jpg") + ")",
        "url(" + require("../assets/bg3.jpg") + ")",
        "url(" + require("../assets/bg4.jpg") + ")",
      ],
      bgIndex: 0,
      deg: -90,
    };
  },
  methods: {
    changeBg() {
      this.deg = this.deg - 90;
      this.bgIndex = this.bgIndex == this.bgList.length-1 ? 0 : ++this.bgIndex;
      document.body.style.backgroundImage = this.bgList[this.bgIndex];
      document.querySelector(".bgbtn").style.transform =
        "rotate(" + this.deg + "deg)";
    },
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
  },
};
</script>

<style>
body {
  background-image: url(../assets/bg1.jpg);
  background-attachment: fixed;
  background-size: cover;
  transition: background 0.2s ease-out;
}
.navbar {
  /* background-color: #409EFF; */
  padding: 0;
  background-color: #fff;
  opacity: 0.85;
  /* position: relative; */
}
.navbar .bgbtn {
  position: fixed;
  top: 85%;
  left: 90%;
  transition: 0.2s;
}
.navbar .navInfo {
  float: right;
  flex: auto;
}
.navbar .myMenu {
  width: 60%;
  margin: auto;
}
</style>
