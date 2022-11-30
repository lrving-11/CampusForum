export function login(data) {
  return this.$axios({
    method: "post",
    url: "/user/login",
    data,
  });
}
export function register(data) {
  return this.$axios({
    method: "post",
    url: "/user/register",
    data,
  });
}
export function forget(data) {
  return this.$axios({
    method: "post",
    url: "/user/forget",
    data,
  });
}
export function getUserInfo(data) {
  return this.$axios({
    method: "get",
    url: "/user/getInfo",
  });
}
// 获取收藏的文章
export function getCollection() {
  return this.$axios({
    method: "get",
    url: "/collection/" + this.$route.params.uid,
  });
}
// 分页-获取收藏的文章
export function getCollectionPage(page) {
  return this.$axios({
    method: "get",
    url: "/collection/" + this.$route.params.uid + "?currentPage=" + page,
  });
}
// 获取关注列
export function getFollow() {
  return this.$axios({
    method: "get",
    url: "/followees/" + this.$route.params.userId,
  });
}
// 分页-获取关注列
export function getFollowPage(page) {
  return this.$axios({
    method: "get",
    url: "/followees/" + this.$route.params.uid + "?currentPage=" + page,
  });
}
// 获取粉丝列
export function getFans() {
  return this.$axios({
    method: "get",
    url: "/fans/" + this.$route.params.userId,
  });
}
// 分页-获取关注列
export function getFansPage(page) {
  return this.$axios({
    method: "get",
    url: "/fans/" + this.$route.params.uid + "?currentPage=" + page,
  });
}
// 获取个人信息
export function getProfile() {
  return this.$axios({
    method: "get",
    url: "/user/profile/" + this.$route.params.uid,
  });
}
// 关注
export function follow(path,data) {
  return this.$axios({
    method: "post",
    url: path,
    data,
  });
}
// 获取用户文章列
export function getUserPost() {
  return this.$axios({
    method: "get",
    url: "/user/userPost/" + this.$route.params.uid,
  });
}
// 分页-获取用户文章列
export function getUserPostPage(page) {
  return this.$axios({
    method: "get",
    url: "/user/userPost/" + this.$route.params.uid+ "?currentPage=" + page,
  });
}