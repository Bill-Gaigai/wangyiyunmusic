<template>
  <div>
    <van-cell-group>
      <van-cell center :title="name" :label="song">
        <template #right-icon>
          <van-icon name="play-circle-o" size="0.6rem" @click="playClick" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script type = "text/ecmascript-6">
export default {
  props: {
    name: String,
    song: String,
    id: Number,
  },
  methods: {
    playClick() {
      this.$router.push({
        path: "/play",
        query: {
          id: this.id,
        },
      });
    },
  },
};
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped></style>