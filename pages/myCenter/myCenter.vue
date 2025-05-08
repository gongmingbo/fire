<template>
	<view class="container">
		<!-- 用户信息卡片 -->
		<view class="user-card">
			<view class="user-info">
				<image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
				<view class="info">
					<text class="name">{{userInfo.name}}</text>
					<text class="id">ID: {{userInfo.id}}</text>
				</view>
			</view>
			<view class="edit-btn" @click="editProfile">
				<uni-icons type="compose" size="16" color="#666"></uni-icons>
				<text>编辑资料</text>
			</view>
		</view>
		
		<!-- 功能列表 -->
		<view class="menu-list">
			<view class="menu-item" v-for="(item, index) in menuList" :key="index" @click="handleMenu(item)">
				<view class="menu-left">
					<uni-icons :type="item.icon" size="20" color="#666"></uni-icons>
					<text>{{item.name}}</text>
				</view>
				<uni-icons type="right" size="16" color="#999"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					avatar: '/static/image.png',
					name: '张三',
					id: '123456'
				},
				menuList: [
					{ name: '工作台', icon: 'bars', path: '/pages/notemanger/notemanger' },
					{ name: '我的房屋', icon: 'home-filled', path: '/pages/myHome/myHome' },
					
					{ name: '房屋及业主管理', icon: 'person-filled', path: '/pages/homeownermanger/homeownermanger' },
					{ name: '业主审核', icon: 'calendar', path: '/pages/audit/audit' },
					
					{ name: '小区资料管理', icon: 'info', path: '/pages/homeownermanger/housemanger/housemanger' }
					// { name: '我的收藏', icon: 'star', path: '/pages/collect/collect' },
					// { name: '设置', icon: 'gear', path: '/pages/setting/setting' }
				]
			}
		},
		methods: {
			// 编辑资料
			editProfile() {
				uni.navigateTo({
					url: '/pages/profile/profile'
				})
			},
			
			// 处理菜单点击
			handleMenu(item) {
				uni.navigateTo({
					url: item.path
				})
			}
		}
	}
</script>

<style lang="scss">
.container {
	min-height: 100vh;
	background-color: #f5f5f5;
}

.user-card {
	background-color: #fff;
	padding: 40rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
	
	.user-info {
		display: flex;
		align-items: center;
		
		.avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		
		.info {
			.name {
				font-size: 36rpx;
				font-weight: 500;
				color: #333;
				margin-bottom: 8rpx;
				display: block;
			}
			
			.id {
				font-size: 24rpx;
				color: #999;
			}
		}
	}
	
	.edit-btn {
		display: flex;
		align-items: center;
		padding: 10rpx 20rpx;
		background-color: #f5f5f5;
		border-radius: 30rpx;
		
		text {
			font-size: 24rpx;
			color: #666;
			margin-left: 8rpx;
		}
	}
}

.menu-list {
	background-color: #fff;
	
	.menu-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
		
		.menu-left {
			display: flex;
			align-items: center;
			
			text {
				font-size: 28rpx;
				color: #333;
				margin-left: 20rpx;
			}
		}
	}
}
</style>
