<template>
  <div class="container" style="margin:0;width: 100%;padding-right:15px;">
    <div class="row h-100 ">
      <div class="col-3 h-100 list" v-scroll-bar>
        <ul class="userUl">
          <p style="padding: 2px 4px;height: 10px;">用户列表</p>
          <li
            v-for="item in userList"
            v-on:click="changeCurrentUser(item)"
            :class="{ active: item.id === currentUser.id }"
            class="my_li"
            
          >
            <div style="display: flex;justify-content: space-between">
              <div>
                <el-avatar
                  class="u_avatar"
                  :src="item.avatar"
                  :alt="item.username"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-avatar>
                <p class="u_name">{{ item.username }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="col-9 pt-4">
        <div class="w-100 chatbox">
          <h2 class="nameH2">{{ currentUser.username }}</h2>
          <!-- <hr style="margin: 0;" /> -->
          <!--消息列表-->
          <div>
            <ul class="list" v-scroll-bar>
              <div
                v-if="currentUser != null && currentUser.id != 0"
                v-for="item in sessions[
                  this.userInfo.id + '_' + this.currentUser.id
                ]"
              >
                <div v-if="item.fromId === userInfo.id">
                  <own-msg-item
                    :own-url="userInfo.avatar"
                    :msg-text="item.content"
                    :profile-id="userInfo.id"
                    :item="item"
                    style="float: right"
                  ></own-msg-item>
                </div>
                <div v-else>
                  <opposite-msg-item
                    :opposite-url="currentUser.avatar"
                    :msg-text="item.content"
                    :profile-id="currentUser.id"
                    :item="item"
                    style="float:left;"
                  ></opposite-msg-item>
                </div>
              </div>
            </ul>
          </div>
          <!--输入框-->
          <div class="msg-enter">
            <el-input
              resize="none"
              class="msg-input"
              type="textarea"
              :show-word-limit="true"
              :size="'20'"
              title="输入内容请在20字以内。"
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="input_content"
            >
            </el-input>
            <el-button
              @click.native="sendMsg"
              type="warning"
              class="send-msg-btn"
              round
              >发送</el-button
            >
          </div>
          <!--                </div>-->
        </div>
      </div>
    </div>
  </div>

  <!--测试滚动条-->
  <!--    <div class="list" v-scroll-bar>-->
  <!--        <ul>-->
  <!--            <li v-for="item in testSesstion">-->
  <!--                {{item.content}}-->
  <!--            </li>-->
  <!--        </ul>-->
  <!--    </div>-->
</template>

<script>
import { mapState } from "vuex";
import OppositeMsgItem from "../chat/OppositeMsgItem";
import OwnMsgItem from "../chat/OwnMsgItem";
export default {
  name: "ChatMe",
  components: {
    OppositeMsgItem,
    OwnMsgItem,
  },
  data() {
    const _this = this;
    return {
      userList: _this.$store.state.userList,
      currentUser: _this.$store.state.currentUser,
      input_content: "",
    };
  },

  methods: {
    //改变当前聊天对象
    changeCurrentUser(user) {
      this.currentUser = user;
      //获取与currentUser的私聊记录
      this.$store.commit("getSession", user.id);
    },
    //发送消息
    sendMsg() {
      let mesObj = new Object();
      mesObj.content = this.input_content;
      mesObj.toId = this.currentUser.id;
      mesObj.fromId = this.userInfo.id;
      mesObj.createTime = new Date();
      //提交私聊消息记录（保存到本地）
      this.$store.commit("addMessage", mesObj);
      //发送消息到服务端
      this.$store.state.ws.send(JSON.stringify(mesObj));
      //清空输入框
      this.input_content = "";
    },
  },
  created() {},
  computed: mapState(["sessions", "currentSession", "userInfo"]),
};
</script>

<style scoped>
.my_li {
  padding: 3px 10px;
  border-bottom: 1px solid #147dc8;
  /* border-left: 1px solid #9dadd1;
  border-right: 1px solid #9dadd1; */
  /* border-top: 1px solid #9dadd1; */

  border-radius: 2px;
  cursor: pointer;
  height: 40px;
  width: 150px;
  overflow: hidden;
  background-color: #ffffff;
  color: rgb(7, 28, 214);

  /* margin-bottom: 2px; */
}
.my_li:hover{
  background-color: #c7eaff;
}
.my_li:focus{
  background-color: #c7eaff;
}

ul {
  list-style-type: none;
}
.active {
  /*注意这个是.不是冒号:*/
  background-color: rgba(255, 255, 255, 0.1);
  background-color: #c7eaff;

}
.u_avatar {
  border-radius: 4px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.u_name {
  display: inline-block;
  margin-top: 0px;
  margin-left: 10px;
}

.list {
  position: relative;
  height: 360px;
  padding-left: 0px;
  padding-right: 0px;
}

.send-msg-btn {
  margin-top: 5px;
  float: right;
}
.chatbox {
  border: 1px #147dc8 solid;
  border-radius: 5px;
  /* background-color: #9dadd1; */
  /* margin-top: 30px; */
}
.container {
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: #147dc8;
}
.nameH2{
  text-align: center;background-color: #147dc8;color: #fff;margin-bottom: 0;
}
</style>
