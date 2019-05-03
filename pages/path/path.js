// pages/path/path.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  okda: function (e) {
    wx.navigateTo({
      url: '../awm/awm?id=' + e.currentTarget.dataset.id,
    })
  },
  //点击事件
  xiao:function(){
    wx.navigateTo({
      url: '../list/list',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    const that=this
    // 从本地缓存拿到数据
    wx.getStorage({
      key: 'id',
      success(b) {
        // 文章页面的请求
        wx.request({
          url: 'https://buke.weiyuanna.com/api/articleList',
          data: { signature:b.data},
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          success: function(res) {
            var list = res.data.data.articleList
            console.log(list)
            that.setData({
              list: res.data.data.articleList
              //res代表success函数的事件对，data是固定的，list是数组
            })
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    })
  },

  //翻页到此结束
  // ak:function(){
  //   var that = this;

  //   // 从本地缓存拿到数据
  //   wx.getStorage({
  //     key: 'id',
  //     success(b) {
  //       wx.showLoading({
  //         title: '玩命加载中',
  //       })
  //       // 页数+1
  //       page = page + 1;
  //       wx.request({
  //         url: 'https://buke.weiyuanna.com/api/articleList?page=0',
  //         data: { signature: b.data },
  //         header: { 'content-type': 'application/x-www-form-urlencoded' },
  //         method: 'POST',
  //         success: function (res) {
  //           wx.hideLoading()
  //           console.log(res)
  //         },
  //         fail: function (res) { },
  //         complete: function (res) { },
  //       })
  //   }
  // })
// },

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