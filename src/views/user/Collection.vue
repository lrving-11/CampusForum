<template>
  <div class="nk-container">
    <Navbar active-index="8"></Navbar>

    <!-- 内容 -->
    <div class="main">
      <div class="container">
        <!-- 选项 -->
        <div class="position-relative">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'Profile', params: { uid: user.id } }"
                >个人信息</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'UserPosts', params: { uid: user.id } }"
                >文章</router-link
              >
            </li>
            <li class="nav-item ">
              <a class="nav-link active " href="javascript:;">收藏</a>
            </li>
          </ul>
        </div>

        <ul class="list-unstyled">
          <li
            class="media pb-1 pt-1 mb-0 position-relative"
            v-for="postVo in posts"
          >
            <el-card class="w-100">
              <h4>
                <router-link
                  :to="{ name: 'PostDetail', params: { pid: postVo.post.id } }"
                >
                  {{ postVo.post.title }}
                </router-link>
              </h4>
              <i style="font-size: 14px;">收藏于{{ postVo.collectTime }}</i>
              <!-- <div class="p_tag">
                <el-tag
                  v-show="postVo.post.type == 1"
                  type="danger"
                  effect="dark"
                  >置顶</el-tag
                >
                <el-tag v-show="postVo.post.status == 1" type="''" effect="dark"
                  >精选</el-tag
                >
                <span v-text="postVo.post.likeCount"></span>赞
              </div> -->
              <div class="d-flex mt-1" style="font-size: 16px;">
                <li class="mr-5">
                  <i class="fa  fa-thumbs-o-up"></i> {{ postVo.post.likeCount }}
                </li>
                <li class="mr-5">
                  <i class="el-icon-star-off"></i>
                  {{ postVo.post.collectCount }}
                </li>
                <li>
                  <i class="el-icon-chat-dot-round"></i>
                  {{ postVo.post.commentCount }}
                </li>
              </div>
            </el-card>
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
  name: "Collection",
  components: {
    Navbar,
  },
  data() {
    return {
      user: {},
      total: 0,
      posts: {},
      currentPage: 1,
      pageSize: 5,

      uploadPath: this.$axios.defaults.baseURL,
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: "/collection/" + this.$route.params.uid,
    })
      .then((res) => {
        if (res.data.code == 200) {
          const myData = res.data.data;
          console.log(myData);
          this.user = myData.user;
          this.total = myData.total;
          this.posts = myData.posts;
          this.currentPage = myData.currentPage;
        } else {
          this.$message.error(res.data.msg);
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    page(currentPage) {
      this.$axios({
        method: "get",
        url:
          "/collection/" +
          this.$route.params.uid +
          "?currentPage=" +
          currentPage,
      })
        .then((res) => {
          if (res.data.code == 200) {
            const myData = res.data.data;
            console.log(myData);
            this.posts = myData.posts;
            this.currentPage = myData.currentPage;
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
  overflow: hidden;
  border-radius: 10px;
  opacity: 0.9;
}
.container {
  margin-top: 20px;
}
</style>
