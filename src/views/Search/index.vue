<template>
  <div>
    <van-search
      shape="round"
      placeholder="请输入搜索关键词"
      v-model="value"
      @input="inputClick"
    />

    <!-- 热词搜索 -->
    <!-- v-if="searchResultList.length === 0" 如果搜索结果的列表数据为0，就把热词的选框显示出来，不然就把搜索结果的列表显示出来-->
    <div class="search_wrap" v-if="searchResultList.length === 0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 每个搜索关键词 -->
        <span
          class="hot_item"
          v-for="(obj, index) in hotSearchList"
          :key="index"
          @click="hotKeyClick(index)"
          >{{ obj.first }}</span
        >
      </div>
    </div>

    <!-- 热词结果 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-else
    >
      <SongItem
        v-for="obj in searchResultList"
        :key="obj.id"
        :name="obj.al.name"
        :song="obj.ar[0].name + obj.al.name"
        :id="obj.id"
      ></SongItem>
    </van-list>
  </div>
</template>

<script type = "text/ecmascript-6">
// 互斥显示的思路：利用最佳匹配的结果长度来判断，使用v-if和v-show
// 当最佳匹配的结果等于0 ，说明没有匹配到结果，热词搜索正常显示。否则就是匹配到结果，则隐藏热词搜索，显示最佳匹配的结果
import { hotSearchAPI, searchResultListAPI } from "@/api/index.js";
import SongItem from "../../components/SongItem.vue";
export default {
  components: {
    SongItem,
  },
  data() {
    return {
      value: "",
      hotSearchList: [],
      searchResultList: [],

      finished: false, //未加载全部
      loading: false, //控制加载中的状态，只有是false才能触底后自动触发onload方法
      page: 1, //声明一个变量，默认page的值是1，第一页

      timer: null, //定义防抖的定时器
    };
  },
  methods: {
    // 热词搜索的数据请求
    async getHotSearchList() {
      const res = await hotSearchAPI();
      // console.log(res);
      this.hotSearchList = res.data.result.hots;
    },

    // 搜索结果的数据请求
    async getsearchResultList() {
      return await searchResultListAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20, //代表每次发送请求，请求数据的条数
      });
    },

    //难点：async修饰的函数，默认返回一个全新的Promise对象，
    //这个Promise对象的结果，就是async函数内return的值
    //总结：=======async函数返回的值，就是函数内部return出去的结果=====

    // 点击热词，赋值给搜索框
    async hotKeyClick(index) {
      this.page = 1; //重新点击热搜关键词获取数据，页码从1开始
      this.finished = false; //点击新的热搜关键词，把“没有更多”去掉，重新加载数据
      this.value = this.hotSearchList[index].first;

      //console.log(this.getsearchResultList()); //此处拿到一个Promise对象
      const res = await this.getsearchResultList();
      this.searchResultList = res.data.result.songs;
      this.loading = false;
    },

    // 手动向搜索框中输入数据，显示列表
    // 手动删除搜索框的数据，如果搜索框的数据长度0，则默认无数据显示，将this.searchResultList清空
    async inputClick() {
      this.page = 1; //重新输入热搜关键词获取数据，页码从1开始

      this.finished = false; //输入新的热搜关键词，把“没有更多”去掉，重新加载数据

      if (this.value.length === 0) {
        this.searchResultList = [];
        return;
      }
      const res = await this.getsearchResultList();
      if (res.data.result.songs === undefined) {
        this.searchResultList = [];
        return;
      }
      this.searchResultList = res.data.result.songs;
      this.loading = false;
    },

    // 触底加载更多的函数
    async onLoad() {
      this.page++;
      const res = await this.getsearchResultList();
      // 如果当数据为undefined，则将finished改为true
      if (res.data.result.songs === undefined) {
        this.finished = true;
        this.loading = false;
        return;
      }
      this.searchResultList = [
        ...this.searchResultList,
        ...res.data.result.songs,
      ]; //将一开始的20条数据，和后来的20条数据，全部卸到原地，拼在一起，展示出来
      this.loading = false; //再次加载完成后（触底），让loading继续是false，就可以继续调用onLoad事件，再次加载。
    },
  },
  created() {
    this.getHotSearchList();
    this.getsearchResultList();
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>