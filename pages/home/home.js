// pages/home/home.js
import{
  getMultiData,
  getGoodsData
}from '../../service/home.js';

const types = ['pop', 'new', 'sell'];

const TOP_DISTANCE = 1000;

Page({
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods:{
      new: { page: 0, list: [] },
      pop: { page: 0, list: [] },
      sell: {page:  0 , list: [] }
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0
  },
  onLoad: function(options) {
    //1.请求轮播图以及推荐数据
   this. _getMultiData();

   //2.请求商品数据
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');
  },
  //--------------------------------------------- 网络请求函数 --------------------------------------------------
  _getMultiData() {
    //1.请求轮播图以及推荐数据
    getMultiData().then(res => {
      // console.log(res);
      //取出轮播图和推荐的数据
      const banners = res.data.data.banner.list.map(item => {
        return item.image
      })

      // console.log(banners);
      const recommends = res.data.data.recommend.list;

      //将banners和recommds放到data中
      this.setData({
        banners,
        recommends
      })
      // console.log(banners, recommends);
    }).catch(err => {
      console.log(err);
    })
  },
  _getGoodsData(type) {
    // 1.获取页码
    const page = this.data.goods[type].page + 1;

    // 2.发送网络请求
    getGoodsData(type ,page).then(res => {
      // console.log(res);

      // 2.1.取出数据
      const list = res.data.data.list;
  
      // 2.2将数据设置到对应的type的list中 Es6语法 ...list 可存放多个数据
      const oldList = this.data.goods[type].list;
      oldList.push(...list);

      //字符串拼接
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
      //获取并设置完数据就隐藏图标
      wx.hideLoading();
      // console.log(list);
      // 2.2 将数据设置到对应的type的list中
    }).catch(err => {
      console.log(err);
    })
  },
  //onShow： 页面显示出来时回调的函数
  //页面显示是否意味着所有的图片都加载完成  不是
  onShow() {

  },
  //------------------------------------------- 事件监听函数 ------------------------------------------------
  //图片加载完成
  handleImageLoad(event) {
    // console.log(event);
    const isLoad = event.detail.isLoad;
    // console.log(isLoad);
    if(isLoad){
      //微信获取组件数据的方法（高度, 宽度，距离顶部高度等）
      wx.createSelectorQuery().select("#tab-control").boundingClientRect(rect => {
        //将获取到的高度值赋予top变量
        // console.log(rect);
        this.data.tabScrollTop = rect.top;
        // console.log(top);
      }).exec()
    }
  },
  //tab-control点击事件的监听
  handleTabClick(event) {
    // console.log(event);
    //取出index
    const index =event.detail.index;
    // console.log(index);

    //设置currentType
    this.setData({
      currentType: types[index]
    })
  },
  onReachBottom() {
    console.log("页面滚动到底部");
    //上拉加载更多
    const page = this.data.currentType;
    //加载中,当加载过程显示
    wx.showLoading({
      title: '加载中ing',
      mask: true
    })

    this._getGoodsData(page)
  },

  //监听页面滚动
  onPageScroll(options) {
    // console.log(options);
    //获取滚动条高度
    const scrollTop = options.scrollTop;
    const flag1 = scrollTop >= this.data.tabScrollTop;
    console.log(scrollTop,'---------', this.data.tabScrollTop)
    if(flag1 != this.data.isTabFixed){
      this.setData({
        isTabFixed: flag1
      })
    }
    //修改showBackTop属性
    //不要在滚动的函数回调中频繁的调用this.setData()
    const flag = scrollTop >= TOP_DISTANCE;
    // console.log(flag);
    if(flag != this.data.showBackTop){
      this.setData({
        showBackTop: scrollTop >= TOP_DISTANCE
      })
    }
  }
})