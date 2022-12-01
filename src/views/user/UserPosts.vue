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
              <a class="nav-link active" href="javascript:;">文章</a>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'Collection', params: { uid: user.id } }"
                >收藏</router-link
              >
            </li>
          </ul>
        </div>
        <!-- 文章列表 -->
        <div class="media mt-3">
          <div class="media-body">
            <ul class="list-unstyled">
              <li
                class="media pb-1 pt-1 mb-0  position-relative"
                v-for="postVo in records"
              >
                <el-card class="w-100">
                  <h4>
                    <router-link
                    style="font-size: 22px;"
                      :to="{
                        name: 'PostDetail',
                        params: { pid: postVo.post.id },
                      }"
                    >
                      {{ postVo.post.title }}
                    </router-link>
                  </h4>
                  <i style="font-size: 14px;">{{ postVo.post.createTimeStr }}</i>

                  <!-- <div class="p_tag">
                    <el-tag
                      v-show="postVo.post.type == 1"
                      type="danger"
                      effect="dark"
                      >置顶</el-tag
                    >
                    <el-tag
                      v-show="postVo.post.status == 1"
                      type="''"
                      effect="dark"
                      >精选</el-tag
                    >
                    <span v-text="postVo.post.likeCount"></span>赞
                  </div> -->
                  <div class="d-flex mt-1" style="font-size: 16px;">
                    <li class="mr-5">
                      <i class="fa  fa-thumbs-o-up"></i
                      > {{ postVo.post.likeCount }}
                    </li>
                    <li class="mr-5">
                      <i class="el-icon-star-off"></i
                      > {{ postVo.post.collectCount }}
                    </li>
                    <li>
                      <i class="el-icon-chat-dot-round"></i
                      > {{ postVo.post.commentCount }}
                    </li>
                  </div>
                </el-card>
              </li>
            </ul>
          </div>
        </div>

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
  name: "UserPosts",
  components: {
    Navbar,
  },
  data() {
    return {
      uploadPath: this.$axios.defaults.baseURL,
      records: {},
      currentPage: 1,
      total: 0,
      pageSize: 5,
      user: {},
    };
  },
  //頁面首先加載第一頁
  created() {
    this.$axios.get("/user/userPost/" + this.$route.params.uid).then((res) => {
      console.log(res);
      this.records = res.data.data.pagination.records;
      this.currentPage = res.data.data.pagination.currentPage;
      this.total = res.data.data.pagination.total;
      this.pageSize = res.data.data.pagination.pageSize;
      this.user = res.data.data.user;
    });
  },
  methods: {
    page(currentPage) {
      //要先登录才能关注或取消关注
      this.$axios({
        method: "get",
        url:
          "/user/userPost/" +
          this.$route.params.uid +
          "?currentPage=" +
          currentPage,
      })
        .then((res) => {
          if (res.data.code == 200) {
            const myData = res.data.data;
            console.log(myData);
            this.records = res.data.data.pagination.records;
            this.currentPage = res.data.data.pagination.currentPage;
            this.total = res.data.data.pagination.total;
            this.pageSize = res.data.data.pagination.pageSize;
          } else {
            this.$message.error(res.data.data.msg);
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
