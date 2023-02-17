<template>
	<view class="form">
		<view class="form-item">
			<label for="">车牌号:</label>
			<input type="text" placeholder="请输入">
		</view>
		<view class="form-item">
			<label for="">提车地址:</label>
			<input type="text" placeholder="请输入">
		</view>
		<view class="form-item">
			<label for="">预检时间:</label>
			<text class="pick-time" @click="openDatetimePicker">点击选择时间</text>
			<datetime-picker ref="myPicker" @submit="handleSubmit" :start-year="2000" :end-year="2030">
			</datetime-picker>
		</view>
		<view class="form-item">
			<label for="">车主电话:</label>
			<input type="text" placeholder="请输入">
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			openDatetimePicker() {
				this.$refs.myPicker.show();
			},

			// 关闭picker
			closeDatetimePicker() {
				this.$refs.myPicker.hide();
			},

			handleSubmit(e) {
				// {year: "2019", month: "07", day: "17", hour: "15", minute: "21"}
				console.log(e);
			}
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.form {
		width: 710rpx;
		background: white;
		margin-top: 24rpx;
		border-radius: 10rpx;

		.form-item {
			display: flex;
			margin: 30rpx 0;

			label {
				margin-left: 40rpx;
				width: 164rpx;
				text-align: right;
				color: #6B6B6B;
			}

			input {
				text-align: right;
				width: 440rpx;
			}
			
			.pick-time{
				// float:"right";
				color:#6b6b6b;
				display:block;
				width: 440rpx;
				text-align: right;
			}
		}
	}
</style>
