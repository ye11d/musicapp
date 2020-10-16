<template>
  <div class="songsheetCom">
    <div class="songsheetlist" v-if="path=='song'">
      <div class="songsheet" @click="audioPlay(index)" v-for="(song, index) in songlist" :key=index>
        <img :src=song.picUrl alt="">
        <span class="songtitle" @click="audioPlay(index)">{{song.name}}</span>
      </div>
    </div>
    <div class="songsheetlist" v-else>
      <div class="songsheet" v-for="(song, index) in songlist" :key=index>
        <router-link :to="{path: path, query: {id: song.id}}">
        <img :src=song.picUrl alt="">
        </router-link>
        <router-link :to="{path: path, query: {id: song.id}}">
        <span class="songtitle">{{song.name}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  props: {
    url: String,
    path: String,
  },
  data() {
    return {
      songlist : []
    }
  },
  methods: {
    audioPlay: function(index) {
      console.log('song', this.songlist[index].picUrl)
      let picUrl = this.songlist[index].picUrl
      this.songlist[index]["album"] = {}
      this.songlist[index].album.picUrl = picUrl
      this.$root.$children[0].audioPlay(this.songlist[index])
    }
  },
  mounted() {
    let Getsongsheet = async (url) => {
      let newurl = "http://127.0.0.1:3400" + url
      console.log('请求数据之前url', url)
      let res = await axios.get(newurl)
      console.log('url', url, res.data.data)
      this.songlist = res.data.data.list
    }
    Getsongsheet(this.url)
  }
}
</script>

<style lang="less">
.songsheetlist {
  display: flex;
  flex-wrap: wrap;
  .songsheet {
    display: flex;
    width: 20%;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin: 10px 0;
    img {
      width: 90%;
      border-radius: 5px;
    } .songtitle {
      height: 10px;
      padding: 5px 0 5px 0;
      text-align: center;
      font-size: 12px;
    }
  }
  .songsheet:hover {
    cursor: pointer;
    .songtitle {
      color: red;
    }
  }
}
</style>