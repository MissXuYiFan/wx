//app.js
App({
  data: {

  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
//登录
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function(req) {
            wx.getLocation({
              type: 'wgs84',
              success(err) {
                const code =res.code
                const encryptedData = req.encryptedData
                const iv = req.iv
                const signature = req.signature
                const rawData = req.rawData
                const latitude = err.latitude
                const longitude = err.longitude
                const location = { latitude, longitude}
                var that=this
                wx.request({
                  url: 'https://buke.weiyuanna.com/api/login',
                  data: {
                    code: code,
                    encryptedData: encryptedData,
                    iv: iv,
                    signature: signature,
                    rawData: rawData,
                    location: location
                  },
                  header: { 'content-type': 'application/x-www-form-urlencoded'},
                  method: 'POST',
                  success:function(res){
                    var id = res.data.data.signature
                    wx.setStorage({
                      key: 'id',
                      data: id
                    })
                  },
                  fail: function(res) {},
                  complete: function(res) {},
                })
              }
            })
          },

        })
      }
    })



    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


    // // 获取用户信息
    // wx.getUserInfo({
    //   success(getUserInfo) {
    //     const encryptedData = getUserInfo.encryptedData
    //     const iv = getUserInfo.iv
    //     const signature = getUserInfo.signature
    //     const rawData = getUserInfo.rawData
    //     wx.request({
    //       url: 'https://buke.weiyuanna.com/api/login',
    //       data: {
    //         encryptedData: encryptedData,
    //         iv: iv,
    //         signature: signature,
    //         rawData: rawData
    //       },
    //       header: { "Content-Type": "application/x-www-form-urlencoded" },
    //       method: 'POST',
    //       dataType: 'json',
    //       responseType: 'text',
    //       success: function (res) {
            
    //       },
    //     })
    //   }
      
    // })
    
    
    
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  
  globalData: {
    userInfo: null,
    
  }
})