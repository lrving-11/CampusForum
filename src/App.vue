<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// export default {
//   name: "app",
//   components: {},
// };
</script>

<style>
* {
  text-decoration: none;
}
body,
html {
  /* height: 100%; */
  /* background-color: #f7f8fa; */
  background-image: url(./assets/wallhaven-o5dqq9.jpg);
  background-attachment: fixed;
}
#app {
  width: 100%;
  height: 100%;
  margin: auto;
  /* background-color: #f7f8fa; */
  /* background-color: ; */
}
#app a:hover {
  text-decoration: none;
}
</style>
