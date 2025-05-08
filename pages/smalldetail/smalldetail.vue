<template>
	<view class="container">
		<!-- 动态详情 -->
		<view class="moment-detail">
			<!-- 用户信息 -->
			<view class="user-info">
				<image class="avatar" :src="momentDetail.avatar" mode="aspectFill"></image>
				<view class="info">
					<text class="name">{{momentDetail.name}}</text>
					<text class="time">{{momentDetail.time}}</text>
				</view>
			</view>
			
			<!-- 动态内容 -->
			<view class="content">
				<text>{{momentDetail.content}}</text>
			</view>
			
			<!-- 图片列表 -->
			<view class="image-list" v-if="momentDetail.images && momentDetail.images.length">
				<image 
					v-for="(img, imgIndex) in momentDetail.images" 
					:key="imgIndex"
					:src="img"
					mode="aspectFill"
					@click="previewImage(momentDetail.images, imgIndex)"
				></image>
			</view>
			
			<!-- 操作栏 -->
			<view class="action-bar">
				<view class="action-item left">
					<text>全部评论</text>
					<uni-icons type="chat" size="16" color="#999"></uni-icons>
					<text class="comment-count">{{totalComments}}</text>
				</view>
				<!-- 点赞 -->
				<view class="action-item right" @click="toggleLike">
					<uni-icons 
						type="heart" 
						size="16" 
						:color="momentDetail.isLiked ? '#ff4d4f' : '#999'"
					></uni-icons>
					<text :class="['like-count', momentDetail.isLiked ? 'liked' : '']">
						{{momentDetail.likeCount}}
					</text>
				</view>
			</view>
		</view>
		
		<!-- 评论列表 -->
		<view class="comment-list">
			<view class="comment-item" v-for="(comment, index) in commentList" :key="index">
				<image class="avatar" :src="comment.avatar" mode="aspectFill"></image>
				<view class="comment-content">
					<view class="comment-header">
						<text class="name">{{comment.name}}</text>
						<text class="time">{{comment.time}}</text>
					</view>
					<view class="comment-text">
						<text>{{comment.content}}</text>
					</view>
					<view class="comment-actions">
						<text class="action" @click="replyComment(index)">回复</text>
						<text class="action" @click="likeComment(index)">
							{{comment.isLiked ? '取消点赞' : '点赞'}}
						</text>
					</view>
					<!-- 回复列表 -->
					<view class="reply-list" v-if="comment.replies && comment.replies.length">
						<view class="reply-item" v-for="(reply, replyIndex) in comment.replies" :key="replyIndex">
							<text class="name">{{reply.fromName}}</text>
							<text v-if="reply.toName" class="reply-to">回复</text>
							<text v-if="reply.toName" class="name">{{reply.toName}}</text>
							<text class="content">：{{reply.content}}</text>
						</view>
					</view>
					<!-- 回复输入框 -->
					<view class="reply-input" v-if="currentReplyIndex === index">
						<input 
							type="text" 
							v-model="replyText" 
							:placeholder="`回复 ${comment.name}`"
							@confirm="submitReply(index)"
							focus
						/>
						<button class="submit-btn" @click="submitReply(index)">发送</button>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 评论输入框 -->
		<view class="comment-input">
			<input 
				type="text" 
				v-model="commentText" 
				:placeholder="inputPlaceholder"
				@confirm="submitComment"
				focus
			/>
			<button class="submit-btn" @click="submitComment">发送</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			momentId: '',
			commentText: '',
			replyText: '',
			inputPlaceholder: '评论',
			currentReplyIndex: -1,
			momentDetail: {
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
			commentList: [
				{
					id: 1,
					name: '李四',
					avatar: '/static/image.png',
					time: '5分钟前',
					content: '是啊，阳光明媚！',
					isLiked: false,
					replies: [
						{
							fromName: '王五',
							toName: '李四',
							content: '一起去爬山吧！'
						}
					]
				},
				{
					id: 2,
					name: '王五',
					avatar: '/static/image.png',
					time: '2分钟前',
					content: '看起来很好吃！',
					isLiked: true,
					replies: []
				}
			]
		}
	},
	onLoad(options) {
		this.momentId = options.id
		// 这里可以根据id获取动态详情和评论列表
	},
	methods: {
		// 预览图片
		previewImage(images, current) {
			uni.previewImage({
				urls: images,
				current: current
			})
		},
		
		// 点赞/取消点赞动态
		toggleLike() {
			this.momentDetail.isLiked = !this.momentDetail.isLiked
			if (this.momentDetail.isLiked) {
				this.momentDetail.likeCount++
			} else {
				this.momentDetail.likeCount--
			}
		},
		
		// 点赞/取消点赞评论
		likeComment(index) {
			const comment = this.commentList[index]
			comment.isLiked = !comment.isLiked
		},
		
		// 回复评论
		replyComment(index) {
			this.currentReplyIndex = index
			this.replyText = ''
		},
		
		// 提交回复
		submitReply(index) {
			if (!this.replyText.trim()) {
				uni.showToast({
					title: '请输入回复内容',
					icon: 'none'
				})
				return
			}
			
			const comment = this.commentList[index]
			if (!comment.replies) {
				comment.replies = []
			}
			comment.replies.push({
				fromName: '当前用户',
				toName: comment.name,
				content: this.replyText
			})
			
			this.replyText = ''
			this.currentReplyIndex = -1
		},
		
		// 提交评论
		submitComment() {
			if (!this.commentText.trim()) {
				uni.showToast({
					title: '请输入评论内容',
					icon: 'none'
				})
				return
			}
			
			if (this.currentReplyIndex === -1) {
				// 添加新评论
				this.commentList.unshift({
					id: Date.now(),
					name: '当前用户',
					avatar: '/static/image.png',
					time: '刚刚',
					content: this.commentText,
					isLiked: false,
					replies: []
				})
			} else {
				// 添加回复
				const comment = this.commentList[this.currentReplyIndex]
				if (!comment.replies) {
					comment.replies = []
				}
				comment.replies.push({
					fromName: '当前用户',
					toName: comment.name,
					content: this.commentText
				})
			}
			
			this.commentText = ''
			this.currentReplyIndex = -1
			this.inputPlaceholder = '评论'
		}
	},
	computed: {
		// 计算总评论数（包括回复）
		totalComments() {
			let count = this.commentList.length
			this.commentList.forEach(comment => {
				if (comment.replies) {
					count += comment.replies.length
				}
			})
			return count
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

.moment-detail {
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
		justify-content: space-between;
		padding: 16rpx 0;
		border-bottom: 1rpx solid #f0f0f0;
		
		.action-item {
			display: flex;
			align-items: center;
			
			text {
				font-size: 26rpx;
				color: #999;
				margin: 0 8rpx;
			}
			
			.like-count, .comment-count {
				&.liked {
					color: #ff4d4f;
				}
			}
		}
	}
}

.comment-list {
	background-color: #fff;
	border-radius: 12rpx;
	padding: 20rpx;
	
	.comment-item {
		display: flex;
		margin-bottom: 20rpx;
		
		.avatar {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			margin-right: 16rpx;
		}
		
		.comment-content {
			flex: 1;
			
			.comment-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 8rpx;
				
				.name {
					font-size: 28rpx;
					color: #007AFF;
				}
				
				.time {
					font-size: 24rpx;
					color: #999;
				}
			}
			
			.comment-text {
				font-size: 28rpx;
				color: #333;
				line-height: 1.5;
				margin-bottom: 8rpx;
			}
			
			.comment-actions {
				display: flex;
				margin-bottom: 8rpx;
				
				.action {
					font-size: 24rpx;
					color: #999;
					margin-right: 20rpx;
				}
			}
			
			.reply-list {
				background-color: #f5f5f5;
				border-radius: 8rpx;
				padding: 12rpx;
				
				.reply-item {
					font-size: 26rpx;
					line-height: 1.5;
					margin-bottom: 8rpx;
					
					.name {
						color: #007AFF;
					}
					
					.reply-to {
						color: #666;
						margin: 0 8rpx;
					}
					
					.content {
						color: #333;
					}
				}
			}
		}
	}
}

.comment-input {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	padding: 20rpx;
	display: flex;
	align-items: center;
	box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
	z-index: 999;
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	
	input {
		flex: 1;
		height: 72rpx;
		background-color: #f5f5f5;
		border-radius: 36rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
		margin-right: 20rpx;
	}
	
	.submit-btn {
		width: 120rpx;
		height: 72rpx;
		line-height: 72rpx;
		background-color: #007AFF;
		color: #fff;
		font-size: 28rpx;
		border-radius: 36rpx;
	}
}

.reply-input {
	display: flex;
	align-items: center;
	margin-top: 16rpx;
	padding: 16rpx;
	background-color: #f5f5f5;
	border-radius: 8rpx;
	
	input {
		flex: 1;
		height: 60rpx;
		background-color: #fff;
		border-radius: 30rpx;
		padding: 0 20rpx;
		font-size: 26rpx;
		margin-right: 16rpx;
	}
	
	.submit-btn {
		width: 100rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #007AFF;
		color: #fff;
		font-size: 26rpx;
		border-radius: 30rpx;
	}
}
</style>
