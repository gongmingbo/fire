<template>
	<view class="container">
		<!-- 记录列表 -->
		<view class="record-list">
			<view class="record-item" v-for="(item, index) in recordList" :key="index">
				<view class="record-header">
					<view class="house-info">
						<text class="house-name">{{item.houseName}}</text>
						<text class="house-area">{{item.houseArea}}</text>
					</view>
					<view class="status-tag" :class="item.status">
						<text>{{getStatusText(item.status)}}</text>
					</view>
				</view>

				<view class="record-content">
					<view class="info-row">
						<text class="label">申请时间：</text>
						<text class="value">{{item.applyTime}}</text>
					</view>
					<view class="info-row" v-if="item.reviewTime">
						<text class="label">审核时间：</text>
						<text class="value">{{item.reviewTime}}</text>
					</view>
					<view class="info-row" v-if="item.reviewRemark">
						<text class="label">审核备注：</text>
						<text class="value">{{item.reviewRemark}}</text>
					</view>

					<!-- 证明材料图片 -->
					<view class="certificate-images" v-if="item.images && item.images.length > 0">
						<text class="section-title">证明材料</text>
						<view class="image-list">
							<view class="image-item" v-for="(img, imgIndex) in item.images" :key="imgIndex"
								@click="previewImage(item.images, imgIndex)">
								<image :src="img" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>

				<view class="record-footer" v-if="item.status === 'rejected'">
					<button class="reapply-btn" @click="handleReapply(item)">重新申请</button>
				</view>
			</view>
		</view>

		<!-- 空状态 -->
		<view class="empty-state" v-if="recordList.length === 0">
			<image src="/static/empty.png" mode="aspectFit"></image>
			<text>暂无绑定记录</text>
		</view>
	</view>
</template>

<script>
	export default {
		// 添加页面配置
		onLoad() {
			// 设置导航栏
			uni.setNavigationBarTitle({
				title: '绑定记录'
			});
		},
		// 重写返回按钮行为
		onBackPress() {
			uni.navigateTo({
				url: '/pages/myHome/myHome'
			});
			return true;
		},
		data() {
			return {
				recordList: [{
						houseName: '怡景苑1栋201',
						houseArea: '102m²',
						status: 'pending',
						applyTime: '2024-03-20 14:30',
						reviewTime: '',
						reviewRemark: '',
						images: [
							'/static/image.png',
							'/static/image.png'
						]
					},
					{
						houseName: '怡景苑2栋302',
						houseArea: '89m²',
						status: 'approved',
						applyTime: '2024-03-18 10:20',
						reviewTime: '2024-03-19 15:40',
						reviewRemark: '审核通过',
						images: [
							'/static/image.png'
						]
					},
					{
						houseName: '怡景苑3栋101',
						houseArea: '120m²',
						status: 'rejected',
						applyTime: '2024-03-15 09:15',
						reviewTime: '2024-03-16 11:30',
						reviewRemark: '证明材料不清晰，请重新上传',
						images: [
							'/static/image.png',
							'/static/image.png',
							'/static/image.png'
						]
					}
				]
			}
		},
		methods: {
			getStatusText(status) {
				const statusMap = {
					pending: '审核中',
					approved: '已通过',
					rejected: '已拒绝'
				};
				return statusMap[status] || status;
			},
			handleReapply(item) {
				uni.navigateTo({
					url: `/pages/myHome/homecertificate/homecertificate?id=${item.id}`
				});
			},
			// 预览图片
			previewImage(images, current) {
				uni.previewImage({
					urls: images,
					current: current,
					indicator: 'number',
					loop: true
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
	}

	.record-list {
		.record-item {
			background: #fff;
			border-radius: 12rpx;
			padding: 30rpx;
			margin-bottom: 20rpx;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

			.record-header {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				margin-bottom: 20rpx;
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #f0f1f5;

				.house-info {
					.house-name {
						font-size: 32rpx;
						color: #333;
						font-weight: 500;
						margin-bottom: 8rpx;
						display: block;
					}

					.house-area {
						font-size: 26rpx;
						color: #666;
						display: block;
					}
				}

				.status-tag {
					padding: 6rpx 20rpx;
					border-radius: 6rpx;
					font-size: 24rpx;

					&.pending {
						background: #e6f7ff;
						color: #1890ff;
					}

					&.approved {
						background: #f6ffed;
						color: #52c41a;
					}

					&.rejected {
						background: #fff1f0;
						color: #ff4d4f;
					}
				}
			}

			.record-content {
				.info-row {
					display: flex;
					margin-bottom: 16rpx;

					&:last-child {
						margin-bottom: 0;
					}

					.label {
						font-size: 26rpx;
						color: #666;
						width: 140rpx;
						flex-shrink: 0;
					}

					.value {
						font-size: 26rpx;
						color: #333;
						flex: 1;
					}
				}

				.certificate-images {
					margin-top: 20rpx;
					padding-top: 20rpx;
					border-top: 2rpx solid #f0f1f5;

					.section-title {
						font-size: 28rpx;
						color: #333;
						font-weight: 500;
						margin-bottom: 20rpx;
						display: block;
					}

					.image-list {
						display: flex;
						flex-wrap: wrap;
						margin: 0 -10rpx;

						.image-item {
							width: calc(33.33% - 20rpx);
							margin: 10rpx;
							position: relative;
							border-radius: 8rpx;
							overflow: hidden;
							box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);

							&::after {
								content: '';
								display: block;
								padding-bottom: 100%;
							}

							image {
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								object-fit: cover;
								transition: transform 0.3s ease;
							}

							&:active image {
								transform: scale(0.95);
							}
						}
					}
				}
			}

			.record-footer {
				margin-top: 20rpx;
				padding-top: 20rpx;
				border-top: 2rpx solid #f0f1f5;

				.reapply-btn {
					width: 100%;
					height: 72rpx;
					line-height: 72rpx;
					background: #fff;
					color: #007AFF;
					font-size: 28rpx;
					border-radius: 8rpx;
					border: 2rpx solid #007AFF;
					transition: all 0.3s ease;

					&:active {
						background: #f0f7ff;
						transform: scale(0.98);
					}
				}
			}
		}
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 120rpx 0;

		image {
			width: 240rpx;
			height: 240rpx;
			margin-bottom: 30rpx;
		}

		text {
			font-size: 28rpx;
			color: #999;
		}
	}
</style>