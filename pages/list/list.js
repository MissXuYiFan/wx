Page({
  data: {
    InputBottom: 0
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },


  onLoad:function(){
    const that = this
    wx.getStorage({
      key: 'id',
      success: function(b) {
        wx.request({
          url: '',
          data: { signature: b.data,},
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          success: function (res) {
            console.log(res)
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
    })
    
  },

  //点击事件、
  emoji:function(e){
    this.setData({
      app: 0|300
    })

   
  }
})