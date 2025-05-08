<template>
	<view class="container">
		<!-- 遮罩层 -->
		<view class="mask" v-if="showPopup" @click="closePopup"></view>
		
		<view class="content">
			<text>红枫苑1栋10-2</text>
			<text>房屋专有部分面积：102m²</text>
			<text>房屋绑定时间：2024年1月1日 12:56</text>
			<button class="action-btn" @click="openActionPopup">操作</button>
		</view>
		<view class="footer">
			<button class="footer-btn bind-btn" @click="homeSelect()">立即绑定</button>	
			<button class="footer-btn record-btn"  @click="checkStatus">绑定记录</button>	
		</view>
		
		<!-- 操作弹框 -->
		<view class="action-popup" v-if="showPopup">
			<view class="action-list">
				<view class="action-item" @click="handleUnbind">
					<text class="action-text">解除房屋绑定</text>
				</view>
				<view class="action-item" @click="handleAreaCorrection">
					<text class="action-text">房屋专有面积勘误</text>
				</view>
				<view class="action-item cancel" @click="closePopup">
					<text class="action-text">取消</text>
				</view>
			</view>
		</view>
		
		<!-- 房屋专有面积勘误弹框 -->
		<view class="area-popup" v-if="showAreaPopup">
			<view class="popup-content">
				<view class="popup-title">房屋专有面积勘误</view>
				<view class="form-item">
					<text class="label">房屋名称</text>
					<text class="value">红枫苑1栋10-2</text>
				</view>
				<view class="form-item">
					<text class="label">专有部分面积(m²)</text>
					<input type="digit" v-model="areaValue" class="area-input" placeholder="请输入面积" />
				</view>
				<view class="popup-buttons">
					<button class="cancel-btn" @click="closeAreaPopup">取消</button>
					<button class="submit-btn" @click="submitAreaCorrection">提交</button>
				</view>
			</view>
		</view>
		
		<!-- 解除房屋绑定弹框 -->
		<view class="area-popup" v-if="showUnbindPopup">
			<view class="popup-content">
				<view class="popup-title">解除房屋绑定</view>
        <view class="form-item">
					<text class="label">是否立即解除该房屋与你的绑定关系？</text>
				</view>
				<view class="popup-buttons">
					<button class="cancel-btn" @click="closeUnbindPopup">取消</button>
					<button class="submit-btn" @click="confirmUnbind">立即解除</button>
				</view>
			</view>
		</view>
    
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPopup: false,
				showAreaPopup: false,
				showUnbindPopup: false,
				areaValue: ''
			}
		},
		methods: {
			homeSelect(){
				uni.navigateTo({
					url:'/pages/myHome/homeselect/homeselect'
				})
			},
      checkStatus() {
				uni.navigateTo({
					url: '/pages/myHome/homebindrecord/homebindrecord'
				});
			},
			// 打开操作弹框
			openActionPopup() {
				this.showPopup = true;
			},
			
			// 关闭弹框
			closePopup() {
				this.showPopup = false;
			},
			
			// 处理解除绑定
			handleUnbind() {
				this.closePopup();
				this.showUnbindPopup = true;
			},
			
			// 处理面积勘误
			handleAreaCorrection() {
				this.closePopup();
				this.showAreaPopup = true;
			},
			
			// 关闭面积勘误弹窗
			closeAreaPopup() {
				this.showAreaPopup = false;
				this.areaValue = '';
			},
			
			// 提交面积勘误
			submitAreaCorrection() {
				if (!this.areaValue) {
					uni.showToast({
						title: '请输入面积',
						icon: 'none'
					});
					return;
				}
				
				// TODO: 调用接口提交数据
				uni.showLoading({
					title: '提交中...'
				});
				
				setTimeout(() => {
					uni.hideLoading();
					uni.showToast({
						title: '提交成功',
						icon: 'success'
					});
					this.closeAreaPopup();
				}, 1500);
			},
			
			// 关闭解除绑定弹窗
			closeUnbindPopup() {
				this.showUnbindPopup = false;
			},
			
			// 确认解除绑定
			confirmUnbind() {
				// TODO: 调用解除绑定接口
				uni.showLoading({
					title: '处理中...'
				});
				
				setTimeout(() => {
					uni.hideLoading();
					uni.showToast({
						title: '解除成功',
						icon: 'success'
					});
					this.closeUnbindPopup();
				}, 1500);
			}
		}
	}
</script>

<style lang="scss">
.container {
	min-height: 100vh;
	background-color: #f5f6fa;
	padding-bottom: 120rpx;
	position: relative;
}

.content {
	padding: 30rpx;
	background-color: #fff;
	margin: 20rpx;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);

	text {
		display: block;
		font-size: 28rpx;
		color: #333;
		margin-bottom: 20rpx;
	}

	.action-btn {
		background-color: #007AFF;
		color: #fff;
		width:100%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		border-radius: 8rpx;
		margin-top: 20rpx;
	}
}

.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	padding: 20rpx 30rpx;
	display: flex;
	justify-content: space-between;
	box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);

	.footer-btn {
		width: 45%;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 32rpx;
		border-radius: 8rpx;
		border: none;
		transition: all 0.3s ease;

		&:active {
			transform: scale(0.98);
		}

		&.bind-btn {
			background-color: #007AFF;
			color: #fff;
		}

		&.record-btn {
			background-color: #f8f9fc;
			color: #333;
			border: 2rpx solid #e5e6eb;
		}
	}
}

.mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 998;
}

.action-popup {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: #fff;
	z-index: 999;
	width: 560rpx;
	border-radius: 12rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
	
	.popup-title {
		font-size: 32rpx;
		color: #333;
		text-align: center;
		padding: 30rpx 0;
		font-weight: 500;
		border-bottom: 2rpx solid #f0f0f0;
	}
	
	.action-list {
		padding: 20rpx 0;
		
		.action-item {
			height: 110rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			
			&:active {
				background: #f5f5f5;
			}
			
			&::after {
				content: '';
				position: absolute;
				left: 30rpx;
				right: 30rpx;
				bottom: 0;
				height: 1rpx;
				background: #f0f0f0;
			}
			
			&:last-child::after {
				display: none;
			}
			
			.action-text {
				font-size: 32rpx;
				color: #333;
			}
			
			&.cancel {
				margin-top: 20rpx;
				background: #f5f5f5;
				
				.action-text {
					color: #666;
				}
			}
		}
	}
}

.area-popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	
	.popup-content {
		width: 560rpx;
		background: #fff;
		border-radius: 12rpx;
		overflow: hidden;
		
		.popup-title {
			font-size: 32rpx;
			color: #333;
			text-align: center;
			padding: 30rpx 0;
			font-weight: 500;
			border-bottom: 2rpx solid #f0f0f0;
		}
		
		.form-item {
			padding: 30rpx;
			display: flex;
			align-items: flex-start;
			border-bottom: 2rpx solid #f0f0f0;
			flex-direction: column;
			.label {
				width: 100%;
				font-size: 28rpx;
				color: #666;
				margin-bottom: 30rpx;
			}
			
			.value {
				flex: 1;
				font-size: 28rpx;
				color: #333;
				line-height: 1.5;
			}
			
			.area-input {
				flex: 1;
				height: 60rpx;
				font-size: 28rpx;
				color: #333;
				width: 100%;
				border-bottom: 1rpx solid rgb(116, 109, 109);
			}
			
			.unit {
				margin-left: 10rpx;
				font-size: 28rpx;
				color: #666;
			}
		}
		
		.popup-buttons {
			display: flex;
			padding: 20rpx;
			
			button {
				flex: 1;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				border-radius: 8rpx;
				margin: 0 10rpx;
				
				&.cancel-btn {
					background: #f5f5f5;
					color: #666;
				}
				
				&.submit-btn {
					background: #007AFF;
					color: #fff;
				}
				
				&:active {
					opacity: 0.8;
				}
			}
		}
	}
}
</style>
