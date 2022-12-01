<template>
  <div>
    <navbar></navbar>
    <div class="main">
      <h3 class="title">立即创建你的账户吧</h3>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!--  form-item 的 prop对应的就是校验规则   -->
        <el-form-item label="用户名" prop="username">
          <el-input class="form-item" v-model="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input
            class="form-item"
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            class="form-item"
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-select v-model="ruleForm.gender" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="email" label="邮箱">
          <el-input class="form-item" v-model="ruleForm.email"></el-input>
        </el-form-item>

        <el-form-item prop="seccode" label="验证码" class="inputbar">
          <el-input
            class="form-item"
            v-model="ruleForm.seccode"
            style="margin-right: 5px;"
          ></el-input>
          <img
            @click="createCode"
            id="uploadCode"
            alt="code"
            src="http://172.30.192.192:8080/user/getCode"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "Register",
  components: {
    navbar: Navbar,
  },

  mounted() {
    this.createCode();
  },
  data() {
    /*
     * 回调函数，确认两次输入的密码正确
     * */
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      checkCode: "",
      ruleForm: {
        username: "",
        pass: "",
        checkPass: "",
        gender: "",
        email: "",
        seccode: "",
        codeUrl: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "blur",
          },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    createCode() {
      document.querySelector("#uploadCode").src =
        "http://172.30.192.192:8080/user/getCode?t=" + new Date().getTime();

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //提交表单
          this.$axios({
            method: "post",
            url: "/user/register",
            data: {
              username: this.ruleForm.username,
              passwd: this.ruleForm.pass,
              sex: this.ruleForm.gender,
              email: this.ruleForm.email,
              seccode: this.ruleForm.seccode,
            },
          })
            .then((res) => {
              console.log("registerRes", res);
              if (res.data.code == 200) {
                this.$message({
                  message:
                    "注册成功，已往您的邮箱处发送一封激活邮件，请点击链接激活您的账号",
                  type: "success",
                });
                this.$router.push("/login");
              } else {
                this.$message.error("error", res.data.msg);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("请正确填完你的表单！！！");
          return false;
        }
        console.log(document.cookie);

      });
    },
  },
};
</script>
<style scoped>
.main {
  height: 600px;
  width: 50%;
  /* border: 1px, solid, #000; */
  margin: auto;
  margin-top: 20px;
  background-color: #fff;
  overflow: hidden;
  opacity: .9;
  border-radius: 20px;
}
.title {
  margin: 20px;
  /* text-align: center; */
}
.vcode {
  /* flex: inherit; */
  /* margin-top: 20px; */
  border: rgb(159, 170, 221) solid 1px;
  border-radius: 3px;
  padding: 2px;
}
.form-item {
  width: 300px;
}
</style>
