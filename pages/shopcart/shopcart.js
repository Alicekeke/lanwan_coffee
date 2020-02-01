// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    // 判断购物车是否有数据
    hasList: false,
    selectAllStatus: false,
    totalPrice: ''
  },
  // 单选
  selectList(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    let selected = `carts[${index}].selected` /* 修改carts屬性，拿到此时对应下标的selected状态 */
    console.log(selected)
    this.setData({
      [selected]: !this.data.carts[index].selected
    })
    this.getTotalPrice()
    let carts = this.data.carts
    for (let i = 0; i < carts.length; i++) {
      // 判断是否全选的状态
      if (!carts[i].selected == true) { /* 如果有一个项目没有选中，全选也没有了 */
        this.setData({
          selectAllStatus: false
        })
        return /* 记得return，否则第一个没选中，第二个选中了，全选还是生效 */
      } else {
        this.setData({
          selectAllStatus: true
        })
      }
    }
  },
  // 全选
  selectAll() {
    let selectAllStatus = this.data.selectAllStatus
    selectAllStatus = !selectAllStatus /*全选逻辑取反 */
    let carts = this.data.carts
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus /**在子项中全部更改状态 */
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    })
    this.getTotalPrice()
  },
  // 计算总价
  getTotalPrice() {
    let carts = this.data.carts
    let total = 0
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        total += carts[i].buycount * carts[i].price
      }
    }
    this.setData({
      totalPrice: total
    })
  },
  // icon绑定事件 更新数组
  // selectItem(e) {
  //   let index = e.currentTarget.dataset.index //获取当前选中的index,根据index找到下标
  //   let carts = this.data.carts
  //   this.setData({
  //     carts: carts
  //   })
  // },
  // 单件商品加数量
  addCount(e) {
    let index = e.currentTarget.dataset.index
    let carts = this.data.carts
    let buycount = parseInt(carts[index].buycount)
    // 拿到的buycount字符串 要parse转换一下
    buycount += 1
    carts[index].buycount = buycount
    this.setData({
      carts: carts
    })
    this.getTotalPrice()
  },
  // 单件商品减数量
  jianCount(e) {
    let index = e.currentTarget.dataset.index
    let carts = this.data.carts
    let buycount = carts[index].buycount
    buycount -= 1
    if (buycount < 0) {
      buycount = 0
    }
    carts[index].buycount = buycount
    this.setData({
      carts: carts
    })
    this.getTotalPrice()
  },

  // bindlogpress长按删除数据
  longpress: function(e) {
    // 回调保存下作用域
    var that = this
    console.log(e)
    console.log("long tap")
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success(res) {
        if (res.confirm) {
          console.log('删除成功')
          let index = e.currentTarget.dataset.index
          let carts = that.data.carts
          carts.splice(index, 1) /*splice：从index下标开始删除几项 */
          that.setData({
            carts: carts
          })
          that.getTotalPrice() //删除单项后开始计算总价。
          // 更新Storage中的数组
          wx.setStorageSync('cartItems', carts)
        } else if (res.cancel) {
          console.log('取消删除')
        }
      }
    })
  },

  pay(e) {
    console.log(e)
    if (e.currentTarget.dataset.totalprice == 0) {
      wx.showToast({
        icon: 'none',
        title: '请先选中商品哦~',
        duration: 2000
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请在吧台结算哦~',
        duration: 2000
      })
    }
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
  onShow: function() {
    var that = this
    // 同步取到缓存中购物车信息
  //   try {
  //     var value = wx.getStorageSync('cartItems')
  //     if (value) {
  //       console.log(value);
  //       that.setData({
  //         hasList: true,
  //         carts: value
  //       })
  //       this.getTotalPrice()
  //     }
  //   } catch (e) {
  //     console.log('error!')
  //   }
  // },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function() {
  //   try {
  //     wx.clearStorageSync()
  //     wx.showToast({
  //       title: "清理本地缓存",
  //       icon: "success",
  //       durantion: 2000
  //     })
  //   } catch (e) {
  //     // Do something when catch error
  //   }
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