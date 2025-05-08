<template>
	<view class="container">
		<!-- 顶部操作栏 -->
		<view class="action-bar">
			<button class="publish-btn" @click="handlePublish">
				<text class="iconfont icon-add"></text> 
				<text>+发布公告</text>
			</button>
		</view>

		<!-- 筛选栏 -->
		<view class="filter-bar">
			<picker mode="selector" :range="typeOptions" @change="handleTypeChange">
				<view class="picker">
					<text>{{ selectedType || '全部类型' }}</text>
					<text class="iconfont icon-arrow-down"></text>
				</view>
			</picker>
			<picker mode="selector" :range="statusOptions" @change="handleStatusChange">
				<view class="picker">
					<text>{{ selectedStatus || '全部状态' }}</text>
					<text class="iconfont icon-arrow-down"></text>
				</view>
			</picker>
		</view>

		<!-- 公告列表 -->
		<view class="notice-list">
			<view class="notice-item" v-for="(item, index) in noticeList" :key="index">
				<view class="notice-header">
					<text class="notice-title">{{ item.title }}</text>
					<text :class="['notice-status', item.status === '已发布' ? 'published' : 'draft']">
						{{ item.status }}
					</text>
				</view>

				<view class="notice-info">
					<view class="info-item">
						<text class="label">公告类型：</text>
						<text class="value">{{ item.type }}</text>
					</view>
					<view class="info-item">
						<text class="label">发布时间：</text>
						<text class="value">{{ item.publishTime }}</text>
					</view>
					<view class="info-item">
						<text class="label">阅读量：</text>
						<text class="value">{{ item.readCount }}</text>
					</view>
				</view>

				<view class="notice-actions">
					<button class="action-btn edit" @click="handleEdit(item)">编辑</button>
					<button class="action-btn delete" @click="handleDelete(item)">删除</button>
					<button class="action-btn preview" @click="handlePreview(item)">预览</button>
					<button class="action-btn preview" @click="handlePreview(item)">分享</button>
				</view>
			</view>
		</view>

		<!-- 空状态提示 -->
		<view class="empty-state" v-if="noticeList.length === 0">
			<image src="/static/empty.png" mode="aspectFit"></image>
			<text>暂无公告</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeOptions: ['全部类型', '业主大会公告', '物业通知', '活动通知'],
				statusOptions: ['全部状态', '草稿', '已发布'],
				selectedType: '',
				selectedStatus: '',
				noticeList: [{
						title: '关于小区物业费调整的通知',
						type: '业主大会公告',
						status: '已发布',
						publishTime: '2024/01/02 14:00',
						readCount: 156
					},
					{
						title: '小区环境整治通知',
						type: '物业通知',
						status: '草稿',
						publishTime: '2024/01/01 10:00',
						readCount: 0
					}
				]
			}
		},
		methods: {
			handlePublish() {
				uni.navigateTo({
					url: '/pages/notepublish/notepublish'
				})
			},
			handleTypeChange(e) {
				this.selectedType = this.typeOptions[e.detail.value]
				// TODO: 根据类型筛选公告列表
			},
			handleStatusChange(e) {
				this.selectedStatus = this.statusOptions[e.detail.value]
				// TODO: 根据状态筛选公告列表
			},
			handleEdit(item) {
				uni.navigateTo({
					url: `/pages/notepublish/notepublish?id=${item.id}`
				})
			},
			handleDelete(item) {
				uni.showModal({
					title: '确认删除',
					content: '确定要删除这条公告吗？',
					success: (res) => {
						if (res.confirm) {
							// TODO: 调用删除接口
							uni.showToast({
								title: '删除成功',
								icon: 'success'
							})
						}
					}
				})
			},
			handlePreview(item) {
				uni.navigateTo({
					url: `/pages/notedetail/notedetail?id=${item.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding: 20rpx;
	}

	.action-bar {
		background-color: #fff;
		border-radius: 12rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

		.publish-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #fff;
			color: #007AFF;
			border-radius: 8rpx;
			margin-bottom: 0;
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
			
			.iconfont {
				margin-right: 10rpx;
			}
		}
	}

	.filter-bar {
		display: flex;
		gap: 20rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
		border-radius: 12rpx;
		padding: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

		.picker {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #f8f8f8;
			padding: 15rpx 20rpx;
			border-radius: 8rpx;
			font-size: 28rpx;
			color: #333;

			.iconfont {
				font-size: 24rpx;
				color: #999;
			}
		}
	}

	.notice-list {
		.notice-item {
			background-color: #fff;
			border-radius: 12rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

			.notice-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;

				.notice-title {
					font-size: 32rpx;
					font-weight: 500;
					color: #333;
				}

				.notice-status {
					font-size: 24rpx;
					padding: 4rpx 12rpx;
					border-radius: 4rpx;

					&.published {
						background-color: #E8F5E9;
						color: #4CAF50;
					}

					&.draft {
						background-color: #FFF3E0;
						color: #FF9800;
					}
				}
			}

			.notice-info {
				background-color: #f8f8f8;
				border-radius: 8rpx;
				padding: 20rpx;
				margin-bottom: 20rpx;
				display: flex;
				flex-direction: column;

				.info-item {
					display: flex;
					margin-bottom: 10rpx;

					&:last-child {
						margin-bottom: 0;
					}

					.label {
						color: #666;
						font-size: 26rpx;
						width: 140rpx;
					}

					.value {
						color: #333;
						font-size: 26rpx;
						flex: 1;
					}
				}
			}

			.notice-actions {
				display: flex;
				gap: 20rpx;

				.action-btn {
					flex: 1;
					font-size: 26rpx;
					padding: 15rpx 0;
					border-radius: 8rpx;
					text-align: center;

					&.edit {
						background-color: #E3F2FD;
						color: #2196F3;
					}

					&.delete {
						background-color: #FFEBEE;
						color: #F44336;
					}

					&.preview {
						background-color: #F5F5F5;
						color: #666;
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
		padding: 100rpx 0;

		image {
			width: 200rpx;
			height: 200rpx;
			margin-bottom: 20rpx;
		}

		text {
			color: #999;
			font-size: 28rpx;
		}
	}
</style>