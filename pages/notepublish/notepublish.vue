<template>
	<view class="container">
		<!-- 表单区域 -->
		<view class="form-section">
			<!-- 公告标题 -->
			<view class="form-item">
				<text class="label required"></text>
				<input class="input" v-model="formData.title" placeholder="请输入公告标题（50字以内）" maxlength="50" />
			</view>

			<!-- 公告内容 -->
			<view class="form-item">
				<text class="label"></text>
				<textarea class="textarea" v-model="formData.content" placeholder="请输入公告内容" maxlength="2000"></textarea>
				<text class="word-count">{{formData.content.length}}/2000</text>
			</view>

			<!-- 图片上传 -->
			<view class="form-item">
				<text class="label"></text>
				<text class="sub-label">最多可上传3张图片</text>
				<view class="upload-area">
					<view class="image-list">
						<view class="image-item" v-for="(item, index) in formData.images" :key="index">
							<image :src="item" mode="aspectFill"></image>
							<text class="delete-btn" @click="deleteImage(index)">×</text>
						</view>
						<view class="upload-btn" v-if="formData.images.length < 3" @click="chooseImage">
							<text class="iconfont icon-add"></text>
							<text>上传图片</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 公告时间 -->
			<view class="form-item">
				<view class="picker">

					<text class="label">公告时间</text>
					<text class="value">{{ currentTime }}</text>
				</view>
			</view>

			<!-- 公告类型 -->
			<view class="form-item">

				<picker mode="selector" :range="typeOptions" @change="handleTypeChange" :value="typeIndex">
					<view class="picker">
						<text class="label">公告类型

						</text>
						<view class="right-content">
							<text class="value">{{ formData.type || '请选择公告类型' }}</text>
							<text class="iconfont icon-arrow-right"></text>
							<uni-icons type="down" size="15"></uni-icons>
						</view>
					</view>
				</picker>
			</view>

			<!-- 投票管理 -->
			<view class="form-item">
				<view class="picker">
					<text class="label">投票管理</text>
					<navigator url="/pages/votemanger/votemanger" hover-class="navigator-hover">
						<text class="value">未设置
							<uni-icons type="right" size="15"></uni-icons>
						</text>
					</navigator>
				</view>
			</view>

		</view>

		<!-- 底部操作栏 -->
		<view class="footer">
			<button class="btn draft" @click="saveDraft">保存草稿</button>
			<button class="btn preview" @click="previewNotice">预览</button>
			<button class="btn publish" @click="publishNotice">发布</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeOptions: ['业主大会公告', '物业通知', '活动通知'],
				typeIndex: 0,
				formData: {
					title: '',
					type: '',
					content: '',
					images: []
				},
				userInfo: {
					name: '物业服务中心'
				}
			}
		},
		computed: {
			currentTime() {
				return new Date().toLocaleString()
			}
		},
		methods: {
			handleTypeChange(e) {
				this.typeIndex = e.detail.value
				this.formData.type = this.typeOptions[e.detail.value]
			},
			async chooseImage() {
				try {
					const res = await uni.chooseImage({
						count: 3 - this.formData.images.length,
						sizeType: ['compressed'],
						sourceType: ['album', 'camera']
					})
					this.formData.images = [...this.formData.images, ...res.tempFilePaths]
				} catch (e) {
					console.error(e)
				}
			},
			deleteImage(index) {
				this.formData.images.splice(index, 1)
			},
			previewNotice() {
				if (!this.validateForm()) return
				// 将表单数据存储到本地
				const previewData = {
					title: this.formData.title,
					time: this.currentTime,
					author: this.userInfo.name,
					content: this.formData.content,
					images: this.formData.images,
					type: this.formData.type
				}
				uni.setStorageSync('previewNoticeData', previewData)
				// 跳转到预览页面
				uni.navigateTo({
					url: '/pages/notedetail/notedetail'
				})
			},
			validateForm() {
				if (!this.formData.title) {
					uni.showToast({
						title: '请输入公告标题',
						icon: 'none'
					})
					return false
				}
				if (!this.formData.type) {
					uni.showToast({
						title: '请选择公告类型',
						icon: 'none'
					})
					return false
				}
				if (!this.formData.content) {
					uni.showToast({
						title: '请输入公告内容',
						icon: 'none'
					})
					return false
				}
				return true
			},
			async saveDraft() {
				if (!this.validateForm()) return
				try {
					// TODO: 调用保存草稿接口
					uni.showToast({
						title: '保存成功',
						icon: 'success'
					})
				} catch (e) {
					console.error(e)
				}
			},
			async publishNotice() {
				if (!this.validateForm()) return
				try {
					// TODO: 调用发布接口
					uni.showToast({
						title: '发布成功',
						icon: 'success'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				} catch (e) {
					console.error(e)
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	}

	.form-section {
		background-color: #fff;
		padding: 20rpx 30rpx;
	}

	.form-item {
		margin-bottom: 30rpx;

		padding-right: 30rpx;

		.label {
			display: block;
			font-size: 28rpx;
			color: #333;
			margin-bottom: 15rpx;

			&.required::before {
				content: '';
				margin-right: 0;
			}
		}

		.value {
			font-size: 28rpx;
			color: #666;
		}

		.sub-label {
			font-size: 24rpx;
			color: #999;
			margin-bottom: 15rpx;
			display: block;
		}

		.input {
			width: 100%;
			height: 80rpx;
			background-color: #f8f8f8;
			border-radius: 8rpx;
			padding: 0 30rpx;
			font-size: 28rpx;
			color: #333;
		}

		.textarea {
			width: 100%;
			height: 300rpx;
			background-color: #f8f8f8;
			border-radius: 8rpx;
			padding: 20rpx 30rpx;
			font-size: 28rpx;
			color: #333;
		}

		.word-count {
			text-align: right;
			font-size: 24rpx;
			color: #999;
			margin-top: 10rpx;
			display: block;
		}

		.picker {
			width: 100%;
			height: 80rpx;
			background-color: #f8f8f8;
			border-radius: 8rpx;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;
			color: #333;

			.label {
				margin-bottom: 0;
				color: #333;
			}

			.right-content {
				display: flex;
				align-items: center;
				gap: 10rpx;

				.value {
					color: #666;
				}

				.iconfont {
					color: #999;
					font-size: 24rpx;
				}
			}
		}
	}

	.upload-area {
		.image-list {
			display: flex;
			flex-wrap: wrap;
			gap: 20rpx;

			.image-item {
				width: 200rpx;
				height: 200rpx;
				position: relative;
				border-radius: 8rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}

				.delete-btn {
					position: absolute;
					top: 10rpx;
					right: 10rpx;
					width: 40rpx;
					height: 40rpx;
					background-color: rgba(0, 0, 0, 0.5);
					color: #fff;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;
				}
			}

			.upload-btn {
				width: 200rpx;
				height: 200rpx;
				background-color: #f8f8f8;
				border-radius: 8rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				color: #999;

				.iconfont {
					font-size: 48rpx;
					margin-bottom: 10rpx;
				}

				text {
					font-size: 24rpx;
				}
			}
		}
	}

	.footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		padding: 20rpx 30rpx;
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
		display: flex;
		gap: 20rpx;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

		.btn {
			flex: 1;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 8rpx;
			font-size: 28rpx;

			&.draft {
				background-color: #f5f5f5;
				color: #666;
			}

			&.preview {
				background-color: #E3F2FD;
				color: #2196F3;
			}

			&.publish {
				background-color: #007AFF;
				color: #fff;
			}
		}
	}

	.preview-popup {
		display: none;
	}
</style>