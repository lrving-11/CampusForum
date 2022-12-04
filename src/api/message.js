// 获取关注消息
export function getMessageFollow() {
  return this.$axios({
    method: "get",
    url: "/message/follow",
  });
}
// 分页-获取关注消息
export function getMessageFollowPage(page) {
  return this.$axios({
    method: "get",
    url: "/message/follow?currentPage=" + page,
  });
}
// 获取点赞消息
export function getMessageLike() {
  return this.$axios({
    method: "get",
    url: "/message/like",
  });
}
// 分页-获取点赞消息
export function getMessageLikePage(page) {
  return this.$axios({
    method: "get",
    url: "/message/like?currentPage=" + page,
  });
}
// 获取回复消息
export function getMessageReply() {
  return this.$axios({
    method: "get",
    url: "/message/reply",
  });
}
// 分页-获取回复消息
export function getMessageReplyPage(page) {
  return this.$axios({
    method: "get",
    url: "/message/reply?currentPage=" + page,
  });
}
/**
 * 
 * 系统消息--待定
 */
// 获取系统消息
export function getMessageSystem() {
  return this.$axios({
    method: "get",
    url: "/message/system",
  });
}
// 分页-获取系统消息
export function getMessageSystemPage(page) {
  return this.$axios({
    method: "get",
    url: "/message/system?currentPage=" + page,
  });
}
// 获取消息导航提示消息列表
export function getMessageList() {
  return this.$axios({
    method: "get",
    url: "/message/list",
  });
}
// store
// 获取用户列表
export function getUserList() {
  return this.$axios({
    method: "get",
    url: "/message/getUsers",
  });
}
// 获取聊天记录
export function getSession(data) {
  return this.$axios({
    method: "post",
    url:  "/message/getSession",
    data,
  });
}