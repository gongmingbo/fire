<template>
	<view class="notice-content-wrapper">
		<!-- 公告标题 -->
		<view class="notice-title">
			<text>{{ title }}</text>
		</view>

		<!-- 公告信息 -->
		<view class="notice-info">
			<text class="time">发布时间：{{ time }}</text>
			<text class="author">发布人：{{ author }}</text>
		</view>

		<!-- 公告内容 -->
		<view class="notice-content">
			<text class="content-text">{{ content }}</text>

			<!-- 公告图片 -->
			<view class="notice-image">
				<view class="image-row" v-for="(row, rowIndex) in imageRows" :key="rowIndex">
					<view class="image-item" v-for="(item, index) in row" :key="index"
						@click="previewImage(rowIndex * 3 + index)">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'NotedetailContent',
	props: {
		title: {
			type: String,
			default: ''
		},
		time: {
			type: String,
			default: ''
		},
		author: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		},
		images: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		imageRows() {
			const rows = [];
			for (let i = 0; i < this.images.length; i += 3) {
				rows.push(this.images.slice(i, i + 3));
			}
			return rows;
		}
	},
	methods: {
		previewImage(index) {
			uni.previewImage({
				urls: this.images,
				current: index
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.notice-content-wrapper {
	.notice-title {
		margin-bottom: 20rpx;

		text {
			font-size: 36rpx;
			font-weight: 600;
			color: #333;
			line-height: 1.4;
		}
	}

	.notice-info {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;

		text {
			font-size: 24rpx;
			color: #999;
		}
	}

	.notice-content {
		.content-text {
			font-size: 28rpx;
			color: #333;
			line-height: 1.8;
			white-space: pre-line;
			margin-bottom: 30rpx;
		}

		.notice-image {
			margin: 20rpx 0;

			.image-row {
				display: flex;
				margin-bottom: 20rpx;

				&:last-child {
					margin-bottom: 0;
				}

				.image-item {
					flex: 1;
					margin-right: 20rpx;
					border-radius: 8rpx;
					overflow: hidden;
					background-color: #f5f5f5;

					&:last-child {
						margin-right: 0;
					}

					image {
						width: 100%;
						height: 200rpx;
						display: block;
					}
				}
			}
		}
	}
}
</style>