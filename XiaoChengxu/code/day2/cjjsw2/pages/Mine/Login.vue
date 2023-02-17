<template>
	<view>
		<view class="content">
			<img src="../../static/logo.png" mode="widthFix" class="img">
			<text class="title">商务端</text>

			<view class="login-form">
				<view class="item phone">
					<image class="icon left" src="/static/mine/user.png" mode="widthFix"></image>
					<input v-model="user.account" class="uni-input" placeholder="手机号"
						placeholder-class="input-placeholder" />
				</view>
				<view class="item password">
					<image class="icon left" src="/static/mine/lock.png" mode="widthFix"></image>
					<input v-model="user.password" class="uni-input" type="password" placeholder="密码"
						placeholder-class="input-placeholder" />
				</view>
				<view class="register"><text>注册账号</text></view>
				<view class="btn" @tap="login">
					<text>登录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ysvalidate from '../../common/ys-validate.js'
	export default {
		data() {
			return {
				currentUser: {},
				user: {
					account: "",
					password: ""
				},
				loginRules: [{
						name: 'account',
						type: 'required',
						errmsg: '请输入账号'
					},
					{
						name: 'account',
						required: true,
						type: 'phone',
						errmsg: '请输入正确的手机号'
					},
					{
						name: 'password',
						type: 'required',
						errmsg: '请输入密码'
					},
					{
						name: 'password',
						type: 'pwd',
						errmsg: '密码须是6～16位字符'
					}
				]
			};
		},
		methods: {
			login() {
				let valLoginRes = ysvalidate.validate(this.user, this.loginRules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
					return false
				} else {
					uni.request({
						url: "http://10.31.155.159:1402/merchantUser/login",
						method: "GET",
						data: this.user,
						success: (res) => {
							console.log(res);
							if (res.data.code) {
								getApp().globalData.currentUser=res.data.object
								uni.switchTab({
									url: "./Mine"
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.errmsg
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #3D588D;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;

		.img {
			width: 572rpx;
			margin-top: 150rpx;
		}

		.title {
			color: #A9ABAE;
			font-size: 30rpx;
		}


		.login-form {
			width: 630rpx;
			margin-top: 128rpx;
		}

		.login-form .item {
			width: 630rpx;
			height: 84rpx;
			border-radius: 6rpx;
			margin-bottom: 33rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			background-color: white;
		}

		.login-form input {
			height: 84rpx;
			line-height: 84rpx;
			border-radius: 10rpx;
		}

		.login-form .item .icon {
			width: 36rpx;
			height: 40rpx;
		}

		.input-placeholder {
			line-height: 84rpx;
			height: 84rpx;
			margin: auto;
		}

		.login-form .btn {
			margin: 162rpx auto 22rpx;
			text-align: center;
			height: 112rpx;
			line-height: 112rpx;
			border-radius: 20rpx;
			background-color: #EF7E2E;
			color: white;
		}

		.register {
			text-align: right;
			color: #EF7E2E;
		}
	}
</style>
