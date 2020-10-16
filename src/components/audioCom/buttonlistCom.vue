<template>
    <div class="audio-buttonlist">
        <button @click="previousPlay" class="left"></button>
        <button :class="[{start: start}, {pause:pause}]" @click="toggleplay"></button>
        <button @click="nextPlay" class="right"></button>
    </div>
</template>

<script>
export default {
  props: {
    start: Boolean,
    pause: Boolean,
  },
  methods: {
    toggleplay: function() {
      let audio = document.querySelector('audio')
      if(this.start) {
        audio.play()
      } else {
        audio.pause()
      }
    },
    previousPlay: function() {
      this.$root.$children[0].previousPlay()
    },
    nextPlay: function() {
      this.$root.$children[0].nextPlay()
    }
  },
  mounted(){
    this.audio = document.querySelector('audio')
  }
}
</script>

<style lang="less">

.audio-buttonitem, .audio-buttonitem:hover{
      width: 40px;
      height: 40px;
      border: none;
      outline: none;
      cursor: pointer;
      background-repeat: no-repeat;
      background-size: 20px 20px;
      background-position: center;
      background-color: white;
    }
.audio-buttonlist {
  display: flex;
  width: 150px;
  .left {
    .audio-buttonitem;
    flex: 1;
    background-image: url('~@/assets/back-black.png');
  }
  .left:hover{
    background-image: url('~@/assets/back-green.png');
  }
  .start {
  .audio-buttonitem;
    background-size: 40px 40px;
    background-image: url('~@/assets/play-white.png');
    background-color: @main-color;
    border-radius: 50%;
    margin: 0 10px;
  }
  .start:hover{
    background-image: url('~@/assets/play-green.png');
  }
  .pause {
  .audio-buttonitem;
    background-size: 20px 20px;
    background-image: url('~@/assets/pause-white.png');
    background-color: @main-color;
    border-radius: 50%;
    margin: 0 10px;
  }
  .pause:hover{
    background-image: url('~@/assets/pause-green.png');
  }
  .right {
  .audio-buttonitem;
    flex: 1;
    background-image: url('~@/assets/next-black.png');
  }
  .right:hover {
    background-image: url('~@/assets/next-green.png');
  }
}
</style>