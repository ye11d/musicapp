<template>
  <div class="homemain">
    <div class="listtitle">热门歌单</div>
    <songsheetCom :url="hotrecommend" path="songsheet"></songsheetCom>
    <div class="listtitle">最新歌单</div>
    <songsheetCom :url="newrecommend" path="songsheet"></songsheetCom>
    <div class="listtitle">最新专辑</div>
    <songsheetCom :url="newalbum" path="album"></songsheetCom>
    <div class="listtitle">新歌发布</div>
    <songsheetCom :url="newsong" path="song"></songsheetCom>
  </div>
</template>

<script>
import axios from "axios"
import songsheetCom from '@/components/homeCom/songsheetCom.vue'
export default {
  data() {
    return {
      hotrecommend: "/recommend/playlist",
      newrecommend: "/recommend/playlist?type=2",
      newalbum: "/new/albums?pageNo=2",
      newsong: "/new/songs",
    }
  },
  methods: {
    audioPlay: function(index) {
      console.log('传递了一层', index)
    }
  },
  components: {
    songsheetCom,
  },
}
</script>

<style lang="less">
.homemain {
  width: 100%;
  margin: 0 auto;
  background-color: white;
  .listtitle {
    border-top: solid 1px #f4f4f4;
    padding-top: 15px;
    margin-left: 10px;
    color: @main-color;
  }
}
</style>