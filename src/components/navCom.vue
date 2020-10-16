<template>
  <div class="navheight">
    <div class="nav">
      <div class="musiclogo">
        <img src="@/assets/music-white.png" alt="">
      </div>
      <div class="musictitle">
        <span class="cn">音 乐</span>
        <span class="en">M U S I C</span>
      </div>
      <div class="navlist">
        <router-link to="/">发现音乐</router-link>
        <router-link to="/like">我的音乐</router-link>
      </div>
   </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="less">
.navheight {
  position: relative;
  height: 50px;
  z-index: 10;
}
.nav {
  position: fixed;
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: white;
}
.musiclogo {
  background-color: @main-color;
  width: 35px;
  height: 35px;
  border-radius: 7px;
  margin-left: 20px;
  img {
    width: 25px;
    height: 25px;
    margin: 5px;
  }
}
.musictitle {
  color: @main-color;
  text-align: center;
  width: 60px;
  height: 35px;
  display: flex;
  flex-direction: column;
  .cn {
    font-size: 16px;
  }
  .en {
    font-size: 8px;
  }
}
.navlist {
  margin-left: 30px;
  a {
    font-size: 16px;
    margin: 0 10px;
  }
}
</style>
