<template>
  <div>
    <!--头部-->
    <navbar active-index="0"></navbar>
    <div class="main">
      <h3 class="title">忘记密码</h3>
      <div class="mymain">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm "
        >
          <el-form-item prop="email" label="邮箱">
            <el-input
              class="form-item"
              placeholder="请输入注册时的邮箱地址"
              aria-placeholder="请输入注册邮箱地址"
              v-model="ruleForm.email"
            ></el-input>
          </el-form-item>
          <el-form-item prop="verification" label="验证码">
            <el-input class="form-item" placeholder="请输入验证码">
              <el-button
                style="background-color: #409EFF;color:#fff;"
                slot="append"
                >获取验证码</el-button
              >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "Forget",
  components: {
    navbar: Navbar,
  },
  data() {
    return {
      ruleForm: {
        email: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入注册邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        verification: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //提交表单
          this.$axios({
            method: "post",
            url: "/user/forget",
            data: {
              email: this.ruleForm.email,
            },
          })
            .then((response) => {
              if (response.data.code == 200) {
                this.$message({
                  message: "已往您的邮箱处发送一封邮件，里面有你的新密码",
                  type: "success",
                });
                this.$router.push("/login");
              } else {
                this.$message.error(response.data.msg);
              }

              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("请正确填写邮箱！！！");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.main {
  height: 600px;
  width: 50%;
  margin: auto;
  background-color: #fff;
  margin-top: 20px;
  overflow: hidden;
  opacity: 0.9;
  border-radius: 20px;
}
.title {
  margin: 20px;
  /* text-align: center; */
}
.form-item {
  width: 300px;
}
</style>
