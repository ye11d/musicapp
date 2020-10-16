<template>
  <div class="home">
    <asideCom
      @toggle-aside="toggleAside"
      :class="{ asidehide: isAsidehide}"
      :isAsidehide = isAsidehide
      ></asideCom>
    <div class="container">
      <div class="search">
        <div class="searchtitle">
          搜索
        </div>
        <div class="searchmain">
          <select name="" id="">
            <option value="song" selected>歌曲</option>
            <!-- <option value="playlist">歌单</option> -->
          </select>
          <input @keyup.enter="searchStart" class="searchinput" type="text">
          <div class="searchbutton" @click="searchStart">
          </div>
        </div>
      </div>
      <div class="searchSong" style="padding-top: 1px;" v-if="number != 0">
        <div class="songsheettitle">
          <div class="songsheetname">
            搜索结果
          </div>
        </div>
        <div class="songsheet-buttonlist">
          <div class="button-playall" @click="audioPlayAll">
            <img src="@/assets/play-white.png" alt="">
            <span>播放当前页全部</span>
          </div>
        </div>
        <div class="songsheetlist">
          <div class="songsheet-listtitle">
            <div class="number">{{number}}首</div>
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
      <div class="pagelist" v-if="songpagenum != 0">
        <div class="previouspage" @click="previoussearch" v-if="pageNo!=1">上一页</div>
        <div class="nextpage" @click="nextsearch" v-if="pageNo != songpagenum">下一页</div>
        <div class="songpagenum">{{pageNo}}/{{songpagenum}}页</div>
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
      number: 0,
      pageNo: 1,
    }
  },
  computed: {
    songpagenum: function() {
      if (this.number % 20 == 0) {
        return (this.number/20)
      } else {
        return (parseInt(this.number/20) + 1)
      }
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
    axiosGet: async function(path) {
      let res = await axios.get(path)
      return res
    },
    setSongs: function(res) {
      this.songlist = res.data.data.list
      this.number = res.data.data.total
    },
    search: async function() {
      let type = document.querySelector('select').value
      let keyword = document.querySelector('.searchinput').value
      let pageNo = this.pageNo
      let path = `http://127.0.0.1:3400/search?type=${type}&keyword=${keyword}&pageNo=${pageNo}`
      let res = await this.axiosGet(path)
      if (type == "song") {
        this.setSongs(res)
      } else if (type == "playlist"){

      }
    },
    searchStart: function(pageNo) {
      this.pageNo = 1
      this.search()
    },
    previoussearch: function() {
      this.pageNo -= 1
      this.search()
    },
    nextsearch: function() {
      this.pageNo += 1
      this.search()
    },
  },
  mounted() {
    //修改侧边栏显示图片
    document.querySelector('.asidesearch').style.color = "#409EFF"
    document.querySelector('.asidesearch img').src=require("@/assets/search-blue.png")
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
.search {
  width: 90%;
  margin: 30px auto;
  .searchtitle {
    font-size: 30px;
    color: @main-color;
  }
  .searchmain {
    display: flex;
    select {
      width: 120px;
      border: 1px solid #a4a4a4;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      padding-left: 20px;
    }
    input {
      flex: 1;
      border: 1px solid #a4a4a4;
      padding: 0 25px;
    }
    .searchbutton {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border: 1px solid #a4a4a4;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      background-image: url("~@/assets/search.png");
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center;
    }
    select:focus, input:focus{
      border: 2px solid @main-color;
    }
    .searchbutton:hover {
      border: 1px solid @main-color;
    }
  }
}
.searchSong {
  border-top: 2px solid #ededed;
  .songsheettitle {
    display: inline-block;
    margin-top: 50px;
    margin-left: 30px;
    color: @main-color;
    .songsheetname {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .songsheet-buttonlist {
    display: inline-block;
    margin: 0 30px;
    .button-playall {
      width: 230px;
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
.pagelist {
  display: flex;
  margin: 20px 20px;
  align-items: center;
  .previouspage, .nextpage {
    margin: 0 10px;
    padding: 5px;
    border: 1px solid black;
    cursor: pointer;
  }
}
</style>