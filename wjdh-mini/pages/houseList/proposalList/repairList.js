// pages/houseList/repairList/repairList.js
const app = getApp();
import * as api from '../../../api/api'
import utils from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    changeCellType: false,
    backType:true,
    homeListDis:false
  },

  tabTap(e){
    var t = this;
    if( t.data.currentTab === e.target.dataset.current ) {
        return false;
    } else {
        t.setData( {
            currentTab: e.target.dataset.current
        })
    }
  },

  changeClose(res) {
    console.log(res)
    let t = this,
    villageList = utils.getItem('villageList'),
    villageIdx = utils.getItem('villageIdx')
    t.setData({
      changeCellType:res.detail.changeCellType,
      title:res.detail.community_name
    })
    t.proposalList({ paied: 0, community_identifier: villageList[villageIdx].community_identifier })
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

  proposalList(param){
    api.proposalList(param,(res)=>{
      let data = res.data,
          repairList = data.data,
          notArr = [],
          yesArr = []

      if(data.code == 0){
        if(repairList != ''){
        notArr = repairList.filter((item)=>{
          return item.status == '未查阅'
        })
        yesArr = repairList.filter((item)=>{
          return item.status == '已采纳'
        })
        this.setData({
          repairListNot: yesArr,
          repairListYes:notArr
        })
      }else{
        this.setData({
          repairListNot: [],
          repairListYes:[]
        })
      }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this,
      villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx')
      t.setData({
        navH: app.globalData.navHeight
      })
      if (villageIdx && villageIdx != 0) {
        t.setData({
          villageIdx,
          villageList
        })
        t.proposalList({community_identifier: villageList[villageIdx].community_identifier })
      } else {
        t.setData({
          changeCellType: true
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
  onShareAppMessage: function () {

  }
})