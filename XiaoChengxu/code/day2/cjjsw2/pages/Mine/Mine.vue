<template>
	<view class="content">
		<view class="header">
			<block v-if="!currentUser.token">
				<view class="camera">
					<view class="circle"></view>
				</view>
				<text class="no-login" @tap="login">未登录</text>
			</block>
			<block v-else>
				<view class="camera">
					<image :src="currentUser.merchantLogo"></image>
				</view>
				<text class="no-login">{{currentUser.merchantName}}</text>
			</block>
		</view>
		<gljy-line-menu v-if="currentUser.token" :menu="menu" @menuOnClick="menuOnClick"></gljy-line-menu>
	</view>
</template>

<script>
	export default {
		data() {
			this.$forceUpdate()
			return {
				currentUser: getApp().globalData.currentUser,
				menu: [{
					"id": "1",
					"title": "资料设置",
					"iconPath": "../../static/mine/setting.png",
					"arrows": "../../static/mine/arrow.png"
				}]
			};
		},
		methods: {
			login() {

				uni.navigateTo({
					url: 'Login'
				});

			}
		},
		onShow() {
			this.currentUser = getApp().globalData.currentUser
		},
		munuOnClick:function(res){
			console.log(res);
		}
	}
</script>

<style lang="scss">
	page {
		background: #E7ECF2;
	}

	.content {
		.header {
			height: 398rpx;
			background: #2F2F2F;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			.camera {
				width: 140rpx;
				height: 140rpx;
				background: #878787;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;

				.circle {
					border: 2px solid white;
					border-radius: 50%;
					width: 56rpx;
					height: 56rpx;
				}

				image {
					width: 140rpx;
					height: 140rpx;
					border-radius: 50%;
				}
			}

			.no-login {
				color: #E9B84E;
				position: absolute;
				bottom: 40rpx;
			}
		}
	}
</style>
