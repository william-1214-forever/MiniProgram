// pages/detail/detail.js
import {
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo
} from '../../service/detail.js'

//创建App的实例，来调用方法或变量
const app = getApp()

Page({
  data: {
    iid:'',
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: {}
  },
  onLoad: function (options) {
    //获取传过来的iid
    this.setData({
      iid: options.iid
    })
    // console.log(this.data.iid);
    //1.请求商品详情数据
    this._getDetailData()

    //2.请求推荐的数据
    this._getRecommends()
  },
  // --------------------------------------- 请求网络数据 -------------------------------------
  _getDetailData() {
    getDetail(this.data.iid).then(res => {
      const data = res.data.result;
      console.log(data);

      //1.取出顶部图片
      const topImages = data.itemInfo.topImages;


      //2.创建baseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services);

      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo);

      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo;

      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule);

      // 6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }
      this.setData({
        topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })
      
    }).catch(err => {
      console.log(err);
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      this.setData({
        recommends: res.data.data.list
      })
      console.log(res);
    })
  },
})


