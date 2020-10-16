<template>
  <div class="audio">
    <audio @pause="audioPause" @play="audioPlay" @ended="$emit('musicend')" @canplay="getDuration" @timeupdate="timeChange" :src="currentmusic.url"></audio>
    <processCom></processCom>
    <processbuttonCom :class="{processbuttonChange: processbuttonChange}" @mousedown.native="mousedown" @mouseenter.native="showTime">
      <div class="time" :class="{hide: hide}">
        {{stringNow}}/{{stringDuration}}
      </div>
    </processbuttonCom>
    <div class="main">
      <div class="music">
        <img :src="currentmusic.album.picUrl" alt="">
        <div class="item">
          <span class="title">{{currentmusic.name}}</span>
          <br>
          <span class="singer">{{currentmusic.artists[0].name}}</span>
        </div>
        <img class="islike" @click="$emit('remove-like')" src="@/assets/heart(1).png" v-if="islike" :key="currentmusic.id">
        <img class="islike" @click="$emit('add-like')" src="@/assets/like.png" v-else :key="currentmusic.id">
      </div>
      <buttonlistCom v-bind:start=start v-bind:pause=pause></buttonlistCom>
      <expandbuttonlistCom v-bind="$attrs" v-on="$listeners"></expandbuttonlistCom>
    </div>
  </div>
</template>

<script>
function formatTime(time){
  let t = ""
  if(time > -1){
    var min = Math.floor(time/60) % 60
    var sec = time % 60
    t += min + ":"
    if(sec < 10){t += "0"}
    t += parseInt(sec)
  }
  return t
}

import processCom from '@/components/audioCom/processCom.vue'
import processbuttonCom from '@/components/audioCom/processbuttonCom.vue'
import buttonlistCom from '@/components/audioCom/buttonlistCom.vue'
import expandbuttonlistCom from '@/components/audioCom/expandbuttonlistCom.vue'

export default {
  props: ["currentmusic", "currentmusiclist", "islike"],
  data() {
    return {
      //仅用于view 修改css
      start: true,
      pause: false,
      nowtime: 0,
      duration: 0,
      hide: true,
      processbuttonChange: false,
    }
  },
  computed: {
    stringNow: function() {
      return formatTime(this.nowtime)
    },
    stringDuration: function(){
      return formatTime(this.duration)
    },
    ProcessNow: function(){
      return parseFloat((this.nowtime / this.duration) * width)
    }
  },
  methods: {
    audioPause: function() {
      this.start = true
      this.pause = false
      document.querySelector(".expandbuttonlist .musiclistimg").src = require("@/assets/musiclist.png")
    },
    audioPlay: function() {
      this.start = false
      this.pause = true
      document.querySelector(".expandbuttonlist .musiclistimg").src = require("@/assets/musiclist(1).png")
    },
    getDuration: function(){
      let audio = document.querySelector('audio')
      this.duration = audio.duration
    },
    timeChange: function(event, ProcessNow, pause=false) {
      let audio = document.querySelector('audio')
      this.nowtime = audio.currentTime //把当前播放的时间存储到computed中,方便显示
      //计算进度条的位置
      let width = document.querySelector('.Process').clientWidth //进度条总长度
      if(ProcessNow == undefined){
        var ProcessNow = parseFloat((audio.currentTime / audio.duration) * width);
      } else {
        audio.currentTime = ProcessNow * audio.duration / width
        if (pause) {
          audio.pause()
        } else {
          audio.play()
        }
      }
      let ProcessNowWidth = `${ProcessNow}px`
      let ProcessButtonWidth = `${-7+ProcessNow}px`
      document.querySelector(".ProcessNow").style.width = ProcessNowWidth
      document.querySelector(".ProcessButton").style["margin-left"] = ProcessButtonWidth
    },
    processChange: function(event) {
      // console.log('点击进度条', event.target)
      this.showTime()
      let x = event.clientX - document.querySelector('.Process').getBoundingClientRect().x
      this.timeChange(event, x)
    },
    mousedown: function(event) {
      // console.log('按下按钮', event.target)
      document.querySelector('body').addEventListener('mouseup', this.mouseup)
      document.querySelector('body').addEventListener('mousemove', this.mousemove)
    },
    mousemove: function(event) {
      // console.log('移动')
      this.showTime()
      let audio = document.querySelector('audio')
      let x = event.clientX - document.querySelector('.Process').getBoundingClientRect().x
      this.timeChange(event, x, true)
      document.querySelector('body').addEventListener('mouseup', this.mouseup)
    },
    mouseup: function(event) {
      // console.log('松开')
      let audio = document.querySelector('audio')
      audio.play()
      document.querySelector('body').removeEventListener('mousemove', this.mousemove)
      document.querySelector('body').removeEventListener('mouseup', this.mouseup)
    },
    showTime: function() {
      this.processbuttonChange = true
      this.hide = false
		},
		hideTime: function() {
      this.processbuttonChange = false
		  this.hide = true
    },
  },
  mounted() {
    //渲染audio时修改heart图片
    document.querySelector('audio').play()
    let likelist = this.$root.$children[0].getLikeList()
    if (likelist != null) {
      for (let i = 0; i < likelist.length; i++) {
        if (likelist[i] == this.$root.$children[0].currentmusic.id) {
          this.$root.$children[0].islike = true
          break;
        } else {
          this.$root.$children[0].islike = false
        }
      }
    }
  },
  components: {
    processCom, processbuttonCom, buttonlistCom, expandbuttonlistCom
  },
}

</script>

<style lang="less">
.audio {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  z-index: 20;
  transform:translate(0,0);
  .processbuttonChange {
    top: -9px;
    color: white;
    width: 65px;
    height: 14px;
    padding: 3px;
    border-radius: 10px;
    background-image: none;
    background-color: @main-color;
    opacity: 0.8;
    .time {
      font-size: small;
      text-align: center;
      user-select: none;
      white-space: nowrap;
      opacity: 1;
      background-color: @main-color;
    }
  }
  .main {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .music {
      display: flex;
      align-items: center;
      width: 300px;
      img {
        width: 60px;
        height: 60px;
      }
      .item {
        margin-left: 5px;
        width: 240px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .title {
          font-size: 12px;
          margin-bottom: 5px;
        }
        .singer {
          font-size: 12px;
          color: #b4b4b4;
        }
      }
      .islike {
        cursor: pointer;
        margin-left: 20px;
        width: 30px;
        height: 30px;
      }
    }
    .buttonlist {
      justify-content: center;
    }
    .expandbuttonlist {
      width: 200px;
    }
  }
}



</style>
