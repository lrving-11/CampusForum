<template>
  <div class="nk-container">
    <!-- 头部 -->
    <Navbar></Navbar>

    <div class="main">
      <!--帖子内容-->
      <div class="container">
        <!--帖子标题-->
        <h3 class="mb-3 mt-2">
          <div v-text="postVo.post.title"></div>
          <!-- <div class="float-right">
            <button
              style="margin-right:5px;"
              v-if="this.$store.state.isLogin"
              type="button"
              class="btn btn-danger btn-sm"
              id="topBtn"
              :disabled="postVo.post.type == 1"
              @click="setTop"
            >
              置顶
            </button>
            <button
              style="margin-right:5px;"
              v-if="this.$store.state.isLogin"
              type="button"
              class="btn btn-danger btn-sm"
              id="wonderfulBtn"
              :disabled="postVo.post.status == 1"
              @click="setWonder"
            >
              加精
            </button>
            <button
              v-if="this.$store.state.isLogin"
              type="button"
              class="btn btn-danger btn-sm"
              id="deleteBtn"
              :disabled="postVo.post.status == 2"
              @click="setDelete"
            >
              删除
            </button>
          </div> -->
        </h3>

        <!-- 作者 -->
        <div class="media border-bottom">
          <!--用户头像-->
          <router-link
            :to="{ name: 'Profile', params: { uid: postVo.user.id } }"
          >
            <el-avatar size="large" :src="postVo.user.avatar"></el-avatar>
          </router-link>

          <div class="media-body">
            <!--用户名-->
            <router-link
              :to="{ name: 'Profile', params: { uid: postVo.user.id } }"
            >
              <div
                class="mt-0  text-warning userName"
                v-text="postVo.user.nickname"
              ></div>
            </router-link>
            <div class="text-muted mt-1">
              <i style="font-size:14px ;"
                >发布于{{ postVo.post.createTimeStr }}</i
              >
              <ul class="d-inline float-right">
                <li class="d-inline ml-2" @click="collect(postVo.post.id)">
                  <a href="javascript:;">
                    <el-tag
                      size="medium"
                      :effect="collectStatus == 0 ? 'light' : 'dark'"
                    >
                      收藏
                      <i class="el-icon-star-off"></i>
                      <i class="ml-2" v-text="postVo.post.collectCount"></i>
                    </el-tag>
                  </a>
                </li>
                <li class="d-inline ml-2"></li>
                <li
                  class="d-inline ml-2"
                  @click="
                    like(
                      $event.currentTarget,
                      1,
                      postVo.post.id,
                      postVo.post.userId,
                      postVo.post.id
                    )
                  "
                >
                  <a href="javascript:;">
                    <el-tag
                      size="medium"
                      :effect="likeStatus == 0 ? 'light' : 'dark'"
                    >
                      <!-- <i class="el-icon-thumb"></i> -->
                      {{ "赞 " }} <i class="fa  fa-thumbs-o-up"></i>
                      <i class="ml-2" v-text="postVo.post.likeCount"></i>
                    </el-tag>
                  </a>
                </li>
                <li class="d-inline ml-2"></li>
                <li class="d-inline ml-2">
                  <el-tag size="medium" type="success" effect="dark">
                    <b>
                      <a style="color: white;" href="#bottom">回帖 </a>
                      <i class="el-icon-chat-dot-round"></i>
                      <i class="ml-1" v-text="postVo.post.commentCount"></i
                    ></b>
                  </el-tag>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="markdown-body" v-html="postContent"></div>
        <br />
        <hr />
      </div>

      <!--评论列表-->
      <div class="container mt-3">
        <!-- 回帖数量 -->
        <div class="row">
          <div class="col-8">
            <el-tag
              class="mb-2 mt-2"
              style="margin-top: 10px;"
              type="success"
              effect="dark"
            >
              <b class="square"></b>
              <i v-text="postVo.post.commentCount"></i> 条回帖
              <i class="el-icon-chat-dot-round"></i>
            </el-tag>
          </div>
        </div>

        <!-- 回帖列表 -->
        <ul class="list-unstyled">
          <!--一级评论列表-->
          <li
            class="media pb-3 pt-3 border-bottom"
            v-for="commentVo in comments"
          >
            <!--用户头像-->
            <router-link
              :to="{ name: 'Profile', params: { uid: commentVo.user.id } }"
            >
              <el-avatar :src="commentVo.user.avatar"></el-avatar>
            </router-link>

            <div class="media-body">
              <div class="mt-0">
                <!--用户名-->
                <router-link
                  :to="{ name: 'Profile', params: { uid: commentVo.user.id } }"
                >
                  <span
                    class="font-size-12 text-success userName"
                    v-text="commentVo.user.nickname"
                  ></span>
                </router-link>
              </div>
              <!--评论内容-->
              <div class="mt-2" v-text="commentVo.comment.content"></div>
              <div class="mt-0 text-muted font-size-14">
                <!--发布时间-->
                <span style="font-size: 14px;"
                  >发布于 <i v-text="commentVo.comment.createTime"></i
                ></span>
                <ul class="d-inline float-right">
                  <!--点赞-->
                  <li
                    class="d-inline ml-2"
                    @click="
                      like(
                        $event.currentTarget,
                        2,
                        commentVo.comment.id,
                        commentVo.user.id,
                        postVo.post.id
                      )
                    "
                  >
                    <a class="acount" href="javascript:;">
                      <b
                        :style="
                          commentVo.comment.likeStatus == 0
                            ? 'color:#909399;'
                            : 'color:#409EFF;'
                        "
                      >
                        <i class="fa  fa-thumbs-o-up"></i>
                        <i class="count">{{ commentVo.comment.likeCount }}</i>
                      </b>
                    </a>
                  </li>
                  <li class="d-inline ml-2"></li>
                  <!--评论一级评论-->
                  <li class="d-inline ml-2">
                    <!--第1个参数是entityId，第2个参数是targetId-->
                    <a
                      v-b-toggle="'myReply' + commentVo.comment.id"
                      @click="ReplyData(commentVo.comment.id, 0)"
                      class="m-1"
                    >
                      <b>
                        <i class="el-icon-chat-dot-round"></i>
                        <i v-text="commentVo.replyCount"></i>回复
                      </b>
                    </a>
                  </li>
                </ul>
              </div>
              <!-- 二级评论列表 -->
              <ul class="list-unstyled mt-2 bg-gray pl-1 text-muted ulList2">
                <li
                  class="pb-1 pt-1 mb-2 border-bottom"
                  v-for="replyVo in commentVo.replies"
                >
                  <div>
                    <span v-if="replyVo.target == null">
                      <router-link
                        :to="{
                          name: 'Profile',
                          params: { uid: replyVo.user.id },
                        }"
                      >
                        <b class="text-info" v-text="replyVo.user.nickname"></b
                        >:&nbsp;&nbsp;
                      </router-link>
                    </span>
                    <span v-else>
                      <b class="text-info" v-text="replyVo.user.nickname"></b>
                      回复
                      <b class="text-info" v-text="replyVo.target.nickname"></b
                      >:&nbsp;&nbsp;
                    </span>
                    <!--回复内容-->
                    <span v-text="replyVo.reply.content"></span>
                  </div>
                  <div class="mt-0">
                    <!--回复时间-->
                    <i
                      style="font-size: 14px;"
                      v-text="replyVo.reply.createTime"
                    ></i>
                    <ul class="d-inline float-right">
                      <!--点赞-->
                      <li
                        class="d-inline ml-2"
                        @click="
                          like(
                            $event.currentTarget,
                            2,
                            replyVo.reply.id,
                            replyVo.user.id,
                            postVo.post.id
                          )
                        "
                      >
                        <a href="javascript:;">
                          <b
                            :style="
                              replyVo.reply.likeStatus == 0
                                ? 'color:#909399;'
                                : 'color:#409EFF;'
                            "
                          >
                            <i class="fa  fa-thumbs-o-up"></i
                            ><i v-text="replyVo.reply.likeCount"></i>
                          </b>
                        </a>
                      </li>
                      <!-- <li class="d-inline ml-2">|</li> -->
                      <!--回复二级评论-->
                      <li class="d-inline ml-2">
                        <!--第1个参数是entityId，第2个参数是targetId-->
                        <a
                          v-b-toggle="'myReply' + commentVo.comment.id"
                          @click="
                            ReplyData(commentVo.comment.id, replyVo.user.id)
                          "
                          class="m-1"
                          ><i class="el-icon-chat-dot-round"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <!-- 回复输入框 -->
                <b-collapse :id="'myReply' + commentVo.comment.id">
                  <li class="pb-3 pt-3">
                    <div>
                      <input
                        style="width: 100%; height: 40px"
                        type="text"
                        placeholder="回复字数不可超过100"
                        class="input-size"
                        v-model="replyContent"
                      />
                    </div>
                    <div class="text-lg-center mt-2">
                      <button
                        type="submit"
                        class="btn btn-primary btn-sm"
                        @click="replyTwo"
                      >
                        &nbsp;&nbsp;回&nbsp;&nbsp;复&nbsp;&nbsp;
                      </button>
                    </div>
                  </li>
                </b-collapse>
              </ul>
            </div>
          </li>
        </ul>
      </div>

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

      <!-- 回帖输入 -->
      <div id="bottom" class="myComment">
        <div style="height: 10px;"></div>
        <p style="text-align: center;">
          <textarea
            class="CommentInput"
            placeholder="在这里评论你的的看法吧,评论字数不可超过100"
            v-model="commentContent"
          ></textarea>
        </p>
        <p style="text-align: center;">
          <button
            style="width: 90%;"
            type="submit"
            class="btn btn-primary btn-sm"
            @click="commentPost()"
          >
            &nbsp;&nbsp;回&nbsp;&nbsp;帖&nbsp;&nbsp;
          </button>
        </p>
      </div>
    </div>
    <!--main 的div结束-->
  </div>
</template>

<script>
import "github-markdown-css/github-markdown.css";
import Navbar from "@/components/Navbar";
export default {
  name: "PostDetail",
  components: {
    Navbar,
  },
  data() {
    return {
      postVo: {},
      postContent: {},
      comments: {},
      pictures: {},
      entityType: "",
      entityId: "",
      commentUid: "",
      targetId: "",
      replyContent: "",
      commentContent: "",

      //帖子点赞状态
      likeStatus: 0,
      collectStatus: 0,

      //分页数据
      currentPage: 1,
      total: 0,
      pageSize: 5,
    };
  },
  created() {
    //提交表单
    this.$axios({
      method: "get",
      url: "/post/detail/" + this.$route.params.pid,
    })
      .then((res) => {
        console.log(res, "detailRes");
        this.postVo = res.data.data.postVo;
        this.postVo.post.title = res.data.data.postVo.post.title;

        //渲染成md效果
        var MardownIt = require("markdown-it");
        var md = new MardownIt();
        this.postContent = md.render(this.postVo.post.content);
        this.comments = res.data.data.comments;
        this.pictures = res.data.data.pictures;
        this.likeStatus = res.data.data.likeStatus;
        this.collectStatus = res.data.data.collectStatus;
        //分页数据
        this.total = res.data.data.postVo.post.commentCount;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    //评论帖子
    commentPost() {
      if (this.commentContent.length > 100) {
        // this.fail("评论字数不可超过100！");
        return;
      }
      this.$axios({
        method: "post",
        url: "/comment/add",
        data: {
          entityType: 1,
          entityId: this.$route.params.pid,
          targetId: 0,
          content: this.commentContent,
          postId: this.$route.params.pid,
        },
      })
        .then((res) => {
          this.commentContent = "";
          console.log(res);
          if (res.status == 200) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            //刷新页面
            this.$router.go(0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //回复二级评论
    replyTwo() {
      if (this.replyContent.length > 100) {
        // this.fail("回复字数不可超过100！");
        return;
      }
      if (this.$store.state.isLogin) {
        this.$axios({
          method: "post",
          url: "/comment/add",
          data: {
            entityType: 2,
            entityId: this.entityId,
            targetId: this.targetId,
            content: this.replyContent,
            postId: this.$route.params.pid,
          },
        })
          .then((res) => {
            this.replyContent = "";
            if (res.status == 200) {
              this.$message({
                message: res.data.msg,
                type: "success",
              });
              //刷新页面
              this.$router.go(0);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("您尚未登录，不能回复！");
      }
    },
    //确定被回复对象
    //第1个参数是entityId，第2个参数是targetId
    ReplyData(rId, rUid) {
      this.entityId = rId;
      this.targetId = rUid;
    },
    //评论分页
    page(currentPage) {
      this.$axios({
        method: "post",
        url: "/post/comment/list",
        data: {
          currentPage: currentPage,
          pid: this.$route.params.pid,
        },
      })
        .then((res) => {
          this.comments = res.data.data.records;
          this.currentPage = res.data.data.currentPage;
          this.total = res.data.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //点赞（$event.currentTarget传递的是dom元素本身）
    like(event, entityType, entityId, entityUserId, postId) {
      if (!this.$store.state.isLogin || this.$store.state.isLogin == "") {
        this.$message.error("要登录才能点赞哦");
        return;
      }
      //发送请求
      console.log(event, "event");
      this.$axios({
        method: "post",
        url: "/like",
        data: {
          entityType: entityType,
          entityId: entityId,
          entityUserId: entityUserId,
          postId: postId,
        },
      })
        .then((res) => {
          if (res.data.code == 200) {
            const myData = res.data.data;
            //更新帖子点赞数
            if (myData.entityType == 1) {
              console.log(myData.likeCount, "likecount");
              this.postVo.post.likeCount = myData.likeCount;
              this.likeStatus = myData.likeStatus;
            } else {
              // document.querySelector(".count").innerHTML = myData.likeCount;
              // document.querySelector(".acount").style =
              //   myData.likeStatus == 0 ? "color:#909399;" : "color:#409EFF;";
              //更新评论点赞数（直接操作dom元素）
              event.firstChild.firstChild.lastChild.innerHTML =
                myData.likeCount;
              event.firstChild.firstChild.style =
                myData.likeStatus == 0 ? "color:#909399;" : "color:#409EFF;";
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //置顶
    setTop() {
      // this.$axios.get("/post/top?id=" + this.postVo.post.id).then((res) => {
      //   console.log(res);
      //   if (res.data.code == 200) {
      //     this.postVo.post.type = 1;
      //   } else {
      //     this.$message.error(res.data.msg);
      //   }
      // });
    },
    //精选
    setWonder() {
      // this.$axios
      //   .get("/post/wonderful?id=" + this.postVo.post.id)
      //   .then((res) => {
      //     console.log(res);
      //     if (res.data.code == 200) {
      //       this.postVo.post.status = 1;
      //     } else {
      //       this.$message.error(res.data.msg);
      //     }
      //   });
    },
    //删除
    setDelete() {
      // this.$axios.get("/post/delete?id=" + this.postVo.post.id).then((res) => {
      //   if (res.data.code != 200) {
      //     this.$message.error(res.data.msg);
      //   } else {
      //     this.$router.push("/");
      //   }
      // });
    },
    //收藏
    collect(pid) {
      if (!this.$store.state.isLogin || this.$store.state.isLogin == "") {
        this.$message.error("要登录才能收藏哦");
        return;
      }
      //发送请求
      let path = this.collectStatus == 0 ? "/collect" : "/uncollect";
      this.$axios({
        method: "post",
        url: path,
        data: {
          entityId: pid,
          entityUserId: this.postVo.user.id,
        },
      })
        .then((res) => {
          if (res.data.code == 200) {
            const myData = res.data.data;
            // console.log(myData);
            //更新帖子收藏数
            this.postVo.post.collectCount = myData.collectCount;
            this.collectStatus = myData.collectStatus;
          } else {
            this.$message.error(res.data.msg);
          }
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
  /* background-color: #fff; */
  overflow: hidden;
  width: 50%;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 10px;
  opacity: 0.95;
}
.myComment {
  background-color: #fff;

  height: 200px;
  margin-left: 200px;
  margin-top: 20px;
  /* width: 60%; */
  margin: 0 auto;
  border-radius: 10px;
}

.CommentInput {
  width: 90%;
  height: 100px;
  /* height: 100%; */
  margin: 0 auto;
  text-align: center;
}

.mpage {
  margin: 0 auto;
  text-align: center;
}
.container {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}
.ulList2 {
  background-color: #e0f3fc;
  border-radius: 10px;
}
.userName {
  font-size: 20px;
}
</style>
