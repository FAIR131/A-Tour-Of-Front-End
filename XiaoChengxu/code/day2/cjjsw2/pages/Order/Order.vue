<template>
	<view class="content">
		<view class="product" v-for="item,index in products" :key="index" @tap="toPlaceOrder">
			<view class="left">
				<text class="car-type">{{item.carType}}</text>
				<text class="car-plate">{{item.carPlate}}</text>
			</view>
			<view class="right">
				<text class="price">￥{{item.price}}</text>
				<text class="fee">{{item.fee}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				products: [{
						carType: "小型客车",
						carPlate: "【蓝牌】",
						price: 420,
						fee: "（检测费➕接送车辆费服务费）"
					},
					{
						carType: "小型货车",
						carPlate: "【蓝牌】",
						price: 570,
						fee: "（检测费➕接送车辆费服务费）"
					},
					{
						carType: "小型客车",
						carPlate: "【蓝牌】【脱检】",
						price: 719,
						fee: "（检测费➕接送车辆费服务费➕脱检车辆专项服务费）"
					},
					{
						carType: "小型货车",
						carPlate: "【蓝牌】【脱检】",
						price: 869,
						fee: "（检测费➕接送车辆费服务费➕脱检车辆专项服务费）"
					},

				]
			}
		},
		methods: {
			toPlaceOrder: function() {
				uni.navigateTo({
					url: "./PlaceOrder"
				})
			},
		}
	}
</script>

<style lang="scss">
.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		.product {
			margin-top: 38rpx;
			width: 722rpx;
			height: 226rpx;
			background: white;
			display: flex;
			border-radius: 20rpx;
			overflow: hidden;
			.left {
				width: 426rpx;
				height: 226rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.car-type{
					color: #6B6B6B;
					font-size: 70rpx;
				}
				.car-plate{
					color:#058CE8;
					font-size: 46rpx;
				}
			}

			.right {
				width: 296rpx;
				background: #FF831F;
				height: 226rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.price{
					font-size: 54rpx;
					color: white;
					font-weight: bold;
				}
				.fee{
					margin-top: 40rpx;
					font-size: 20rpx;
				}
			}
		}
	}
</style>
