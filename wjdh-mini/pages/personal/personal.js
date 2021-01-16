// pages/personal/personal.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    defUserImg:'./../../static/image/userImg.png',
    userNameType:false
  },

  getUserInfo: function (e) {
    let t = this
      app.globalData.userInfo = e.detail.userInfo
      t.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
  },

  payList(){
    wx.navigateTo({
      url: '/pages/houseList/payList/payList',
    })
  },

  repairList(){
    wx.navigateTo({
      url: '/pages/houseList/repairList/repairList',
    })
  },

  proposalList(){
    wx.navigateTo({
      url: '/pages/houseList/proposalList/repairList',
    })
  },

  //点击房屋列表
  houseListO(e){
    wx.navigateTo({
      url: '/pages/houseList/ownerHouseList/ownerHouseList',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // utils.token()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  getLogin(){
    let avatar = utils.getItem("avatar")
    if(!avatar){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let avatar = utils.getItem("avatar"),
        name = utils.getItem("name"),
         t = this
    t.setData({
      avatar,
      name
    })
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