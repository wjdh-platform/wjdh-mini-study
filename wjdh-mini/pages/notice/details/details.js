// pages/notice/details/details.js
import * as api from '../../../api/api'
import utils from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    

  },

  getNoticeDetails(param){
    api.noticeDetails(param,(res)=>{
      let data = res.data
      if(data.code == 0){
        this.setData({
          noticeDetails:data.data
        })
      }
    })
  },

  previewImage(e){
    let idx = e.currentTarget.dataset.idx
    wx.previewImage({
      current:this.data.noticeDetails.images[idx], 
      urls: this.data.noticeDetails.images
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      id:options.id
    })
    this.getNoticeDetails({ announcement_id: options.id })
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