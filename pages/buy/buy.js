// pages/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemCount: 0,
    vertToView: 'xiaolu',
    horiToView: 'CaramelMacchiato',
    RIGHT_BAR_HEIGHT: 20,
    RIGHT_ITEM_HEIGHT: 98,
    menulist: [{
        "id": 'rq',
        "name": "人气TOP"
      },
      {
        "id": 'xlc',
        "name": "中国茶",
        "tip": "热销"
      },
      {
        "id": 'rnb',
        "name": "鲜榨果蔬汁"
      },
      {
        "id": 'xzgsz',
        "name": "坚果小食",
        "tip": "66折优惠"
      },
      {
        "id": 'ps',
        "name": "披萨",
        "tip": "99折优惠"
      },
      {
        "id": 'wc',
        "name": "蛋糕糖果"
      }
    ],
    buyCount: 1,
    itemlist: [{
        "id": 'CaramelMacchiato',
        "index": 0
      },
      {
        "id": 'Cappuccino',
        "index": 1
      },
      {
        "id": 'Latte',
        "index": 2
      },
      {
        "id": 'Mocca',
        "index": 3
      },
      {
        "id": 'Americano',
        "index": 4
      },
      {
        "id": 'jinjunmei',
        "index": 5
      },
      {
        "id": 'longjing',
        "index": 6
      },
      {
        "id": 'puer',
        "index": 7
      },
      {
        "id": 'maojian',
        "index": 8
      },
      {
        "id": 'xiaoqinggan',
        "index": 9
      },
      {
        "id": 'Hellogoddess',
        "index": 10
      },
      {
        "id": 'babyfavorite',
        "index": 11
      },
      {
        "id": 'Pomelo',
        "index": 12
      },
      {
        "id": 'pearjuice',
        "index": 13
      },
      {
        "id": 'bananamilkshake',
        "index": 14
      },
      {
        "id": 'almond',
        "index": 15
      },
      {
        "id": 'pumpkinseed',
        "index": 16
      },
      {
        "id": 'peanut',
        "index": 17
      },
      {
        "id": 'pinenut',
        "index": 18
      },
      {
        "id": 'sweetmeat',
        "index": 19
      },
    ],
    wendulist: [{
      id: 1,
      name: "常温"
    }, {
      id: 2,
      name: "加热"
    }, {
      id: 3,
      name: "加冰"
    }],
    tangdulist: [{
      id: 1,
      name: "全糖"
    }, {
      id: 2,
      name: "少糖"
    }, {
      id: 3,
      name: "无糖"
    }],
    ishiddenmodal: true,
    selectionTopArr: [],
    containerTop: 0,
    shopsList: [],
    ischoosed: true,
    chooseItemIndex: 0, //选中的类别
    activeType: 0, //默认选中的左列哪一项
    // 双层数组循环
    goodslist: [{
        index: 1,
        id: 'rq',
        name: "人气TOP",
        goodslist: [{
            "id": 0,
            "src": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3314081787,147509822&fm=26&gp=0.jpg",
            "name": "焦糖玛奇朵",
            "english_name": "CaramelMacchiato",
            "price": "27"
          },
          {
            "id": 1,
            "src": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=480607928,2060515286&fm=179&app=42&f=JPEG?w=121&h=140",
            "name": "卡布奇诺",
            "english_name": "Cappuccino",
            "price": "30"
          },
          {
            "id": 2,
            "src": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1520405263,2622262714&fm=26&gp=0.jpg",
            "name": "拿铁",
            "english_name": "Latte",
            "price": "29"
          },
          {
            "id": 3,
            "src": "http://5b0988e595225.cdn.sohucs.com/images/20171018/4d02c9f912f142aea2ba2719dc6cc752.jpeg",
            "name": "摩卡",
            "english_name": "Mocca",
            "price": "25"
          },
          {
            "id": 4,
            "src": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=858667163,488256776&fm=58&bpow=594&bpoh=479",
            "name": "美式咖啡",
            "english_name": "Americano",
            "price": "26"
          }
        ]
      },
      {
        index: 2,
        id: 'xlc',
        name: "中国茶",
        goodslist: [{
            "id": 0,
            "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579277818246&di=ef21c61f74914b0ccf02409a1780e4d0&imgtype=0&src=http%3A%2F%2Ffooding.hmgcdn.com%2Fimages%2Farticle%2F102595%2Fa102595_107891_1429679424.jpg",
            "name": "金骏眉",
            "english_name": "jinjunmei",
            "price": "27"
          },
          {
            "id": 1,
            "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579277945324&di=e0f55ebdbeb088167eee107325055163&imgtype=0&src=http%3A%2F%2Fwww.xianjichina.com%2Fdata%2Fediter%2F20170227%2Fimage%2Fcdfdcff234af5f3071b71a7574f9e6b8.jpg",
            "name": "西湖龙井",
            "english_name": "longjing",
            "price": "30"
          },
          {
            "id": 2,
            "src": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2285220352,2167600482&fm=26&gp=0.jpg",
            "name": "普洱",
            "english_name": "puer",
            "price": "29"
          },
          {
            "id": 3,
            "src": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2500845800,1353266623&fm=26&gp=0.jpg",
            "name": "毛尖",
            "english_name": "maojian",
            "price": "25"
          },
          {
            "id": 4,
            "src": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2974032412,3073057043&fm=26&gp=0.jpg",
            "name": "小青柑",
            "english_name": "xiaoqinggan",
            "price": "26"
          }
        ],
      },
      {
        index: 3,
        id: 'rnb',
        name: "鲜榨果汁",
        goodslist: [{
            "id": 0,
            "src": "https://img.yzcdn.cn/upload_files/2015/07/08/FqVQ_1D7UWhSVfMrFXHUr1B3T8S8.jpg!large.jpg",
            "name": "哈密瓜汁",
            "english_name": "Hellogoddess",
            "price": "27"
          },
          {
            "id": 1,
            "src": "https://img.yzcdn.cn/upload_files/2015/05/08/FukqwqZDI-7k2J8B--1T2UgVL3Ou.jpg!large.jpg",
            "name": "苹果汁",
            "english_name": "babyfavorite",
            "price": "30"
          },
          {
            "id": 2,
            "src": "https://img.yzcdn.cn/upload_files/2015/05/08/FklNXCWAjRxeaXncTvpA0Oiwp1r3.jpg!large.jpg",
            "name": "满杯鲜柚",
            "english_name": "Pomelo",
            "price": "29"
          },
          {
            "id": 3,
            "src": "https://img.yzcdn.cn/upload_files/2015/05/08/FmoHBgbm64rTRqx33iJ_YACNsisw.jpg!large.jpg",
            "name": "梨汁",
            "english_name": "pearjuice",
            "price": "25"
          },
          {
            "id": 4,
            "src": "http://dingyue.ws.126.net/Racnzg2Mi=8o4cLTgLl3S=nwqxUPKC6BjkPAFrPKYFkdD1526603949792.jpg",
            "name": "香蕉奶昔",
            "english_name": "bananamilkshake",
            "price": "26"
          }
        ],
      },
      {
        index: 4,
        id: 'xzgsz',
        name: "坚果小食",
        goodslist: [{
            "id": 0,
            "src": "https://img.zcool.cn/community/0160255c47403da801203d22f84fd1.jpg@1280w_1l_2o_100sh.jpg",
            "name": "杏仁",
            "english_name": "almond",
            "price": "27"
          },
          {
            "id": 1,
            "src": "https://img.zcool.cn/community/0191b35c47407ca801213f26732620.jpg@1280w_1l_2o_100sh.jpg",
            "name": "开心果",
            "english_name": "pistachio",
            "price": "30"
          },
          {
            "id": 2,
            "src": "https://img.zcool.cn/community/01c6165c473fcca801203d22f69ea4.jpg@1280w_1l_2o_100sh.jpg",
            "name": "夏威夷果",
            "english_name": "peanut",
            "price": "29"
          },
          {
            "id": 3,
            "src": "https://img.zcool.cn/community/0177f95c474041a801213f263e2206.jpg@1280w_1l_2o_100sh.jpg",
            "name": "松子",
            "english_name": "pinenut",
            "price": "25"
          },
          {
            "id": 4,
            "src": "http://img04.taobaocdn.com/bao/uploaded/i4/TB2UBYbepXXXXbPXpXXXXXXXXXX_!!2085465992.jpg_310x310.jpg",
            "name": "情人梅",
            "english_name": "sweetmeat",
            "price": "26"
          }
        ],
      },
      {
        index: 5,
        id: 'ps',
        name: "披萨",
        goodslist: [{
            "id": 0,
            "src": "https://img.zcool.cn/community/0160255c47403da801203d22f84fd1.jpg@1280w_1l_2o_100sh.jpg",
            "name": "奥尔良鸡肉披萨",
            "english_name": " Chickenpizza",
            "price": "27"
          },
          {
            "id": 1,
            "src": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=768984032,3644931271&fm=26&gp=0.jpg",
            "name": "培根披萨",
            "english_name": "baconpizza",
            "price": "30"
          },
          {
            "id": 2,
            "src": "https://p1.meituan.net/deal/439afd2e58e371cdc88010b83ebb439c57988.jpg@428w_320h_1e_1c",
            "name": "榴莲披萨",
            "english_name": "durianpizza",
            "price": "29"
          },
          {
            "id": 3,
            "src": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2460584163,2213812614&fm=26&gp=0.jpg",
            "name": "菠萝水果披萨",
            "english_name": "fruitpizza",
            "price": "25"
          },
          {
            "id": 4,
            "src": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1026979236,3981457948&fm=26&gp=0.jpg",
            "name": "牛肉披萨",
            "english_name": "Beefpizza",
            "price": "25"
          }
        ],
      }
    ]
  },
  // 加入购物车
  addcart(e) {
    console.log('addcart拿到的', e)
    this.setData({
      ishiddenmodal : true,
      buyCount: 1,
    })
    // //获取缓存中的已添加购物车信息
    console.log(wx.getStorageSync('cartItems'))
    const cartItems = wx.getStorageSync('cartItems') || [];
    // 函数提升?
    // find返回符合条件的数组的第一个元素值 遍历cartItems数组 返回缓存项中id与currentTarget的id相等的项（exist）
    // 这里遍历总是无法遍历到当前操作添加进来的那个项 异步?
    var exist = cartItems.find(function(el) {
      return el.id === e.currentTarget.dataset.id
      console.log('当前项的id', el.id) //拿到上一次添加cartItem的值
      console.log('这次被添加进来的dataset的id', e.currentTarget.dataset.id) //这是这一次添加的item
    })
    console.log('exist', exist)
    if (exist) {
      //如果存在，则增加该商品的购买数量
      exist.buycount = parseInt(exist.buycount) + parseInt(e.currentTarget.dataset.buycount);
      wx.setStorageSync('cartItems', cartItems) //别忘了更新数据
      console.log(parseInt(exist.buycount), parseInt(e.currentTarget.dataset.buycount))
      wx.showToast({
        title: "又成功添加购物车",
        icon: "success",
        durantion: 2000
      })
    } else {
      // 如果不存在，传入该商品信息
      cartItems.push(e.currentTarget.dataset)
      try {
        wx.setStorageSync('cartItems', cartItems)
        //添加购物车的消息提示框
        wx.showToast({
          title: "成功添加购物车",
          icon: "success",
          durantion: 2000
        })
      } catch (e) {
        wx.showToast({
          title: "添加失败，请检查网络",
          icon: "fail",
        })
      }
    }
  },
  jian() {
    if (--this.data.buyCount < 1) this.data.buyCount = 1
    this.setData({
      buyCount: this.data.buyCount,
    })
  },
  jia() {
    this.setData({
      buyCount: ++this.data.buyCount
    })
  },
  // 向左切换
  goLeft(e) {
    if (e.currentTarget.dataset.id === "CaramelMacchiato" || this.data.itemCount < 0) this.data.itemCount = 0
    this.setData({
      itemCount: --this.data.itemCount,
      horiToView: e.currentTarget.dataset.id,
      buyCount: 1,
    })
    // console.log("left", "index", e.currentTarget.dataset.index, "id", e.currentTarget.dataset.id)
  },
  // 向右切换
  goRight(e) {
    if (e.currentTarget.dataset.id === "beefpizza") this.data.itemCount = 25 //这里的先自增再赋值
    this.setData({
      itemCount: ++this.data.itemCount,
      horiToView: e.currentTarget.dataset.id,
      buyCount: 1, //重置为1
    })
    console.log('right', "index", e.currentTarget.dataset.index, "id", e.currentTarget.dataset.id)
  },
  // 选择规格
  choosewendu(e) {
    console.log(e.detail)
  },
  choosetiandu(e) {
    console.log(e.detail)
  },
  closemodal(e) {
    console.log(e)
    this.setData({
      ishiddenmodal: true,
      horiToView: e.currentTarget.dataset.id,
      buyCount: 1, //重置为零
      // itemCount: 0,
    })
  },
  // 点击跳转详情
  showmodal(e) {
    console.log(e)
    this.setData({
      // 定位出现的同时 将下面的标记count拉到当前定位的点
      ishiddenmodal: false,
      // chooseItemIndex: e.currentTarget.dataset.index,//系列名
      horiToView: e.currentTarget.dataset.id, //系列中item值
    })
  },
  // 左侧分类跳转
  changeType(e) {
    console.log(e);
    this.setData({
      activeType: e.currentTarget.dataset.index, //取到当前数组对象的自定义type更新到activeType中
      vertToView: e.currentTarget.dataset.id
    })
  },
  changetype() {
    this.setData({
      ischoosed: !this.data.ischoosed
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  vertScroll(e) {
    console.log(e.detail);
    var horScrollHeight = e.detail.scrollTop
    var detailAll = this.data.goodslist //数组，包含所有商品和该分类下商品
    console.log(detailAll)
    var sumHeight = 0; //自定一个一个变量，用来存每个商品和商品一共的高度
    for (var index in detailAll) { //循环所有商品和商品
      var type = detailAll[index]; //商品
      var itemSize = detailAll.length; //每个商品下的所有商品
      //用定义的变量 加等于 每个商品标题的高度（20）+ 每个商品下的所有商品的数量（itemSize ）乘以 每个商品的高度（98）
      //就是右侧菜单所有商品标题和商品的一共高度
      //（这里的15 和100代表的是像素（px））
      sumHeight += this.data.RIGHT_BAR_HEIGHT + itemSize * this.data.RIGHT_ITEM_HEIGHT;
      console.log(type)
      console.log(type.id, "scrollheight当前项到顶部的高度", horScrollHeight, "sumheight右侧菜单及所有商品的一共高度", sumHeight)
      if (horScrollHeight <= sumHeight) {
        console.log("滑动够多了 可以切左边了！")
        this.setData({
          activeType: type.index - 1
        })
        break;
      }
    }
  },
  horiScroll(e) {

  },
  onLoad: function(options) {
    var that = this; //回调函数保存作用域
    wx.getSystemInfo({
      success(res) {
        console.log("成功获取高度：", res.windowHeight)
        console.log("宽度", res.windowWidth)
        var asideheight = res.windowHeight
        var asidewidth = res.windowWidth
        var asideheight1 = 0;
        that.setData({
          asideheight: asideheight,
          asidewidth: asidewidth,
          // scrollheight: res.windowHeight
        })
      },
      fail: () => {
        console.log("无法获取显示器高度，请检查网络连接")
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

  },

})