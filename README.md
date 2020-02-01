
# 前言 
寒假边兼职边写的，根据我打工的咖啡店的实际需求而写的微信小程序。

## 页面结构
```
  "pages": [
    "pages/buy/buy",  //菜单页
    "pages/index/index",  //主页
    "pages/shopcart/shopcart",  //购物车页面
    "pages/mine/mine",  //个人主页
    "pages/room/room",  //房间页
    "pages/address/address"   //门店地址页
  ],
```

## 开始前基本的准备
- iconfont图标使用

在iconfont找到喜欢的，添加购物车，下载代码，放入小程序的assests下的fonts目录 ，吧iconfont.css文件重命名为iconfont.wxss文件
，iconfont.wxss最下面那几个类名选择器，按类目在自己的代码中引入，再根据自己的需要调整样式即可，后期要是再看到自己喜欢的图标，就需要重新下载更新文件，或者找一个在线合并svg的工具网站，（ps：嗯。我就是又看到自己喜欢的图标去合并了）
```
//iconfont引入的代码
.icon-jia:before {
  content: "\e61a";
}
//wxml中使用
 <view class="iconfont icon-jia" bindtap="showmodal" data-index="{{item.index}}"/>
```

- app.json的基本配置
    1. tabBar  看小程序官方文档[tabBar](https://developers.weixin.qq.com/miniprogram/dev/extended/weui/tabbar.html)
    2. Navigation全局配置 


- 画原型图

    应该画的，但我没讲究，直接画在只有我看得懂的草稿纸上(´×ω×`)。

# 页面详解
![index.gif](https://user-gold-cdn.xitu.io/2020/1/22/16fcc73f6cbb1015?w=416&h=748&f=gif&s=88545)

## 首页
一个个来，先从首页开始吧，东西很简单，一个logo图，一个气泡，三个列表项。
#### 小程序中使用animation
小程序支持css3和api两种方式创建animation，`form{ transfrom: scale(.2,.2) } to { transfrom: scale(1, 1)}` ，from需要先从scale(1, 1)开始。我看文档推荐使用wx.createAnimation实现。这个api具体实现时：首先，创建动画对象，并设置相关的参数；其次，设置动画类型，并执行动画；第三，导出并设置动画数据；最后，将设置的动画数据动态配置相应的组件，以此实现组件的动画效果。
那我把两种实现方式放在下面吧，能用css3实现就不考虑api了，大家自行对比；
```
//css3写法
@keyframes pop{
  from {transform: scale(0.2,0.2);}
  to {transform: scale(1, 1);}
}
.chat-bubble {
  /*属性简写*/
  animation: pop 3s ease 1;
  /* 定义transform缩放基点 */
  transform-origin:left bottom;
  animation-delay: 2s;
}
//------------api写法-------
onReady: function() {
    this.animation = wx.createAnimation({
      duration: 1000,
      delay: 100,
      timingFunction: "linear", //运动方式
      transformOrigin: "left bottom"
    })
  },
  // Animation.step() 表示一组动画的完成，可以在一组动画中调用任意多个动画方法，一组动画中的所有动画会同时开始，一组动画完成后才会进行下一组动画
  scale() {
    this.animation.scale(0.2, 0.2).step().scale(1, 1).step() // 对动画进行简单的描述
    this.setData({
      animation: this.animation.export() // 在setData 导出动画数据数据给组件
    })
  },
 ```

#### 伪类画一个聊天气泡
有些同学可能看出来了，这个气泡的交互还有下面的随机slogan模仿下厨房小程序，确实，前几个月我想仿写个下厨房小程序，界面搭好了，好不容易数据也爬全了，但我电脑光荣负伤，我只好重装系统，不幸的是这个小程序代码没有备份到，一夜回到解放前，我也心灰意冷，转战写vue去辽。但这两个交互我真的很喜欢，好暖好可爱的说! ，话不多说，来实现一下吧！
气泡用伪类画气泡框和下面的小三角
小三角用`border soild`画 右边和底部给transparent, 聊天框直接给圆角。聊天框我在js写了个switch，根据当前时间显示不同的文字。比如写这篇文章的现在，我应该早点睡觉了。
logo、slogan、菜单list，布局使用flex整体居中，气泡用子绝父相定位到合适的地方
```
.chat-bubble {
  position: absolute;
  width: 86px;
  height: 31px;
  border-radius: 9px;
  background-color: #78aaca;
  color: #fff;
  text-align: center;
  line-height: 32px;
  font-size: .8em;
  animation: pop 3s ease 1;
  /* 定义transform缩放基点 */
  transform-origin:left bottom;
  animation-delay: 2s;
}
.chat-bubble:before {
  content: '';
  position: absolute;
  border-top: 7px solid #78aaca;
  border-left: 7px solid #78aaca;
  border-right: 7px solid transparent;
  border-bottom: 7px solid transparent;
  top: 25px;
  left: 0px;
  z-index: 2;
}
```
**animation**：
用keyframes定义关键帧，在这里关键帧主要分为2个阶段，0%、100%。from,to相当于0% - 100%的帧变化，动画播放时长为3s、单次播放、以ease的方式进行播放，模拟聊天气泡出现，`transfrom-origin`定义缩放基点在左下角。定义好后将属性添加到对应类上即可
```
@keyframes pop{
  from {transform: scale(0.2,0.2);}
  to {transform: scale(1, 1);}
}
.chat-bubble {
  /*属性简写*/
  animation: pop 3s ease 1;
  /* 定义transform缩放基点 */
  transform-origin:left bottom;
  animation-delay: 2s;
}
```
随机slogan直接在绑定一个随机数当下标，每次刷新对应值改变。
```
    wxml: <view class="sologn">{{slogan[random]}}</view>
    js: random: Math.floor(Math.random() * 5),
```
菜单栏也是flex布局，`justify-content`和`align-content`都 `space-between``，散开在左右
具体样式也是UI三大宝：边框、阴影和圆角，渐变，渲染少不了

## 房间页
![房间.gif](https://user-gold-cdn.xitu.io/2020/1/22/16fcc73f6cdcfd9b?w=416&h=748&f=gif&s=490383)

你可能会好奇为什么咖啡店有房间，嗯。。。我打工的店里实际情况就是这样，这个需求也得写。    
也是一样，整体flex布局 space-between，右边详情栏改变主轴方向` flex-direction：column ` 然后再加UI三件套就行   
对了 这里跳转方式`open-type`要改为`navigatie`:保留当前页面，跳转到应用内除了tabbar的某个页面。可点击左上角返回到原页面。
```
这个太简单了 代码我就不贴啦，可以去github看完整源码
```

## 门店位置，地图组件
![地图.gif](https://user-gold-cdn.xitu.io/2020/1/22/16fcc73f6e764122?w=416&h=748&f=gif&s=590185)

map组件还蛮多东西的，因为我写的重点不是地图导航，使用只是把门店地址定位到并显示，并且在门店位置和使用者位置之间切换而已，真正用还是要引入地图的SDK，文档讲的很详细，大家可以细细研究。我的功能点主要就是点击`cover-image`重置使用者当前定位，和点击组件`marker`定位到门店。
- 重置使用者当前定位 `wx.moveToLocation()`
```
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
```
- 回到门店定位 `wx.openLocation`
```
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
```

## 点单页面
这个页面是最复杂的页面，看效果图
![点单.gif](https://user-gold-cdn.xitu.io/2020/1/22/16fcc73f79585e9b?w=416&h=748&f=gif&s=1335293)

这里有三个scroll-view 分别是左边的类别，右边的商品列表，以及弹出层的详情展示。

### 左右菜单联动


功能要求：
1. 点击左边的菜单列表，右边的商品信息会滑动到对应位置.
2. 滑动右边的商品信息，左边的商品列表高亮的菜单项会发生对应变化.

先看左右的菜单，从页面结构上看，float让左右菜单布局在左右两边；最外层container弹性布局，给左边菜单一个固定的宽度，右边`flex:1` 宽度自适应； 高度上左右菜单都需要100%占满全屏，右菜单每个分类`selection`也占满一屏，保证跳转（这里有一个小坑，scroll-view必须给定指定的高度数值，才能有滑动效果，我们需要在js的onLoad中调用wx.getSystemInfoSync()方法来实时计算获取视口的高度返回给右边纵向的scroll）；外层盒子都设置`box-sizing: border-box;`把元素的内外边距都塞到盒子里面 防止盒子变形；右边菜单单个item用弹性布局，item里的图片、详情、图标子绝父相定位；

 微信给scroll-view提供了很多方便的属性，我们按需取用即可，在这里除了自定义的事件绑定外，帮助我们实现基本滑动交互的是`scroll-into-view`、`bindscroll`，它能记录并跳转对应的item，
```
 <!-- 左侧菜单 -->
  <scroll-view class="left" scroll-y="true" scroll-into-view="{{vertToView}}" scroll-with-animation="{{true}}">
    <view class="item {{activeType===index?'active':''}}" data-id="{{item.id}}" bindtap="changeType" wx:for="{{menulist}}" data-index="{{index}}" wx:key="{{item.id}}">
      {{item.name}}
      <view wx:if="{{item.tip}}" class="tip">{{item.tip}}</view>
    </view>
  </scroll-view>
```
右侧菜单
```
 <!-- 右侧菜单 -->
   <scroll-view class="right" bindscroll="vertScroll" scroll-with-animation="true" scroll-into-view="{{vertToView}}" scroll-y="true" style="height: {{asideheight}}px;">
    <!-- veri-out -->
    <view id="{{item.id}}" class="selection" wx:for="{{goodslist}}" wx:key="item.id">
      <!-- 分类标识 -->
      <view>
        <view>{{item.name}}</view>
        <view />
      </view>
      <view class="content">
        <!-- veri-in -->
        <view id="{{product.english_name}}" class="item" wx:for="{{item.goodslist}}" wx:key="index.english_name" wx:for-item="product">
          <view bindtap="showmodal" data-index="{{item.index}}" data-id="{{product.english_name}}">
            <image src="{{product.src}}" />
          </view>
          <view class="item-detail">
            <view>{{product.name}}</view>
            <view>{{product.english_name}}</view>
            <view>￥{{product.price}}</view>
          </view>
          <view class="iconfont icon-jia" bindtap="showmodal" data-index="{{item.index}}" data-id="{{product.english_name}}" />
        </view>
      </view>
    </view>
  </scroll-view>
```
![左切换.gif](https://user-gold-cdn.xitu.io/2020/1/22/16fcc73f6e8c4b98?w=416&h=748&f=gif&s=882820)

先看点击左侧右侧菜单滑动，这个其实很简单，只需要记录左边的对应id，更新右侧用`scroll-into-view`跳转即可

```
  // 左侧分类跳转
  changeType(e) {
    console.log(e);
    this.setData({
      activeType: e.currentTarget.dataset.index, //取到当前数组对象的对应id值更新到activeType中
      vertToView: e.currentTarget.dataset.id    //跳转到对应项
    })
  },
```
![右滑动.gif](https://user-gold-cdn.xitu.io/2020/1/22/16fcc73f75eb2707?w=416&h=748&f=gif&s=1780482)
右侧菜单滑动左侧改变状态，就需要通过scroll事件不断判断当前的视口距离顶部的高度是否超过当前项的商品高度与前几类商品累加的高度之和，如果超过，就更新左侧的高亮项
```
    RIGHT_BAR_HEIGHT: 20, //右侧菜单bar的高度
    RIGHT_ITEM_HEIGHT: 98,  //右侧菜单单项商品的高度
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
      //（这里的20 和98代表的是px）
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
```

### 弹出层商品详情页面逻辑
![modal布局.png](https://user-gold-cdn.xitu.io/2020/1/22/16fcc73fb11dbf80?w=1240&h=722&f=png&s=269021)

页面布局如上图，弹出层详情页基本上都是弹性布局 + 子绝父相 （定位太香了，也不必担心冲突）
- `wx:if ` VS ` hidden` [详情](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/conditional.html#wx:if%20vs%20hidden)    
小程序官方文档中给出了一个除wx:if外的条件渲染，hidden，在这种需要频繁切换的情景下相比于wx:if，hidden 更加适合，组件始终会被渲染，只是简单的控制显示与隐藏。在这里设置ishiddenmodal的布尔值绑定model出现与否
- 蒙层
宽高都给100%，固定定位定在屏幕中间。left，top给零拉满全屏，层级给高，就能实现最基本的蒙层
```
.modal {
  width: 100vh;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: scroll;
}
```
- menu组件
灵活的组件化可以提高代码的可复用性。这里我将规格选择的菜单封装为自定义组件，在菜单页面复用。
首先，我们要了解下组件的一些基础特性以及用法。
1、想要使用组件，需先在menu.json配置定义当前文件夹目录为组件目录模板
menu组件menu.json
```
{"component": true,}
```
在引用的页面json引入组件模板
```
"usingComponents": {
    "menu":"/components/menu/index"
  }
```
组件通信监听触发事件，这里使用 `triggerEvent` 方法，指定事件名、事件对象。把当前选中项id传给父组件；组件生命周期，在组件完全初始化完毕、进入页面节点树后， attached 生命周期被触发，默认选中第一个选中actived。
```
 Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array   //  在此定义的是组件对外要开发的属性
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    actived: -1   //data里定义的是在组件里自己使用的私有的数据
  },
  //组件初始化完成，触发attached， 默认选中第一个选项
  attached: function(e) {
    // console.log(e)
    this.setData({
      actived: this.data.list[0].id
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changetype(e) {
      // console.log(e.currentTarget.dataset.id)
      this.setData({
        actived: e.currentTarget.dataset.id
      })
      this.triggerEvent("choose", e.currentTarget.dataset.id)
    }
  }
})
  ```
![scrollx左右切.gif](https://user-gold-cdn.xitu.io/2020/1/22/16fcc73fac491137?w=416&h=748&f=gif&s=2154789)

- sroll-x
横向的scroll-x与纵向的scrolly同理，都是双层循环取出数据，再用ID绑定当前的对应的item，来更新scroll-into-view中的索引值，弹出详情的宽给 80% 让它可以居中。特别注意的是，需要设置scroll-view的`white-space: nowrap;` nowrap即强制不换行。如果换行了，就起不到效果了；另外每个单项都需要设置width:100%并设置子元素 display: inline-block; 行内块元素。才能有滑动效果
```
.scroll-view-H {
  width: 80%;
  height: 80%;
  white-space: nowrap;
}
.Hori-item {
  display: inline-block;
}
.Hori-item-cell {
  display: inline-block;
}
.modal-content {
  width: 80%;
  margin-left: 80rpx;
  position: relative;
  background: #fff;
  border-radius: 20rpx;
  padding-bottom: 25rpx;
  overflow: hidden;
  display: inline-block;
}
```
- 切换小三角箭头
本来想用icon，后来干脆用边框画的
wxml
```
 <!-- 左右切换小三角 -->
  <view class="switchIcon">
    <view class="switch goleft" bindtap="goLeft" data-index="{{itemCount}}" data-id="{{itemlist[itemCount-1].id}}" style="{{itemlist[itemCount].id === 'CaramelMacchiato' ? 'border-color:#a9a9a9' : ''}}" />
    <view class="switch goright" bindtap="goRight" data-index="{{itemCount}}" data-id="{{itemlist[itemCount+1].id}}" style="{{itemlist[itemCount-1].id === 'beefpizza' ? 'border-color:#a9a9a9' : ''}}" />
  </view>
 
```
wxss
```
.switchIcon .goright {
  width: 30rpx;
  height: 30rpx;
  margin-left: 200rpx;
  border-top: 4px solid #fff;
	border-right: 4px solid #fff;
	transform: rotate(45deg);
  padding: 10rpx;     /*给padding增大用户可触碰面积*/
  box-sizing:border-box;    /*把元素的内外边距都塞到盒子里面 包含boeder 不让盒子变形 让可触的面积增大*/
}
.switchIcon .goleft {
  width: 30rpx;
  height: 30rpx;
  margin-right: 200rpx;
  border-bottom: 4px solid #fff;
	border-left: 4px solid #fff;
	transform: rotate(45deg);
  box-sizing: border-box;
  padding: 10rpx;
}
```
因为这里再用双层数组循环拿数据有点麻烦，所以另开了个数据表，单独记录当前项的id和index。事件绑定index和对应的商品id来标识当前显示的商品。设置一个count来记录用户的点击，若当前点击对应的是第一个商品的id或count为负，就初始化为零。更新horiToView绑定当前id，count自增或自减。来左右切换。这里我觉得逻辑不是很完美，还是有很明显的bug，开发的时候也是头疼了很久，时间匆忙，搭嘎有啥宝贵意见一定要告诉我呀！
js
```
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
```

### 加入购物车
购物车的做法有很多种，一般存放在本地缓存和数据库中，一切从简，本文就存放到了缓存中，用到`wx.getStorageSync`和`wx.getStorageSync`这两个同步的api。这里踩了个坑，最开始我用的是异步的api，一直出现一个异步的问题，在控制台打印出来，存放已加入购物车的数据一直没有办法遍历到最新加进来的数据，因为当前页面拿到的都是上一个加入购物车操作提供的那个数据，开始我没有注意到异步的问题，这个时候就很奇怪，因为同一页面打印同一个数组，结果都不一样，想起之前看《你不知道的javascript中卷》在异步那一节有讲，控制台是一个异步的操作，I/O会延迟。后来干脆就换成官方文档中推荐的同步写法，终于缓存数据存取正常。所以说还是要看文档。一般建议该用同步的时候就要用同步，同步解决不了的问题再用异步，不仅因为异步方法的调试有点困难，这个还是要根据自己的业务来进行判断看用同步还是异步，当你的业务很庞大的情况下，去使用异步，当你的业务是同步的话，那就最好还是使用同步，我添加购物车的数据在队列中直接被执行，用同步就能满足需求。
- 缓存中加入购物车数据的逻辑流程
购物车是否有数据 -> 添加的项是否在购物车已经存在 -> 存在增加购买count -> 不存在，传入该商品信息 。这里要用id做单个商品的唯一标识来绑定数据，并且要符合id的命名规范，在这里我直接用商品的英文名做唯一标识 。
添加购物车的js
```
// 加入购物车
  addcart(e) {
    this.setData({
       ishiddenmodal : true
    })
   //获取缓存中的已添加购物车信息
    console.log(wx.getStorageSync('cartItems'))
    const cartItems = wx.getStorageSync('cartItems') || [];
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
```
- 购物车页面取数据
`wx.getStorageSync`拿到缓存中对应key的数据，更新当前页面的购物车carts数据      
购物车页面取数据js 我放在onShow，小程序页面显示后。   
```
onShow: function() {
    var that = this
    // 同步取到缓存中购物车信息
    try {
      var value = wx.getStorageSync('cartItems')
      if (value) {
        that.setData({
          hasList: true,
          carts: value
        })
        this.getTotalPrice()
      }
    } catch (e) {
      console.log('error!')
    }
  },
```

## 购物车页面
![购物车逻辑.gif](https://user-gold-cdn.xitu.io/2020/1/22/16fcc73fb6a7b249?w=416&h=748&f=gif&s=222900)

购物车页面布局与菜单页面的右菜单差不多一致，主要是全选、单选、计算总价、商品加减数量、删除商品的逻辑的判断，我们先来梳理一下基本的逻辑。
- 选中单个商品, 更新已当前项被选状态, 计算价格，判断全选的状态。    
- 取消单个商品, 更新已当前项被选状态, 计算价格。    
- 点击全选, 在子项中全部更改状态为true, 计算价格。    
- 取消全选, 在子项中全部更改状态取反为flase, 价格清空   
- 删除商品, 用户长按弹出modal，点击确定清空已被选择商品的数组, 删除对应的初始数据, 价格清空   
- 数量加减, 未选择的商品数量加减不计算价格, 只改变初始数据, 已被选择的商品数量加减计算价格, 改变初始数据。    
- 点击结算，判断价格是否为零。为零则弹出提示框

在wxml中使用icon[详见](https://developers.weixin.qq.com/miniprogram/dev/component/icon.html) 每个icon要wx:if绑定对应的状态值，可以在页面上设置颜色样式的变化，也在data中记录当前的选中状态。    
之前在找了关于购物车操作的蛮多种方法，还有另开一个selected数组存放被选中的数据，每次操作就在selected和carts数组间数据流转。我对比了下，最方便的还是修改状态这种：对应选中与非选中在与`cart[index].selected`的true or flase。我们可以在appdata中可以看到当前选中的项的状态，在appdata中，可以看到不同的页面有不同的`webviewID`。我们可以采用对当前下标的selected状态当前的取反`[selected]: !this.data.carts[index].selected`替换的方法来更新数组。
[![appdata.png](https://user-gold-cdn.xitu.io/2020/1/22/16fcc73fb6b8b04b?w=1240&h=508&f=png&s=213100)
1. 选中或非选中：修改当前下标的selected状态
```
 // 单选
  selectList(e) {
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
```
2. 全选：对应icon取反，子项中全部更改状态为true
```
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
```
3. 计算总价： 遍历购物车列表，选中状态则累加其价格。
```
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
```
4. 数量加减：同理，在数据源中修改buycount自增或自减。
```
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
```
![购物车删除.gif](https://user-gold-cdn.xitu.io/2020/1/22/16fcc73fc20474ba?w=416&h=748&f=gif&s=277830)

5. 长按删除：流程是这样的：用户长按 -> showmodal -> res.confirm -> 绑定下标`splice(index, 1)`删除单项 -> 更新缓存数组，记得回调保存作用域。
```
 // bindlogpress长按删除数据
  longpress: function(e) {
    // 回调保存下作用域
    var that = this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success(res) {
        if (res.confirm) {
          console.log('删除成功')
          let index = e.currentTarget.dataset.index
          let carts = that.data.carts
          carts.splice(index, 1) /*splice：从index下标开始删除若干项 */
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
```
6. 判断是否选中商品，没有则弹出提示
```
pay(e) {
    console.log(e)
    if (e.currentTarget.dataset.totalprice == 0) {
      wx.showToast({
        icon: 'none',
        title: '请先选中商品哦~',
        duration: 2000
      })
    }
```

## 个人页
![我的.gif](https://user-gold-cdn.xitu.io/2020/1/22/16fcc73fc041c987?w=416&h=748&f=gif&s=133045)

个人页的功能点不多，拿到微信开放的数据[open-data](https://developers.weixin.qq.com/miniprogram/dev/component/open-data.html)，我这里只用到了`userAvatarUrl`和`userNickName`用于展示用户头像和昵称。  
图片[]()   
wxml
```
<view class="main">
  <image class="bg" src="../../assests/icons/bg1.jpg" />
  <view class="header">
    <!-- 获取用户信息，昵称 -->
    <open-data class="thumb" type="userAvatarUrl" open-gid="" />
    <open-data class="nickname" type="userNickName" open-gid="" lang="zh_CN" />
    <text class="about" style="color: #999;" bindtap="showAbout">关于</text>
  </view>
  <view class="more">
    <view class="list">
      <view>新年快乐</view>
    </view>
    <view class="list" bindtap="showWifi">
      <view>WiFi 密码</view>
    </view>
    <view class="list" bindtap="showDiscount">
      <view>优惠券</view>
    </view>
  </view>
</view>
```
css
```
.bg {
  height: 180px;
  width: 100%;
}
.header{
  position: relative;
  height: 160rpx;
  line-height: 100rpx;
  padding:30rpx 30rpx 30rpx 150rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  color: #fff;
}
.header .thumb{
  position: absolute;
  left: 30rpx;
  top: 30rpx;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}
.header .nickname {
  color: #999;
}
.header .about{
  color: #999;
  position: absolute;
  right: 0;
  margin-right: 50rpx;
}

.more{
  border-bottom: 20rpx solid #ededed;
  color: #999;
  line-height: 90rpx;
  font-size: 28rpx;
}
.more .list{
  position: relative;
  height: 90rpx;
  border-bottom: 1rpx solid #e9e9e9;
  text-align: center;
}
/* 使用伪类做一个箭头 */
.more .list::after{
  position: absolute;
  right: 30rpx;
  top: 34rpx;
  content: '';
  width: 16rpx;
  height: 16rpx;
  border-top: 4rpx solid #2585F1;
  border-right: 4rpx solid #2585F1;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
```

#### 一些交互的小细节
- 详情页左右切换小三角禁用
- 切换，关闭弹出层购买数量重置为零
- 加入购物车弹出的toast提示
- 长按删除提示
- 房间页当用户hover到当前项时，box-shadow消失

#### 一些坑
这里本来零零碎碎整理了蛮多问题，但我回头看我在OneNote的笔记，觉得这不是坑，这仅仅就是我个人的问题，和坑不坑的没有关系。(´×ω×`)
我列几个也许可能大家会用到的
- 购买数量buycount字符串 要parseInt转化一下
- 绑定事件命名在currentTarget.dataset.驼峰式命名变量名会变成小写，取用的时候注意
- 开始购物车删除想用movable-view做左滑删除效果，貌似有bug，发现滑动整个页面也会随之滚动，调累了，干脆做了长按删除。
- 有时候样式调不好 ，可能是page要设置宽高100%;
- 开发者工具用的挺难受的。嗯...

## 结语

这个小程序是绝对的新手友好呀，时间紧张，页面数据也不多，所以也没有用云函数，模拟数据接口老挂(´×ω×`) 我就直接把数据都是写在本地啦，只要在github上把它拉下来，在微信开发者工具中打开，就能够看到我所有的逻辑和实现思路，绝对的入门友好教程!   

项目的详细功能，难点等到这里就差不多结束了，断断续续写了有两个星期吧，写文章也花了两三天。 在我下班时间写的，上班时间有好好上班! (亲爱的老板娘看到了吗!) ，另外还有一些坑没有填，比如说map组件的优化，规格选择、scrollview显示详情跳转的小bug等。自己的项目笔记里的TODOlist也没有全部checked。没有做的尽善尽美总是差点意思，之后会优化的。     
 放张18年寒假在店里写码的照片，(怀念.jpg)
![coding.jpg](https://user-gold-cdn.xitu.io/2020/1/22/16fcc7400483483e?w=720&h=516&f=jpeg&s=57638)



