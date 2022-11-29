<template>
  <div>
    <Navbar active-index="3"></Navbar>

    <div class="block plist">
      <el-timeline style="margin-top: 20px;">
        <!--遍历博客-->
        <el-timeline-item
          :timestamp="postVo.post.createTimeStr"
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
                <span v-text="postVo.user.username"></span>
              </router-link>
              <div class="cardRight">
                <h5>
                  <!--跳转到另一个组件，带参数-->
                  <!--:to="{name: 'BlogDetail', params: {blogId: post.id}}-->
                  <!--跳转到另一个组件，带参数-->
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
</template>

<script>
import Navbar from "../../components/Navbar.vue";
export default {
  name: "Hot",
  components: {
    Navbar,
  },
  data() {
    return {
      uploadPath: this.$axios.defaults.baseURL,
      picturePath: "http://47.115.88.155",
      records: {},
      currentPage: 1,
      total: 0,
      pageSize: 5,
    };
  },
  methods: {
    page(currentPage) {
      this.$axios
        .get("/post/list?currentPage=" + currentPage + "&listMode=1")
        .then((res) => {
          console.log(res);
          this.records = res.data.data.records;
          this.currentPage = res.data.data.currentPage;
          this.total = res.data.data.total;
          this.pageSize = res.data.data.pageSize;
        });
    },
  },
  //頁面首先加載第一頁
  created() {
    this.$axios.get("/post/list?currentPage=1&listMode=1").then((res) => {
      console.log(res);
      this.records = res.data.data.records;
      this.currentPage = res.data.data.currentPage;
      this.total = res.data.data.total;
      this.pageSize = res.data.data.pageSize;
    });
  },
};
</script>

<style scoped>
.mpage {
  margin: 0 auto;
  text-align: center;
}
.plist {
  margin-top: 10px;
  width: 55%;
  margin: auto;
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
  font-size: 18px;
}
.p_tag {
  float: right;
  margin-bottom: 10px;
}
</style>
