// pages/guan/guan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:[
      { img:"../../images/9.jpg",zuo:"徐帆"},
      { img: "../../images/9.jpg", zuo: "徐帆" },
      { img: "../../images/9.jpg", zuo: "徐帆" },
      { img: "../../images/9.jpg", zuo: "徐帆" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    const that = this
    // 从本地缓存拿到数据
    wx.getStorage({
      key: 'id',
      success(b) {
        // 文章页面的请求
        wx.request({
          url: 'https://buke.weiyuanna.com/api/favoriteList',
          data: { signature: b.data }, //缓存提交
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          success: function (res) {
            console.log(res.data.code)
              that.setData({
                404: res.data.code
              })

          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})