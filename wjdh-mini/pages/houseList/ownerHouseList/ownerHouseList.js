// pages/houseList/ownerHouseList/ownerHouseList.js

const app = getApp();
import * as api from '../../../api/api'
import utils from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // listType: false,
    changeCellType: false,
    title: '',
    false: false,
    backType: true,
    listType: true,
    listTypeJB: '解绑',
    listTypeDel: '删除',
    startX: 0, //开始坐标
    startY: 0,
    currentTab:0
  },

  changeClose(res) {
    console.log(res)
    let villageList = utils.getItem('villageList'),
    villageIdx = utils.getItem('villageIdx'),
    t = this
    this.setData({
      changeCellType: res.detail.changeCellType,
      title: res.detail.community_name
    })
    if(villageIdx&&villageIdx!=0){
      t.housesList({type:'bangding',community_identifier:villageList[villageIdx].community_identifier})
    }
    
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

  tabTap(e){
    var t = this;
    let villageList = utils.getItem('villageList'),
    villageIdx = utils.getItem('villageIdx')
    if(e.target.dataset.current == 0){
      t.housesList({type:'bangding',community_identifier:villageList[villageIdx].community_identifier})
    }else{
      t.housesList({type:'jiebang',community_identifier:villageList[villageIdx].community_identifier})
    }
    if( t.data.currentTab === e.target.dataset.current ) {
        return false;
    } else {
        t.setData( {
            currentTab: e.target.dataset.current
        })
    }
  },

  bindListDetail(e) {
    let id = e.currentTarget.dataset.houseid ? e.currentTarget.dataset.houseid : '',
      shenhe_id = e.currentTarget.dataset.shenheid ? e.currentTarget.dataset.shenheid : '',
      role = e.currentTarget.dataset.role ? e.currentTarget.dataset.role : '',
      del = e.currentTarget.dataset.del ? e.currentTarget.dataset.del:''
      if(del!=''){
        utils.showToast('已经解绑房屋不能查看详情', 'none')
        return
      }
    if (role == '业主' || shenhe_id) {
      wx.navigateTo({
        url: '/pages/houseDetails/houseDetails?houseId=' + id + '&role=' + role + '&shenhe_id=' + shenhe_id,
      })
    } else if (role != '业主') {
      utils.showToast('只有业主才能查看房屋详情', 'none')
    }
  },

  //获取列表
  housesList(param) {
    let t = this
    // return new Promise((resolve, reject) => {
    api.housesList(param, (res) => {
      if (res.data.code == 0) {
        let list = res.data.data
        if (list.length === 0) {
          t.setData({
            listType: false,
            houseList:list
          })
        } else {
          let newArr = list.map(item => {
            return { ...item, isActive: false }
          })
          t.setData({
            listType: true,
          })

          t.setData({
            houseList: newArr,
          })
        }
      }

    })
    // })
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart(e) {

    let val = e.currentTarget.dataset
    console.log(val)
    if(val.houseid&&val.houseid!=''&&val.status === '审核已通过'){
      this.setData({
        startX: e.changedTouches[0].clientX,
        startY: e.changedTouches[0].clientY
      })
    }
    
  },
  //滑动事件处理
  touchmove(e) {
    let val = e.currentTarget.dataset
    if(val.houseid&&val.houseid!=''){
    let index = e.currentTarget.dataset.index;
    let startX = this.data.startX;
    let startY = this.data.startY;
    let touchMoveX = e.changedTouches[0].clientX;
    let touchMoveY = e.changedTouches[0].clientY;
    let angle = this.angle({
      X: startX,
      Y: startY
    }, {
      X: touchMoveX,
      Y: touchMoveY
    });
    if(val.del&&val.del!=''){
      this.setData({
        listType:false
      })
    }else{
      this.setData({
        listType:true
      })
    }
    this.data.houseList.forEach((item, idx) => {
      item.isActive = false;
      if (Math.abs(angle) > 30) return;
      if (idx == index) {
        item.isActive = touchMoveX > startX ? false : true
      }
    });
    //更新数据
    this.setData({
      houseList: this.data.houseList
    })
  }
  },
  /**
* 计算滑动角度
* @param {Object} start 起点坐标
* @param {Object} end 终点坐标
*/
  angle(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del(e) {
    let villageList = utils.getItem('villageList'),
    villageIdx = utils.getItem('villageIdx')
    let idx = e.currentTarget.dataset.index,
      t = this
      if (t.data.listType) {
        wx.showModal({
          title: '提示',
          content: '您确定申请解绑房屋吗？',
          success(res) {
            if (res.confirm) {
                api.listJB({ people_house_id: t.data.houseList[idx].people_house_id }, (res) => {
                  if(res.data.code == 0){
                    t.housesList({type:'bangding',community_identifier:villageList[villageIdx].community_identifier})
                  }else{
                    t.housesList({type:'bangding',community_identifier:villageList[villageIdx].community_identifier})
                    utils.showToast(res.data.msg,'none')
                  }
                })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '您确定删除房屋吗？',
          success(res) {
            if (res.confirm) {
                api.houseDelete({people_house_id:t.data.houseList[idx].people_house_id},(res)=>{
                  if(res.data.code == 0){
                    t.housesList({type:'jiebang',community_identifier:villageList[villageIdx].community_identifier})
                  }else{
                    utils.showToast(res.data.msg)
                  }
                })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    

    

  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.init()
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
    let villageList = utils.getItem('villageList'),
    villageIdx = utils.getItem('villageIdx')
    this.housesList({type:'bangding',community_identifier:villageList[villageIdx].community_identifier})
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