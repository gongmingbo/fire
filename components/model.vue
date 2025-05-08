<template>
	<view class="area-popup" v-if="show">
		<view class="popup-content" :class="{ 'action-popup': type === 'action' }">
			<!-- 表单类型弹窗 -->
			<template v-if="type === 'form'">
				<view class="popup-title">{{ title }}</view>
				<view class="form-item" v-for="(item, index) in formItems" :key="index">
					<text class="form-item-label">{{ item.label }}</text>
					<input 
						:type="item.type || 'text'" 
						v-model="item.value" 
						class="area-input" 
						:placeholder="item.placeholder" 
					/>
				</view>
				<view class="popup-buttons">
					<button class="cancel-btn" @click="handleCancel">取消</button>
					<button class="submit-btn" @click="handleSubmit">提交</button>
				</view>
			</template>

			<!-- 操作列表类型弹窗 -->
			<template v-if="type === 'action'">
				<view class="action-list">
					<view 
						class="action-item" 
						v-for="(item, index) in actionItems" 
						:key="index"
						:class="{ 'cancel': item.type === 'cancel' }"
						@click="handleAction(item)"
					>
						<text class="action-text">{{ item.text }}</text>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
export default {
	name: 'Model',
	props: {
		show: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: 'form',
			validator: value => ['form', 'action'].includes(value)
		},
		title: {
			type: String,
			default: ''
		},
		formItems: {
			type: Array,
			default: () => []
		},
		actionItems: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		handleCancel() {
			this.$emit('cancel')
		},
		handleSubmit() {
			this.$emit('submit', this.formItems)
		},
		handleAction(item) {
			if (item.type === 'cancel') {
				this.handleCancel()
			} else {
				this.$emit('action', item)
			}
		}
	}
}
</script>

<style lang="scss">
.area-popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;

	.popup-content {
		width: 560rpx;
		background: #fff;
		border-radius: 12rpx;
		overflow: hidden;

		&.action-popup {
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			border-radius: 24rpx 24rpx 0 0;
		}

		.popup-title {
			font-size: 32rpx;
			color: #333;
			text-align: center;
			padding: 30rpx 0;
			font-weight: 500;
			border-bottom: 2rpx solid #f0f0f0;
		}

		.form-item {
			padding: 30rpx;
			display: flex;
			align-items: flex-start;
			border-bottom: 2rpx solid #f0f0f0;
			flex-direction: column;
			.form-item-label{
				margin-bottom: 30rpx;
			}

			.area-input {
				flex: 1;
				height: 60rpx;
				font-size: 28rpx;
				color: #333;
				width: 100%;
				border-bottom: 1rpx solid rgb(116, 109, 109);
			}
		}

		.popup-buttons {
			display: flex;
			padding: 20rpx;

			button {
				flex: 1;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				border-radius: 8rpx;
				margin: 0 10rpx;

				&.cancel-btn {
					background: #f5f5f5;
					color: #666;
				}

				&.submit-btn {
					background: #007AFF;
					color: #fff;
				}

				&:active {
					opacity: 0.8;
				}
			}
		}

		.action-list {
			.action-item {
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-bottom: 2rpx solid #f0f0f0;
				background: #fff;

				&:active {
					background: #f5f5f5;
				}

				&.cancel {
					margin-top: 20rpx;
					border-bottom: none;
				}

				.action-text {
					font-size: 32rpx;
					color: #333;
				}
			}
		}
	}
}
</style>