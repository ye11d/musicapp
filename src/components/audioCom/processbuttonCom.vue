<template>
	<div class="ProcessButton">
		<slot></slot>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="less">
.ProcessButton {
	z-index: 1;
	position: absolute;
	width: 14px;
	height: 14px;
	top: -5px;
	margin-left: -7px;
	background-image: url('~@/assets/process-button-blue.png');
	background-size: 14px, 14px;
	cursor: pointer;
}
</style>