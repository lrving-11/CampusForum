<template>
  <div>
    <div class="block plist">
      <el-timeline style="padding: 0;">
        <!--遍历博客-->
        <div v-for="msgVo in msgVos">
          <el-card shadow="hover" class="mb-1">
            <router-link
              :to="{ name: 'Profile', params: { uid: msgVo.fromUser.id } }"
            >
              <el-avatar :src="msgVo.fromUser.avatar"></el-avatar>
              <span style="font-size: 24px;" v-text="msgVo.fromUser.nickname"></span>
            </router-link>
            <router-link
              :to="{ name: 'PostDetail', params: { pid: msgVo.postId } }"
            >
              <h6>
                回复了你的<span
                  v-text="msgVo.entityType == 1 ? '评论' : '文章'"
                ></span>
              </h6>
              <span>回复内容：{{ msgVo.content }}</span>
            </router-link>
          </el-card>
        </div>
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
export default {
  name: "ReplyMe",
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      msgVos: {},
      total: 0,
    };
  },
  methods: {
    page(currentPage) {
      this.$axios
        .get("/message/reply?currentPage=" + currentPage)
        .then((res) => {
          if (res.data.code != 200) {
            this.$message.error(res.data.msg);

            return;
          } else {
            const data = res.data.data;
            this.msgVos = data.msgVos;
            this.total = data.total;
          }
        })
        .catch(function(error) {
          console.log(error);
          this.$message.error("网络故障");
        });
    },
  },
  created() {
    //提交表单
    this.$axios({
      method: "get",
      url: "/message/reply",
    })
      .then((res) => {
        if (res.data.code != 200) {
          this.$message.error(res.data.msg);
          return;
        } else {
          const data = res.data.data;
          this.msgVos = data.msgVos;
          this.total = data.total;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.mpage {
  margin: 0 auto;
  text-align: center;
}
.plist{
  width: 90%;
}
</style>
