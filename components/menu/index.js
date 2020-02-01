// components/menu/index.js
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