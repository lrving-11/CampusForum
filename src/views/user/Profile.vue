<template>
  <div class="nk-container">
    <!-- 头部 -->
    <Navbar active-index="8"></Navbar>
    <!-- 内容 -->
    <div class="main">
      <div class="container">
        <!-- 选项 -->
        <div class="position-relative">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link active" href="#">个人信息</a>
            </li>
            <li class="nav-item w">
              <router-link
                class="nav-link"
                :to="{ name: 'UserPosts', params: { uid: user.id } }"
                >文章</router-link
              >
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
        <!-- 个人信息 -->
        <div class="media mt-4">
          <!--头像-->
          <el-avatar :src="user.avatar" :size="80"></el-avatar>
          <div class="media-body">
            <h5 class="mt-0 text-warning">
              <!--用户名-->
              <span v-text="user.nickname" style="font-size: 20px;"></span>
              <!--关注按钮-->
              <button
                type="button"
                v-show="!isMine"
                @click="follow(user.id)"
                class="btn btn-info btn-sm float-right mr-5 follow-btn"
              >
                {{ hasFollowed ? "取消关注" : "关注TA" }}
              </button>
              <!--私聊按钮-->
              <button
                type="button"
                v-show="!isMine"
                @click="chat(user)"
                class="btn btn-info btn-sm float-right mr-5 follow-btn"
              >
                发消息
              </button>
            </h5>
            <el-tag
              style="font-size:18px;"
              size="small"
              type="danger"
              :class="getIcon"
            ></el-tag>
            <div class="text-muted mt-3">
              <span
                >注册时间 <i class="text-muted">{{ user.createTime }}</i></span
              >
            </div>
            <div class="text-muted mt-3 mb-5">
              <router-link
                :to="{ name: 'Followees', params: { uid: user.id } }"
              >
                <el-tag effect="dark"
                  >关注了
                  <i style="color: red;">{{ followeeCount }}</i> 人</el-tag
                >
              </router-link>
              <router-link
                class="ml-4"
                :to="{ name: 'Fans', params: { uid: user.id } }"
              >
                <el-tag effect="dark"
                  >粉丝数量：
                  <i style="color: red;">{{ followerCount }}</i> 人</el-tag
                >
              </router-link>

              <el-tag class="ml-4" effect="dark"
                >获得了 <i style="color: red;">{{ likeCount }}</i
                >个赞</el-tag
              >

              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserNavbar from "@/components/UserNavbar";
import Navbar from "@/components/Navbar";
import moment from "moment";

export default {
  name: "UserHome",
  components: {
    UserNavbar,
    Navbar,
  },
  data() {
    return {
      //头像网络资源地址
      uploadPath: this.$axios.defaults.baseURL,
      user: "",
      isMine: false,
      likeCount: "",

      hasFollowed: false,
      followeeCount: 0,
      followerCount: 0,
      gender: 0,
    };
  },
  created() {
    //请求用户主页信息
    console.log(this.$route.params.uid);
    console.log(this.$moment().format());
    //请求页面资源
    this.$axios({
      method: "get",
      url: "/user/profile/" + this.$route.params.uid,
    })
      .then((res) => {
        if (res.data.code == 200) {
          const myData = res.data.data;
          console.log(myData, "mydata");

          this.user = myData.user;
          this.gender = myData.user.sex;
          this.isMine = myData.isMine;
          this.likeCount = myData.likeCount;
          this.user.avatar = this.user.avatar;
          this.followeeCount = myData.followeeCount;
          this.followerCount = myData.followerCount;
          this.hasFollowed = myData.hasFollowed;
        } else {
          this.$message.error(res.data.msg);
        }
        console.log(res);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  computed: {
    getIcon() {
      return this.gender == 0 ? "el-icon-male" : "el-icon-female";
    },
  },
  methods: {
    handleExceed(file, fileList) {
      this.$message.error("只能上传一张图片");
    },
    uploadSuccess(response, file, fileList) {
      console.log(response);
      this.userInfo.avatar = response.msg;
      //更新用户个人信息
      this.$store.commit("setUserInfo", this.userInfo);
      //清除文件上传列表
      //this.$refs['upload'].clearFiles();
    },
    beforeUplaod(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isLt1M;
    },
    follow(entityId) {
      //要先登录才能关注或取消关注
      if (!this.$store.state.isLogin || this.$store.state.isLogin == "") {
        this.$message.error("要登录才能关注哦");
        return;
      }
      let path = this.hasFollowed ? "/unfollow" : "/follow";
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
            console.log(myData);
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
    chat(user) {
      //要先登录才能关注或取消关注
      if (!this.$store.state.isLogin || this.$store.state.isLogin == "") {
        this.$message.error("要登录才能发消息哦");
        return;
      }
      //设置消息页面的侧边栏索引
      this.$store.commit("setMsgActiveIndex", 5);
      //获取与对方的私聊记录
      this.$store.commit("getSession", user.id);
      //选中与对方聊天
      this.$store.commit("setCurrentUser", user);
      //跳转至聊天页面
      this.$router.push("/message");
    },
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      console.log(to.params.uid, from.params.uid);
      if (to.params.uid != from.params.uid) {
        console.log('butong');
        //变化后的操作
        // this.init(); //重新加载数据
        this.$router.go(0);
        // location.reload();
      }
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
  height: 45em;
  overflow: hidden;
  border-radius: 10px;
  opacity: 0.9;
}
.container {
  margin-top: 20px;
}
.myFlex {
  height: 400px;
}
.myAvatar {
  width: 200px;
  height: 200px;
}
.myBtn {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
