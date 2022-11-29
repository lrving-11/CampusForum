<template>
  <div class="nk-container" style="height: 90%;">
    <Navbar></Navbar>
    <div class="main">
      <div class="container">
        <!--关注导航栏-->
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          text-color="#fff"
        >
          <el-menu-item index="1"> 关注的人</el-menu-item>
          <el-menu-item index="2">
            <router-link
              tag="div"
              class="text-primary"
              :to="{ name: 'Followers', params: { userId: user.id } }"
            >
              粉丝
            </router-link>
          </el-menu-item>
          <el-menu-item class="navInfo">
            <el-button>
              <router-link
                tag="div"
                :to="{ name: 'Profile', params: { uid: user.id } }"
              >
                返回主页
              </router-link>
            </el-button>
          </el-menu-item>
        </el-menu>
        <div class="line"></div>

        <!-- 粉丝列表 -->
        <ul class="list-unstyled">
          <li
            class="media pb-1 pt-3 mb-0 border-bottom position-relative"
            v-for="map in userList"
          >
            <router-link
              :to="{ name: 'Profile', params: { uid: map.user.id } }"
            >
              <el-avatar :src="map.user.avatar" :size="50"></el-avatar>
            </router-link>

            <div class="media-body">
              <h6 class="mt-0 mb-0">
                <span class="text-success" style="font-size: 30px;">{{
                  map.user.username
                }}</span>
                <p class="float-right text-muted font-size-12">
                  关注于 <i>{{ map.followTime }}</i>
                </p>
              </h6>
              <div>
                <button
                  type="button"
                  @click="follow(map.user.id)"
                  class="btn btn-info btn-sm float-right mr-5 follow-btn"
                >
                  {{ hasFollowed ? "取消关注" : "关注TA" }}
                </button>
              </div>
            </div>
          </li>
        </ul>

        <!--分页，@current-change会把点击的页数传给方法-->
        <el-pagination
          v-show="total > 0"
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
import Navbar from "../components/Navbar";
export default {
  name: "Followees",
  components: {
    Navbar,
  },
  created() {
    //请求用户主页信息
    const _this = this;
    console.log(this.$route.params.uid);
    //请求页面资源
    this.$axios({
      method: "get",
      url: "/followees/" + _this.$route.params.userId,
    })
      .then(function(res) {
        if (res.data.code == 200) {
          const myData = res.data.data;
          _this.user = myData.user;
          _this.userList = myData.userList;
          _this.total = myData.total;
        } else {
          _this.fail(res.data.msg);
        }
        console.log(res);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  data() {
    return {
      activeIndex: "1",
      user: "",
      userList: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      uploadPath: this.$axios.defaults.baseURL,
      hasFollowed: undefined,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    fail(msg) {
      this.$message.error(msg);
    },
    page(currentPage) {
      const _this = this;
      _this.$axios
        .get(
          "/followees/" +
            _this.$route.params.userId +
            "?currentPage=" +
            currentPage
        )
        .then((res) => {
          const myData = res.data.data;
          _this.user = myData.user;
          _this.userList = myData.userList;
          _this.total = myData.total;
          _this.currentPage = res.data.data.currentPage;
        });
    },
    follow(entityId) {
      const _this = this;
      //要先登录才能关注或取消关注
      if (!this.$store.state.isLogin || this.$store.state.isLogin == "") {
        this.$message.error("要登录才能关注哦");
        return;
      }
      let path = "";
      if (_this.hasFollowed) {
        path = "/unfollow";
      } else {
        path = "/follow";
      }
      this.$axios({
        method: "post",
        url: path,
        data: {
          entityType: 3,
          entityId: entityId,
        },
      })
        .then(function(res) {
          if (res.data.code == 200) {
            const myData = res.data.data;
            console.log(myData, "mydata");
            _this.followerCount = myData.followerCount;
            _this.hasFollowed = myData.hasFollowed;
          } else {
            _this.fail(res.data.msg);
          }
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.main {
  width: 50%;
  margin: auto;
  margin-top: 30px;
  background-color: #fff;
  height: 100%;
}
.navInfo {
  float: right;
  flex: auto;
}
</style>
