<template>
	<view class="container">
		<view class="content">
		
			<view class="info-card">
				<view class="header">
				<text class="title">认证提交时间：2024年1月1日 14:02</text>
			</view>
				<view class="card-title">房屋产权人信息</view>
				<view class="info-list">
					<view class="info-item">
						<text class="label">房屋名称：</text>
						<text class="value">怡景苑2栋202</text>
					</view>
					<view class="info-item">
						<text class="label">申请人：</text>
						<text class="value">龙海森</text>
					</view>
					<view class="info-item">
						<text class="label">联系电话：</text>
						<text class="value">13800138000</text>
					</view>
					<view class="info-item">
						<text class="label">申请时间：</text>
						<text class="value">2024-03-20 10:30</text>
					</view>
				</view>
			</view>
			
			<view class="info-card">
				<view class="card-title">认证材料</view>
				<view class="material-list">
					<view class="material-item">
						<image class="material-image" src="/static/image.png" mode="aspectFill"></image>
						<text class="material-name">房产证</text>
					</view>
					<view class="material-item">
						<image class="material-image" src="/static/image.png" mode="aspectFill"></image>
						<text class="material-name">身份证</text>
					</view>
				</view>
			</view>
			
			<view class="info-card">
				<view class="card-title">审批意见</view>
				<view class="remark-box">
					<textarea class="remark-input" placeholder="请输入审批意见" maxlength="200"></textarea>
					<text class="word-count">0/200</text>
				</view>
			</view>
		</view>
		
		<view class="footer">
			<button class="action-btn reject">驳回</button>
			<button class="action-btn approve">通过</button>
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

		}
	}
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		background-color: #f5f6fa;
		padding: 20rpx;
		padding-bottom: 140rpx;
	}

	.content {
		.header {
			padding: 20rpx;
			background: yellow;
			border-radius: 12rpx;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
			margin-bottom: 20rpx;
			
			.title {
				font-size: 36rpx;
				color: #333;
				font-weight: 500;
			}
		}
		
		.info-card {
			background: #fff;
			border-radius: 12rpx;
			padding: 30rpx;
			margin-bottom: 20rpx;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.header {
				padding: 20rpx;
				background: yellow;
				border-radius: 12rpx;
				box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
				margin-bottom: 20rpx;
				
				.title {
					font-size: 36rpx;
					color: #333;
					font-weight: 500;
				}
			}
			
			.card-title {
				font-size: 32rpx;
				color: #333;
				font-weight: 500;
				margin-bottom: 20rpx;
			}
			
			.info-list {
				.info-item {
					display: flex;
					margin-bottom: 16rpx;
					
					&:last-child {
						margin-bottom: 0;
					}
					
					.label {
						font-size: 28rpx;
						color: #666;
						width: 140rpx;
					}
					
					.value {
						font-size: 28rpx;
						color: #333;
						flex: 1;
					}
				}
			}
			
			.material-list {
				display: flex;
				flex-wrap: wrap;
				gap: 20rpx;
				
				.material-item {
					width: calc(50% - 10rpx);
					
					.material-image {
						width: 100%;
						height: 300rpx;
						border-radius: 8rpx;
						background-color: #f5f5f5;
					}
					
					.material-name {
						font-size: 24rpx;
						color: #666;
						margin-top: 8rpx;
						display: block;
						text-align: center;
					}
				}
			}
			
			.remark-box {
				position: relative;
				
				.remark-input {
					width: 100%;
					height: 200rpx;
					padding: 20rpx;
					font-size: 28rpx;
					color: #333;
					background: #f5f5f5;
					border-radius: 8rpx;
					box-sizing: border-box;
					text-align: left;
					line-height: 1.5;
					
					&::placeholder {
						color: #999;
					}
				}
				
				.word-count {
					position: absolute;
					right: 20rpx;
					bottom: 20rpx;
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}

	.footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 20rpx;
		background: #fff;
		box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.05);
		display: flex;
		gap: 20rpx;
		
		.action-btn {
			flex: 1;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 28rpx;
			border-radius: 40rpx;
			
			&.reject {
				color: #FF3B30;
				background: #fff;
				border: 2rpx solid #FF3B30;
			}
			
			&.approve {
				color: #fff;
				background: #007AFF;
				border: 2rpx solid #007AFF;
			}
			
			&:active {
				opacity: 0.8;
			}
		}
	}
</style>