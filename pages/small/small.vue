<template>
	<view class="top-section">
		<view class="header">
			<text class="title">小广场</text>
		</view>
		<view class="description">
			<text>可以在小广场里对小区发展建设、问题等方面发表看法，与小区邻居一起交流，探索解决办法。</text>
		</view>
		<view class="convention">
			<text>查看完整《社区公约》</text>
		</view>


	</view>
	<view class="container">

		<!-- 动态列表 -->
		<view class="moment-list">
			<view class="moment-item" v-for="(item, index) in momentList" :key="index">
				<!-- 用户信息 -->
				<view class="user-info">
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
					<view class="info">
						<text class="name">{{item.name}}</text>
						<text class="time">{{item.time}}</text>
					</view>
				</view>

				<!-- 动态内容 -->
				<view class="content">
					<text>{{item.content}}</text>
				</view>

				<!-- 图片列表 -->
				<view class="image-list" v-if="item.images && item.images.length">
					<image v-for="(img, imgIndex) in item.images" :key="imgIndex" :src="img" mode="aspectFill"
						@click="previewImage(item.images, imgIndex)"></image>
				</view>

				<!-- 操作栏 点赞 评论 -->
				<view class="action-bar">
					<view class="action-item" @click="toggleLike(index)">
						<uni-icons type="heart" size="16" :color="item.isLiked ? '#ff4d4f' : '#999'"></uni-icons>
						<text :class="['like-count', item.isLiked ? 'liked' : '']">
							{{item.likeCount}}
						</text>
					</view>
					<view class="action-item" @click="goToDetail(item.id)">
						<uni-icons type="chat" size="16" color="#999"></uni-icons>
						<text>评论</text>
					</view>
				</view>
			</view>
		</view>
	</view>

	<!-- 添加个人人展示 -->
	<view class="add-show" @click="goToSmallShow()">
		<uni-icons type="plusempty" size="100" color="#999" style="width: 100%; height: 100%;"></uni-icons>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeImages: [
					'/static/image.png',
					'/static/image.png',
					'/static/image.png'
				],
				momentList: [{
						id: 1,
						name: '张三',
						avatar: '/static/image.png',
						time: '10分钟前',
						content: '今天天气真好，适合出去走走！',
						images: [
							'/static/image.png',
							'/static/image.png',
							'/static/image.png'
						],
						isLiked: false,
						likeCount: 12
					},
					{
						id: 2,
						name: '李四',
						avatar: '/static/image.png',
						time: '30分钟前',
						content: '分享一张美食照片',
						images: ['/static/image.png'],
						isLiked: true,
						likeCount: 8
					}
				]
			}
		},
		methods: {
			// 预览图片
			previewImage(images, current) {
				uni.previewImage({
					urls: images,
					current: current
				})
			},

			// 点赞/取消点赞
			toggleLike(index) {
				const moment = this.momentList[index]
				moment.isLiked = !moment.isLiked
				moment.likeCount += moment.isLiked ? 1 : -1
			},

			// 跳转到详情页
			goToDetail(id) {
				uni.navigateTo({
					url: `/pages/smalldetail/smalldetail?id=${id}`
				})
			},

			// 跳转到发布内容
			goToSmallShow() {
				uni.navigateTo({
					url: `/pages/smallshow/smallshow`
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20rpx;
		background-color: #f5f5f5;
		min-height: 100vh;
	}

	.top-section {
		background-color: #007AFF;
		margin-bottom: 20rpx;
		overflow: hidden;
	}

	.header {
		padding: 30rpx;

		.title {
			color: #fff;
			font-size: 36rpx;
			font-weight: 600;
		}
	}

	.description {
		padding: 0 30rpx 30rpx;

		text {
			color: #fff;
			font-size: 28rpx;
			line-height: 1.5;
		}
	}

	.convention {
		padding: 20rpx 30rpx;
		border-top: 1rpx solid rgba(255, 255, 255, 0.2);

		text {
			color: #fff;
			font-size: 28rpx;
		}
	}

	.moment-list {
		.moment-item {
			background-color: #fff;
			border-radius: 12rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;

			.user-info {
				display: flex;
				align-items: center;
				margin-bottom: 16rpx;

				.avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				.info {
					flex: 1;

					.name {
						font-size: 30rpx;
						font-weight: 500;
						color: #333;
					}

					.time {
						font-size: 24rpx;
						color: #999;
						margin-top: 4rpx;
					}
				}
			}

			.content {
				font-size: 28rpx;
				color: #333;
				line-height: 1.5;
				margin-bottom: 16rpx;
			}

			.image-list {
				display: flex;
				flex-wrap: wrap;
				margin: 0 -4rpx 16rpx;

				image {
					width: calc(33.33% - 8rpx);
					height: 200rpx;
					margin: 4rpx;
					border-radius: 8rpx;
				}
			}

			.action-bar {
				display: flex;
				justify-content: flex-end;
				padding: 16rpx 0;
				border-bottom: 1rpx solid #f0f0f0;

				.action-item {
					display: flex;
					align-items: center;
					margin-left: 30rpx;

					text {
						font-size: 26rpx;
						color: #999;
						margin-left: 8rpx;
					}

					.like-count {
						&.liked {
							color: #ff4d4f;
						}
					}
				}
			}
		}
	}

	.add-show {
		position: fixed;
		bottom: calc(20rpx + env(safe-area-inset-bottom) + 100rpx);
		right: 30rpx;
		background-color: #007AFF;
		z-index: 100000;
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4rpx 12rpx rgba(0, 122, 255, 0.3);
		transition: all 0.3s ease;
		opacity: 0.5;

		&:active {
			transform: scale(0.95);
			box-shadow: 0 2rpx 6rpx rgba(0, 122, 255, 0.2);
		}

		.uni-icons {
			color: #fff !important;
			font-size: 60rpx !important;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.notice-image {
		display: flex;
		padding: 20rpx 30rpx;
		background-color: rgba(255, 255, 255, 0.1);
		margin-top: 20rpx;

		.image-item {
			flex: 1;
			margin: 0 10rpx;
			border-radius: 8rpx;
			overflow: hidden;

			&:first-child {
				margin-left: 0;
			}

			&:last-child {
				margin-right: 0;
			}

			image {
				width: 100%;
				display: block;
			}
		}
	}
</style>