<template>
	<view class="container">
		<!-- 使用 NotedetailContent 组件 -->
		<notedetail-content :title="title" :time="time" :author="author" :content="content"
			:images="images"></notedetail-content>

		<!-- 投票状态显示 -->
		<view v-if="isVoteEnded" class="vote-ended">
			<!-- 投票已截止提示 -->
			<view class="vote-ended-tip">
				<text>投票已截止</text>
			</view>

			<!-- 投票结果统计 -->
			<view class="vote-result">
				<view class="result-item" v-for="(item, index) in voteResults" :key="index">
					<text class="option">{{item.option}}</text>
					<view class="stats">
						<text>业主票：{{item.ownerCount}}</text>
						<text>专有面积票：{{item.areaCount}}m²</text>
					</view>
				</view>
			</view>

			<!-- 投票结果分析 -->
			<view class="vote-analysis">
				<text class="title">投票结果分析</text>
				<text class="content">投票结果有效，原因如下：</text>
				<view class="analysis-item">
					<text>1. 投票人数（{{totalVoters}}）超过总业主数量2/3</text>
				</view>
				<view class="analysis-item">
					<text>2. 投票面积（{{totalArea}}m²）占比超过总专有面积2/3</text>
				</view>
			</view>
		</view>

		<!-- 投票进行中显示 -->
		<view v-if="!isVoteEnded">
			<!-- 投票倒计时 -->
			<view class="countdown-section">
				<text>距投票截止还剩：</text>
				<text class="countdown">{{ countdown.days }} 天 {{ countdown.hours }} 时 {{ countdown.minutes }} 分
					{{ countdown.seconds }} 秒</text>
			</view>

			<!-- 投票选项 -->
			<view class="vote-section">
				<view class="vote-section-title">
					<view class="vote-title">请选择您的投票选项：</view>
					<view class="vote-mark" @click="showVoteRemarkMode">投票说明</view>
				</view>
				<radio-group @change="handleVoteChange">
					<label class="vote-option" v-for="(option, index) in voteOptions" :key="index">
						<radio :value="option.value" :checked="selectedVote === option.value" />
						<image :src="option.image" mode="aspectFill" class="vote-option-image"></image>
						<text>{{ option.label }}</text>
						<view class="vote-option-image-detail" @click="showPersonMode()">详情</view>
					</label>
				</radio-group>
			</view>

			<!-- 签名区域 -->
			<view class="signature-section">
				<view class="signature-title">请在此处签名：</view>
				<canvas canvas-id="signature" class="signature-canvas" @touchstart="touchStart" @touchmove="touchMove"
					@touchend="touchEnd">
				</canvas>
				<view class="signature-actions">
					<button @click="clearSignature">清除签名</button>
					<button @click="saveSignature">投票</button>
				</view>
			</view>
		</view>

		<!-- 投票说明弹框 -->
		<view class="vote-remark-popup" v-if="showVoteRemark" @click.stop="closeVoteRemark">
			<view class="popup-content" @click.stop>
				<view class="popup-header">
					<text class="popup-title">投票说明</text>
					<text class="close-btn" @click="closeVoteRemark">×</text>
				</view>
				<view class="popup-body">
					<vote-remark></vote-remark>
				</view>
			</view>
		</view>

		<!-- 候选人弹窗 -->
		<view class="candidate-popup" v-if="showCandidate" @click.stop="closeCandidate">
			<view class="candidate-content" @click.stop>
				<view class="candidate-header">
					<text class="candidate-title">候选人详情</text>
					<text class="close-btn" @click="closeCandidate">×</text>
				</view>
				<view class="candidate-body">
					<!-- 图片部分 -->
					<view class="candidate-image-section">
						<image :src="currentCandidate.image" mode="aspectFill" class="candidate-image"></image>
					</view>
					<!-- 姓名部分 -->
					<view class="candidate-name-section">
						<text class="candidate-name">{{currentCandidate.name}}</text>
					</view>
					<!-- 介绍部分 -->
					<view class="candidate-intro-section">
						<text class="candidate-intro">{{currentCandidate.introduction}}</text>
					</view>
					<view class="candidate-button-section">
						<button class="candidate-button">下一位</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NotedetailContent from '@/components/NotedetailContent.vue'
	import VoteRemark from '@/components/voteRemark.vue'

	export default {
		components: {
			NotedetailContent,
			VoteRemark
		},
		data() {
			return {
				title: '关于小区物业费调整的通知',
				time: '2024-03-15',
				author: '物业服务中心',
				content: '尊敬的业主：\n\n根据小区实际情况和物业服务成本的变化，经业主委员会讨论决定，自2024年4月1日起，小区物业费将进行适当调整。具体调整方案如下：\n\n1. 住宅物业费由原来的1.5元/平方米/月调整为1.6元/平方米/月\n2. 商铺物业费由原来的2.0元/平方米/月调整为2.2元/平方米/月\n3. 地下车位管理费维持不变，仍为80元/月\n\n此次调整主要考虑到：\n1. 人工成本上涨\n2. 设备维护费用增加\n3. 小区环境改善需求\n\n物业服务中心将一如既往地提供优质服务，确保小区环境整洁、安全有序。如有任何疑问，请随时联系物业服务中心。\n\n感谢您的理解与支持！\n\n物业服务中心\n2024年3月15日',
				images: [
					'/static/9.jpg',
					'/static/image.png',
					'/static/image.png',
					'/static/image.png',
					'/static/image.png'
				],
				countdown: {
					days: 0,
					hours: 12,
					minutes: 20,
					seconds: 9
				},
				voteOptions: [{
						label: '同意',
						image: '/static/image.png',
						value: 'agree'
					},
					{
						label: '不同意',
						image: '/static/image.png',
						value: 'disagree'
					},
					{
						label: '弃权',
						image: '/static/image.png',
						value: 'abstain'
					}
				],
				selectedVote: '',
				ctx: null,
				points: [],
				isDrawing: false,
				isVoteEnded: false,
				voteResults: [{
						option: '1、同意',
						ownerCount: 75,
						areaCount: 560
					},
					{
						option: '2、不同意',
						ownerCount: 75,
						areaCount: 560
					},
					{
						option: '3、弃权',
						ownerCount: 75,
						areaCount: 560
					}
				],
				totalVoters: 75,
				totalArea: 560,
				showVoteRemark: false,
				showCandidate: false,
				currentCandidate: {
					name: '张三',
					image: '/static/image.png',
					introduction: '候选人介绍内容候选人介绍内容候选人'+
					'介绍内容候选人介绍内容候选人介绍内容候选人介绍内'+
					'容候选人介绍内容候选人介绍内容候选人介绍内容候选'+
					'人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选'+
					'人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容...'
				}
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
		onLoad(options) {
			this.noticeId = options.id
			this.isVoteEnded = options.read === 'true' || options.read === true
			console.log('投票状态:', this.isVoteEnded)
			this.$nextTick(() => {
				this.initSignature()
			})
		},
		methods: {
			handleVoteChange(e) {
				this.selectedVote = e.detail.value
			},
			initSignature() {
				const query = uni.createSelectorQuery().in(this)
				query.select('.signature-canvas')
					.fields({
						node: true,
						size: true
					})
					.exec((res) => {
						if (!res[0] || !res[0].node) {
							console.error('Canvas not found')
							return
						}

						const canvas = res[0].node
						const ctx = canvas.getContext('2d')

						// 设置canvas大小
						const dpr = uni.getSystemInfoSync().pixelRatio
						canvas.width = res[0].width * dpr
						canvas.height = res[0].height * dpr
						ctx.scale(dpr, dpr)

						// 设置画笔样式
						ctx.strokeStyle = '#000'
						ctx.lineWidth = 2
						ctx.lineCap = 'round'
						ctx.lineJoin = 'round'

						this.ctx = ctx
					})
			},
			touchStart(e) {
				if (!this.ctx) return

				this.isDrawing = true
				const point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				this.points = [point]

				this.ctx.beginPath()
				this.ctx.moveTo(point.x, point.y)
			},
			touchMove(e) {
				if (!this.isDrawing || !this.ctx) return

				const point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}

				this.ctx.lineTo(point.x, point.y)
				this.ctx.stroke()
			},
			touchEnd() {
				this.isDrawing = false
				this.points = []
			},
			clearSignature() {
				if (!this.ctx) return

				const canvas = this.ctx.canvas
				this.ctx.clearRect(0, 0, canvas.width, canvas.height)
			},
			saveSignature() {
				if (!this.ctx) return
				console.log(this.ctx)
				// 这里可以添加保存签名的逻辑
				uni.showToast({
					title: '签名已保存',
					icon: 'success'
				})
			},
			previewImage(index) {
				uni.previewImage({
					urls: this.images,
					current: index
				});
			},
			showVoteRemarkMode() {
				this.showVoteRemark = true
				console.log(this.showVoteRemark)
			},
			closeVoteRemark() {
				this.showVoteRemark = false
			},
			showCandidateDetail(candidate) {
				this.currentCandidate = candidate
				this.showCandidate = true
			},
			closeCandidate() {
				this.showCandidate = false
			},

			showPersonMode(){
				this.showCandidate = true
			}
		}
	}
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		background-color: #fff;
		padding: 30rpx;
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	}

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

	.countdown-section {
		background-color: #FFF9C4;
		padding: 20rpx;
		border-radius: 8rpx;
		margin: 30rpx 0;
		text-align: center;

		text {
			font-size: 28rpx;
			color: #333;

			&.countdown {
				font-weight: bold;
				margin-left: 10rpx;
			}
		}
	}

	.vote-section {
		margin: 30rpx 0;

		.vote-section-title {
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			.vote-mark{
				color: #007AFF;
			}
		}

		.vote-title {
			font-size: 28rpx;
			color: #333;
			margin-bottom: 20rpx;
		}

		.vote-option {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			position: relative;

			text {
				font-size: 28rpx;
				color: #333;
				margin-left: 10rpx;
			}

			.vote-option-image {
				width: 50rpx;
				height: 30rpx;
			}

			.vote-option-image-detail {
				position: absolute;
				right: 0;
				color: #007AFF;
				font-size: 28rpx;
			}
		}
	}

	.signature-section {
		margin: 30rpx 0;

		.signature-title {
			font-size: 28rpx;
			color: #333;
			margin-bottom: 20rpx;
		}

		.signature-canvas {
			width: 100%;
			height: 400rpx;
			background-color: #fff;
			border: 1px solid #ddd;
			border-radius: 8rpx;
		}

		.signature-actions {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;

			button {
				width: 45%;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				border-radius: 8rpx;

				&:first-child {
					background-color: #f5f5f5;
					color: #666;
				}

				&:last-child {
					background-color: #007AFF;
					color: #fff;
				}
			}
		}
	}

	.vote-ended {
		.vote-ended-tip {
			background-color: #FFF9C4;
			padding: 20rpx;
			border-radius: 8rpx;
			text-align: center;
			margin: 30rpx 0;

			text {
				font-size: 28rpx;
				color: #FF9800;
				font-weight: bold;
			}
		}

		.vote-result {
			background-color: #fff;
			border-radius: 8rpx;
			padding: 20rpx;
			margin-bottom: 30rpx;

			.result-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;
				padding: 20rpx;
				background-color: #f8f8f8;
				border-radius: 8rpx;

				&:last-child {
					margin-bottom: 0;
				}

				.option {
					font-size: 28rpx;
					color: #333;
					font-weight: 500;
				}

				.stats {
					display: flex;
					flex-direction: column;
					align-items: flex-end;

					text {
						font-size: 26rpx;
						color: #666;
						line-height: 1.6;

						&:first-child {
							margin-bottom: 8rpx;
						}
					}
				}
			}
		}

		.vote-analysis {
			background-color: #fff;
			border-radius: 8rpx;
			padding: 20rpx;

			.title {
				font-size: 28rpx;
				color: #333;
				font-weight: 500;
				margin-bottom: 20rpx;
				display: block;
			}

			.content {
				font-size: 26rpx;
				color: blue;
				margin-bottom: 20rpx;
				display: block;
			}

			.analysis-item {
				margin-bottom: 10rpx;

				text {
					font-size: 26rpx;
					color: #666;
				}
			}
		}
	}

	.vote-remark-popup {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;

		.popup-content {
			width: 90%;
			max-height: 90vh;
			background-color: #fff;
			border-radius: 12rpx;
			overflow: hidden;
			display: flex;
			flex-direction: column;

			.popup-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 24rpx 30rpx;
				border-bottom: 1rpx solid #f0f0f0;

				.popup-title {
					font-size: 32rpx;
					color: #333;
					font-weight: 500;
				}

				.close-btn {
					font-size: 40rpx;
					color: #999;
					padding: 0 20rpx;
				}
			}

			.popup-body {
				flex: 1;
				overflow-y: auto;
				padding: 20rpx;
			}
		}
	}

	.vote-mark {
		color: #007AFF;
		cursor: pointer;
	}

	.candidate-popup {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;

		.candidate-content {
			width: 90%;
			max-height: 90vh;
			background-color: #fff;
			border-radius: 12rpx;
			overflow: hidden;
			display: flex;
			flex-direction: column;

			.candidate-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 24rpx 30rpx;
				border-bottom: 1rpx solid #f0f0f0;

				.candidate-title {
					font-size: 32rpx;
					color: #333;
					font-weight: 500;
				}

				.close-btn {
					font-size: 40rpx;
					color: #999;
					padding: 0 20rpx;
				}
			}

			.candidate-body {
				flex: 1;
				overflow-y: auto;
				padding: 30rpx;

				.candidate-image-section {
					display: flex;
					justify-content: center;
					margin-bottom: 30rpx;

					.candidate-image {
						width: 200rpx;
						height: 200rpx;
					
						object-fit: cover;
					}
				}
				// 
				.candidate-button{
						background-color: #007AFF;
						color: #fff;
						width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						border-radius: 8rpx;
						font-size: 28rpx;
						transition: all 0.3s ease;
						
						&.button-hover {
							background-color: #0056b3;
							transform: scale(0.98);
						}
					}
				// 


		

				.candidate-name-section {
					text-align: center;
					margin-bottom: 30rpx;

					.candidate-name {
						font-size: 36rpx;
						color: #333;
						font-weight: 500;
					}
				}

				.candidate-intro-section {
					text-align: center;

					.candidate-intro {
						font-size: 28rpx;
						color: #666;
						line-height: 1.6;
					}
				}
			}
		}
	}
</style>