<template>
  <div id="app">
    <navCom>
    </navCom>
    <router-view @audioPlay="audioPlay" @audioPlayAll="audioPlayAll"></router-view>
    <musiclistCom :currentmusic="currentmusic" :currentmusiclist="currentmusiclist"
      :key="currentmusiclist.length"
      v-on:clear-music="clearMusic"
      v-on:deleteList="deleteList"
      v-on:hide-list="hideList"
      v-show="islistShow">
    </musiclistCom>
    <audioCom :currentmusic="currentmusic" :currentmusiclist="currentmusiclist"
      :islike="islike" :playmode="playmode"
      v-on:musicend="musicEnd"
      v-if="JSON.stringify(currentmusic) != '{}'"
      v-on:add-like="addLike"
      v-on:remove-like="removeLike"
      :key="currentmusic.url">
    </audioCom>
  </div>
</template>

<script>
import navCom from '@/components/navCom.vue'
import audioCom from '@/components/audioCom.vue'
import musiclistCom from '@/components/audioCom/musiclistCom.vue'


export default {
  data() {
    return {
      currentmusic: {
      },
      currentmusiclist: [],
      islistShow: false,
      islike: false,
      playmode: "listplay",
      playmodelist: ["listplay", "loopplay", "singleloop", "randomplay"],
    }
  },
  computed: {
    nextmusicpos: function() {
      let pos = this.currentmusiclist.indexOf(this.currentmusic)
      let nextpos = pos + 1
      if (nextpos >= this.currentmusiclist.length) {
        nextpos = 0
      }
      return nextpos
    },
    previousmusicpos: function() {
      let pos = this.currentmusiclist.indexOf(this.currentmusic)
      let previouspos = pos - 1
      if (previouspos < 0) {
        previouspos = this.currentmusiclist.length - 1
      }
      return previouspos
    },
    nextmusic: function() {
      let nextpos = this.nextmusicpos
      return this.currentmusiclist[nextpos]
    },
    previousmusic: function() {
      let previouspos = this.previousmusicpos
      return this.currentmusiclist[previouspos]
    },
  },
  methods: {
    audioPlay: function(data) {
      this.currentmusic = data
      if (this.currentmusiclist.indexOf(this.currentmusic) == -1) {
        this.currentmusiclist.push(this.currentmusic)
      }
    },
    audioPlayAll: function(musiclist) {
      this.currentmusiclist = musiclist
      this.currentmusic = musiclist[0]
    },
    startPlay: function() {
      document.querySelector('audio').play()
    },
    previousPlay: function() {
      this.currentmusic = this.previousmusic
    },
    nextPlay: function(){
      this.currentmusic = this.nextmusic
    },
    musicEnd: function() {
      if (this.playmode == "listplay") {
        if (this.nextmusicpos != 0) {
          this.nextPlay()
        }
      } else if (this.playmode == "loopplay") {
        this.nextPlay()
      } else if (this.playmode == "singleloop") {
        this.startPlay()
      } else if (this.playmode == "randomplay") {
        let pos = parseInt(Math.random() * this.currentmusiclist.length)
        this.currentmusic = this.currentmusiclist[pos]
      }
    },
    clearMusic: function() {
      this.currentmusic = {}
      this.currentmusiclist = []
      this.islistShow = false
    },
    deleteList: function(checkedlist) {
        //列表翻转 从最后开始删除
        checkedlist.reverse()
        checkedlist.forEach((checkedindex) => {
        //如果列表中删除了当前音乐, 当前音乐先清空
        if (this.currentmusiclist[checkedindex] == this.currentmusic) {
          this.currentmusic = {}
        }
        //删除列表所选中音乐
        this.currentmusiclist.splice(checkedindex, 1)
      })
      //如果清空了当前音乐且列表不为空, 则列表第一首成为当前音乐
      if (JSON.stringify(this.currentmusic) == '{}' && JSON.stringify(this.currentmusiclist) != '[]') {
        this.currentmusic = this.currentmusiclist[0]
      }
    },
    hideList: function() {
      this.islistShow = false
    },
    getLikeList: function() {
      let likelist = JSON.parse(localStorage.getItem("musiclike"))
      return likelist
    },
    addLike: function() {
      let likelist = this.getLikeList()
      if (likelist == null) {
        likelist = []
      }
      likelist.push(this.currentmusic.id)
      localStorage.setItem('musiclike', JSON.stringify(likelist))    //存储
      this.islike = true
    },
    removeLike: function() {
      let likelist = this.getLikeList()
      likelist.splice(likelist.indexOf(this.currentmusic.id), 1)
      localStorage.setItem('musiclike', JSON.stringify(likelist))    //存储
      this.islike = false
    }
  },
  components: {
    navCom, audioCom, musiclistCom
  }
}
</script>

<style lang="less">
@import url("~@/style/initial.less");
html {
  height: 100%;
}
body {
  background-color: #eeeeee;
  font-family: PingFang SC,Arial,Microsoft YaHei,sans-serif;
  box-sizing: border-box;
  height: 100%;
}
#app {
  position: relative;
  min-width: 900px;
  max-width: 1400px;
  background-color: white;
  // overflow: hidden;
  height: 100%;
}
@media screen and (min-width:1400px ) {
  #app {
    margin: 0 auto;
    height: 100%;
    // overflow: hidden;
  }
  .nav, .audio{
    width: 1400px!important;
  }
}
</style>
