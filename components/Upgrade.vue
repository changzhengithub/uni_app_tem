<template>
  <!-- 下载更新 -->
  <view class="platform">
    <uni-popup ref="popup" type="center" :maskClick="false">
      <view class="platform-upgrade">
        <view class="logo">
          <image src="../../static/images/upgrade.png" mode="widthFix" />
        </view>
        <view class="content">
          <view class="title">
            <text>{{ upgrading ? '正在升级' : '发现新版本' }}</text>
          </view>
          <view class="container">
            <view class="descriptions">
              <text>{{ upgrading ? (downloadTime == 100 ? '下载完成' : '正在为您下载,请耐心等待') : '' }}</text>
            </view>
            <view class="details" v-if="!upgrading">
              <text>{{ versionContent }}</text>
            </view>
            <view v-else class="prpgroess">
              <!-- <progress :percent="downloadTime" active-mode="forwards" activeColor="red" active stroke-width="4" show-info /> -->
            </view>
          </view>
          <view v-if="!upgrading" class="btn-group">
            <view v-if="!isForceUpgrade" class="cancel" @click="hiddenUppop"><text>取消</text></view>
            <view class="confirm" @click="upgradeEvent"><text>更新</text></view>
          </view>
          <view v-else-if="downloadTime != 100" class="btn-group">
            <view v-if="!isForceUpgrade" class="cancel" @click="abortDownload"><text>取消下载</text> </view>
            <view v-if="!isForceUpgrade" class="confirm" @click="hiddenUpgradeEvent">
              <text>后台下载</text>
            </view>
          </view>
          <view v-else class="btn-group">
            <view v-if="downloadTime == 100" class="confirm" @click="Installation"><text>安装更新</text> </view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
/**
 * 登录提示页
 */
import { mapGetters } from 'vuex'
import { API_DOWN_URL, API_VERSION_URL } from '@/config/env.js'

// import uniPopup from '@/components/app_update_page/uni-popup/uni-popup.vue';
// import uniPopupMessage from '@/components/app_update_page/uni-popup/uni-popup-message.vue';
// import uniPopupDialog from '@/components/app_update_page/uni-popup/uni-popup-dialog.vue';
export default {
  name: 'login',
  // 使用的组件
  // components: {
  // 	uniPopup,
  // 	uniPopupMessage,
  // 	uniPopupDialog
  // },
  data() {
    return {
      formData: {
        username: 'admin', // 账号
        password: '21232f297a57a5a743894a0e4a801fc3' // 密码
      },
      saving: false,

      versionContent: '', //更新说明
      versionInfo: {}, //本地版本信息
      versionStr: '', //版本号String格式“1.0.1”
      filePath: '', //文件路径
      upgrading: false, //更新中
      downloadTime: 0, //下载进度
      timer: null,
      // 是否强制更新
      isForceUpgrade: true,
      downloadTask: null
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  onShow() {
    // #ifndef H5
    this.getIsUpdate()
    //#endif
    this.getIsUpdate()
  },
  methods: {
    getIsUpdate() {
      const _this = this
      uni.request({
        url: API_VERSION_URL, //仅为示例，并非真实接口地址。
        success: res => {
          const { version } = res.data.data
          _this.versionInfo = _this.getVersionAndPlatform()
          console.log(_this.versionInfo)
          if (version > _this.versionInfo.versionCode) {
            _this.versionStr = version
            _this.$refs.popup.open()
          }
        }
      })
    },

    // 取消更新
    hiddenUppop() {
      this.$refs.popup.close()
    },
    // 点击更新
    upgradeEvent() {
      if (!this.upgrading) {
        console.log(this.versionInfo.platform)
        if (this.versionInfo.platform == 'Android') {
          this.upgrading = true
          this.downloadApplications()
        } else if (this.versionInfo.platform == 'iOS') {
          plus.runtime.openURL('itms-apps://itunes.apple.com/cn/app/id1597678676?mt=8')
        }
      }
    },
    // 后台下载
    hiddenUpgradeEvent() {
      this.$refs.popup.close()
    },
    // 检测平台和当前app版本号
    getVersionAndPlatform() {
      console.log(111)
      // #ifdef APP
      // 获取版本号
      let versionName = plus.runtime.version
      let versionCode = plus.runtime.versionCode
      let platform = plus.os.name
      console.log(versionCode)
      return {
        versionName: versionName,
        versionCode: versionCode,
        platform: platform
      }
      // #endif
      //#ifdef MP-WEIXIN
      const updateManager = uni.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate)
      })

      updateManager.onUpdateReady(function (res) {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })

      updateManager.onUpdateFailed(function (res) {
        // 新的版本下载失败
      })
      // #endif
      // #ifdef H5
      console.error('当前平台不支持5+SDK!')
      //#endif
    },
    // 下载
    downloadApplications() {
      // 建立下载任务
      this.downloadTask = uni.downloadFile({
        // 下载地址
        url: API_DOWN_URL,
        success: res => {
          if (res.statusCode === 200) {
            // 把当前app保存下载
            uni.saveFile({
              tempFilePath: res.tempFilePath,
              success: resp => {
                // 保存成功
                var savedFilePath = resp.savedFilePath
                const installPath = plus.io.convertLocalFileSystemURL(savedFilePath)
                // 安装
                this.installApplications({
                  filePath: installPath,
                  success: res => {
                    console.info(res)
                  },
                  error: err => {
                    console.log(err)
                  }
                })
              },
              fail: err => {
                // 保存失败
                console.error(err)
              }
            })
          }
        }
      })

      this.downloadTask.onProgressUpdate(res => {
        // 下载进度
        this.downloadTime = res.progress
        // console.log('下载进度' + res.progress);
        // console.log('已经下载的数据长度' + res.totalBytesWritten);
        // console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
      })
    },
    // 取消下载
    abortDownload() {
      this.downloadTime = 0
      if (this.$refs.popup) {
        this.$refs.popup.close()
        setTimeout(() => {
          this.upgrading = false
        }, 200)
      }

      clearInterval(this.timer)
      if (this.downloadTask) {
        this.downloadTask.abort()
      }
    },
    //安装
    installApplications({ filePath, success, error }) {
      this.filePath = filePath
      plus.runtime.install(
        filePath,
        {
          force: this.isForceUpgrade
        },
        success,
        error
      )
    },
    Installation() {
      plus.runtime.install(this.filePath)
    }
  }
}
</script>

<style lang="scss" scoped>
// 下载更新
.platform {
  width: 100%;
}
.platform .logo {
  width: 208rpx;
}

.platform .platform-upgrade {
  position: relative;
  background: #f2f2f2;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0vh;
  width: 468rpx;
  min-height: 238rpx;
  border-radius: 20rpx;
}

.platform .logo image {
  width: 208rpx;
  position: absolute;
  top: -80rpx;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.platform .content {
  padding-top: 80rpx;
}

.platform .content .title {
  text-align: center;
  font-size: 30rpx;
  font-weight: bold;
}

.platform .content .container {
  color: #666;
}

.platform .content .container .descriptions {
  padding: 0rpx 30rpx;
  text-align: center;
  font-size: 28rpx;
}

.platform .content .container .details,
.platform .content .prpgroess {
  padding: 16rpx 46rpx;
  box-sizing: border-box;
  font-size: 24rpx;
}

.platform .content .prpgroess {
  padding: 16rpx 22rpx;
  margin: 20rpx 0;
}

.platform .content .btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.platform .content .btn-group view {
  width: 200rpx;
  height: 68rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14rpx;
  font-size: 24rpx;
  border-radius: 16rpx;
  line-height: 1.5;
}

.platform .content .btn-group view:last-child {
  background: #ef5656;
  color: #fff;
}
</style>