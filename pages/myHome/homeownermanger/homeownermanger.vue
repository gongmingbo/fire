<template>
	<view class="container">
		<view class="header">
			<view class="search-box">
				<input type="text" v-model="searchKey" placeholder="请输入业主姓名/手机号" class="search-input" />
				<text class="search-icon">🔍</text>
			</view>
		</view>
		
		<view class="content">
			<view class="owner-list">
				<view class="owner-item" v-for="(item, index) in ownerList" :key="index">
					<view class="owner-info">
						<view class="info-row">
							<text class="name">{{item.name}}</text>
							<text class="phone">{{item.phone}}</text>
						</view>
						<view class="info-row">
							<text class="house">{{item.house}}</text>
							<text class="status" :class="item.status">{{item.statusText}}</text>
						</view>
					</view>
					<view class="owner-actions">
						<button class="action-btn edit" @click="handleEdit(item)">编辑</button>
						<button class="action-btn delete" @click="handleDelete(item)">删除</button>
					</view>
				</view>
			</view>
			
			<!-- 空状态 -->
			<view class="empty-state" v-if="ownerList.length === 0">
				<image src="/static/empty.png" mode="aspectFit"></image>
				<text>暂无业主信息</text>
			</view>
		</view>
		
		<view class="footer">
			<button class="add-btn" @click="handleAdd">添加业主</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchKey: '',
			ownerList: [
				{
					name: '张三',
					phone: '13800138000',
					house: '红枫苑1栋10-2',
					status: 'active',
					statusText: '正常'
				},
				{
					name: '李四',
					phone: '13900139000',
					house: '红枫苑2栋5-1',
					status: 'inactive',
					statusText: '已停用'
				}
			]
		}
	},
	methods: {
		handleAdd() {
			uni.navigateTo({
				url: '/pages/myHome/homeowneradd/homeowneradd'
			});
		},
		handleEdit(item) {
			uni.navigateTo({
				url: `/pages/myHome/homeowneredit/homeowneredit?id=${item.id}`
			});
		},
		handleDelete(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该业主信息吗？',
				success: (res) => {
					if (res.confirm) {
						// 执行删除操作
					}
				}
			});
		}
	}
}
</script>

<style lang="scss">
.container {
	min-height: 100vh;
	background-color: #f5f6fa;
	padding-bottom: 120rpx;
}

.header {
	background: #fff;
	padding: 20rpx 30rpx;
	position: sticky;
	top: 0;
	z-index: 100;
	box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
	
	.search-box {
		position: relative;
		
		.search-input {
			width: 100%;
			height: 72rpx;
			background: #f5f6fa;
			border-radius: 36rpx;
			padding: 0 60rpx 0 30rpx;
			font-size: 28rpx;
			color: #333;
		}
		
		.search-icon {
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);
			font-size: 32rpx;
			color: #999;
		}
	}
}

.content {
	padding: 20rpx;
	
	.owner-list {
		.owner-item {
			background: #fff;
			border-radius: 12rpx;
			padding: 30rpx;
			margin-bottom: 20rpx;
			box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
			
			.owner-info {
				margin-bottom: 20rpx;
				
				.info-row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 16rpx;
					
					&:last-child {
						margin-bottom: 0;
					}
					
					.name {
						font-size: 32rpx;
						color: #333;
						font-weight: 500;
					}
					
					.phone {
						font-size: 28rpx;
						color: #666;
					}
					
					.house {
						font-size: 28rpx;
						color: #666;
					}
					
					.status {
						font-size: 24rpx;
						padding: 4rpx 16rpx;
						border-radius: 4rpx;
						
						&.active {
							background: #f6ffed;
							color: #52c41a;
						}
						
						&.inactive {
							background: #fff1f0;
							color: #ff4d4f;
						}
					}
				}
			}
			
			.owner-actions {
				display: flex;
				justify-content: flex-end;
				gap: 20rpx;
				
				.action-btn {
					min-width: 120rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 26rpx;
					border-radius: 30rpx;
					padding: 0 30rpx;
					
					&.edit {
						background: #e6f7ff;
						color: #1890ff;
					}
					
					&.delete {
						background: #fff1f0;
						color: #ff4d4f;
					}
					
					&:active {
						opacity: 0.8;
					}
				}
			}
		}
	}
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 120rpx 0;
	
	image {
		width: 240rpx;
		height: 240rpx;
		margin-bottom: 30rpx;
	}
	
	text {
		font-size: 28rpx;
		color: #999;
	}
}

.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: #fff;
	padding: 20rpx 30rpx;
	box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
	
	.add-btn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		background: #007AFF;
		color: #fff;
		font-size: 32rpx;
		border-radius: 8rpx;
		
		&:active {
			opacity: 0.8;
		}
	}
}
</style> 