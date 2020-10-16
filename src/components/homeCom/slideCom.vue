<template>
  <div class="slide">
    <transition name="allimg">
    <div class="currentimg-column" :key=rightTransition>
        <!-- <a :key=currentindex :href=slidelist[currentindex].slidea> -->
        <!-- </a> -->
      <div class="leftimg"
        @mouseenter="leftopacityChange"
        v-on:mouseleave="leftopacityReset"
        @click="lastImg"
        v-bind:style="{backgroundImage: 'url(' +slidelist[previousindex].slidesrc+')'}">
      </div>
      <img class="currentimg  horizontal-center" :src=slidelist[currentindex].slidesrc>
      <div class="rightimg"
        @mouseenter="rightopacityChange"
        v-on:mouseleave="rightopacityReset"
        @click="nextImg"
        v-bind:style="{backgroundImage: 'url(' +slidelist[nextindex].slidesrc+')'}">
      </div>
    </div>
    </transition>
    <div class="buttonlist horizontal-center">
      <div class="button"
        :class="{current: index===currentindex}"
        v-for="(slideitem, index) in slidelist"
        v-bind:key="index"
        @click="changeCurrentimg(index)"
        >
      </div>
    </div>
    <img @mouseenter="leftopacityChange" @click="lastImg" class="vertical-center leftbutton" src="@/assets/left-white.png">
    <img @mouseenter="rightopacityChange" @click="nextImg" class="vertical-center rightbutton" src='@/assets/right-white.png'>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slidelist:[{
        slidesrc: require("@/assets/slide/slide1.jpg"),
      },
      {
        slidesrc: require("@/assets/slide/slide2.jpg"),
      },
      {
        slidesrc: require("@/assets/slide/slide3.jpg"),
      },
      {
        slidesrc: require("@/assets/slide/slide4.png"),
      },
      {
        slidesrc: require("@/assets/slide/slide5.jpg"),
      }],
      currentindex: 0,
      sliderun: "",
      wait: "",
      leftTransition: true,
      rightTransition: true
    }
  },
  computed: {
    previousindex : function() {
      let previousindex = this.currentindex - 1
      if (previousindex < 0) {
        return this.slidelist.length - 1
      } else {
        return previousindex
      }
    },
    nextindex: function() {
      let nextindex = this.currentindex + 1
      if (nextindex == this.slidelist.length){
        return 0
      } else {
        return nextindex
      }
    },
  },
  methods: {
    lastImg: function() {
      this.currentindex = this.previousindex
      this.leftTransition = !this.leftTransition
      this.slideWait()
    },
    nextImg: function() {
      this.currentindex = this.nextindex
      this.rightTransition = !this.rightTransition
      this.slideWait()
    },
    changeCurrentimg: function(index) {
      this.currentindex = index
      this.slideWait()
    },
    slideRun: function() {
      var sliderun = setInterval(() => {
        this.rightTransition = !this.rightTransition; //触发动画
        this.currentindex = this.nextindex
      }, 5000);
      this.sliderun = sliderun
    },
    slideStop: function() {
      console.log('sliderun', this.sliderun, "wait", this.wait)
      clearInterval(this.sliderun)
      clearTimeout(this.wait)
    },
    slideWait: function() {
      this.slideStop()
      var wait = setTimeout(() => {
        this.slideRun()
      }, 10000);
      this.wait = wait
    },
    leftopacityChange: function() {
      document.querySelector('.leftimg').style.opacity = 0.9
    },
    rightopacityChange: function() {
      document.querySelector('.rightimg').style.opacity = 0.9
    },
    leftopacityReset: function() {
      document.querySelector('.leftimg').style.opacity = 0.7
    },
    rightopacityReset: function() {
      document.querySelector('.rightimg').style.opacity = 0.7
    }
  },
  mounted() {
    this.slideRun()
  }
}
</script>

<style lang="less">
@slidewidth: 600px;
@slideheight: 350px;

.slide {
  height: @slideheight;
  overflow: hidden;
  position: relative;
  img {
    width: @slidewidth;
    height: @slideheight;
  }
  .currentimg-column {
    width: 100%;
    height: @slideheight;
    position: absolute;
    img {
      z-index: 1;
    }
  }
  .buttonlist {
    bottom: 0;
    z-index: 2;
    .button {
      display: inline-block;
      cursor: pointer;
      margin-right: 10px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: white;
    }
    .current {
      background-color: @main-color;
      cursor: inherit;
    }
  }
  .leftbutton, .rightbutton {
    width: 100px;
    height: 100px;
    cursor: pointer;
  }
  .leftbutton {
    left: 100px;
    opacity: 0.5;
  }
  .rightbutton {
    right: 100px;
    opacity: 0.5;
  }
  .leftimg, .rightimg {
    cursor: pointer;
    position: absolute;
    width: @slidewidth;
    height: @slideheight;
    background-size: @slidewidth @slideheight;
    opacity: 0.7;
    top: 0;
  }
  .leftimg {
    left: 0;
  }
  .rightimg {
    right: 0;
  }
}


//动画
.allimg-leave {
  right: 0;
  opacity: 0.5;
}
.allimg-leave-active {
  transition: all 1.5s;
}
.allimg-leave-to {
  right: calc(~"50% - @{slidewidth}/2");
  opacity: 0.3;
}
.allimg-enter {
  right: calc(~"@{slidewidth}/2 - 50%");
  opacity: 0.7;
}
.allimg-enter-active {
  transition: all 1.5s;
}
.allimg-enter-to {
  right: 0;
  opacity: 1;
}
</style>