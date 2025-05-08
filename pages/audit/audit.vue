<template>
	<view class="container">
		<view class="header">
			<button class="filter-btn" :class="{ active: activeTab === 'unreviewed' }" @click="switchTab('unreviewed')">未审核</button>
			<button class="filter-btn" :class="{ active: activeTab === 'reviewed' }" @click="switchTab('reviewed')">已审核</button>
		</view>
		
		<view class="content" @click="toAuditHistory()">
			<view class="audit-item" v-for="(item, index) in auditList" :key="index">
				<view class="item-header">
					<text class="building-name">{{item.buildingName}}</text>
					<text class="status" 
					  :class="{
					   'pass': item.status === '通过',
					   'reject': item.status === '驳回'}"
					 v-if="activeTab === 'reviewed'">{{item.status}}</text>
				</view>
				<view class="item-content">
					<view class="info-row">
						<text class="label">申请人：</text>
						<text class="value">{{item.applicant}}</text>
					</view>
					<view class="info-row">
						<text class="label">申请时间：</text>
						<text class="value">{{item.applyTime}}</text>
					</view>
					<view class="info-row">
						<text class="label">联系电话：</text>
						<text class="value">{{item.phone}}</text>
					</view>
				</view>
				<view class="item-footer" v-if="activeTab === 'unreviewed'">
					<button class="action-btn approve" @click="handleApprove(item)">审批</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showFilter: false,
			activeTab: 'unreviewed',
			auditList: [{
				buildingName: '怡景苑2栋202',
				applicant: '龙海森',
				applyTime: '2024-03-20 10:30',
				phone: '13800138000',
				status: '通过'
			},	
			{
				buildingName: '怡景苑2栋202',
				applicant: '龙海森',
				applyTime: '2024-03-20 10:30',
				phone: '13800138000',
				status: '驳回'
			}
		      ]
		}
	},
	methods: {
		handleApprove(item) {
			// 处理审批
			uni.navigateTo({
				url:'/pages/audit/auditDetail/auditDetail'
			})
		},
		switchTab(tab) {
			this.activeTab = tab;
			// TODO: 根据选中的标签加载对应的数据
		},
		toAuditHistory(){
			if(this.activeTab=='reviewed'){
				uni.navigateTo({
					url:'/pages/audit/audithistory/audithistory'
				})
			}
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
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
	padding: 20rpx;
	background: #fff;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	
	.filter-btn {
		height: 64rpx;
		line-height: 64rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
		color: #007AFF;
		background: #fff;
		border: 2rpx solid #007AFF;
		width: 50%;
		
		&.active {
			color: #fff;
			background: #007AFF;
		}
		
		&:active {
			opacity: 0.8;
		}
	}
}

.content {
	.audit-item {
		background: #fff;
		border-radius: 12rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
		
		&:last-child {
			margin-bottom: 0;
		}
		
		.item-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 16rpx;
			
			.building-name {
				font-size: 32rpx;
				color: #333;
				font-weight: 500;
			}
			
			.status {
				font-size: 28rpx;
				color: #007AFF;
				padding: 10rpx;
				border-radius: 10%;
			}
			.pass {
			  background-color: lightgreen;
			  color: white;
			}
			.reject{
			  background-color: red;
			  color: white;
			}
		}
		
		.item-content {
			.info-row {
				display: flex;
				margin-bottom: 16rpx;
				
				&:last-child {
					margin-bottom: 0;
				}
				
				.label {
					font-size: 28rpx;
					color: #666;
					width: 140rpx;
				}
				
				.value {
					font-size: 28rpx;
					color: #333;
					flex: 1;
				}
			}
		}
		
		.item-footer {
			display: flex;
			justify-content: flex-end;
			gap: 20rpx;
			margin-top: 30rpx;
			
			.action-btn {
				height: 72rpx;
				line-height: 72rpx;
				padding: 0 40rpx;
				font-size: 28rpx;
				border-radius: 36rpx;
				width: 100%;
				&.approve {
					color: #fff;
					background: #007AFF;
					border: 2rpx solid #007AFF;
				}
				
				&:active {
					opacity: 0.8;
				}
			}
		}
	}
}
</style>