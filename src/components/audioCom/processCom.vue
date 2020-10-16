<template>
	<div class="Process" @click="processChange">
		<div class="ProcessAll" ></div>
		<div class="ProcessNow"></div>
  </div>
</template>

<script>
export default {
	methods: {
		processChange: function(event) {
			this.$parent.processChange(event)
		}
	}
}
</script>

<style lang="less">
.Process {
	position: relative;
	.ProcessAll {
		width: 100%;
		float: left;
		height: 2px;
		cursor: pointer;
		background-color:#f2f2f2;
	}
	.ProcessNow {
		width: 0px;
		float: left;
		position: absolute;
		height: 2px;
		cursor: pointer;
		background-image: linear-gradient(90deg,transparent,@main-color 20%);
	}
}
</style>