<template>
  <div>
    <!-- 顶部NavBar -->
    <van-nav-bar :title="activeTitle" class="VanNavBar" fixed> </van-nav-bar>
  </div>
</template>

<script type = "text/ecmascript-6">
export default {
  props: {
    activeTitle: String,
  },
};
</script>

<style scoped>
.VanNavBar {
  background-color: #c62f2f;
}
/* 该组件官网没有修改样式的选项，使用深度选择器完成修改 */
::v-deep .van-nav-bar__title {
  color: #fff;
  font-weight: 500;
  font-size: 20px;
}
</style>