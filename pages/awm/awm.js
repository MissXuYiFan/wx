// pages/awm/awm.js
var WxParse = require('../../wxParse/wxParse.js');//富文本解析
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:["../../images/6.png"],
    xx:["../../images/9.png"]
  },
  //点击进入消息聊天
  xiao:function(e){
    wx.navigateTo({
      url: '../list/list',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this
   wx.getStorage({
     key: 'id',
     success: function(b) {
       wx.request({
         url: 'https://buke.weiyuanna.com/api/articleDetail',
         data: { signature: b.data, id: options.id},
         header: { 'content-type': 'application/x-www-form-urlencoded' },
         method: 'POST',
         success: function(res) {
           console.log(res.data.data.articleInfo) /
           console.log(res.data.data.articleInfo.id)//文章id
           console.log(res.data.data.articleInfo.flag)//0 取消关注 1 关注 
           that.setData({
             list: res.data.data.articleInfo,

           })
          //富文本解析
           var article = res.data.data.articleInfo.content;
           WxParse.wxParse('article', 'html', article, that, 5);
           
         },
         fail: function(res) {},
         complete: function(res) {},
       })
       
     },

   })

  },
  // 关注作者
  guan:function(e){
    const authorID = e.currentTarget.dataset.id
    const follow = e.currentTarget.dataset.flag
    const that = this
    wx.getStorage({
      key: 'id',
      success: function (b) {
        wx.request({
          url: 'https://buke.weiyuanna.com/api/follow',
          data: { 
            signature: b.data,
            authorID: authorID,
            follow: follow
            },
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          success: function (res) {
            console.log(res)
            if(res.data.code===10003){
              console.log("作者不存在")
            }
          },
          fail: function (res) { },
          complete: function (res) { },
        })

      },

    })
  },
  // 收藏文章
  show:function(o){
    const authorID = o.currentTarget.dataset.id
    //缺少收藏，取消的参数哦
    console.log(authorID)
    const that =this
    wx.getStorage({
      key: 'id',
      success: function(b) {
        wx.request({
          url: 'https://buke.weiyuanna.com/api/favorite',
          data: {
            signature: b.data,
            articleID: articleID
          },
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          success: function(res) {
            console.log(res)
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },
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