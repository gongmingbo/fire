<template>
	<view class="container">
		<view class="header">
			<button class="add-building-btn" @click="addBuilding()">+ 添加楼栋</button>
		</view>
		<view class="content">
			<view class="building-card">
				<view class="building-info">
					<text class="building-name">怡景苑1栋</text>
					<text class="building-stats">共24所房屋，业主认证进度：12/24</text>
					<view class="progress-wrapper">
						<view class="progress-bar">
							<view class="progress-inner" style="width: 60%"></view>
						</view>
						<text class="progress-text">10%</text>
					</view>
				</view>
				<view class="building-actions">
					<button class="action-btn" @click="showActionPopup">操作</button>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="building-card">
				<view class="building-info">
					<text class="building-name">怡景苑1栋</text>
					<text class="building-stats">共24所房屋，业主认证进度：12/24</text>
					<view class="progress-wrapper">
						<view class="progress-bar">
							<view class="progress-inner" style="width: 10%"></view>
						</view>
						<text class="progress-text">10%</text>
					</view>
				</view>
				<view class="building-actions">
					<button class="action-btn">操作</button>
				</view>
			</view>
		</view>

		<view class="footer">
			<button class="submit-btn">邀请业主认证</button>
		</view>
		<!-- 使用弹框组件 -->
		<model :show="showAreaPopup" type="form" title="添加楼栋" :formItems="formItems" @cancel="closeAreaPopup"
			@submit="submitAreaCorrection" />

		<!-- 使用操作弹框组件 -->
		<model :show="showPopup" type="action" :actionItems="actionItems" @cancel="closePopup" @action="handleAction" />
	</view>
</template>

<script>
	import Model from '@/components/model.vue'

	export default {
		components: {
			Model
		},
		data() {
			return {
				showAreaPopup: false,
				showPopup: false,
				formItems: [{
					type: 'text',
					value: '',
					placeholder: '请输入楼栋名称'
				}],
				actionItems: [{
						text: '楼栋详情',
						type: 'detail'
					},
					{
						text: '楼栋重命名',
						type: 'rename'
					},
					{
						text: '删除本楼栋',
						type: 'delete'
					},
					{
						text: '取消',
						type: 'cancel'
					}
				]
			}
		},
		methods: {
			addBuilding() {
				this.showAreaPopup = true
			},
			closeAreaPopup() {
				this.showAreaPopup = false
			},
			submitAreaCorrection(formItems) {
				console.log('提交的表单数据：', formItems)
				this.showAreaPopup = false
			},
			showActionPopup() {
				this.showPopup = true
			},
			closePopup() {
				this.showPopup = false
			},
			handleAction(item) {
				switch (item.type) {
					case 'detail':
						this.buildingDetail()
						break
					case 'rename':
						this.renameBuilding()
						break
					case 'delete':
						this.deleteBuilding()
						break
				}
				this.closePopup()
			},
			buildingDetail() {
				console.log('查看楼栋详情')
				uni.navigateTo({
					url: "/pages/homeownermanger/buidingDetail/buidingDetail"
				})
			},
			renameBuilding() {
				console.log('重命名楼栋')
			},
			deleteBuilding() {
				console.log('删除楼栋')
			}
		}
	}
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		background-color: #f5f6fa;
		padding: 20rpx;
	}

	.header {
		margin-bottom: 20rpx;

		.add-building-btn {
			width: 100%;
			height: 88rpx;
			line-height: 88rpx;
			color: #007AFF;
			font-size: 32rpx;
			border-radius: 8rpx;
			text-align: center;

			&:active {
				opacity: 0.8;
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		padding: 20rpx 30rpx;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
		z-index: 100;

		.submit-btn {
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
	}

	.content {
		.building-card {
			background: #fff;
			border-radius: 12rpx;
			padding: 30rpx;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

			.building-info {
				margin-bottom: 20rpx;

				.building-name {
					font-size: 36rpx;
					color: #333;
					font-weight: 500;
					margin-bottom: 16rpx;
					display: block;
				}

				.building-stats {
					font-size: 28rpx;
					color: #666;
					margin-bottom: 20rpx;
					display: block;
				}

				.progress-wrapper {
					display: flex;
					align-items: center;
					gap: 16rpx;

					.progress-bar {
						flex: 1;
						height: 8rpx;
						background: #f0f0f0;
						border-radius: 4rpx;
						overflow: hidden;

						.progress-inner {
							height: 100%;
							background: #007AFF;
							border-radius: 4rpx;
							transition: width 0.3s ease;
						}
					}

					.progress-text {
						font-size: 24rpx;
						color: #666;
						min-width: 60rpx;
						text-align: right;
					}
				}
			}

			.building-actions {
				display: flex;
				justify-content: flex-end;

				.action-btn {
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					background: #fff;
					color: #007AFF;
					font-size: 32rpx;
					border-radius: 8rpx;
					text-align: center;

					&:active {
						opacity: 0.8;
						background: #ebe2e2;

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