<template>
  <!--侧边栏-->
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :collapse="false"
    >
      <el-menu-item index="1">
        <i class="fa fa-comment"></i>
        <span slot="title" class=""
          > 回复我的
          <span
            class="badge badge-danger"
            v-text="replyCount"
            v-if="replyCount != 0"
          ></span>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="fa  fa-thumbs-up"></i>
        <span slot="title"
          > 收到的赞
          <span
            class="badge badge-danger"
            v-text="likeCount"
            v-if="likeCount != 0"
          ></span>
        </span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="fa fa-heart"></i>
        <span slot="title"
          > 新粉丝
          <span
            class="badge badge-danger"
            v-text="followCount"
            v-if="followCount != 0"
          ></span>
        </span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="fa fa-bell"></i>
        <span slot="title"
          > 系统通知
          <span
            class="badge badge-danger"
            v-text="systemCount"
            v-if="systemCount != 0"
          ></span>
        </span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="fa fa-comments"></i>
        <span slot="title"> 我的消息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "MessageTabCom",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      this.$store.commit('setMsgActiveIndex',key)
      this.$emit("selecttab", key);
    },
  },
  data() {
    return {
      followCount: 0,
      replyCount: 0,
      likeCount: 0,
      systemCount: 0,
    };
  },
  //组件参数
  props: {
    activeIndex: {
      type: String,
      default: "1",
      required: true, //在使用组件一定传值
    },
  },
  created() {
    //提交表单
    this.$axios({
      method: "get",
      url: "/message/list",
    })
      .then((res) => {
        const data = res.data.data;
        if (result.code == 200) {
          this.followCount = data.followCount;
          this.replyCount = data.replyCount;
          this.likeCount = data.likeCount;
          this.systemCount = data.systemCount;
        } else {
          this.$message.error(res.data.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped></style>
