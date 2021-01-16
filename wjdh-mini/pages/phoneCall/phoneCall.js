// pages/phoneCall/phoneCall.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneList:[
      {
        phoneTitle:'匪警',
        phoneNum:'110'
      },{
        phoneTitle:'火警',
        phoneNum:'119'
      },{
        phoneTitle:'急救中心',
        phoneNum:'120'
      },{
        phoneTitle:'道路交通事故报警',
        phoneNum:'122'
      },{
        phoneTitle:'水上求救专用电话',
        phoneNum:'12395'
      },{
        phoneTitle:'天气预报',
        phoneNum:'121'
      },{
        phoneTitle:'报时服务',
        phoneNum:'117'
      },{
        phoneTitle:'国内邮政编码查询',
        phoneNum:'184'
      },{
        phoneTitle:'国内邮政特快专递',
        phoneNum:'11185'
      },{
        phoneTitle:'森林火警',
        phoneNum:'95119'
      },{
        phoneTitle:'红十字会急救台',
        phoneNum:'999'
      },{
        phoneTitle:'供电局',
        phoneNum:'95598'
      },{
        phoneTitle:'市长热线',
        phoneNum:'12345'
      }
    ],
    changeCellType:false,
    title:'',
    backType:true
  },

  changeClose(res){
    let t = this,
    villageList = utils.getItem('villageList'),
    villageIdx = utils.getItem('villageIdx')
    if(villageIdx&&villageIdx!=0){
      let phone = villageList[villageIdx].community_phone
      if(phone !== null){
        t.setData({
          wyPhone:villageList[villageIdx].community_phone
        })
      }else{
        t.setData({
          wyPhone:''
        })
      }
    }
    t.setData({
      changeCellType:res.detail.changeCellType,
      title:res.detail.community_name
    })
  },
  changePopupType(res){
    this.setData({
      changeCellType:res.detail
    })
  },
  closeBtn(res) {
    this.setData({
      changeCellType: res.detail
    })
  },

  callNum(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.num
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this,
    villageList = utils.getItem('villageList'),
    villageIdx = utils.getItem('villageIdx')
    if(villageIdx&&villageIdx!=0){
      let phone = villageList[villageIdx].community_phone
      if(phone !== null){
        t.setData({
          wyPhone:villageList[villageIdx].community_phone
        })
      }else{
        t.setData({
          wyPhone:''
        })
      }
    }else{
      utils.showToast("如需查看物业电话，需要点击切换小区按钮选择小区",'none')
      t.setData({
        wyPhone:''
      })
    }
    t.setData({
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