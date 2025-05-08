<template>
	<view class="container">
		<view class="header">
			<button class="add-room-btn" @click="addRoom()">+ 添加房屋</button>
		</view>
		
		<view class="content">
			<view class="info-card" v-for="(item, index) in roomList" :key="index">
				<view class="title-row">
					<text class="building-name">{{ item.name }}</text>
					<text class="building-stats" :class="{ 'verified': item.isVerified }">
						{{ item.isVerified ? '已认证' : '未认证' }}
					</text>
				</view>
				<view class="info-list">
					<view class="info-item">
						<text class="owner-name">业主：</text>
						<text class="building-stats">{{ item.owner || '暂无' }}</text>
					</view>
					<view class="info-item">
						<text class="owner-name">房屋专有面积：</text>
						<text class="building-stats">{{ item.area }}m²</text>
					</view>
					<view class="info-item">
						<text class="owner-name">所属楼层：</text>
						<text class="building-stats">{{ item.floor }}楼</text>
					</view>
				</view>
				
				<view class="action-row">
					<button class="action-btn" @click="showPopup = true">操作</button>
				</view>
			</view>
		</view>
		
		<model :show="showAreaPopup" type="form" title="添加房屋" :formItems="formItems" @cancel="closeAreaPopup"
			@submit="submitAreaCorrection" />
	</view>


	<!-- 使用操作弹框组件 -->
	<model :show="showPopup" type="action" :actionItems="actionItems" @cancel="closePopup" @action="handleAction" />
</template>

<script>
	import Model from '@/components/model.vue'

	export default {
		components: {
			Model
		},
		data() {
			return {
				showAreaPopup: false,
				showPopup: false,
				roomList: [
					{
						name: '怡景苑1栋101',
						isVerified: true,
						owner: '张三',
						area: '125.23',
						floor: '10'
					},
					{
						name: '怡景苑1栋102',
						isVerified: false,
						owner: '李四',
						area: '98.56',
						floor: '10'
					},
					{
						name: '怡景苑1栋103',
						isVerified: true,
						owner: '王五',
						area: '135.78',
						floor: '10'
					}
				],
				formItems: [{
						type: 'text',
						value: '',
						label: '房屋名称',
						placeholder: '请输入'
					},
					{
						type: 'text',
						value: '',
						label: '房屋专有面积',
						placeholder: '请输入'
					}
				],
				actionItems: [{
						text: '修改房屋信息',
						type: 'edit'
					},
					{
						text: '删除房屋',
						type: 'delete'
					},
					{
						text: '解除业主认证',
						type: 'deleteAuth'
					},
					{
						text: '取消',
						type: 'cancel'
					}
				]
			}
		},
		methods: {
			addRoom() {
				this.showAreaPopup = true
			},
			closeAreaPopup() {
				this.showAreaPopup = false
			},
			submitAreaCorrection(formItems) {
				// 验证表单数据
				if (!formItems[0].value) {
					uni.showToast({
						title: '请输入房屋名称',
						icon: 'none'
					})
					return
				}
				if (!formItems[1].value) {
					uni.showToast({
						title: '请输入房屋专有面积',
						icon: 'none'
					})
					return
				}

				// 提交数据
				console.log('提交的表单数据：', formItems)
				// TODO: 调用添加房屋接口

				this.showAreaPopup = false
				uni.showToast({
					title: '添加成功',
					icon: 'success'
				})
			},
			closePopup() {
				this.showPopup = false
			},
			handleAction(action) {
				switch (action.type) {
					case 'edit':
						this.editRoom()
						break
					case 'delete':
						this.deleteRoom()
						break
					case 'deleteAuth':
						this.deleteAuth()
						break
				}
				this.closePopup()
			},
			editRoom() {
				// 打开编辑弹窗
				this.formItems[0].value = '怡景苑1栋102' // 设置当前房屋名称
				this.formItems[1].value = '125.23' // 设置当前面积
				this.showAreaPopup = true
			},
			deleteRoom() {
				uni.showModal({
					title: '提示',
					content: '确定要删除该房屋吗？',
					success: (res) => {
						if (res.confirm) {
							// TODO: 调用删除房屋接口
							console.log('删除房屋')
							uni.showToast({
								title: '删除成功',
								icon: 'success'
							})
						}
					}
				})
			},
			deleteAuth() {
				uni.showModal({
					title: '提示',
					content: '确定要解除业主认证吗？',
					success: (res) => {
						if (res.confirm) {
							// TODO: 调用解除认证接口
							console.log('解除业主认证')
							uni.showToast({
								title: '解除成功',
								icon: 'success'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		background-color: #f5f6fa;
		padding: 20rpx;
	}

	.header {
		margin-bottom: 20rpx;

		.add-room-btn {
			width: 100%;
			height: 88rpx;
			line-height: 88rpx;
			color: #007AFF;
			font-size: 32rpx;
			border-radius: 8rpx;
			text-align: center;
			background: #fff;

			&:active {
				opacity: 0.8;
			}
		}
	}

	.content {
		.info-card {
			background: #fff;
			border-radius: 12rpx;
			padding: 30rpx;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
			margin-bottom: 20rpx;

			&:last-child {
				margin-bottom: 0;
			}

			.title-row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30rpx;

				.building-name {
					font-size: 36rpx;
					color: #333;
					font-weight: 500;
				}

				.building-stats {
					font-size: 28rpx;
					background-color: #FF3B30;
					color: #fff;
					padding: 10rpx 10rpx;
					border-radius: 5rpx;

					&.verified {
						background-color: #FFCC00;
						color:black;
						padding: 10rpx 10rpx;
					border-radius: 5rpx;
					}
				}
			}

			.info-list {
				.info-item {
					margin-bottom: 20rpx;

					&:last-child {
						margin-bottom: 0;
					}

					.owner-name {
						font-size: 28rpx;
						color: #666;
						width: 180rpx;
					}

					.building-stats {
						font-size: 28rpx;
						color: #333;
					}
				}
			}

			.action-row {
				margin-top: 30rpx;
				display: flex;
				justify-content: flex-end;

				.action-btn {
					width: 100%;
					height: 72rpx;
					line-height: 72rpx;
					font-size: 28rpx;
					color: #007AFF;
					background: #fff;
					border-radius: 36rpx;
					border: 2rpx solid #007AFF;

					&:active {
						opacity: 0.8;
					}
				}
			}
		}
	}
</style>