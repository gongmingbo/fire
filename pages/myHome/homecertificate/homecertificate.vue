<template>
	<view class="container">
		<!-- 添加房屋按钮 -->
		<view class="add-house">
			<button class="add-btn" @click="addHouse">
				<text class="iconfont icon-add"></text>
				<text>添加房屋</text>
			</button>
		</view>

		<!-- 房屋信息卡片 -->
		<view class="house-card">
			<view class="house-info">
				<text class="house-name">怡景苑1栋201</text>
				<text class="house-area">专有面积：102m²</text>
			</view>

			<view class="certificate-info">
				<text class="section-title">证明材料</text>
				<view class="tips-list">
					<text class="tip-item">1. 若房产证已下发则上传房产证</text>
					<text class="tip-item">2. 若未取得房产证则上传购房合同</text>
				</view>
				<text class="example-link">查看拍照示例</text>

				<!-- 上传图片区域 -->
				<view class="upload-section">
					<view class="image-list" v-if="imageList.length > 0">
						<view class="image-item" v-for="(item, index) in imageList" :key="index">
							<image :src="item" mode="aspectFill" @click="previewImage(index)"></image>
							<view class="delete-btn" @click="deleteImage(index)">
								<text class="iconfont icon-delete"></text>
							</view>
						</view>
					</view>
					<view class="upload-box" @click="chooseImage" v-if="imageList.length < 3">
						<image class="upload-icon" src="/static/upload.png" mode="aspectFit"></image>
						<text class="upload-text">点击上传图片</text>
						<text class="upload-tip">最多上传3张图片</text>
					</view>
				</view>
			</view>

			<view class="action-buttons">
				<button class="remove-btn" @click="removeHouse">移除房屋</button>
			</view>
		</view>

		<!-- 底部提交按钮 -->
		<view class="footer">
			<button class="submit-btn" @click="submitCertificate">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList: [],
				maxImageCount: 3
			}
		},
		methods: {
			addHouse() {
				// 添加房屋逻辑
			},
			removeHouse() {
				// 移除房屋逻辑
			},
			chooseImage() {
				const count = this.maxImageCount - this.imageList.length;
				if (count <= 0) {
					uni.showToast({
						title: '最多上传3张图片',
						icon: 'none'
					});
					return;
				}
				
				uni.chooseImage({
					count: count,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						// 上传图片到服务器
						this.uploadImages(res.tempFilePaths);
					},
					fail: (err) => {
						console.error('选择图片失败：', err);
						uni.showToast({
							title: '选择图片失败',
							icon: 'none'
						});
					}
				});
			},
			uploadImages(tempFilePaths) {
				uni.showLoading({
					title: '上传中...'
				});
				
				const uploadTasks = tempFilePaths.map(path => {
					return new Promise((resolve, reject) => {
						uni.uploadFile({
							url: 'YOUR_UPLOAD_API_URL', // 替换为你的上传接口
							filePath: path,
							name: 'file',
							success: (res) => {
								// 服务器响应图片
								const data = JSON.parse(res.data);
								if (data.code === 0) {
									resolve(data.url);
								} else {
									reject(new Error(data.message));
								}
							},
							fail: (err) => {
								reject(err);
							}
						});
					});
				});
				
				Promise.all(uploadTasks)
					.then(urls => {
						this.imageList = [...this.imageList, ...urls];
						uni.hideLoading();
						uni.showToast({
							title: '上传成功',
							icon: 'success'
						});
					})
					.catch(err => {
						console.error('上传失败：', err);
						uni.hideLoading();
						uni.showToast({
							title: '上传失败',
							icon: 'none'
						});
					});
			},
			previewImage(index) {
				uni.previewImage({
					urls: this.imageList,
					current: index
				});
			},
			deleteImage(index) {
				uni.showModal({
					title: '提示',
					content: '确定要删除这张图片吗？',
					success: (res) => {
						if (res.confirm) {
							this.imageList.splice(index, 1);
						}
					}
				});
			},
			submitCertificate() {
				// 提交认证逻辑
				uni.navigateTo({
					url: `/pages/myHome/homesuccess/homesuccess`
				})
			}
		}
	}
</script>

<style lang="scss">
.container {
	min-height: 100vh;
	background-color: #f5f6fa;
	padding: 30rpx;
	padding-bottom: 120rpx;
}

.add-house {
	margin-bottom: 30rpx;

	.add-btn {
		width: 100%;
		height: 88rpx;
		background: #fff;
		border: 2rpx dashed #007AFF;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #007AFF;
		font-size: 32rpx;
		transition: all 0.3s ease;

		.iconfont {
			margin-right: 10rpx;
			font-size: 36rpx;
		}

		&:active {
			background: #f0f7ff;
		}
	}
}

.house-card {
	background: #fff;
	border-radius: 12rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);

	.house-info {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #f0f1f5;

		.house-name {
			font-size: 32rpx;
			color: #333;
			font-weight: 500;
			margin-bottom: 12rpx;
			display: block;
		}

		.house-area {
			font-size: 28rpx;
			color: #666;
			display: block;
		}
	}

	.certificate-info {
		.section-title {
			font-size: 30rpx;
			color: #333;
			font-weight: 500;
			margin-bottom: 20rpx;
			display: block;
		}

		.tips-list {
			background: #f8f9fc;
			padding: 20rpx;
			border-radius: 8rpx;
			margin-bottom: 20rpx;

			.tip-item {
				font-size: 26rpx;
				color: #666;
				line-height: 1.6;
				display: block;
			}
		}

		.example-link {
			font-size: 26rpx;
			color: #007AFF;
			margin-bottom: 30rpx;
			display: block;
		}

		.upload-section {
			.image-list {
				display: flex;
				flex-wrap: wrap;
				margin: 0 -10rpx;
				
				.image-item {
					width: calc(33.33% - 20rpx);
					margin: 10rpx;
					position: relative;
					
					image {
						width: 100%;
						height: 200rpx;
						border-radius: 8rpx;
					}
					
					.delete-btn {
						position: absolute;
						top: -16rpx;
						right: -16rpx;
						width: 40rpx;
						height: 40rpx;
						background: rgba(0,0,0,0.5);
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						
						.iconfont {
							color: #fff;
							font-size: 24rpx;
						}
					}
				}
			}
			
			.upload-box {
				background: #f8f9fc;
				border: 2rpx dashed #ddd;
				border-radius: 8rpx;
				padding: 40rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				transition: all 0.3s ease;
				
				&:active {
					background: #f0f1f5;
				}
				
				.upload-icon {
					width: 80rpx;
					height: 80rpx;
					margin-bottom: 16rpx;
				}
				
				.upload-text {
					font-size: 28rpx;
					color: #666;
					margin-bottom: 8rpx;
				}
				
				.upload-tip {
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}

	.action-buttons {
		margin-top: 30rpx;
		padding-top: 20rpx;
		border-top: 2rpx solid #f0f1f5;

		.remove-btn {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			background: #fff;
			color: #ff4d4f;
			font-size: 28rpx;
			border: 2rpx solid #ff4d4f;
			border-radius: 8rpx;
			transition: all 0.3s ease;

			&:active {
				background: #fff1f0;
			}
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
	box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
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

// 添加页面切换动画
.page-enter-active,
.page-leave-active {
	transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
}
</style>
