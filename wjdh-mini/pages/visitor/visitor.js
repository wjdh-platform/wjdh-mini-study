// pages/visitor/visitor.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeList:[
      '30分钟',
      '1小时',
      '6小时',
      '12小时',
      '24小时'
    ],
    timeIdx:0,
    share:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = utils.getItem('accessToken')
    if(!token||token == ''){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    if(options.share == 'share'){
      this.setData({
        share:false
      })
    }
    
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '点击获得晨曦家园访客二维码',
      path: '/pages/visitor/visitor?share=share',
      imageUrl:'/static/image/shareImgO.jpeg'
    }

  }
})