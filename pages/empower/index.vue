<template>
	<view class="empower safe-area-inset-bottom">
		<view class="empower-header">
			<view class="header-logo">
				<image src="@/static/images/logo.png"></image>
			</view>
			<view class="header-desc">
				<view class="desc-title">您好，欢迎使用</view>
				<view class="desc-text">xxx系统</view>
			</view>
		</view>
		<view class="empower-form">
			<view class="form-wrap">
				<view class="wrap-item">
					<view class="item-icon">
						<uni-icons type="person" size="18" color="#86909C"></uni-icons>
					</view>
					<uni-easyinput v-model="formData.phone" type="text" maxlength="50" :inputBorder="false" :clearSize="20" placeholder="请输入账号"></uni-easyinput>
				</view>
				 
				<view class="wrap-item">
					<view class="item-icon">
						<uni-icons type="locked" size="18" color="#86909C"></uni-icons>
					</view>
					<uni-easyinput v-model="formData.sms_code" type="password" maxlength="20" :inputBorder="false" placeholder="请输入密码"></uni-easyinput>
				</view>
			</view>
			<view class="form-btn">
				<u-button type="primary" :disabled="!formData.phone || !formData.sms_code || saveLoad" shape="circle" @tap="handleLogin">登录</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * @desc 登录
	 * 
	 * */
	import { mapState } from 'vuex'
	import { loginApi } from '@/api/empower'
	
	export default {
		name: 'empower',
		data() {
			return {
				formData: {
					phone: '15565412365', // 账号
					sms_code: '1111', // 密码
				},
				saveLoad: false
			}
		},
		computed: {
			...mapState({
				systemInfo: state => state.publicVuex.systemInfo
			})
		},
		onLoad(option) {
			console.log(option)
		},
		created() {
			console.log(this.systemInfo)
			console.log(this.$Router)
			console.log(this.$Route)
		},
		methods: {
			// 登录
			handleLogin() {
				const { phone, sms_code } = this.formData
				const params = {
					phone,
					sms_code
				}
				this.saveLoad = true
				loginApi(params, '登录中...')
					.then((res) => {
						this.saveLoad = false
						if (res.code !== 200) {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							})
							return
						}
						const { user, token } = res.data
						uni.setStorageSync('token', token)
						// uni.setStorageSync('userInfo', user)
						// 登录成功跳转到首页
						uni.reLaunch({
							url: '/pages/index/index'
						})
						// const { redirect } = this.data
						// if (redirect) {
						// 	const enCodeRedirect = decodeURIComponent(redirect)
						// 	uni.reLaunch({
						// 		url: enCodeRedirect
						// 	})
						// } else {
						// 	uni.reLaunch({
						// 		url: '/pages/index/index'
						// 	})
						// }
					})
					.catch((err) => {
						this.saveLoad = false
						uni.showToast({
							title: err.message,
							icon: 'none',
							duration: 2000
						})
					})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.empower {
		width: 100%;
		.empower-header {
			@include vertical_direction_center();
			height: 352px;
			padding-top: 70px;
			text-align: center;
			background: url('@/static/images/user-radius.png') 0 0 no-repeat;
			background-size: 167px 167px;
			background-color: #0074FE;
			border-radius: 0 0 40px 40px;
			.header-logo {
				width: 100px;
				height: 100px;
				margin-bottom: 25px;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.header-desc {
				color: #fff;
				.desc-title {
					margin-bottom: 10px;
					font-size: 18px;
				}
				.desc-text {
					font-size: 16px;
				}
			}
		}
		.empower-form {
			width: 100%;
			padding: 0 32px;
			.form-wrap {
				width: 100%;
				margin-top: -45px;
				margin-bottom: 20px;
				padding: 20px 16px 10px 16px;
				background-color: #fff;
				border-radius: 8px;
				box-shadow: 0px 1px 20px 0px rgba(0,0,0,0.25);
				.wrap-item {
					display: flex;
					align-items: center;
					width: 100%;
					// height: 34px;
					margin-bottom: 24px;
					border-bottom: 1px solid #E5E6EB;
					.item-input {
						border: none;
						outline: none;
						&::placeholder {
							font-size: 14px;
							font-weight: 400;
							color: #C9CDD4;
						}
					}
				}
			}
		}
	}
</style>