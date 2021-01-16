// pages/lifePay/lifePay.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cellListIdx: 0,
    currentTab: 0,
    isShow: false,
    checkArr: [],
    totalNum: 0,
    selectAll: false,
    changeCellType: false,
    backType: true,
    idxArray: [],
    pageIndex: 1,
    pageSize: 10,
    totalNum: 0,
    orderList: []
  },

  changeClose(res) {
    console.log(res)
    let t = this,
      villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx')
    t.setData({
      changeCellType: res.detail.changeCellType,
      title: res.detail.community_name
    })
    t.orderList({ paied: 0, community_identifier: villageList[villageIdx].community_identifier })
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

  checkBox(e) {
    let idx = e.currentTarget.dataset.idx,
      checkedType = 'orderList[' + idx + '].checked',
      id = e.currentTarget.dataset.id,
      check = e.currentTarget.dataset.check,
      t = this,
      money = Number(e.currentTarget.dataset.money),
      arr = t.data.checkArr.push(id),
      idxArr = []
    console.log(idx)
    // if (t.data.idxArray.includes(idx)) {
    //   for (var i = 0; i < t.data.idxArray.length; i++) {
    //     t.data.idxArray.splice(i, 1);
    //     // i--;//i需要自减，否则每次删除都会讲原数组索引发生变化
    //   }
    //   t.setData({
    //     idxArray:t.data.idxArray
    //   })
    // } else {
    //   idxArr = t.data.idxArray.push(idx)
    //   t.setData({
    //     idxArray:t.data.idxArray
    //   })
    // }

    if (check) {
      for (var i = 0; i < t.data.checkArr.length; i++) {
        if (id == t.data.checkArr[i]) {
          t.data.checkArr.splice(i, 1);
          i--;//i需要自减，否则每次删除都会讲原数组索引发生变化
        }
      }
      t.setData({
        checkArr: t.data.checkArr,
        totalNum: t.data.totalNum - money,
        selectAll: false
      })
    } else {
      t.setData({
        checkArr: t.data.checkArr,
        totalNum: t.data.totalNum + money,
        // selectAll:true
      })
    }
    t.setData({
      [checkedType]: !t.data.orderList[idx].checked,
      idxArray: t.data.idxArray
    })
    if (t.data.orderList.length == t.data.checkArr.length) {
      t.setData({
        selectAll: true
      })
    }
  },

  selectAll() {
    let t = this,
      totalNum = 0,
      orderList = t.data.orderList,
      moneyArr = [],
      checkArr = []
    t.setData({
      selectAll: !t.data.selectAll
    })
    if (!t.data.selectAll) {
      orderList.forEach((item) => {
        item.checked = false
      })
      totalNum = 0,
        checkArr = []
    } else {
      orderList.forEach((item) => {
        item.checked = true
        moneyArr.push(item.amount)
        checkArr.push(item.id)
      })
      totalNum = moneyArr.reduce((a = 0, i) => {
        return Number(a) + Number(i)
      })
      console.log(totalNum)
    }

    t.setData({
      orderList,
      totalNum,
      checkArr
    })
  },


  bindChangeCell(e) {
    this.setData({
      cellListIdx: e.detail.value
    })
  },

  payment() {
    if (this.data.checkArr.length < 1) {
      utils.showToast('请选择要缴费项目', 'none')
    } else {
      api.payment({
        ids: this.data.checkArr.join('A')
      }, (res) => {
        console.log(res)
        let data = res.data.data
        wx.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: data.signType,
          paySign: data.paySign,
          success(res) {
            console.log('支付成功' + JSON.stringify(res))
            wx.navigateTo({
              url: '/pages/houseList/payList/payList',
            })
          },
          fail(res) {
            console.log('支付失败' + JSON.stringify(res))
          }
        })
      })
    }

  },


  orderList(param) {
    api.orderList(param, (res) => {
      if (res.data.code == 0) {
        let dataArr = res.data.data,
          t = this
        if (dataArr == []) {
          this.setData({
            orderList: []
          })
        } else {

          dataArr.forEach(item => {
            item.isShow = false;
            item.checked = false;
            item.extra = JSON.parse(item.extra)
          })
          let arr = [];
          if (t.data.pageIndex == 1) {
            arr = dataArr;
          } else {
            arr = t.data.orderList.concat(dataArr);
          }

          this.setData({
            orderList: arr,
            totalNum: res.data.pages.total,
            pageSize: res.data.pages.per_page,
          })
        }

      }

    })
  },

  tabTap(e) {
    var t = this,
      idx = e.currentTarget.dataset.idx,
      villageIdx = utils.getItem('villageIdx'),
      villageList = utils.getItem('villageList')
    console.log(idx)
    if (e.target.dataset.current == 0) {
      t.setData({
        totalNum: 0,
        selectAll: false,
        checkArr: []
      })
      t.orderList({ paied: 0, community_identifier: villageList[villageIdx].community_identifier })
    } else {
      t.orderList({ paied: 1, community_identifier: villageList[villageIdx].community_identifier })
    }
    if (t.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      t.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  orderDetail(e) {
    let t = this,
      idx = e.currentTarget.dataset.idx,
      //  orderDetail = 'orderList[' + idx + '].orderDetail',
      dataList = t.data.orderList
    dataList[idx].isShow = !dataList[idx].isShow
    if (dataList[idx].isShow) {
      t.packUp(dataList, idx);
    }
    t.setData({
      orderList: dataList
    })
  },
  packUp(data, index) {
    for (let i = 0, len = data.length; i < len; i++) {
      if (index != i) {
        data[i].isShow = false
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    let t = this,
      villageIdx = utils.getItem('villageIdx'),
      villageList = utils.getItem('villageList')
    t.setData({
      totalNum: 0,
      selectAll: false,
      checkArr: []
    })
    if (villageIdx && villageIdx != 0) {
      t.setData({
        villageIdx,
        villageList
      })
      t.orderList({ paied: 0, community_identifier: villageList[villageIdx].community_identifier, page: t.data.pageIndex })
    } else {
      t.setData({
        changeCellType: true
      })
    }

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
    let t = this;
    if (t.data.currentTab == 0) {
      if (t.data.pageIndex < Math.ceil(t.data.totalNum / t.data.pageSize)) {
        t.data.pageIndex++;
        t.setData({
          pageIndex: t.data.pageIndex
        }, function () {
          t.orderList({ paied: 0, community_identifier: t.data.villageList[t.data.villageIdx].community_identifier, page: t.data.pageIndex })
        })
      }
    } else {
      if (t.data.pageIndex < Math.ceil(t.data.totalNum / t.data.pageSize)) {
        t.data.pageIndex++;
        t.setData({
          pageIndex: t.data.pageIndex
        }, function () {
          t.orderList({ paied: 0, community_identifier: t.data.villageList[t.data.villageIdx].community_identifier, page: t.data.pageIndex })
        })
      }
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})