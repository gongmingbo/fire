<template>
	<view>
		<!-- 投票类型 -->
		<view class="vote-section">
			<view class="section-header">
				<text class="section-title">投票类型</text>
				<picker mode="selector" :range="voteTypes" @change="handleVoteTypeChange">
					<view class="section-value">
						<text>{{ selectedVoteType || '请选择投票类型' }}</text>
						<uni-icons type="down" size="15" color="#999"></uni-icons>
					</view>
				</picker>
			</view>
			<view class="section-body">
				<view class="rule-box">
					<view class="rule-title">投票生效要求：</view>
					<view class="rule-content">专有部分面积占比达到
						<text class="highlight">2/3</text>
						的业主且人数占比达到2/3的业主参与表决。</view>
				</view>
				<view class="rule-box">
					<view class="rule-title">表决通过要求：</view>
					<view class="rule-content">参与表决专有部分面积超过
						<text class="highlight">1/2</text>
						的业主且参与表决人数超过1/2的业主同意。
					</view>
				</view>
			</view>
		</view>

		<!-- 投票范围-->
		<view class="vote-section">
			<view class="section-header">
				<text class="section-title">投票范围</text>
				<picker mode="selector" :range="voteRanges" @change="handleVoteRangeChange">
					<view class="section-value">
						<text>{{ selectedVoteRange || '请选择投票范围' }}</text>
						<uni-icons type="down" size="15" color="#999"></uni-icons>
					</view>
				</picker>
			</view>
			<view class="section-body">
				<view class="range-box">
					<text>当前投票范围包含</text>
					<text class="highlight">138</text>
					<text>所房屋，专有部分面积总和为</text>
					<text class="highlight">22188.4m²</text>
				</view>
			</view>
		</view>

		<!-- 计票规则（默认） -->
		<view class="vote-section">
			<view class="section-header">
				<text class="section-title">计票规则（默认）</text>
			</view>
			<view class="section-body">
				<view class="rule-box">
					<view class="rule-content">一位业主有多所房屋，投票数计为1，投票面积按多套住宅专有面积累加；一所房屋有多位业主，投票数计为1。</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"voteRemark",
		data() {
			return {
				voteTypes: ['业主大会投票', '物业投票', '活动投票'],
				voteRanges: ['全部楼栋', '1号楼', '2号楼', '3号楼', '4号楼', '5号楼'],
				selectedVoteType: '',
				selectedVoteRange: ''
			};
		},
		methods: {
			handleVoteTypeChange(e) {
				const index = e.detail.value
				this.selectedVoteType = this.voteTypes[index]
				this.$emit('voteTypeChange', this.selectedVoteType)
			},
			handleVoteRangeChange(e) {
				const index = e.detail.value
				this.selectedVoteRange = this.voteRanges[index]
				this.$emit('voteRangeChange', this.selectedVoteRange)
			}
		}
	}
</script>

<style lang="scss" scoped>
.vote-section {
	background-color: #fff;
	margin: 20rpx 0;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 30rpx;
		border-bottom: 1rpx solid #f0f0f0;

		.section-title {
			font-size: 30rpx;
			color: #333;
			font-weight: 500;
		}

		.section-value {
			display: flex;
			align-items: center;
			gap: 8rpx;
			padding: 4rpx 0;

			text {
				font-size: 28rpx;
				color: #666;
			}
		}
	}

	.section-body {
		padding: 24rpx 30rpx;
		background-color: #fafafa;

		.rule-box {
			margin-bottom: 16rpx;

			&:last-child {
				margin-bottom: 0;
			}

			.rule-title {
				font-size: 28rpx;
				color: #333;
				font-weight: 500;
				margin-bottom: 8rpx;
			}

			.rule-content {
				font-size: 26rpx;
				color: #666;
				line-height: 1.6;
			}
		}

		.range-box {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			gap: 8rpx;
			font-size: 26rpx;
			color: #666;

			.highlight {
				color: #007AFF;
				font-weight: 500;
			}
		}
	}
}
</style>