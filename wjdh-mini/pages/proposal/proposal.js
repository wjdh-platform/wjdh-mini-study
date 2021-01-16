// pages/proposal/proposal.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proposalList: [
      '请选择',
      '环境卫生',
      '物业服务',
      '公共设施',
      '合理化建议',
      '其它'
    ],
    proposalIdx: 0,
    popupType: true,
    changeCellType: false,
    title: '',
    backType: true
  },

  changeClose(res) {
    console.log(res)
    this.setData({
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
  bindType(e) {
    this.setData({
      proposalIdx: e.detail.value
    })

  },
  propasalSub(e) {
    let t = this,
      val = e.detail.value,
      villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx')
    if (!villageIdx && villageIdx == 0) {
      utils.showToast('请点击切换小区按钮选择报修的小区', 'none')
    } else if (t.data.proposalIdx == 0) {
      utils.showToast('请选择问题分类', 'none')
    } else if (val.repairIntro == '') {
      utils.showToast('请填写详细说明', 'none')
    } else {
      let param = {
        suggestion_category_id: t.data.proposalInit[t.data.proposalIdx].id,
        content: val.repairIntro,
        community_identifier: villageList[villageIdx].community_identifier,
      }
      api.proposalSub(param, (res) => {
        let data = res.data
        if (data.code == 0) {
          t.setData({
            popupType: false
          })
        }
      })

      
    }
  },

  proposalInitial() {
    api.proposalInitial({}, (res) => {
      let data = res.data,
        oldList = data.data,
        list = []
      if (data.code == 0) {
        list = oldList.unshift({ suggestion_category_name: '请选择' })
        this.setData({
          proposalInit: oldList
        })

      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    })
    this.proposalInitial()
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