// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 28.232602,
    longitude: 116.601906, 
    scale: 18,
    mapHeight: 0,
    markers: [{
      iconPath: "../../assests/icons/go.svg",
      id: 0,
      latitude: 28.232602,
      longitude: 116.601906,
      width: 30,
      height: 30
    }],
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
    // 请求当前定位
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(res)
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,
          complete:function(ress) {
            console.log(ress)
          }
        })
      }
    })
  },
  // 重置定位
  calluser() {
    wx.showToast({
      title: 'none',
      title: '我也不知道',
    })
  },

  toReset() {
    // 创建map上下文  保存map信息的对象 调整缩放比 提升体验
    setTimeout(() => {
      this.setData({
        scale: 20
      })
    }, 1000)
    this.mapCtx = wx.createMapContext('myMap');
    this.mapCtx.moveToLocation()
  },

  // 回到门店定位点
  go() {
    wx.openLocation({
      latitude: 28.232602,
      longitude: 116.601906,
      scale: 18,
      complete: function (ress) {
        console.log(ress)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.getSystemInfo({
      success(res) {
        console.log("成功获取设备高度：", res.windowHeight)
        let mapHeight = res.windowHeight
        that.setData({
          mapHeight: mapHeight - 80,
        })
      },
      fail: () => {
        console.log("无法获取设备高度，请检查网络连接")
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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