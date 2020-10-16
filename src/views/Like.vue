<template>
  <div class="home">
    <asideCom
      @toggle-aside="toggleAside"
      :class="{ asidehide: isAsidehide}"
      :isAsidehide = isAsidehide
      ></asideCom>
    <div class="container">
      <div class="like" style="padding-top: 1px;">
        <div class="songsheettitle">
          <div class="songsheetname">
            My LOVE
          </div>
        </div>
        <div class="songsheet-buttonlist">
          <div class="button-playall" @click="audioPlayAll">
            <img src="@/assets/play-white.png" alt="">
            <span>播放全部</span>
          </div>
        </div>
        <div class="songsheetlist">
          <div class="songsheet-listtitle">
            <div class="number">{{songlist.length}}首</div>
            <div class="name">歌曲</div>
            <div class="singer">歌手</div>
            <div class="album">专辑</div>
          </div>
          <div class="songsheet-listitem"
            v-for="(songitem, index) in songlist" :key="index"
            @mouseenter="showPlay" @mouseleave="hidePlay"
            @dblclick="audioPlay(index)">
            <div class="songsheet-songitem">
              <div class="number">
                <span>{{index + 1}}</span>
                <img @click="audioPlay(index)" class="hide" src="@/assets/play-blue.png" alt="">
              </div>
              <div class="name" @click="audioPlay(index)">{{songitem.name}}</div>
              <div class="singer">{{songitem.artists[0].name}}</div>
              <div class="album">{{songitem.album.name}}</div>
            </div>
            <div class="songsheet-songdesc">
              {{songitem.desc}}
            </div>
          </div>
      </div>
    </div>
      <footerCom></footerCom>
    </div>
  </div>
</template>

<script>
import asideCom from '@/components/asideCom.vue'
import footerCom from '@/components/footerCom.vue'
import axios from "axios"

export default {
  data() {
    return {
      isAsidehide: false,
      songlist: [],
    }
  },
  methods: {
    showPlay: function(event) {
      event.target.querySelector(".number span").classList.add('hide')
      event.target.querySelector(".number img").classList.remove('hide')
    },
    hidePlay: function() {
      event.target.querySelector(".number span").classList.remove('hide')
      event.target.querySelector(".number img").classList.add('hide')
    },
    audioPlay: function(index) {
      this.$emit('audioPlay', this.songlist[index])
    },
    audioPlayAll: function() {
      this.$emit('audioPlayAll', this.songlist)
    },
    toggleAside: function() {
      this.isAsidehide = !this.isAsidehide
      if (this.isAsidehide == true) {
        let asidewidth = "200px"
        document.querySelector('.container').style.width = `calc(100% - 50px)`
        document.querySelector('.container').style.left = "50px"
        document.querySelector('.homemain').style.width = "90%"
      } else {
        let asidewidth = "200px"
        document.querySelector('.container').style.width = `calc(100% - ${asidewidth})`
        document.querySelector('.container').style.left = `${asidewidth}`
        document.querySelector('.homemain').style.width = "100%"
      }
    },
  },
  mounted() {
    //修改侧边栏显示图片
    document.querySelector('.asidemylike').style.color = "#ffaebf"
    document.querySelector('.asidemylike img').src=require("@/assets/heart(1).png")
    //请求数据
    let Getsong = async (id) => {
      let path = "http://127.0.0.1:3400/"
      path += `song?id=${id}`
      let res = await axios.get(path)
      return res.data.data
    }
    let likelist = this.$root.$children[0].getLikeList()
    if (likelist != null) {
      likelist.forEach(async(element) => {
        let song = await Getsong(element)
        console.log('song', song)
        this.songlist.push(song)
      })
    }
    console.log('this,songlist', this.songlist)
  },
  components: {
    asideCom, footerCom
  }
}
</script>
<style lang="less">
.home {
  width: 100%;
  background-color: white;
  .container {
    position: relative;
    width: calc(~"100% - @{aside-width}");
    left: @aside-width;
    height: 100%;
  }
}
.asidehide {
  width: 30px!important;
}
.like {
  .songsheettitle {
    margin-top: 50px;
    margin-left: 30px;
    color: #ffaebf;
    .songsheetname {
      font-size: 35px;
      font-weight: bold;
    }
  }
  .songsheet-buttonlist {
    margin: 20px 30px;
    .button-playall {
      width: 150px;
      height: 50px;
      cursor: pointer;
      color: white;
      font-size: 20px;
      background-color: @main-color;
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
  .songsheetlist {
    .songsheet-listtitle {
      display: flex;
      height: 60px;
      width: 100%;
      align-items: center;
      border-bottom: 2px solid #ededed;
      margin-bottom: 20px;
      .number {
        width: 10%;
        text-align: center;
      }
      .name {
        padding-left: 15px;
        width: 45%;
      }
      .singer {
        padding-left: 15px;
        width: 20%;
      }
      .album {
        padding-left: 15px;
        width: 35%;
      }
    }
    .songsheet-listitem {
      display: flex;
      flex-direction: column;
      width: 100%;
      .songsheet-songitem {
        display: flex;
        height: 40px;
        align-items: center;
        .number {
          width: 10%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          img {
            width: 20px;
            height: 20px;
            cursor: pointer;
            border: 1px solid @main-color;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
        .name {
          width: 45%;
          padding: 0 10px;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .singer {
          width: 20%;
          padding: 0 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .album {
          width: 35%;
          padding: 0 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .songsheet-songdesc {
        padding: 10px 0;
        padding-left: 10%;
        color: #696969;
      }
    }
    .songsheet-listitem:nth-of-type(odd){
      background-color: #f7f7f7;
    }
    .songsheet-listitem:hover {
      background-color: #e8e9ed;
      color: @main-color;
    }
  }
}
</style>