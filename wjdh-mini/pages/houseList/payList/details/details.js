// pages/houseList/payList/details/details.js
const app = getApp();
import * as api from '../../../../api/api'
import utils from '../../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getDetails(param){
    api.orderDetail(param,(res)=>{
      let data = res.data,
      extra = {}
      if(data.code == 0){
        extra = JSON.parse(data.data.extra)
        this.setData({
          orderDetail: data.data,
          extra
        })
        console.log(extra)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getDetails({id:options.id})
    // this.getDetails({id:1})
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
  onShareAppMessage: function () {

  }
})