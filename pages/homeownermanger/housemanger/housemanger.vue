<template>
	<view class="container">
		<view class="info-card">
			<view class="info-item">
				<text class="info-label">小区建成年份</text>
				<view class="input-container">
					<!-- 年份选择器 -->
					<picker mode="selector" :range="yearRange" :value="yearIndex" @change="onYearChange"
						@cancel="hidePicker" class="year-picker">
						<view class="picker-view">
							<text>{{ communityInfo.buildYear || '输入年份' }}</text>
							<uni-icons type="down" size="15"></uni-icons>
							<text class="unit-text">年</text>
						</view>
					</picker>
				</view>
			</view>


			<view class="info-item">
				<text class="info-label">住宅数量</text>
				<view class="input-container">
					<input class="info-input" type="number" v-model="communityInfo.houseCount" placeholder="请输入住宅数量" />
					<text class="unit-text">套</text>
				</view>
			</view>
			<view class="info-item">
				<text class="info-label">住宅面积</text>
				<view class="input-container">
					<input class="info-input" type="number" v-model="communityInfo.totalArea" placeholder="请输入住宅面积" />
					<text class="unit-text">平方米</text>
				</view>
			</view>
			<view class="info-item">
				<text class="info-label">业主数量</text>
				<view class="input-container">
					<input class="info-input" type="number" v-model="communityInfo.ownerCount" placeholder="请输入业主数量" />
					<text class="unit-text">人</text>
				</view>
			</view>
			<view class="info-item">
				<text class="info-label">物业费标准</text>
				<view class="input-container">
					<input class="info-input" type="digit" v-model="communityInfo.propertyFee" placeholder="请输入物业费标准" />
					<text class="unit-text">元/平方米/月</text>
				</view>
			</view>
		</view>
		<view class="footer">
			<button class="save-btn" @click="saveInfo">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentYear = new Date().getFullYear();
			const startYear = 1980;
			const yearRange = [];
			for (let i = currentYear; i >= startYear; i--) {
				yearRange.push(i);
			}

			return {
				communityInfo: {
					buildYear: '2022',
					houseCount: 568,
					totalArea: 85600,
					ownerCount: 532,
					propertyFee: 2.5
				},
				yearRange: yearRange,
				showPicker: false,
				yearIndex: 0
			}
		},
		methods: {
			saveInfo() {
				// 保存信息的逻辑
				uni.showToast({
					title: '保存成功',
					icon: 'success'
				});

				// 这里可以添加将数据提交到服务器的代码
				console.log('保存的数据：', this.communityInfo);
			},

			// 显示年份选择器
			showYearPicker() {
				// 设置当前选中的年份索引
				console.log('当前选中的年份：', this.communityInfo.buildYear);
				const currentYear = this.communityInfo.buildYear;
				this.yearIndex = this.yearRange.findIndex(year => year.toString() === currentYear);
				if (this.yearIndex === -1) this.yearIndex = 0;

				// 显示选择器
				this.showPicker = true;
				console.log('showPicker', this.showPicker);
			},

			// 隐藏年份选择器
			hidePicker() {
				this.showPicker = false;
			},

			// 年份选择变化处理
			onYearChange(e) {
				const index = e.detail.value;
				const selectedYear = this.yearRange[index];
				this.communityInfo.buildYear = selectedYear.toString();
				this.showPicker = false;
			}
		}
	}
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		background-color: #f5f6fa;
		padding: 20rpx;

		.picker-view {
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}

		.info-card {
			background-color: #fff;
			border-radius: 12rpx;
			padding: 30rpx;
			margin-bottom: 30rpx;
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);

			.info-item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #f5f5f5;
				align-items: center;

				&:last-child {
					border-bottom: none;
				}

				.info-label {
					color: #666;
					font-size: 28rpx;
				}

				.input-container {
					display: flex;
					align-items: center;
					width: 60%;
					justify-content: flex-end;

					.info-input {
						color: #333;
						font-size: 28rpx;
						font-weight: bold;
						text-align: right;
						width: 50%;
						height: 60rpx;
					}

					.icon-wrapper {
						margin: 0 5rpx;
						padding: 5rpx;
					}

					.unit-text {
						color: #666;
						font-size: 28rpx;
						margin-left: 10rpx;
						white-space: nowrap;
					}
				}
			}
		}

		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #fff;
			box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
			z-index: 999;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 0;

			.save-btn {
				width: 90%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background-color: #007AFF;
				color: #fff;
				border-radius: 40rpx;
				font-size: 30rpx;
				font-weight: bold;
				margin: 0 auto;
				padding: 0;

				&:active {
					opacity: 0.8;
				}

				&::after {
					border: none;
				}
			}
		}
	}
</style>