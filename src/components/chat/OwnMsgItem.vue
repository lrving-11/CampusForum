<template>
  <div class="own-msg-item" @click="setRead">
    <!--        <span><a :href="/mine/ + this.item.fromId"><img :src="this.ownUrl"></a></span>-->
    
    <div class="r-top">
      <p class="msg-content">{{ msgText }}</p>
      <div class="time">{{ extime }}</div>
    </div>
    <span
      ><router-link :to="{ name: 'Profile', params: { uid: profileId } }"
        ><img :src="this.ownUrl"/></router-link
    ></span>
    
  </div>
</template>

<script>
// import moment from 'moment';
// import {setAlreadyRead} from "../../../network/auth";
// import JSONbig from "json-bigint";
// import {getEntityUserInfo} from "../../../network/auth";

import moment from "moment";

export default {
  name: "OwnMsgItem",
  data() {
    return {
      // info: JSON.parse(this.item.content),
      isRead: false,
      url: "",
    };
  },
  props: {
    item: {
      type: Object,
      default() {},
    },

    msgText: {
      type: String,
      default: "",
    },
    profileId: {
      type: Number,
    },
    ownUrl: {
      type: String,
    },
  },
  computed: {
    extime() {
      return moment(this.item.createTime).format("YYYY-MM-DD HH:mm:ss");
    },

    // bgc() {
    //   return this.isRead
    //     ? { "background-color": "#fff" }
    //     : { "background-color": "#bad0e9" };
    // },
  },
  methods: {
    setRead() {
      // 设置已读
      if (!this.isRead) {
        // let data = {
        //   messageId: this.item.id,
        // };
        // setAlreadyRead(data).then(res => {
        //     // alert(res.status)
        //     if (res.status == 200) {
        //         this.isRead = true;
        //     }
        // })
      }
    },
  },

  created() {
    // getEntityUserInfo(this.item.fromId).then(res => {
    //     this.url = res.data.avatarUrl;
    // });
  },
};
</script>

<style scoped>
.own-msg-item {
  width: 100%;
  position: relative;
  overflow: hidden;
  float: right;
  /* margin-left: 20px; */
  padding-top: 10px;
  padding-bottom: 10px;
  /*border-top: 1px solid #f0f0f0;*/
  /*background-color: #f6fbff;*/
  border-radius: 5px;
  padding-left: 70px;
  margin-right: 15px;
  display: flex;
  justify-content: end;
}

.own-msg-item .r-top {
  /* float: right;
  display: inline-block;
  position: relative;
  top: 4px;
  left: 12px;
  font-size: 15px;
  color: #333; */
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-end;
}

.own-msg-item img {
  float: right;
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: top;
  overflow: hidden;
}

.own-msg-item .user {
  margin: 0 5px 0 0;
  color: #333;
}

.own-msg-item .article {
  color: #3194d0;
}

.own-msg-item .r-top .time {
  /* float: right;
  margin-top: 62px;
  font-size: 12px;
  position: absolute;
  top: 66px;
  left: 396px;
  color: #969696;
  line-height: normal; */
  font-size: 12px;
  color: #969696;

}

.own-msg-item .msg-content {
  box-sizing: border-box;
  float: right;
  /* margin-right: 20px; */
  min-height: 39px;
  min-width: 50px;
  line-height: 39px;
  margin-top: -2px;
  margin-bottom: 0;
  background-color: #eee;
  padding: 1px 10px;
  border-color: #d9d9d9;
  border-radius: 4px 0 4px 4px;
}
</style>
