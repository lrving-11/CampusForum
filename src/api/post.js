// 获取首页文章列表
export function getPostList(currentPage) {
  return this.$axios({
    method: "get",
    url: "/post/list?currentPage=" + currentPage + "&listMode=1",
  });
}
// 发布文章
export function postPublish(data) {
  return this.$axios({
    method: "post",
    url: "/post/publish",
    data,
  });
}
// 发文上传图片
export function postUploadImg(data) {
  return this.$axios({
    method: "post",
    url: "/post/uploadImg",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
// 文章详情
export function getPostDetail() {
  return this.$axios({
    method: "get",
    url: "/post/detail/" + this.$route.params.pid,
  });
}
// 添加评论
export function addComment(data) {
  return this.$axios({
    method: "post",
    url: "/comment/add",
    data,
  });
}
// 评论分页
export function getCommentList(data) {
  return this.$axios({
    method: "post",
    url: "/post/comment/list",
    data,
  });
}
// 点赞
export function like(data) {
  return this.$axios({
    method: "post",
    url: "/like",
    data,
  });
}
// 收藏
export function collect(path,data) {
  return this.$axios({
    method: "post",
    url: path,
    data,
  });
}