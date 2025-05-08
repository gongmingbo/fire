<template>
	<view class="container">
		<view class="building-list">
			<view class="building-item" v-for="(building, index) in buildings" :key="index">
				<view class="building-header" @click="toggleBuilding(index)">
					<text class="building-title">{{building.name}}</text>
					<text class="collapse-btn">{{building.isCollapsed ? '展开' : '折叠'}}</text>
				</view>
				<view class="room-list" v-show="!building.isCollapsed">
					<view class="room-item" v-for="(room, roomIndex) in building.rooms" :key="roomIndex">
						<text class="room-name">{{room.name}}</text>
						<label class="checkbox-wrapper">
							<checkbox :checked="room.checked" @tap="toggleRoom(index, roomIndex)"></checkbox>
						</label>
					</view>
				</view>
			</view>
		</view>
		<!-- footer -->
		<view class="footer">
			<view class="selected-count">
				<text>已选{{selectedCount}}个</text>
			</view>
			<view class="confirm-btn">
				<button @click="handleConfirm">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buildings: [
					{
						name: '怡景苑1栋',
						isCollapsed: false,
						rooms: [
							{ name: '怡景苑1栋201', checked: false },
							{ name: '怡景苑1栋202', checked: false }
						]
					},
					{
						name: '怡景苑2栋',
						isCollapsed: false,
						rooms: [
							{ name: '怡景苑2栋201', checked: false },
							{ name: '怡景苑2栋202', checked: false }
						]
					}
				]
			}
		},
		computed: {
			selectedCount() {
				return this.buildings.reduce((count, building) => {
					return count + building.rooms.filter(room => room.checked).length;
				}, 0);
			}
		},
		methods: {
			toggleBuilding(index) {
				this.buildings[index].isCollapsed = !this.buildings[index].isCollapsed;
			},
			toggleRoom(buildingIndex, roomIndex) {
				this.buildings[buildingIndex].rooms[roomIndex].checked = 
					!this.buildings[buildingIndex].rooms[roomIndex].checked;
			},
			handleConfirm() {
				// 处理确认按钮点击
				const selectedRooms = this.buildings.reduce((rooms, building) => {
					return rooms.concat(building.rooms.filter(room => room.checked));
				}, []);
				console.log('Selected rooms:', selectedRooms);
				uni.navigateTo({
					url: `/pages/myHome/homecertificate/homecertificate`
				})
			}
		}
	}
</script>

<style lang="scss">
.container {
	min-height: 100vh;
	background-color: #f5f6fa;
	padding: 30rpx;
	padding-bottom: 120rpx;
}

.header {
	background: linear-gradient(135deg, #007AFF, #0056b3);
	padding: 40rpx 30rpx;
	border-radius: 16rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);

	.title {
		color: #fff;
		font-size: 36rpx;
		font-weight: 600;
		margin-bottom: 20rpx;
		text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1);
	}

	.subtitle {
		color: rgba(255,255,255,0.9);
		font-size: 28rpx;
	}
}

.search-box {
	background: #fff;
	padding: 20rpx;
	border-radius: 12rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
	display: flex;
	align-items: center;

	.search-input {
		flex: 1;
		height: 72rpx;
		background: #f8f9fc;
		border-radius: 8rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
		color: #333;
	}

	.search-btn {
		width: 120rpx;
		height: 72rpx;
		line-height: 72rpx;
		background: #007AFF;
		color: #fff;
		font-size: 28rpx;
		border-radius: 8rpx;
		margin-left: 20rpx;
		text-align: center;
		transition: all 0.3s ease;

		&:active {
			transform: scale(0.98);
			background: #0056b3;
		}
	}
}

.house-list {
	.house-item {
		background: #fff;
		border-radius: 12rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
		transition: all 0.3s ease;

		&:active {
			transform: translateY(2rpx);
			box-shadow: 0 1rpx 4rpx rgba(0,0,0,0.05);
		}

		.house-name {
			font-size: 32rpx;
			color: #333;
			font-weight: 500;
			margin-bottom: 16rpx;
		}

		.house-info {
			display: flex;
			align-items: center;
			margin-bottom: 12rpx;

			.info-item {
				font-size: 26rpx;
				color: #666;
				margin-right: 30rpx;
				display: flex;
				align-items: center;

				.icon {
					width: 32rpx;
					height: 32rpx;
					margin-right: 8rpx;
				}
			}
		}

		.house-address {
			font-size: 26rpx;
			color: #999;
			display: flex;
			align-items: center;

			.icon {
				width: 28rpx;
				height: 28rpx;
				margin-right: 8rpx;
			}
		}
	}
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 60rpx 0;

	.empty-icon {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 30rpx;
		opacity: 0.5;
	}

	.empty-text {
		font-size: 28rpx;
		color: #999;
		text-align: center;
	}
}

// 添加页面切换动画
.page-enter-active,
.page-leave-active {
	transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
}

.building-list {
	.building-item {
		background: #fff;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
		overflow: hidden;

		.building-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 24rpx 30rpx;
			background: #f8f9fc;
			border-bottom: 2rpx solid #f0f1f5;
			cursor: pointer;
			transition: background-color 0.3s ease;

			&:active {
				background-color: #f0f1f5;
			}

			.building-title {
				font-size: 32rpx;
				color: #333;
				font-weight: 500;
			}

			.collapse-btn {
				font-size: 28rpx;
				color: #007AFF;
				padding: 8rpx 20rpx;
				background: rgba(0,122,255,0.1);
				border-radius: 6rpx;
				transition: all 0.3s ease;

				&:active {
					background: rgba(0,122,255,0.2);
				}
			}
		}

		.room-list {
			transition: all 0.3s ease;
			overflow: hidden;

			.room-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 24rpx 30rpx;
				border-bottom: 2rpx solid #f0f1f5;

				&:last-child {
					border-bottom: none;
				}

				.room-name {
					font-size: 28rpx;
					color: #666;
					flex: 1;
					margin-right: 20rpx;
				}

				.checkbox-wrapper {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					min-width: 60rpx;

					checkbox {
						transform: scale(0.8);
					}
				}
			}
		}
	}
}

.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: #fff;
	padding: 20rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
	z-index: 100;

	.selected-count {
		flex: 1;
		text {
			font-size: 28rpx;
			color: #666;
		}
	}

	.confirm-btn {
		flex: 2;
		margin-left: 30rpx;

		button {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			background: #007AFF;
			color: #fff;
			font-size: 32rpx;
			border-radius: 8rpx;
			border: none;
			transition: all 0.3s ease;

			&:active {
				background: #0056b3;
				transform: scale(0.98);
			}
		}
	}
}
</style>
