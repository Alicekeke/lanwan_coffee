// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  showDiscount() {
    wx.showToast({
      title: '找老板娘要哦~',
      icon: 'none',
      duration: 2000,
    })
  },
  showWifi() {
    wx.showToast({
      title: 'LWKF1988',
      icon: 'none',
      duration: 2000,
    })
  },
  showAbout() {
    wx.showToast({
      title: '有什么问题，可以qq联系我哦 ~ Q:2060824367',
      icon: 'none',
      duration: 4000,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  // 地址
  onShow: function() {
    wx.getStorage({
      key: 'address',
      success: (result) => {
        console.log(result)
        // 本地数据取成功，数据放进数据源
        this.setData({
          address: result.data
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})