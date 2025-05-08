<template>
	<view class="container">
		<!-- 头部区域 -->
		<view class="header">
			<text v-show="show" class="community-name" @click="toggleDropdown">{{communityName}}</text>
			<view class="dropdown-container" >
				<uni-icons type="down" size="15"></uni-icons>
				<view class="dropdown-menu" v-if="showDropdown">
					<view 
						class="dropdown-item" 
						v-for="(item, index) in communityList" 
						:key="index"
						@click.stop="selectCommunity(item)"
					>
						{{item}}
					</view>
				</view>
			</view>
		</view>

		<!-- 小区信息统计 -->
		<view class="community-stats">
			<view class="stat-item" v-for="(item, index) in communityStats" :key="index">
				<view class="stat-label">
					<text>{{item.label}}</text>
				</view>
				<view class="stat-value">
					<text>{{item.value}}</text>
				</view>
			</view>
		</view>

		<!-- 邻居信息区域 -->
		<view class="neighbor-section">
			<view class="neighbor-avatars">
				<view class="avatar" v-for="(avatar, index) in neighborAvatars" :key="index">
					<image :src="avatar" mode="aspectFill"></image>
				</view>
			</view>
			<view class="neighbor-info">
				<text class="neighbor-count">已有{{neighborCount}}位业主加入</text>
				<navigator url="/pages/neighbor/neighbor" hover-class="navigator-hover">
					<text class="neighbor-more">查看></text>
				</navigator>
			</view>
		</view>

		<!-- 功能导航区 -->
		<view class="feature-nav">
			<view class="feature-item" v-for="(item, index) in featureItems" :key="index">
				<text>{{item}}</text>
			</view>
		</view>

		<!-- 公告列表 -->
		<view class="notice-list">
			<view class="notice-item" v-for="(notice, index) in notices" :key="index">
				<view class="notice-header">
					<view class="notice-type">
						<text :class="['notice-status', notice.read ? 'read' : 'unread']">
							{{notice.read ? '已读' : '未读'}}
						</text>
						<text>{{notice.type}}</text>
					</view>
				</view>
				<view class="notice-content">
					<view class="notice-title">
						<text>{{notice.title}}</text>
					</view>
					<view class="notice-desc">
						<text>{{notice.content}}</text>
					</view>
				</view>
				<view class="notice-action">
					<text @click="goToDetail(notice.id,notice.read)">查看</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				communityName: '南方上林格',
				show: true,
				showDropdown: false,
				neighborCount: 450,
				communityList: [
					'南方上林格',
					'阳光花园',
					'幸福家园',
					'金色港湾',
					'城市花园'
				],
				communityStats: [
					{ label: '房龄', value: '12年' },
					{ label: '住宅数量', value: '452 套' },
					{ label: '住宅面积', value: '8645 m²' },
					{ label: '业主数量', value: '633 位' },
					{ label: '物业费', value: '1.6 元/m²' }
				],
				featureItems: ['公共资金', '物业信息', '社区公约', '地方法规'],
				notices: [
					{
						id: 1,
						read: true,
						type: '公告类型',
						title: '关于小区物业费调整的通知',
						content: '根据小区实际情况和物业服务成本的变化，经业主委员会讨论决定，自2024年4月1日起，小区物业费将进行适当调整...'
					},
					{
						id: 2,
						read: false,
						type: '公告类型',
						title: '小区绿化改造工程通知',
						content: '为提升小区整体环境，物业服务中心将于下周开始进行绿化改造工程，预计工期为两周...'
					}
				],
				neighborAvatars: [
					'/static/image.png',
					'/static/image.png',
					'/static/image.png'
				]
			}
		},
		methods: {
			// 切换社区名称显示状态
			toggleCommunityName() {
				this.show = !this.show
			},
			// 切换下拉菜单显示状态
			toggleDropdown() {
				this.showDropdown = !this.showDropdown
			},
			// 选择社区
			selectCommunity(name) {
				this.communityName = name
				this.showDropdown = false
			},
			// 跳转到公告详情页
			goToDetail(id,read) {
				
				uni.navigateTo({
					url: `/pages/notedetail/notedetail?id=${id}&read=${read}`
				})
			}
		}
	}
</script>

<style lang="scss">
	// 变量定义
	$primary-color: #007AFF;
	$text-color: #666;
	$border-color: rgba(128, 128, 128, 0.2);
	$background-color: #f5f5f5;
	$white: #fff;
	$error-color: #ff4d4f;

	// 混合器
	@mixin flex-center {
		display: flex;
		align-items: center;
	}

	@mixin card-style {
		background-color: $white;
		border-radius: 10rpx;
		padding: 20rpx;
		margin: 20rpx 20rpx;
	}

	// 基础样式
	.container {
		min-height: 100vh;
		background-color: #f5f5f5;
	}

	// 头部样式
	.header {
		@include flex-center;
		padding: 20rpx;

		.community-name {
			font-size: 32rpx;
			font-weight: 600;
			margin-right: 10rpx;
		}
	}

	// 小区统计信息样式
	.community-stats {
		@include card-style;
		display: flex;
		justify-content: space-around;

		.stat-item {
			text-align: center;
			padding: 0 20rpx;
			border-right: 1rpx solid $border-color;

			&:last-child {
				border-right: none;
			}

			.stat-label {
				font-size: 24rpx;
				color: $text-color;
				white-space: nowrap;
				font-weight: 600;
			}

			.stat-value {
				font-size: 24rpx;
				font-weight: 500;
				margin-top: 10rpx;
				white-space: nowrap;
			}
		}
	}

	// 邻居区域样式
	.neighbor-section {
		@include card-style;

		.neighbor-avatars {
			position: relative;
			height: 60rpx;

			.avatar {
				position: absolute;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				border: 2rpx solid $white;
				overflow: hidden;

				&:nth-child(1) { left: 0; z-index: 3; }
				&:nth-child(2) { left: 40rpx; z-index: 2; }
				&:nth-child(3) { left: 80rpx; z-index: 1; }

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.neighbor-info {
			@include flex-center;
			justify-content: space-between;
			margin-top: 20rpx;

			.neighbor-count {
				color: $text-color;
				font-size: 26rpx;
			}

			.neighbor-more {
				color: $primary-color;
				font-size: 26rpx;
			}
		}
	}

	// 功能导航样式
	.feature-nav {
		display: flex;
		justify-content: space-around;
		margin: 30rpx 20rpx;

		.feature-item {
			width: 160rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			background-color: $white;
			box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.1);
			border-radius: 10rpx;
			font-size: 28rpx;
		}
	}

	// 公告列表样式
	.notice-list {
		margin: 20rpx 0;

		.notice-item {
			@include card-style;
			margin-bottom: 20rpx;
			overflow: hidden;

			.notice-header {
				padding: 20rpx;
				border-bottom: 1rpx solid #f0f0f0;

				.notice-type {
					@include flex-center;

					.notice-status {
						padding: 4rpx 12rpx;
						border-radius: 4rpx;
						margin-right: 20rpx;
						font-size: 24rpx;

						&.read {
							color: $text-color;
							border: 1rpx solid $text-color;
						}

						&.unread {
							color: $error-color;
							border: 1rpx solid $error-color;
						}
					}
				}
			}

			.notice-content {
				padding: 20rpx;

				.notice-title {
					font-size: 28rpx;
					font-weight: 500;
					margin-bottom: 10rpx;
				}

				.notice-desc {
					font-size: 26rpx;
					color: $text-color;
					line-height: 1.5;
				}
			}

			.notice-action {
				text-align: center;
				padding: 20rpx;
				color: $primary-color;
				border-top: 1rpx solid #f0f0f0;
			}
		}
	}

	// 下拉菜单样式
	.dropdown-container {
		position: relative;
		cursor: pointer;
		
		.dropdown-menu {
			position: absolute;
			top: 100%;
			right: 0;
			background-color: $white;
			border-radius: 8rpx;
			box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.1);
			z-index: 100;
			min-width: 200rpx;
			margin-top: 10rpx;
			
			.dropdown-item {
				padding: 20rpx 30rpx;
				font-size: 28rpx;
				color: $text-color;
				transition: background-color 0.3s;
				
				&:hover {
					background-color: #f5f5f5;
				}
				
				&:not(:last-child) {
					border-bottom: 1rpx solid #f0f0f0;
				}
			}
		}
	}
</style>