// pages/houseList/payList/payList.js
const app = getApp();
import * as api from '../../../api/api'
import utils from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderType: true,
    changeCellType: false,
    title: '',
    false: false,
    changeCellType: false,
    title: '',
    backType: true,
    houseListIdx: 0
  },

  bindHouseList(e) {
    let t = this,
      val = e.detail.value
    if (val != t.data.houseListIdx) {
      t.getPayList({ house_id: t.data.houseList[val].people_house_id })
    }
    t.setData({
      houseListIdx: val
    })


  },

  changeClose(res) {
    let villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx'),
      t = this
    if (villageIdx && villageIdx != 0) {
      t.housesJiashuList({ community_identifier: villageList[villageIdx].community_identifier, type: "charge" })
    }
    t.setData({
      changeCellType: res.detail.changeCellType,
      title: res.detail.community_name
    })
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

  // changeClose(res){
  //   console.log(res)
  //   this.setData({
  //     changeCellType:res.detail.changeCellType,
  //     title:res.detail.community_name
  //   })
  // },
  // changePopupType(res){
  //   this.setData({
  //     changeCellType:res.detail
  //   })
  // },
  orderDetails(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/houseList/payList/details/details?id=' + id,
    })
  },
  getPayList(param) {
    api.payList(param, (res) => {
      let data = res.data,
        dataArr = data.data
      if (data.code == 0) {
        dataArr.forEach(item => {
          item.isShow = false;
        })
        this.setData({
          payList: dataArr
        })
      }else{
        this.setData({
          payList: []
        })
      }
    })
  },

  orderListType(e) {
    let t = this,
      idx = e.currentTarget.dataset.idx,
      dataList = t.data.payList
    dataList[idx].isShow = !dataList[idx].isShow
    if (dataList[idx].isShow) {
      t.packUp(dataList, idx);
    }
    t.setData({
      payList: dataList
    })
  },
  packUp(data, index) {
    for (let i = 0, len = data.length; i < len; i++) {
      if (index != i) {
        data[i].isShow = false
      }
    }
  },

  housesJiashuList(param) {
    api.housesJiashuList(param, (res) => {
      let data = res.data,
        oldList = data.data,
        list = []
      
      if (data.code == 0) {
        list = oldList.unshift({ introduction: '请选择' })
        this.setData({
          houseList: oldList
        })

      }else{
        list = oldList.unshift({ introduction: '该小区暂无可选房屋' })
        this.setData({
          houseList: oldList,
          homeListDis:true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx'),
      t = this
    t.setData({
      navH: app.globalData.navHeight
    })
    t.getPayList()
    if (villageIdx && villageIdx != 0) {
      t.housesJiashuList({ community_identifier: villageList[villageIdx].community_identifier, type: "charge" })
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