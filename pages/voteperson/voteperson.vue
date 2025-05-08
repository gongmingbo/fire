<template>
	<view class="container">
		<view class="form-section">
			<view class="form-item">
				<input type="text" placeholder="请输入候选人姓名" class="input" />
			</view>
		</view>

		<view class="form-section">
			<view class="form-item">
				<text class="label">候选人照片</text>
				<view class="photo-tip">正面清晰人脸照片</view>
				<view class="photo-upload" @click="chooseImage">
					<image v-if="photoUrl" :src="photoUrl" mode="aspectFill" class="photo"></image>
					<view class="upload-tip">
						<text class="iconfont icon-camera"></text>
						<text>点击更换照片</text>
					</view>
				</view>
			</view>
		</view>

		<view class="form-section">
			<view class="form-item">
				<text class="label">候选人说明</text>
				<view class="description-box">
					<text class="description-tip">
						示例：性别、年龄、政治面貌、文化程度、职业以及竞选宣言等，限制500字
					</text>
				</view>
			</view>
		</view>

		<view>
			<button class="btn" @click="save()">确定</button>
			<button class="btn"  @click="cancel()">取消</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				photoUrl: '', // 照片URL
				uploading: false // 上传状态
			}
		},
		methods: {
			save(){
				uni.navigateBack()
			},
			cancel(){
				uni.navigateBack()
			},
			
			// 选择图片
			chooseImage() {
				uni.chooseImage({
					count: 1, // 最多可以选择的图片张数
					sizeType: ['compressed'], // 压缩图
					sourceType: ['album', 'camera'], // 从相册选择或使用相机
					success: (res) => {
						// 预览图片
						this.photoUrl = res.tempFilePaths[0]
						// 上传图片
						this.uploadImage(res.tempFilePaths[0])
					}
				})
			},

			// 上传图片
			uploadImage(filePath) {
				if (this.uploading) return
				this.uploading = true

				uni.showLoading({
					title: '上传中...'
				})

				uni.uploadFile({
					url: 'YOUR_UPLOAD_API_URL', // 替换为你的上传接口
					filePath: filePath,
					name: 'file',
					success: (res) => {
						const data = JSON.parse(res.data)
						if (data.code === 0) {
							uni.showToast({
								title: '上传成功',
								icon: 'success'
							})
							// 这里可以处理上传成功后的逻辑
							// 例如保存图片URL到表单数据中
						} else {
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							})
						}
					},
					fail: () => {
						uni.showToast({
							title: '上传失败',
							icon: 'none'
						})
					},
					complete: () => {
						this.uploading = false
						uni.hideLoading()
					}
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

	.form-section {
		background-color: #fff;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
		overflow: hidden;

		.form-item {
			padding: 24rpx 30rpx;

			.label {
				display: block;
				font-size: 28rpx;
				color: #333;
				margin-bottom: 16rpx;
				font-weight: 500;
			}

			.photo-tip {
				font-size: 24rpx;
				color: #999;
				margin-bottom: 16rpx;
			}

			.input {
				width: 100%;
				height: 80rpx;
				background-color: #fafafa;
				border-radius: 8rpx;
				padding: 0 24rpx;
				font-size: 28rpx;
				color: #333;
			}

			.photo-upload {
				width: 200rpx;
				height: 200rpx;
				background-color: #fafafa;
				border-radius: 8rpx;
				overflow: hidden;
				position: relative;

				.photo {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}

				.upload-tip {
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0;
					height: 60rpx;
					background-color: rgba(0, 0, 0, 0.6);
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 8rpx;

					.iconfont {
						font-size: 28rpx;
						color: #fff;
					}

					text {
						font-size: 24rpx;
						color: #fff;
					}
				}
			}

			.description-box {
				background-color: #fafafa;
				border-radius: 8rpx;
				padding: 20rpx 24rpx;

				.description-tip {
					font-size: 26rpx;
					color: #999;
					line-height: 1.6;
				}
			}
		}
	}
</style>