<template>
	<view class="container">
		<!-- 投票设置区域 -->
		<view class="vote-section">
			<view class="section-header">
				<view class="section-left">
					<text class="section-title">投票选项</text>
				</view>
				<view class="section-right">
					<picker mode="selector" :range="voteOptions" @change="handleVoteOptionChange">
						<view class="section-value">
							<text>{{ selectedVoteOption || '请选择投票选项' }}</text>
							<uni-icons type="down" size="15" color="#999"></uni-icons>
						</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="form-section">
			<!-- 投票选项 -->
			<view class="form-item">
				<text class="label required"></text>
				<view class="options-list">
					<view 
						class="option-item" 
						v-for="(item, index) in formData.options" 
						:key="index"
					>
						<text class="option-index">{{index + 1}}</text>
						<input 
							class="option-input" 
							v-model="formData.options[index]" 
							:placeholder="'选项' + (index + 1)"
							maxlength="50"
						/>
						<text 
							class="delete-btn" 
							v-if="formData.options.length > 0"
							@click="deleteOption(index)"
						>删除</text>
					</view>
					<view 
						class="add-option" 
						v-if="formData.options.length < 10"
						@click="addOption"
					>
						<text class="iconfont icon-add"></text>
						<text>+添加选项</text>
					</view>
				</view>
			</view>

			<!-- 投票时间 -->
			<view class="form-item">
				<view class="picker">
					<text class="label">投票时间</text>
					<view class="time-range">
						<picker 
							mode="date" 
							:value="formData.startDate" 
							@change="handleStartDateChange"
						>
							<text class="date">{{ formData.startDate || '开始日期' }}</text>
						</picker>
						<text class="separator">至</text>
						<picker 
							mode="date" 
							:value="formData.endDate" 
							@change="handleEndDateChange"
						>
							<text class="date">{{ formData.endDate || '结束日期' }}</text>
						</picker>
					</view>
				</view>
			</view>
		</view>

		<vote-remark @voteTypeChange="handleVoteTypeChange" @voteRangeChange="handleVoteRangeChange"></vote-remark>

		<!-- 底部操作栏 -->
		<view class="footer">
			<button class="btn cancel" @click="cancelVote">取消</button>
			<button class="btn confirm" @click="confirmVote">确定</button>
		</view>
	</view>
</template>

<script>
import VoteRemark from '@/components/voteRemark.vue'

export default {
	components: {
		VoteRemark
	},
	data() {
		return {
			voteCountOptions: ['1票', '2票', '3票', '4票', '5票'],
			voteCountIndex: 0,
			voteOptions: ['常规投票', '匿名投票', '多选投票', '选举投票'],
			selectedVoteOption: '',
			formData: {
				title: '',
				options: ['', ''],
				startDate: '',
				endDate: '',
				voteCount: '',
				isAnonymous: false
			}
		}
	},
	methods: {
		addOption() {
			if(this.selectedVoteOption =='选举投票'){
				uni.navigateTo({
					url: '/pages/voteperson/voteperson'
				})
				return;
			}

			if (this.formData.options.length < 10) {
				this.formData.options.push('')
			}
		},
		deleteOption(index) {
			if (this.formData.options.length > 0) {
				this.formData.options.splice(index, 1)
			}
		},
		handleStartDateChange(e) {
			this.formData.startDate = e.detail.value
		},
		handleEndDateChange(e) {
			this.formData.endDate = e.detail.value
		},
		handleVoteCountChange(e) {
			this.voteCountIndex = e.detail.value
			this.formData.voteCount = this.voteCountOptions[e.detail.value]
		},
		handleAnonymousChange(e) {
			this.formData.isAnonymous = e.detail.value
		},
		validateForm() {
			if (!this.formData.title) {
				uni.showToast({
					title: '请输入投票标题',
					icon: 'none'
				})
				return false
			}
			if (this.formData.options.some(option => !option)) {
				uni.showToast({
					title: '请填写完整投票选项',
					icon: 'none'
				})
				return false
			}
			if (!this.formData.startDate || !this.formData.endDate) {
				uni.showToast({
					title: '请选择投票时间',
					icon: 'none'
				})
				return false
			}
			if (!this.formData.voteCount) {
				uni.showToast({
					title: '请选择每人可投票数',
					icon: 'none'
				})
				return false
			}
			return true
		},
		cancelVote() {
			uni.navigateBack()
		},
		confirmVote() {
			if (!this.validateForm()) return
			// TODO: 调用保存投票接口
			uni.showToast({
				title: '设置成功',
				icon: 'success'
			})
			setTimeout(() => {
				uni.navigateBack()
			}, 1500)
		},
		handleVoteOptionChange(e) {
			const index = e.detail.value
			this.selectedVoteOption = this.voteOptions[index]
			// TODO: 根据投票选项类型更新表单配置
			switch(this.selectedVoteOption) {
				case '常规投票':
					this.formData.isAnonymous = false
					break
				case '匿名投票':
					this.formData.isAnonymous = true
					break
				case '多选投票':
					// 设置多选相关配置
					break
				case '评分投票':
					// 设置评分相关配置
					break
			}
		},
		handleVoteTypeChange(type) {
			console.log('投票类型变更:', type)
		},
		handleVoteRangeChange(range) {
			console.log('投票范围变更:', range)
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
.vote-section {
	background-color: #fff;
	 padding: 10rpx 20rpx;
	margin-bottom: 20rpx;

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.section-left {
			.section-title {
				font-size: 32rpx;
				color: #333;
				font-weight: 500;
			}
		}

		.section-right {
			.section-value {
				display: flex;
				align-items: center;
				gap: 10rpx;
				padding: 10rpx 20rpx;
				background-color: #f8f8f8;
				border-radius: 6rpx;

				text {
					font-size: 28rpx;
					color: #333;
				}
			}
		}
	}
}
.form-section {
	background-color: #fff;
	padding: 20rpx 30rpx;
}

.form-item {
	margin-bottom: 30rpx;

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

	.input {
		width: 100%;
		height: 80rpx;
		background-color: #f8f8f8;
		border-radius: 8rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
		color: #333;
	}

	.options-list {
		.option-item {
			display: flex;
			align-items: center;
			gap: 20rpx;
			margin-bottom: 20rpx;

			.option-index {
				width: 40rpx;
				height: 40rpx;
				background-color: #f5f5f5;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				color: #666;
			}

			.option-input {
				flex: 1;
				height: 80rpx;
				background-color: #f8f8f8;
				border-radius: 8rpx;
				padding: 0 30rpx;
				font-size: 28rpx;
				color: #333;
			}

			.delete-btn {
				width: 80rpx;
				height: 40rpx;
				background-color: #f5f5f5;
				color: #ff4d4f;
				border-radius: 4rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				white-space: nowrap;
			}
		}

		.add-option {
			height: 80rpx;
			background-color: #f8f8f8;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10rpx;
			color: #007AFF;

			.iconfont {
				font-size: 32rpx;
			}

			text {
				font-size: 28rpx;
			}
		}
	}

	.picker {
		width: 100%;
		background-color: #f8f8f8;
		border-radius: 8rpx;
		padding: 20rpx 30rpx;

		.label {
			margin-bottom: 20rpx;
		}

		.time-range {
			display: flex;
			align-items: center;
			gap: 20rpx;

			.date {
				flex: 1;
				height: 60rpx;
				line-height: 60rpx;
				background-color: #fff;
				border-radius: 6rpx;
				padding: 0 20rpx;
				font-size: 28rpx;
				color: #333;
			}

			.separator {
				color: #999;
				font-size: 28rpx;
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

		&.cancel {
			background-color: #f5f5f5;
			color: #666;
		}

		&.confirm {
			background-color: #007AFF;
			color: #fff;
		}
	}
}
</style>