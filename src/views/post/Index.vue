<template>
  <div class="home">
    <navbar class="navbar" active-index="2"></navbar>
    <div class="block plist">
      <el-timeline style="margin-top: 20px;">
        <!--遍历博客-->
        <el-timeline-item
          :hide-timestamp="true"
          v-for="postVo in records"
          type="primary "
          icon="el-icon-more"
          size="large"
        >
          <el-card class="card" shadow="hover">
            <div class="cardin">
              <router-link
                class="nameLink"
                tag="div"
                :to="{ name: 'Profile', params: { uid: postVo.user.id } }"
              >
                <el-avatar :src="postVo.user.avatar"></el-avatar>
                <div class="nickname" v-text="postVo.user.nickname"></div>
              </router-link>
              <div class="cardRight">
                <h5>
                  <router-link
                    :to="{
                      name: 'PostDetail',
                      params: { pid: postVo.post.id },
                    }"
                  >
                    {{ postVo.post.title }}
                  </router-link>
                </h5>
                <!-- <el-image
                  style="width: 100px; height: 100px"
                  :src="url"
                  :fit="fit"
                ></el-image> -->
                <p>{{ postVo.post.content }}</p>
              </div>
            </div>
            <div class="d-flex" style="font-size: 16px;">
              <li class="mr-5">
                <i class="fa  fa-thumbs-o-up"></i> {{ postVo.post.likeCount }}
              </li>
              <li class="mr-5">
                <i class="el-icon-star-off"></i> {{ postVo.post.collectCount }}
              </li>
              <li>
                <i class="el-icon-chat-dot-round"></i>
                {{ postVo.post.commentCount }}
              </li>
            </div>
            <!-- <div class="p_tag">
              <el-tag v-show="postVo.post.type == 1" type="danger" effect="dark"
                >置顶</el-tag
              >
              <el-tag v-show="postVo.post.status == 1" type="''" effect="dark"
                >精选</el-tag
              >
              <el-tag effect="dark" size="medium" type="warning"
                >{{ postVo.post.likeCount }}赞</el-tag
              >
            </div> -->
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <!--分页，@current-change会把点击的页数传给方法-->
    </div>
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
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Index",
  components: {
    navbar: Navbar,
  },

  data() {
    return {
      // uploadPath: this.$axios.defaults.baseURL,
      records: [], //记录列表
      currentPage: 1, //当前页
      total: 0, //总数
      pageSize: 5, //页面大小
    };
  },
  //頁面首先加載第一頁
  created() {
    this.$axios.get("/post/list?currentPage=1").then((res) => {
      console.log(res, "index");
      this.records = res.data.data.records;
      this.currentPage = res.data.data.currentPage;
      this.total = res.data.data.total;
      this.pageSize = res.data.data.pageSize;
    });
  },
  methods: {
    page(currentPage) {
      this.$axios.get("/post/list?currentPage=" + currentPage).then((res) => {
        console.log(res);
        this.records = res.data.data.records;
        this.currentPage = res.data.data.currentPage;
        this.total = res.data.data.total;
        this.pageSize = res.data.data.pageSize;
      });
    },
  },
};
</script>

<style scoped>
/* .home { */
/* overflow: hidden; */
/* margin-top: 10px; */
/* width: 80%; */
/* height: 100vh; */
/* } */

.navbar {
  width: 100%;
}
.mpage {
  margin: 0 auto;
  text-align: center;
}
.plist {
  margin-top: 20px;
  width: 55%;
  margin: auto;
  opacity: 0.9;
}
.cardin {
  /* height: 13vh; */
  display: flex;
  /* justify-content: start; */
  /* align-items: center; */
}
.cardRight {
  width: 300px;
  margin-left: 20px;
}
.nameLink {
  color: #000;
  font-size: 14px;
  height: 70px;
  width: 50px;
  /* overflow: hidden; */
  /* text-overflow: ellipsis;
  white-space: nowrap; */
}
.nickname {
  width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.p_tag {
  float: right;
  margin-bottom: 10px;
}
</style>
