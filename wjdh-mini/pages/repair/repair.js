// pages/guarantee/guarantee.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressIdx: 0,
    popupType: true,

    changeCellType: false,
    title:'',
    backType:true
  },

  changeClose(res) {
    let t = this,
      villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx')
    t.setData({
      changeCellType:res.detail.changeCellType,
      title:res.detail.community_name
    })
    // t.orderList({ paied: 0, community_identifier: villageList[villageIdx].community_identifier })
  },
  changePopupType(res) {
    this.setData({
      changeCellType: res.detail
    })
  },
  closeBtn(res) {
    this.setData({
      changeCellType: res.detail
    })
  },

  bindAddress(e) {
    this.setData({
      addressIdx: e.detail.value
    })
  },

  addressSub(e) {
    // console.log(e)
    let t = this,
      val = e.detail.value,
      villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx')
      if(!villageIdx&&villageIdx==0){
        utils.showToast('请点击切换小区按钮选择报修的小区', 'none')
      }else if (val.repairName == '') {
      utils.showToast('请填写报修项目', 'none')
    } else if (val.repairIntro == '') {
      utils.showToast('请填写报修说明', 'none')
    } else {
      t.submitRepair({
        community_identifier: villageList[villageIdx].community_identifier,
        possion:val.repairName,
        description:val.repairIntro,
      })
      
    }
  },

  //获取小区名字
  submitRepair(param) {
    let t = this
    api.submitRepair(param, (res) => {
      if (res.data.code == 0) {
        t.setData({
          popupType: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getVillage()
    this.setData({
      navH: app.globalData.navHeight
    })
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