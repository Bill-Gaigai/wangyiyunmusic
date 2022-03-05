<template>
  <div>
    <Navbar :activeTitle="activeTitle"></Navbar>
    <div class="main">
      <!-- 二级路由的挂载点 -->
      <router-view></router-view>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script type = "text/ecmascript-6">
import Tabbar from "../../components/Tabbar.vue";
import Navbar from "../../components/Navbar.vue";
export default {
  components: {
    Tabbar,
    Navbar,
  },
  data() {
    return {
      activeTitle: this.$route.meta.title, //默认情况下，当前页面的顶部的标题，等于当前路由的title值。
      list: [],
    };
  },
  watch: {
    $route() {
      //监听路由切换，侦听$route对象改变：将拿到的切换后的路由信息对象中的title，赋值给标题显示。
      this.activeTitle = this.$route.meta.title;
    },
  },
};
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>