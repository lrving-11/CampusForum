<template>
  <div>
    <el-card>
      <div>
        <h3>头像</h3>
        <el-image :src="userInfo.avatar" class="myAvatar">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
        <el-upload
          ref="upload"
          class="upload-demo"
          :action="avatarAction"
          :headers="myHeader"
          accept=".jpg,.jpeg,.JPG,.JPEG,.PNG,.png"
          :on-success="uploadSuccess"
          :before-upload="beforeUplaod"
          :show-file-list="false"
          :on-exceed="handleExceed"
          list-type="picture"
        >
          <el-button size="small" type="success">修改头像</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件,且不超过1M
          </div>
        </el-upload>
      </div>
    </el-card>
    <el-card class="mt-3">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        :rules="rules"
        label-width="50px"
        class="demo-ruleForm form w-75"
      >
        <el-form-item label="昵称" prop="nickname">
          <el-input class="form-item" v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="ruleForm.gender" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SettingCom",
  data() {
    return {
      //头像网络资源地址
      // uploadPath: this.$axios.defaults.baseURL,
      userInfo: {
        avatar: "",
      },
      isMine: false,
      likeCount: "",

      //头像上传地址
      //头像上传地址
      avatarAction: this.$axios.defaults.baseURL + "/user/uploadImg",
      myHeader: { TOKEN: sessionStorage.getItem("TOKEN") },
      ruleForm: {
        nickname: "",
        gender: "",
      },
      rules: {
        nickname: [
          { required: true, message: "请设置昵称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
    };
  },
  created() {
    // const this = this;
    //请求页面资源
    this.getuser();
    this.userInfo = this.$store.state.userInfo;
  },
  methods: {
    getuser() {
      this.$axios({
        method: "get",
        url: "/user/getInfo",
      })
        .then((res) => {
          if (res.data.code == 200) {
            console.log(res, "userinfo-set");
            // this.userInfo = this.$store.state.userInfo;

            this.ruleForm.nickname = res.data.data.nickname;
            this.ruleForm.gender = res.data.data.sex == 0 ? "男" : "女";
          } else {
            this.$message.error(res.data.msg);
            this.router.push("/login");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitForm() {
      this.$axios({
        method: "post",
        url: "/user/updateOther",
        data: {
          nickname: this.ruleForm.nickname,
          sex: this.ruleForm.gender,
        },
      })
        .then((res) => {
          if (res.data.code == 200) {
            console.log(res, "修改other");
            this.userInfo = this.$store.state.userInfo;
            this.$message.success("修改成功");
            this.getuser()
          } else {
            // this.$message.error(res.data.msg);
            // this.router.push("/login");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleExceed(file, fileList) {
      this.$message.error("只能上传一张图片");
    },
    uploadSuccess(response, file, fileList) {
      console.log(response, "uploadimg");
      this.userInfo.avatar = response.data;
      //更新用户个人信息
      this.$store.commit("setUserInfo", this.userInfo);
      //强制页面重新渲染
      this.$forceUpdate();
    },
    beforeUplaod(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isLt1M;
    },
  },
};
</script>

<style scoped>
.myAvatar {
  width: 200px;
  height: 200px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
