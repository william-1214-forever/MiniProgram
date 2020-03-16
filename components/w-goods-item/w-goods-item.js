// components/w-good-item/w-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e) {
      //获取商品iid
      const iid = this.data.item.iid
      console.log('我点击了商品', iid);
      //跳转到相应的路径 并传入数据
      wx.navigateTo({
        url: '/pages/detail/detail?iid=' + iid,
      })
    }
  }
})
