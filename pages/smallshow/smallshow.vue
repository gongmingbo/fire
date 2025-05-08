<template>
	<view class="container">
		<!-- 文字输入区域 -->
		<view class="content-input">
			<textarea 
				v-model="content" 
				placeholder="这一刻的想法..." 
				maxlength="500"
				:auto-height="true"
			></textarea>
			<text class="word-count">{{content.length}}/500</text>
		</view>
		
		<!-- 图片上传区域 -->
		<view class="image-upload">
			<view class="image-list">
				<view class="image-item" v-for="(image, index) in imageList" :key="index">
					<image :src="image" mode="aspectFill" @click="previewImage(index)"></image>
					<view class="delete-btn" @click="deleteImage(index)">
						<uni-icons type="close" size="16" color="#fff"></uni-icons>
					</view>
				</view>
				<view class="upload-btn" v-if="imageList.length < 9" @click="chooseImage">
					<uni-icons type="camera" size="32" color="#999"></uni-icons>
					<text class="upload-text">添加图片</text>
				</view>
			</view>
			<text class="upload-tip">最多上传9张图片</text>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<view class="location" @click="chooseLocation">
				<uni-icons type="location" size="16" color="#666"></uni-icons>
				<text>{{location || '所在位置'}}</text>
			</view>
			<button class="submit-btn" :disabled="!content && imageList.length === 0" @click="submit">发表</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				imageList: [],
				location: ''
			}
		},
		methods: {
			// 选择图片
			chooseImage() {
				const maxCount = 9 - this.imageList.length
				uni.chooseImage({
					count: maxCount,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						this.imageList = [...this.imageList, ...res.tempFilePaths]
					}
				})
			},
			
			// 预览图片
			previewImage(index) {
				uni.previewImage({
					urls: this.imageList,
					current: index
				})
			},
			
			// 删除图片
			deleteImage(index) {
				uni.showModal({
					title: '提示',
					content: '确定要删除这张图片吗？',
					success: (res) => {
						if (res.confirm) {
							this.imageList.splice(index, 1)
						}
					}
				})
			},
			
			// 选择位置
			chooseLocation() {
				uni.chooseLocation({
					success: (res) => {
						this.location = res.name
					}
				})
			},
			
			// 提交
			submit() {
				if (!this.content && this.imageList.length === 0) {
					uni.showToast({
						title: '请填写内容或上传图片',
						icon: 'none'
					})
					return
				}
				
				// 这里可以添加上传图片和提交内容的逻辑
				uni.showLoading({
					title: '发布中...'
				})
				
				// 模拟上传过程
				setTimeout(() => {
					uni.hideLoading()
					uni.showToast({
						title: '发布成功',
						icon: 'success'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}, 2000)
			}
		}
	}
</script>

<style lang="scss">
.container {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
	padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
}

.content-input {
	background-color: #fff;
	border-radius: 12rpx;
	padding: 20rpx;
	margin-bottom: 20rpx;
	
	textarea {
		width: 100%;
		min-height: 200rpx;
		font-size: 28rpx;
		line-height: 1.5;
	}
	
	.word-count {
		font-size: 24rpx;
		color: #999;
		text-align: right;
		display: block;
		margin-top: 10rpx;
	}
}

.image-upload {
	background-color: #fff;
	border-radius: 12rpx;
	padding: 20rpx;
	margin-bottom: 20rpx;
	
	.image-list {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -4rpx;
		
		.image-item {
			position: relative;
			width: calc(33.33% - 8rpx);
			height: 200rpx;
			margin: 4rpx;
			
			image {
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}
			
			.delete-btn {
				position: absolute;
				top: -20rpx;
				right: -20rpx;
				width: 40rpx;
				height: 40rpx;
				background-color: rgba(0,0,0,0.5);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		
		.upload-btn {
			width: calc(33.33% - 8rpx);
			height: 200rpx;
			margin: 4rpx;
			background-color: #f5f5f5;
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			
			.upload-text {
				font-size: 24rpx;
				color: #999;
				margin-top: 10rpx;
			}
		}
	}
	
	.upload-tip {
		font-size: 24rpx;
		color: #999;
		margin-top: 10rpx;
		display: block;
	}
}

.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	padding: 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
	z-index: 999;
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	
	.location {
		display: flex;
		align-items: center;
		
		text {
			font-size: 28rpx;
			color: #666;
			margin-left: 8rpx;
		}
	}
	
	.submit-btn {
		width: 160rpx;
		height: 72rpx;
		line-height: 72rpx;
		background-color: #007AFF;
		color: #fff;
		font-size: 28rpx;
		border-radius: 36rpx;
		
		&[disabled] {
			background-color: #ccc;
		}
	}
}
</style>
