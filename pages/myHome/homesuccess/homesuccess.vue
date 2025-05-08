<template>
	<view class="container">
		<view class="success-content">
			<!-- 成功图标 -->
			<view class="success-icon">
				<image src="/static/success.png" mode="aspectFit"></image>
			</view>
			
			<!-- 成功提示 -->
			<view class="success-text">
				<text class="title">提交成功</text>
				<text class="subtitle">您的房屋认证信息已提交，请等待审核</text>
			</view>
			
			<!-- 提示信息 -->
			<view class="tips-box">
				<view class="tip-item">
					<text class="dot"></text>
					<text class="text">审核时间：1-3个工作日</text>
				</view>
				<view class="tip-item">
					<text class="dot"></text>
					<text class="text">审核结果将通过消息通知您</text>
				</view>
			</view>
			
			<!-- 按钮区域 -->
			<view class="button-group">
				<button class="primary-btn" @click="goToHome">返回首页</button>
				<button class="secondary-btn" @click="checkStatus">查看绑定记录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goToHome() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			checkStatus() {
				uni.navigateTo({
					url: '/pages/myHome/homebindrecord/homebindrecord'
				});
			}
		}
	}
</script>

<style lang="scss">
.container {
	min-height: 100vh;
	background-color: #f5f6fa;
	padding: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.success-content {
	width: 100%;
	background: #fff;
	border-radius: 16rpx;
	padding: 60rpx 40rpx;
	box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
	display: flex;
	flex-direction: column;
	align-items: center;
}

.success-icon {
	width: 160rpx;
	height: 160rpx;
	margin-bottom: 40rpx;
	animation: scaleIn 0.5s ease-out;
	
	image {
		width: 100%;
		height: 100%;
	}
}

.success-text {
	text-align: center;
	margin-bottom: 60rpx;
	
	.title {
		font-size: 40rpx;
		color: #333;
		font-weight: 600;
		margin-bottom: 20rpx;
		display: block;
	}
	
	.subtitle {
		font-size: 28rpx;
		color: #666;
		line-height: 1.5;
		display: block;
	}
}

.tips-box {
	width: 100%;
	background: #f8f9fc;
	border-radius: 12rpx;
	padding: 30rpx;
	margin-bottom: 60rpx;
	
	.tip-item {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		
		&:last-child {
			margin-bottom: 0;
		}
		
		.dot {
			width: 12rpx;
			height: 12rpx;
			background: #007AFF;
			border-radius: 50%;
			margin-right: 16rpx;
		}
		
		.text {
			font-size: 26rpx;
			color: #666;
			line-height: 1.5;
		}
	}
}

.button-group {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	
	.primary-btn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		background: #007AFF;
		color: #fff;
		font-size: 32rpx;
		border-radius: 8rpx;
		border: none;
		transition: all 0.3s ease;
		
		&:active {
			background: #0056b3;
			transform: scale(0.98);
		}
	}
	
	.secondary-btn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		background: #fff;
		color: #007AFF;
		font-size: 32rpx;
		border-radius: 8rpx;
		border: 2rpx solid #007AFF;
		transition: all 0.3s ease;
		
		&:active {
			background: #f0f7ff;
			transform: scale(0.98);
		}
	}
}

@keyframes scaleIn {
	0% {
		transform: scale(0.5);
		opacity: 0;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
}
</style>
