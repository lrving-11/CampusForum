<template>
  <div class="nk-container">
    <!-- 头部 -->
    <Navbar></Navbar>
    <!-- 内容 -->
    <div class="main">
      <div class="container">
        <h6><b class="square"></b> 相关帖子</h6>
        <!-- 帖子列表 -->
        <ul class="list-unstyled mt-4">
          <li class="media pb-3 pt-3 mb-3 border-bottom" v-for="map in posts">
            <router-link
              :to="{ name: 'Profile', params: { uid: map.user.id } }"
            >
              <el-avatar :src="map.user.avatar"></el-avatar>
            </router-link>
            <div class="media-body">
              <h6 class="mt-0 mb-3">
                <router-link
                  :to="{ name: 'PostDetail', params: { pid: map.post.id } }"
                  v-html="map.post.title"
                >
                </router-link>
              </h6>
              <div class="mb-3" v-html="map.post.content"></div>
              <div class="text-muted font-size-12">
                <u class="mr-3" v-text="map.user.username"></u>
                发布于
                <b v-text="map.post.createTimeStr"></b>
                <ul class="d-inline float-right">
                  <li class="d-inline ml-2">
                    赞 <i v-text="map.likeCount"></i>
                  </li>
                  <li class="d-inline ml-2">|</li>
                  <li class="d-inline ml-2">
                    回复 <i v-text="map.post.commentCount"></i>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <!-- 分页 -->
        <!--分页，@current-change会把点击的页数传给方法-->
        <el-pagination
          class="mpage"
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @current-change="page"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Search",
  components: {
    Navbar,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      posts: "",
      keyword: "",

      isLogin: this.$store.state.isLogin,
      activeIndex: "1",
      userInfo: this.$store.state.userInfo,
    };
  },
  created() {
    this.$axios
      .get(
        "/search?currentPage=" +
          this.currentPage +
          "&keyword=" +
          this.$route.params.keyword
      )
      .then((res) => {
        const myData = res.data.data;
        this.total = myData.total;
        this.currentPage = myData.currentPage;
        this.posts = myData.posts;
        this.keyword = myData.keyword;
      });
  },

  methods: {
    page(currentPage) {
      this.$axios
        .get("/search?currentPage=" + currentPage + "&keyword=" + this.keyword)
        .then((res) => {
          const myData = res.data.data;
          console.log(myData);
          this.total = myData.total;
          this.currentPage = myData.currentPage;
          this.posts = myData.posts;
          this.keyword = myData.keyword;
        });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toMessage() {
      if (!this.$store.state.isLogin || this.$store.state.isLogin == "") {
        this.$message.error("要登录才能查看消息哦");
        return;
      }
      this.$router.push("/message");
    },
    // login() {
    //   this.$router.push("/login");
    // },
    // register() {
    //   this.$router.push("/register");
    // },
    // logout() {
    //   this.$store.commit("logout");
    // },
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
      this.$router.push({
        name: "Profile",
        params: {
          uid: this.$store.state.userInfo.id,
        },
      });
    },
    search() {
      this.$axios
        .get("/search?currentPage=1&keyword=" + this.keyword)
        .then((res) => {
          const myData = res.data.data;
          this.total = myData.total;
          this.currentPage = myData.currentPage;
          this.posts = myData.posts;
          this.keyword = myData.keyword;
        });
    },
    toHot() {
      this.$router.push({
        name: "Hot",
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
.navInfo {
  float: right;
  flex: auto;
}
.myMenu {
  width: 100%;
}

em {
  color: red;
}
</style>
