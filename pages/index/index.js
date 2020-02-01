// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: '',
    imgList: ["https://s1.luckincoffeecdn.com/luckywaprm/media/favor.f2a07d9c.png",
      "https://s1.luckincoffeecdn.com/luckywaprm/media/luckin_tea_bg.3d6ee242.png",
      "https://www.starbucks.com.cn/images/pages/homepage-career-cn.jpg",
      "https://www.starbucks.com.cn/images/pages/tmall-0820-cn.jpg"
    ],
    slogan: [
      '唯爱与美食不可辜负',
      '吃是最好的安慰 ',
      '亲爱的，听我聊聊关于爱',
      '美味调剂生活',
      '假如我有一间咖啡馆',
      '美食，是可以吃下去的幸福记忆',
      '味至浓时是故乡',
      'So Much Spring ',
      '鼠年大吉'
    ],
    random: Math.floor(Math.random() * 10),
    welcome: null,
  },
  welcome() {
    let text = null
    switch (new Date().getHours()) {
      case 6:
      case 7:
      case 8:
        text = "早上好"
        break
      case 9:
      case 10:
        text = "上午好"
        break
      case 11:
      case 12:
      case 13:
        text = "中午好"
        break
      case 14:
      case 15:
      case 16:
      case 17:
        text = "下午好"
        break
      case 18:
        text = "傍晚好"
        break
      case 19:
      case 20:
      case 21:
        text = "晚上好"
        break
      case 22:
      case 23:
      case 24:
        text = "早点睡觉"
        break
    }
    console.log(text)
    this.setData({
      welcome: text
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.animation = wx.createAnimation({
    //   duration: 1000,
    //   delay: 100,
    //   timingFunction: "linear", //运动方式
    //   transformOrigin: "left bottom"
    // })
  },
  // Animation.step() 表示一组动画的完成，可以在一组动画中调用任意多个动画方法，一组动画中的所有动画会同时开始，一组动画完成后才会进行下一组动画
  scale() {
    this.animation.scale(0.2, 0.2).step().scale(1, 1).step() // 对动画进行简单的描述
    this.setData({
      animation: this.animation.export() // 在setData 导出动画数据数据给组件
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.welcome()
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