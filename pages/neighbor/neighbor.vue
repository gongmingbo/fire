<template>
	<view class="main">
		<view class="header">
			<view class="search-bar">
				<uni-icons type="search" size="16" color="#999"></uni-icons>
				<input type="text" placeholder="搜索楼栋/房间号" v-model="searchQuery" @input="handleSearch" />
			</view>
		</view>
		
		<view v-for="(building, buildingIndex) in buildings" :key="building.id" class="content">
			<view class="content-header">
				<view class="header-info">
					<text class="community-name">{{ building.name }}</text>
					<text class="auth-progress">业主认证进度：{{ getBuildingAuthProgress(building.id) }}/{{ getBuildingTotalRooms(building.id) }}</text>
				</view>
				<uni-icons :type="building.expanded?'down':'up'" size="15" @click="toggleDropdown(building.id)" />
			</view>

			<view v-if="loading" class="loading">
				<uni-icons type="spinner-cycle" size="24" color="#87ceeb"></uni-icons>
				<text>加载中...</text>
			</view>
			
			<view v-else-if="getFilteredRooms(building.id).length === 0" class="empty-state">
				<text>暂无数据</text>
			</view>

			<view v-else-if="building.expanded" v-for="(room, index) in getFilteredRooms(building.id)" :key="room.id" class="room-item"
				:class="{ 'last-item': index === getFilteredRooms(building.id).length - 1 }">
				<text class="room-name">{{ room.name }}</text>
				<view class="auth-status" :class="room.status">
					<text>{{ room.status === 'authenticated' ? '已认证' : '未认证' }}</text>
				</view>
				<text class="user-name">{{ room.user }}</text>
			</view>
		</view>
		
		<view class="footer">
			<navigator url="/pages/neighborauth/neighborauth" hover-class="navigator-hover">
				<button class="invite-button">邀请业主认证</button>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,

				searchQuery: '',
				buildings: [
					{
						id: 1,
						name: '怡景苑1栋',
						expanded: true
					},
					{
						id: 2,
						name: '怡景苑2栋',
						expanded: true
					}
				],
				roomList: [
					{
						id: 1,
						buildingId: 1,
						name: '怡景苑1栋101',
						status: 'authenticated',
						user: '小明',
						phone: '13800138000'
					},
					{
						id: 2,
						buildingId: 1,
						name: '怡景苑1栋102',
						status: 'unauthenticated',
						user: '小红',
						phone: '13800138001'
					},
					{
						id: 3,
						buildingId: 1,
						name: '怡景苑1栋103',
						status: 'authenticated',
						user: '小刚',
						phone: '13800138002'
					},
					{
						id: 4,
						buildingId: 2,
						name: '怡景苑2栋101',
						status: 'authenticated',
						user: '小李',
						phone: '13800138003'
					},
					{
						id: 5,
						buildingId: 2,
						name: '怡景苑2栋102',
						status: 'unauthenticated',
						user: '小王',
						phone: '13800138004'
					}
				]
			};
		},
		methods: {
			toggleDropdown(buildingId) {
				const building = this.buildings.find(b => b.id === buildingId);
				if (building) {
					building.expanded = !building.expanded;
				}
			},
			handleSearch() {
				// Search is handled by computed property
			},
			getBuildingAuthProgress(buildingId) {
				return this.roomList.filter(room => 
					room.buildingId === buildingId && 
					room.status === 'authenticated'
				).length;
			},
			getBuildingTotalRooms(buildingId) {
				return this.roomList.filter(room => room.buildingId === buildingId).length;
			},
			getFilteredRooms(buildingId) {
				const buildingRooms = this.roomList.filter(room => room.buildingId === buildingId);
				if (!this.searchQuery) return buildingRooms;
				
				const query = this.searchQuery.toLowerCase();
				const filteredRooms = buildingRooms.filter(room => 
					room.name.toLowerCase().includes(query) ||
					room.user.toLowerCase().includes(query)
				);
				if (filteredRooms.length > 0) {
					const building = this.buildings.find(b => b.id === buildingId);
					if (building) {
						building.expanded = true;
					}
				}
				return filteredRooms;
			}
		},
		onLoad() {
			this.loading = true;
			// Simulate API call
			setTimeout(() => {
				this.loading = false;
			}, 1000);
		}
	};
</script>

<style lang="scss">
	.main {
		padding-bottom: 100rpx;
		background-color: #f8f8f8;
		min-height: 100vh;
	}

	.header {
		padding: 20rpx;
		background-color: white;
		
		.search-bar {
			display: flex;
			align-items: center;
			background-color: #f5f5f5;
			padding: 16rpx 24rpx;
			border-radius: 32rpx;
			
			input {
				flex: 1;
				margin-left: 16rpx;
				font-size: 28rpx;
			}
		}
	}

	.content {
		margin: 20rpx;
		padding: 20rpx;
		background-color: white;
		border-radius: 12rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

		&:last-child {
			margin-bottom: 100rpx;
		}

		.content-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 20rpx;
			margin-bottom: 20rpx;
			border-bottom: 1rpx solid #eee;

			.header-info {
				display: flex;
				flex-direction: column;

				.community-name {
					font-size: 32rpx;
					font-weight: 600;
					color: #333;
					margin-bottom: 8rpx;
				}

				.auth-progress {
					font-size: 24rpx;
					color: #666;
				}
			}
		}

		.loading, .empty-state {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 40rpx 0;
			color: #999;
			
			text {
				margin-top: 16rpx;
				font-size: 28rpx;
			}
		}

		.room-item {
			display: flex;
			align-items: center;
			padding: 24rpx 0;
			border-bottom: 1rpx solid #eee;
			transition: background-color 0.3s;

			&:active {
				background-color: #f5f5f5;
			}

			&.last-item {
				border-bottom: none;
			}

			.room-name {
				flex: 3;
				font-size: 28rpx;
				color: #444;
			}

			.auth-status {
				flex: 1;
				padding: 8rpx 16rpx;
				border-radius: 8rpx;
				text-align: center;
				font-size: 24rpx;
				margin-left: 20rpx;

				&.authenticated {
					background: #ff4444;
					color: white;
					border: 1rpx solid #ff4444;
				}

				&.unauthenticated {
					background: #f5f5f5;
					color: #666;
					border: 1rpx solid #ddd;
				}
			}

			.user-name {
				flex: 2;
				text-align: right;
				font-size: 26rpx;
				color: #666;
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: white;
		border-top: 1rpx solid #eee;
		
		box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.05);

		.invite-button {
			background: #007AFF;
			color: white;
			padding: 16rpx 0;
			font-size: 28rpx;
			transition: all 0.3s;

			&:active {
				opacity: 0.8;
				transform: scale(0.98);
			}
		}
	}
</style>