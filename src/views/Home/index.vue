<template>
  <div>
    <div class="title">
      <p>推荐歌单</p>
    </div>
    <!-- 两端对齐 -->
    <van-row type="flex" justify="space-between" gutter="6">
      <van-col
        span="8"
        v-for="obj in list"
        :key="obj.id"
        @click="playClickRecommend(obj.id)"
      >
        <van-image
          width="100%"
          height="3rem"
          fit="cover"
          position="left"
          :src="obj.picUrl"
        />
        <p class="song_name">{{ obj.name }}</p>
      </van-col>
    </van-row>
    <div class="title">
      <p>最新音乐</p>
    </div>
    <SongItem
      v-for="obj in NewMusicList"
      :key="obj.id"
      :name="obj.name"
      :song="obj.song.artists[0].name + ' - ' + obj.name"
      :id="obj.id"
    ></SongItem>
  </div>
</template>

<script type = "text/ecmascript-6">
// 引入网络请求封装的模块
import { recommendMusicAPI, newMusicAPI } from "@/api/index.js";
import SongItem from "../../components/SongItem.vue";
export default {
  components: {
    SongItem,
  },
  data() {
    return {
      list: [],
      NewMusicList: [],
    };
  },
  methods: {
    // 获取推荐音乐的数据
    async getList() {
      const res = await recommendMusicAPI();
      this.list = res.data.result;
    },
    // 获取最新音乐的数据
    async getNewMusicList() {
      const res1 = await newMusicAPI();
      this.NewMusicList = res1.data.result;
    },
    // 播放推荐歌单
    playClickRecommend(inde) {
      // this.$router.push({
      //   path: "/play",
      //   query: {
      //     id: inde,
      //   },
      // });
      console.log(inde);
    },
  },
  created() {
    this.getList();
    this.getNewMusicList();
  },
};
</script>

<style  scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 12px !important;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>