<template>
  <div class="nk-container" style="height: 90%;">
    <Navbar></Navbar>
    <div class="main">
      <div class="container">
        <!--关注导航栏-->
        <el-menu
          active-text-color="	#409EFF"
          :default-active="activeIndex"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1"> 关注的人</el-menu-item>
          <el-menu-item index="2">
            <router-link
              class="text-primary"
              :to="{ name: 'Fans', params: { uid: user.id } }"
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

        <!-- 列表 -->
        <ul class="list-unstyled">
          <li
            class="media pb-1 pt-1 mb-0 border-bottom position-relative"
            v-for="map in userList"
          >
            <router-link
              :to="{ name: 'Profile', params: { uid: map.user.id } }"
            >
              <el-avatar :src="map.user.avatar" :size="60"></el-avatar>
            </router-link>

            <div
              class="media-body d-flex justify-content-between align-items-center"
            >
              <h6 class="mt-0 mb-0 d-flex flex-column">
                <span class="text-success mt-2 mb-1" style="font-size: 30px;">{{
                  map.user.nickname
                }}</span>
                <span class="float-right text-muted" style="font-size: 14px;">
                  <i
                    >关注于{{
                      $moment(map.followTime).format("YYYY-MM-DD HH:MM")
                    }}</i
                  >
                </span>
              </h6>
              <div>
                <button
                  type="button"
                  @click="follow(map.user.id)"
                  class="btn btn-info btn-sm follow-btn mr-2"
                >
                  {{ map.hasFollowed ? "取消关注" : "关注TA" }}
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
import Navbar from "@/components/Navbar";
export default {
  name: "Followees",
  components: {
    Navbar,
  },
  data() {
    return {
      activeIndex: "1",
      user: "",
      userList: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      hasFollowed: undefined,
    };
  },
  created() {
    //请求用户主页信息
    console.log(this.$route.params.uid);
    //请求页面资源
    this.$axios({
      method: "get",
      url: "/followees/" + this.$route.params.uid,
    })
      .then((res) => {
        if (res.data.code == 200) {
          const myData = res.data.data;
          this.user = myData.user;
          this.userList = myData.userList;
          this.total = myData.total;
        } else {
          this.$message.error(res.data.msg);
        }
        console.log(res);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    handleSelect(key, keyPath) {},
    page(currentPage) {
      this.$axios
        .get(
          "/followees/" + this.$route.params.uid + "?currentPage=" + currentPage
        )
        .then((res) => {
          const myData = res.data.data;
          this.user = myData.user;
          this.userList = myData.userList;
          this.total = myData.total;
          this.currentPage = res.data.data.currentPage;
        });
    },
    follow(entityId) {
      //要先登录才能关注或取消关注
      if (!this.$store.state.isLogin || this.$store.state.isLogin == "") {
        this.$message.error("要登录才能关注哦");
        return;
      }
      let path = "";
      if (this.hasFollowed) {
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
        .then((res) => {
          if (res.data.code == 200) {
            const myData = res.data.data;
            console.log(myData, "mydata");
            this.followerCount = myData.followerCount;
            this.hasFollowed = myData.hasFollowed;
          } else {
            this.$message.error(res.data.msg);
          }
          console.log(res);
        })
        .catch((error) => {
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
  /* height: 100%; */
  border-radius: 10px;
  opacity: 0.9;
}
.navInfo {
  float: right;
  flex: auto;
}
</style>
