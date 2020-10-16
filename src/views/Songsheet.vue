<template>
  <div class="songsheet">
    <div class="songsheet-aside">
      <div class="imgcontainer">
        <img :src="songsheet.picUrl" alt="">
      </div>
      <div class="songsheet-desc">
        歌单介绍
        <div class="songsheet-desccontent">
          {{songsheet.desc}}
        </div>
      </div>
    </div>
    <div class="container" style="padding-top: 1px;">
      <div class="songsheettitle">
        <div class="songsheetname">
          {{songsheet.name}}
        </div>
        <div class="songsheetupdateTime">
          {{songsheet.updateTime}}更新
        </div>
        <div class="songsheettagLists">
          <div class="tagitem"
            v-for="(tag, index) in songsheet.tagLists"
            :key=index>
            #{{tag.tagName}}
          </div>
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
      <footerCom></footerCom>
    </div>
  </div>
</template>

<script>
import footerCom from '@/components/footerCom.vue'
import axios from "axios"
export default {
  data() {
    return {
      songsheet: {},
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
  },
  components: {
    footerCom,
  },
  mounted() {
    let id = this.$route.query.id
    let path = "http://127.0.0.1:3400/"
    path += `playlist?id=${id}`
    let Getsongs = async (path) => {
      let res = await axios.get(path)
      this.songsheet = res.data.data
      this.songlist = res.data.data.list
      console.log('songsheet', this.songsheet)
      console.log('songlist', this.songlist)
    }
    let allMounted = async function() {
      await Getsongs(path)
      //desc换行
      let html = document.querySelector('.songsheet-desccontent').innerHTML
      document.querySelector('.songsheet-desccontent').innerHTML = html.replaceAll("\n", "<br>")
    }
    allMounted()
  }
}
</script>

<style lang="less">
.songsheet {
  color: #363636;
  .songsheet-aside {
    position: fixed;
    width: 300px;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    .imgcontainer {
      width: 200px;
      height: 200px;
      margin-top: 60px;
      text-align: center;
      img {
        width: 200px;
      }
    }
    .songsheet-desc {
      width: 200px;
      margin-top: 10px;
      font-size: 20px;
      font-weight: bold;
      .songsheet-desccontent {
        text-align: center;
        font-weight: normal;
        margin-top: 10px;
        font-size: 16px;
        color: #696969;
      }
    }
  }
  .container {
    position: relative;
    width: calc(100% - 300px);
    left: 300px;
    height: 100%;
    .songsheettitle {
      margin-top: 50px;
      .songsheetname {
        font-size: 25px;
        font-weight: bold;
      }
      .songsheetupdateTime {
        margin-left: 40px;
        margin-top: 10px;
        color: #696969;
      }
      .songsheettagLists {
        display: flex;
        .tagitem {
          margin: 10px 10px;
          color: @main-color;
          cursor: pointer;
        }
      }
    }
    .songsheet-buttonlist {
      margin: 20px 0;
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
}
</style>