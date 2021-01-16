// pages/houseDetails/houseDetails.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    changeCellType:false,
    title:'',
    false:false
  },

  changeClose(res){
    console.log(res)
    this.setData({
      changeCellType:res.detail.changeCellType,
      title:res.detail.community_name
    })
  },
  changePopupType(res){
    this.setData({
      changeCellType:res.detail
    })
  },

  bindCharge(){

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

  addFamily(){
    wx.navigateTo({
      url: "/pages/bindCell/bindCell?type=family",
    })
  },

  getHouseDetails(){
    let t = this
    api.housesDetails({
      house_id: t.data.houseId,
      role:t.data.role
    },(res)=>{
      if(res.data.code == 0){
        t.setData({
          detailsData:res.data.data
        })
      }
    })
  },

  jiebang(e){
    let shouquan = e.currentTarget.dataset.shouquan,
    idx = e.currentTarget.dataset.idx,
    t = this,
    jiebang = e.currentTarget.dataset.jiebang
    
    if( shouquan&&shouquan != '管理员'){
      if(jiebang == '解绑'){
      wx.showModal({
        title: '提示',
        content: '您确定要解绑家庭成员'+t.data.detailsData.yibangding[idx].name+'吗？',
        success (res) {
          if (res.confirm) {
            api.listJB({ people_house_id: t.data.detailsData.yibangding[idx].people_house_id }, (res) => {
              if(res.data.code == 0){
                utils.showToast(res.data.msg,'none')
                t.getHouseDetails()
              }else{
                utils.showToast(res.data.msg,'none')
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    }else{
      utils.showToast('解绑审核中，请稍后...','none')
    }
    }
    
  },

  getShenheDetail(){
    let t = this
    api.getShenheDetail({
      id: t.data.shenhe_id,
    },(res)=>{
      if(res.data.code == 0){
        t.setData({
          shenheData:res.data.data
        })
      }
    })
  },

  delCell(e){
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '您确定要删除该条绑定信息吗？删除后需要您重新填写。',
      success (res) {
        if (res.confirm) {
          api.houseDel({id:id},(res)=>{
            if(res.data.code == 0){
              utils.showToast(res.data.msg,'none')
              wx.redirectTo({
                url: '/pages/houseList/ownerHouseList/ownerHouseList',
              })
              if(res.data.data&&res.data.data!=''){
                utils.setItem('userRoles',res.data.data.permissions)
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      houseId:options.houseId,
      role: options.role,
      shenhe_id:options.shenhe_id
    })
      if(options.houseId!=''){
        this.getHouseDetails()
      }else{
        this.getShenheDetail()
      }
  },

  shouquan(id,idx){
    let t = this
    api.shouquan({ people_house_id:id },(res)=>{
      if(res.data.code == 0){
        utils.showToast(res.data.msg,'none')
        let shouquan = 'detailsData.yibangding['+idx+'].shouquan'
        t.setData({
          [shouquan]:res.data.data
          
        })
      }
    })
  },

  charge(id,idx){
    let t = this
    api.charge({ people_house_id:id },(res)=>{
      if(res.data.code == 0){
        utils.showToast(res.data.msg,'none')
        let charge = 'detailsData.yibangding['+idx+'].charge'
        t.setData({
          [charge]:res.data.data
          
        })
      }
    })
  },

  bindCharge(e){
    let t = this,
        id = e.currentTarget.dataset.id,
        type = e.currentTarget.dataset.charge,
        idx = e.currentTarget.dataset.idx
        if(type == '授权支付'){
          wx.showModal({
            title: '点击确定，将授权该成员：',
            content: '查看和缴纳该房屋的各项费用；',
            success (res) {
              if (res.confirm) {
                t.charge(id,idx)
              } 
            }
          })
        }else if(type == '禁用支付'){
          wx.showModal({
            title: '点击确定，将失去授权该成员：',
            content: '查看和缴纳该房屋的各项费用；',
            success (res) {
              if (res.confirm) {
                t.charge(id,idx)
              } 
            }
          })
        }
    
  },

  binding(e){
    let t = this,
        id = e.currentTarget.dataset.id,
        type = e.currentTarget.dataset.shouquan,
        idx = e.currentTarget.dataset.idx
        console.log(type)
    if(type == '管理员'){

    }else if(type == '授权管理'){
      wx.showModal({
        title: '点击确定，将授权该成员：',
        content: '绑定其他人到本房屋；',
        success (res) {
          if (res.confirm) {
            t.shouquan(id,idx)
          } 
        }
      })
    }else if(type == '禁用管理'){
      wx.showModal({
        title: '点击确定，将失去授权该成员：',
        content: '绑定其他人到本房屋；',
        success (res) {
          if (res.confirm) {
            t.shouquan(id,idx)
          } 
        }
      })
    }else if(type == '禁用绑定'){

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
    console.log()
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '邀请您加入'+this.data.detailsData.introduction,
      path: '/pages/property/property?type=houseDetails',
      imageUrl:'/static/image/shareImgO.jpeg'
    }
  }
})