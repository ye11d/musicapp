<template>
  <div class="home">
    <asideCom
      @toggle-aside="toggleAside"
      :class="{ asidehide: isAsidehide}"
      :isAsidehide = isAsidehide
      ></asideCom>
    <div class="container">
      <slideCom></slideCom>
      <homemainCom></homemainCom>
      <footerCom></footerCom>
    </div>
  </div>
</template>

<script>
import asideCom from '@/components/asideCom.vue'
import slideCom from '@/components/homeCom/slideCom.vue'
import homemainCom from '@/components/homeCom/homemainCom.vue'
import footerCom from '@/components/footerCom.vue'

export default {
  data() {
    return {
      isAsidehide: false,
    }
  },
  methods: {
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
    document.querySelector('.asidehome').style.color = "#409EFF"
    document.querySelector('.asidehome img').src=require("@/assets/home(1).png")
  },
  components: {
    slideCom, homemainCom, asideCom, footerCom
  }
}
</script>
<style lang="less">
.home {
  width: 100%;
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
</style>