<template>
  <div>
    <!--class="nk-container"-->
    <Navbar active-index="8"></Navbar>

    <!--bootstrap的栏栅布局-->
    <div class="container">
      <div class="row">
        <!--侧边栏-->
        <div class="col-1"></div>
        <div class="col-2">
          <!--侧边栏-->
          <setting-tab
            :active-index="activeIndex"
            @selecttab="changeActiveIndex"
          ></setting-tab>
        </div>
        <div class="col-8">
          <!--个人资料设置-->
          <settingCom v-if="activeIndex == 1"></settingCom>
          <!--账号密码设置-->
          <safe-com v-if="activeIndex == 2"></safe-com>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import SettingTabCom from "../components/set/SettingTabCom";
import SettingCom from "../components/set/SettingCom";
import SafeCom from "../components/set/SafeCom";
export default {
  name: "Setting",
  components: {
    Navbar,
    settingTab: SettingTabCom,
    settingCom: SettingCom,
    safeCom: SafeCom,
  },
  data() {
    return {
      //头像网络资源地址
      uploadPath: this.$axios.defaults.baseURL,
      userInfo: "",
      isMine: false,
      likeCount: "",
      activeIndex: "1",
     
    };
  },
  methods: {
    fail(msg) {
      this.$message.error(msg);
    },
    changeActiveIndex(key) {
      console.log("父组件收到了：" + key);
      this.activeIndex = key;
    },
  },
  created() {},
};
</script>

<style scoped>
/*.myFlex{*/
/*    height: 100px;*/
/*}*/
.container{
  width: 60%;
  margin:auto;
  margin-top: 30px;

}
.myAvatar {
  width: 200px;
  height: 200px;
}

.setting-mian {
  margin-left: 20px;
}
</style>
