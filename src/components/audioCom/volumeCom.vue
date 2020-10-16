<template>
  <div class="volume">
    <div class="volumeUp" @click="toggleVolume" :class="{volumeOff: volumeOff}">
    </div>
    <div class="volumeProcess" @mousedown.capture.stop="mousedown">
      <div class="volumeProcessAll"></div>
      <div class="volumeProcessNow" :style="{width: volumeWidth}">
        <div class="volumeProcessButton" :class="{changeButton: volumeOff}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
		return {
			volumeOff: false,
		}
  },
  computed: {
    volumeWidth: function() {
      let volume = this.getVolume()
      let width = (volume * 80) + "px"
      return width
    }
  },
  methods: {
    toggleVolume: function() {
      if (this.volumeOff) {
        let volume = this.getVolume()
        if (volume == 0) {
          this.saveVolume(0.5)
          this.changeVolume({}, 40)
        } else {
          this.setVolumeView(volume)
        }
      } else {
        console.log('关闭音量')
        this.setVolumeView(0)
      }
    },
    mousedown: function() {
      //按下时绑定监听
      document.querySelector('body').addEventListener('mouseup', this.mouseup)
      document.querySelector('body').addEventListener('mousemove', this.mousemove)
    },
    mouseup: function() {
      //松手解绑 + change
      let x = event.clientX - document.querySelector('.volumeProcess').getBoundingClientRect().x
      console.log('松手', x)
      let volume = this.changeVolume(event, x)
      this.saveVolume(volume)
      document.querySelector('body').removeEventListener('mousemove', this.mousemove)
      document.querySelector('body').removeEventListener('mouseup', this.mouseup)
    },
    mousemove: function() {
      //移动时change
      let x = event.clientX - document.querySelector('.volumeProcess').getBoundingClientRect().x
      let volume = this.changeVolume(event, x)
      document.querySelector('body').addEventListener('mouseup', this.mouseup)
    },
    changeVolume: function(event, x) {
      if (x < 0) {
        x = 0
      } else if (x > 80) {
        x = 80
      }
      let width = `${x}px`
      //修改显示
      document.querySelector(".volumeProcessNow").style.width = width
      //计算音量返回
      let volume = x / 80
      document.querySelector('audio').volume = volume
      this.setVolumeView(volume)
      return volume
    },
    saveVolume: function(volume) {
      localStorage.setItem('volume', volume)
    },
    getVolume: function() {
      let volume = localStorage.getItem('volume')
      if (typeof(Number(volume)) === "number" && (Number(volume) >= 0) && (Number(volume) <= 1)) {
        return Number(volume)
      } else {
        localStorage.setItem('volume', 1)
        return 1
      }
    },
    setVolume: function(volume) {
      document.querySelector('audio').volume = volume
    },
    setVolumeView: function(volume) {
      //获取volume
      if (volume == null) {
        var volume = this.getVolume()
      }
      //修改volume图标显示
      if (volume == 0){
        this.volumeOff = true
      } else {
        this.volumeOff = false
      }
      //载入volume
      this.setVolume(volume)
    }
  },
  mounted() {
    //载入后读取localstorage的数据并存入组件data 如没有则设置localstorage
    this.setVolumeView()
  }
}
</script>

<style lang="less">
.volume {
  display: flex;
  justify-content: center;
}
.volumeUp {
	width: 20px;
	height: 20px;
	background-image: url("~@/assets/volume-up.png");
  background-size: 20px 20px;
  margin-right: 5px;
}
.volumeOff {
	background-image: url("~@/assets/volume-off.png");
}

.volumeProcess {
  position: relative;
	.volumeProcessAll {
		width: 80px;
    height: 2px;
    margin: 9px 0;
		cursor: pointer;
    background-color: #cccccc;
		// background-image: linear-gradient(90deg,transparent,#cccccc 20%);
	}
	.volumeProcessNow {
		width: 0px;
		position: absolute;
    height: 2px;
    top: 9px;
		cursor: pointer;
		background-color: @main-color;
  }
  .volumeProcessButton {
    height: 12px;
    width: 12px;
    position: relative;
    bottom: 5px;
    left: 6px;
    background-image: url("~@/assets/rhomb.png");
    background-size: 12px, 12px;
    float: right;
  }
  .changeButton {
    background-image: url("~@/assets/rhomb-gray.png");
  }
}
</style>