<template>
  <div>
    <Navbar></Navbar>
    <div>
      <el-button type="danger" round @click="clearEs">重置Es库</el-button>
      <br />

      <el-form
        status-icon
        ref="ruleForm1"
        label-width="100px"
        class="demo-ruleForm "
      >
        <el-form-item label="用户ID">
          <el-input class="form-item" v-model="uid"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="deleteUser">删除用户</el-button>
        </el-form-item>
      </el-form>

      <el-form
        status-icon
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm "
      >
        <el-form-item label="用户ID">
          <el-input class="form-item" v-model="es_uid"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="resetEs">重新录入ES</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "Admin",
  components: {
    Navbar,
  },
  data() {
    return {
      uid: "",
      es_uid: "",
    };
  },
  methods: {
    clearEs() {
      this.$axios({
        method: "post",
        url: "/admin/clearEs",
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "es库清空完成",
              type: "success",
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteUser() {
      //提交表单
      this.$axios({
        method: "get",
        url: "/admin/deleteUser?uid=" + this.uid,
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetEs() {
      this.$axios
        .get("/admin/resetEs?uid=" + this.es_uid)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message:res.data.message,
              type: "success",
            });
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

<style scoped></style>
