// pages/room/room.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomlist: [
      { id: 'lanwan', name: "蓝湾", peo: "5-6"},
      { id: 'aimei', name: "暧昧", peo: "5-6" },
      { id: 'anxiang', name: "暗香", peo: "7-10" },
      { id: 'lvdao', name: "绿岛", peo: "2-4" },
      { id: 'xiehou', name: "邂逅", peo: "5-6" }
    ],
  },
  orderRoom(e) {
    wx.showModal({
      content: '详情请致电：0794-28888',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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