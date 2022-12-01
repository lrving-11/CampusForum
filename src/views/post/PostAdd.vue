<template>
  <div>
    <navbar></navbar>
    <div class="main">
      <h1 style="margin: 20px;">{{ msg }}</h1>
      <div class="m-content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>

          <el-form-item label="内容" prop="content">
            <!--富文本编辑器-->
            <mavon-editor
              class="edit"
              v-model="ruleForm.content"
              ref="md"
              @imgAdd="imgAdd"
              @imgDel="imgDel"
              :toolbars="toolbars"
            ></mavon-editor>
            <!--<el-input type="textarea" :rows="20"   v-model="ruleForm.content"></el-input>-->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "PostAdd",
  components: {
    navbar: Navbar,
  },
  data() {
    return {
      // dialogImageUrl: "",
      // dialogVisible: false,
      // uploadData: {
      //   pid: "",
      // },
      // action: this.$axios.defaults.baseURL + "/post/upload",
      // myHeader: { TOKEN: sessionStorage.getItem("TOKEN") },
      tag: this.$route.params.tag,
      msg: this.$route.params.tag == 0 ? "提问" : "写文章",
      ruleForm: {
        title: "",
        content: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 2,
            max: 25,
            message: "长度在 3 到 25 个字符",
            trigger: "blur",
          },
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      //mavon-editor配置
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: false, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: false, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: false, // 下一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
        boxShadow: false,
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
            url: "/post/publish",
            data: {
              title: this.ruleForm.title,
              content: this.ruleForm.content,
              tag: 0,
            },
          })
            .then((res) => {
              if (res.data.code == 200) {
                /*//发表成功，根据返回的pid来上传图片
                    console.log(res.data.data)
                    _this.uploadData.pid = res.data.data;
                    //上传文件
                    _this.submitUpload();*/
                this.$message({
                  message: "发表成功",
                  type: "success",
                });
                this.$router.push("/");
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },

    //取消
    cancel() {
      this.$router.push("/");
    },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    // submitUpload() {
    //   console.log(this.$refs.upload);
    //   this.$refs.upload.submit();
    // },
    // beforeUpload(file) {
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   console.log("验证图片是否超过2M");
    //   if (!isLt2M) {
    //     this.$message.error("图片大小不能超过2M！！！");
    //     return false;
    //   }

    //   return isLt2M;
    // },
    // onChange(file, fileList) {
    //   fileList = fileList.filter((f) => this.isOver(f.size));
    //   console.log(fileList);
    // },
    // isOver(size) {
    //   return size / 1024 / 1024 < 2;
    // },

    //上传图片
    imgAdd(pos, file) {
      let formData = new FormData();
      formData.append("file", file);
      //上传文件
      this.$axios({
        method: "post",
        url: "/post/uploadImg",
        data: formData,
        headers: { "Content-Type": "multipart/form-data"},
      })
        .then((res) => {
          console.log(res,'img');
          // console.log(JSON.stringify(url))
          // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1.  通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           * 3. 由于vue运行访问的路径只能在static下，so，我就把图片保存到它这里了
           */
          this.$refs.md.$img2Url(pos, res.data.data);
        })
        .catch((error) =>{
          console.log(error);
        });
    },
    imgDel(pos) {
      console.log(pos[0]);
      let formdata = new FormData();
      formdata.append("url", pos[0]);
      //上传文件
      // this.$axios({
      //   method: "post",
      //   url: "/post/delimg",
      //   data: formdata,
      // })
      //   .then((res) => {
      //     if (res.data.code == 200) {
      //       this.error("删除图片成功");
      //     } else {
      //       this.error("删除图片失败:" + res.data.msg);
      //     }
      //   })
      //   .catch((error) => {
      //     this.error("删除图片失败:" + error);
      //   });
    },
  },
};
</script>

<style scoped>
.main {
  width: 70%;
  margin: 0 auto;
  background-color: #fff;
  margin-top: 30px;
  overflow: hidden;
}
.m-content {
  text-align: center;
  width: 95%;
  margin: auto;
  margin-top: 20px;
}
.edit {
  height: 500px;
}
</style>
