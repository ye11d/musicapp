<template>
  <div class="aside">
      <div class="toggleaside" @click="$emit('toggle-aside')" v-if="isAsidehide == false">
        <img class="left-hide" src="@/assets/left-hide.png" alt="">
      </div>
      <div class="toggleaside rightdiv" @click="$emit('toggle-aside')" v-if="isAsidehide">
        <img class="right-hide" src="@/assets/right-hide.png" alt="">
      </div>
      <div class="aside-container" v-if="isAsidehide == false">
        <div class="title">M U S I C</div>
        <div class="asidelist">
          <router-link to="/" class="asidehome asideitem">
            <img src="@/assets/home.png" alt="">
            首页
          </router-link>
          <!-- <div class="asiderecommend asideitem">
            <img src="@/assets/music.png" alt="">
            推荐
          </div> -->
          <router-link to="/search" class="asidesearch asideitem">
            <img src="@/assets/search.png" alt="">
            搜索
          </router-link>
          <router-link to="/like" class="asidemylike asideitem">
            <img src="@/assets/heart.png" alt="">
            我的喜爱
          </router-link>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ["isAsidehide"]
}
</script>

<style lang="less">
.aside {
  position: fixed;
  width: @aside-width;
  height: 100%;
  background-color: white;
  transform: translate(0, 0);
  border-right: 2px solid #f4f4f4;
  z-index: 5;
  .toggleaside {
    position: fixed;
    left: 170px;
    width: 30px;
    height: 100%;
    cursor: pointer;
    img {
      position: absolute;
      top: 35%;
      width: 30px;
      height: 30px;
    }
  }
  .rightdiv {
    left: 0;
  }
  .title {
    color: @main-color;
    text-align: center;
    font-size: 25px;
    height: 35px;
    margin: 10px 0;
  }
  .asidelist {
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    .asideitem {
      cursor: pointer;
      display: flex;
      height: 30px;
      justify-content: flex-start;
      align-items: center;
      margin: 15px 0;
    }
    img {
      width: 20px;
      height: 20px;
      margin-right: 20px;
    }
  }
}
</style>