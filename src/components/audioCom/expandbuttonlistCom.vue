<template>
  <div class="expandbuttonlist">
		<volumeCom></volumeCom>
    <div class="playmode" @click="changePlayMode">
      <img src="@/assets/listplay.png" class="listplay" alt="" v-if="playmode=='listplay'">
      <img src="@/assets/singleloop.png" class="singleloop" alt="" v-else-if="playmode=='singleloop'">
      <img src="@/assets/randomplay.png" class="randomplay" alt="" v-else-if="playmode=='randomplay'">
      <img src="@/assets/loopplay.png" class="loopplay" alt="" v-else-if="playmode=='loopplay'">
    </div>
    <img class="musiclistimg" @click="toggleMusiclist" src="@/assets/musiclist.png" alt="">
  </div>
</template>

<script>
import volumeCom from '@/components/audioCom/volumeCom.vue'

export default {
  props: ["playmode"],
  methods: {
    toggleMusiclist: function(event) {
      this.$root.$children[0].islistShow = !this.$root.$children[0].islistShow
    },
    changePlayMode: function() {
      let playmodelist = this.$root.$children[0].playmodelist
      let pos = playmodelist.indexOf(this.$root.$children[0].playmode)
      let nextpos = pos + 1
      if (nextpos >= playmodelist.length) {
        nextpos = 0
      }
      this.$root.$children[0].playmode = playmodelist[nextpos]
    }
  },
	components: {
    volumeCom
  },
}
</script>

<style lang="less">
.expandbuttonlist {
  display: flex;
  align-items: center;
  .playmode {
    display: flex;
    height: 60px;
    align-items: center;
    margin-left: 25px;
    img {
      cursor: pointer;
      height: 25px;
      width: 25px;
      padding: 12.5px;
    }
    .listplay {
      height: 50px;
      width: 50px;
      padding: 0;
    }
  }
  .musiclistimg {
    cursor: pointer;
    margin-left: 25px;
    height: 40px;
    width: 40px;
  }
}
</style>>