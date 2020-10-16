<template>
  <div class="musiclist">
    <div class="musiclist-container">
      <img class="close" @click="$emit('hide-list')" src="@/assets/close-red.png" alt="">
      <div class="tab">
        <div class="tabitem now select">正在播放</div>
      </div>
      <div class="songlist" v-if="islistEdit">
        <div class="songitem" v-for="(music, index) in currentmusiclist" :key="index">
          <label :for="`checkbox${index}`" class="song select" v-if="currentmusic == music">
            <div class="number">
              <input class="checkbox" :id="`checkbox${index}`" type="checkbox" :value=index>
            </div>
            <div class="title">{{music.name}}</div>
            <div class="singer">{{music.artists[0].name}}</div>
          </label>
          <label :for="`checkbox${index}`" class="song" v-else>
            <div class="number">
              <input class="checkbox" :id="`checkbox${index}`" type="checkbox" :value=index>
            </div>
            <div class="title">{{music.name}}</div>
            <div class="singer">{{music.artists[0].name}}</div>
          </label>
        </div>
      </div>
      <div class="songlist" v-else>
        <div class="songitem" v-for="(music, index) in currentmusiclist" :key="index">
          <div class="song select" v-if="currentmusic == music">
            <div class="number">
              <img @click="audioToggle" src="@/assets/pause-new.png" alt="">
            </div>
            <div class="title">{{music.name}}</div>
            <div class="singer">{{music.artists[0].name}}</div>
          </div>
          <div class="song" v-else
            @mouseenter="showPlay" @mouseleave="hidePlay"
            @click="audioPlay(music)">
            <div class="number">
              <span>{{index+1}}</span>
              <img class="hide" src="@/assets/play-blue.png" alt="">
            </div>
            <div class="title">{{music.name}}</div>
            <div class="singer">{{music.artists[0].name}}</div>
          </div>
        </div>
      </div>
      <div class="bottom" v-if="islistEdit">
        <div class="number">
          共{{currentmusiclist.length}}首
        </div>
        <div class="edit">
          <div class="cancel" @click="hideEdit">取消</div>
          <div class="editlist" @click="deleteList">删除</div>
          <div class="clear" @click="$emit('clear-music')">清空</div>
        </div>
      </div>
      <div class="bottom" v-else>
        <div class="number">
          共{{currentmusiclist.length}}首
        </div>
        <div class="edit">
          <div class="editlist" @click="showEdit">编辑列表</div>
          <div class="clear" @click="$emit('clear-music')">清空</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentmusic", "currentmusiclist"],
  data() {
    return {
      islistEdit: false,
    }
  },
  methods: {
    showEdit: function() {
      this.islistEdit = true
    },
    hideEdit: function() {
      this.islistEdit = false
    },
    showPlay: function(event) {
      event.target.querySelector(".number span").classList.add('hide')
      event.target.querySelector(".number img").classList.remove('hide')
    },
    hidePlay: function() {
      event.target.querySelector(".number span").classList.remove('hide')
      event.target.querySelector(".number img").classList.add('hide')
    },
    audioPlay: function(music) {
      this.$root.$children[0].audioPlay(music)
    },
    audioToggle: function() {
      if (document.querySelector('audio').paused) {
        document.querySelector('audio').play()
      } else {
        document.querySelector('audio').pause()
      }
    },
    deleteList: function() {
      let checkedlist = []
      document.querySelectorAll('input').forEach(function(element) {
        if (element.checked == true) {
          element.checked = false //清除√
          checkedlist.push(element.value)
        }
      })
      this.islistEdit = false
      this.$emit('deleteList', checkedlist)
    }
  }
}
</script>

<style lang="less">
.musiclist {
  position: fixed;
  width: 550px;
  height: 500px;
  z-index: 15;
  bottom: 70px;
  margin-left: 55%;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0,0,0,.1);
  color: #4a4a4a;
  .musiclist-container {
    width: 500px;
    margin: 0 auto;
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 30px;
      border: 1px solid red;
      cursor: pointer;
    }
    .tab {
      display: flex;
      height: 50px;
      align-items: center;
      margin-top: 10px;
      .tabitem {
        padding-bottom: 5px;
      }
      .now {
        margin-right: 15px;
      }
      .select {
        color: @main-color;
        border-bottom: 3px solid @main-color;
      }
    }
    .songlist {
      height: 360px;
      margin: 0 auto;
      overflow: auto;
      .song {
        display: flex;
        height: 45px;
        line-height: 45px;
        position: relative;
        div {
          display: inline-block;
        }
        .number {
          text-align: center;
          width: 45px;
          cursor: pointer;
          img, input{
            height: 25px;
            width: 25px;
            vertical-align: middle;
          }
        }
        .title {
          width: 200px;
          padding-left: 20px;
          margin-right: 50px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .singer {
          width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .like {
          position: absolute;
          left: 0;
        }
        .delete {
          position: absolute;
          right: 0;
        }
      }
      .select {
        color: @main-color;
      }
      .song:hover {
        background-color: #f4f4f4;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      height: 70px;
      align-items: center;
      .edit {
        display: flex;
        color: @main-color;
        cursor: pointer;
        .editlist {
          margin: 0 20px;
        }
      }
    }
  }
}
@media screen and (min-width:1400px ) {
  .musiclist {
    margin-left: 850px;
  }
}
</style>