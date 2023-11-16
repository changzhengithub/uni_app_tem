<template>
  <view class="mine safe-area-inset-bottom">
    <view class="mine-header">
      <view class="header-avatar">
        <image v-if="userInfo.avatar" :src="userInfo.avatar" mode="" />
				<u-icon v-else name="account" size="30px" color="#fff"></u-icon>
      </view>
      <view class="header-info">
        <view class="info-name">{{ userInfo.name }}</view>
        <view class="info-type">
          <text>账号类型：</text>
          <text v-if="userInfo.type == 1">个人</text>
          <text v-if="userInfo.type == 2">企业</text>
          <text v-if="userInfo.type == 3">企业子账户</text>
        </view>
      </view>
    </view>
    <view class="mine-banner">
      <image src="@/static/images/mine/banner.png"></image>
    </view>
    <view class="mine-panel">
      <view class="panel-item">
        <view class="item-icon">
          <image src="@/static/images/mine/cell01.png" mode="" />
        </view>
        <view class="item-info">
          <view class="info-name">绑定手机</view>
          <view class="info-value">{{ userInfo.phone }}</view>
        </view>
        <!-- <view class="item-arrow"><van-icon name="arrow" /></view> -->
      </view>
      <view class="panel-item">
        <view class="item-icon">
          <image src="@/static/images/mine/cell02.png" mode="" />
        </view>
        <view class="item-info">
          <view class="info-name">邮箱</view>
          <view class="info-value">{{ userInfo.email ? userInfo.email : '未绑定' }}</view>
        </view>
        <!-- <view class="item-arrow"><van-icon name="arrow" /></view> -->
      </view>
      <view class="panel-item">
        <view class="item-icon">
          <image class="icon-img" src="@/static/images/mine/cell03.png" mode="" />
        </view>
        <view class="item-info">
          <view class="info-name">注册时间</view>
          <view class="info-value">{{ userInfo.created_at }}</view>
        </view>
      </view>
      <view class="panel-item">
        <view class="item-icon">
          <image src="@/static/images/mine/cell04.png" mode="" />
        </view>
        <view class="item-info">
          <view class="info-name">授权信息</view>
        </view>
        <view class="item-arrow">
					<u-icon name="arrow-right" size="14px" color="#4E5969"></u-icon>
        </view>
      </view>
    </view>
    <view class="mine-logout" @click="handleLogout">
      <text>退出登录</text>
    </view>
  </view>
</template>

<script>
/**
 * @desc 我的
 * @author xxx
 * */

export default {
  name: 'mine',
  data() {
    return {
      saveLoad: false
    }
  },
  methods: {
    // 退出登录
    handleLogout() {
      uni.showModal({
        content: '确认退出',
        confirmColor: 'red',
        success: ({ confirm, cancel }) => {
          if (confirm) {
            uni.clearStorageSync()
            uni.reLaunch({
              url: '/pages/empower/index'
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mine {
  width: 100%;
  height: 100%;
  padding: 10px 21px;
  background: linear-gradient(180deg, #e3ecfb 0%, #e8f0fb 52%, rgba(217, 217, 217, 0) 100%);
  .mine-header {
    display: flex;
		align-items: center;
    width: 100%;
    margin-bottom: 10px;
    .header-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      color: #fff;
      background-color: #8ccbb4;
      border-radius: 50%;
      image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .header-info {
      flex: 1;
      padding-left: 10px;
      .info-name {
        width: 100%;
        font-size: 18px;
        font-weight: 500;
        color: #4e5969;
        line-height: 32px;
      }
      .info-type {
        display: inline-block;
        height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: #00b42a;
        line-height: 24px;
        background-color: #e8ffea;
        border-radius: 2px;
      }
    }
  }
  .mine-banner {
    width: 100%;
    height: 112px;
    margin-bottom: 10px;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .mine-panel {
    width: 100%;
    padding: 0 24px;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 10px;
    .panel-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 64px;
      border-bottom: 1px solid #eee;
      .item-icon {
        width: 24px;
        height: 24px;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .item-info {
        flex: 1;
        padding-left: 15px;
        .info-name {
          font-size: 16px;
          font-weight: 500;
          color: #000;
          line-height: 28px;
        }
        .info-value {
          font-size: 12px;
          color: #86909c;
          line-height: 22px;
        }
      }
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
  .mine-logout {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-weight: 400;
    color: #4e5969;
    background-color: #f2f3f5;
    border: 1px solid #ffffff;
    border-radius: 10px;
  }
}
</style>