// components/changeCell/changeCell.js
import * as api from '../../api/api'
import utils from '../../utils/util.js'
const app = getApp();
var startPoint
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    changeCellType: {
      type: Boolean
    },
    buildingsType: {
      type: Boolean
    },
    title:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    villageIdx: 0,
    provincesIdx: 0,
    cityIdx: 0,
    cellType: false,
    cityType: false,
    windowHeight:'',
    windowWidth:''
  },





  /**
   * 组件的方法列表
   */
  methods: {
    getsize(){
      let that=this;
      wx.getSystemInfo({
        success(res) {
          that.setData({
            windowHeight:res.windowHeight,
            windowWidth:res.windowWidth
          })
        },
      })
    },
    bindvillageList(e) {
      let t = this,
        villageIdx = utils.getItem('villageIdx')
      t.setData({
        villageIdx: e.detail.value
      })
      if (villageIdx) {
        if (e.detail.value != utils.getItem('villageIdx')) {
          utils.setItem('changeIdx', true)
        } else {
          utils.setItem('changeIdx', false)
        }
      }

      utils.setItem('villageIdx', e.detail.value)
    },
    closePopup() {
      let villageIdx = utils.getItem('villageIdx')
      if(villageIdx){
        this.triggerEvent('closeBtn', false)
      }else{
        utils.showToast('必须选择小区后才能进行后续操作！','none')
      }
      
    },
    changePopupType() {
      this.triggerEvent('changePopupType', true)
    },
    enterBtn() {
      let t = this
      if (t.data.villageIdx != 0) {
        // utils.setItem('community_identifier')t.data.villageList[t.data.villageIdx].community_identifier
        let json = {
          community_name: t.data.villageList[t.data.villageIdx].community_name,
          changeCellType:false
        }
        this.triggerEvent('changeClose', json)
      } else {
        utils.showToast('请选择小区', 'none')
      }
    },
    bindProvincesList(e) {
      let t = this
      t.setData({
        provincesIdx: e.detail.value
      })
      utils.setItem("provincesData",t.data.provincesData)
      utils.setItem('provincesIdx', e.detail.value)
      api.getCity({
        province_id: t.data.provincesData[e.detail.value].id
      }, (res) => {
        console.log(res)
        let oldList = res.data.data,
          list = []
        if (oldList != []) {
          list = oldList.unshift({ city_name: '请选择城市' })
          t.setData({
            cityData: oldList,
            cityType: true
          })
        }

      })
    },
    bindCityList(e) {
      let t = this
      t.setData({
        cityIdx: e.detail.value,
      })
      utils.setItem("cityData",t.data.cityData)
      utils.setItem('cityIdx', e.detail.value)
      api.getVillage({
        city_id: t.data.cityData[e.detail.value].id
      }, (res) => {
        if (res.data.code == 0) {
          let list = [],
            oldList = res.data.data
          if (oldList != []) {
            list = oldList.unshift({ community_name: '请选择小区' })
            t.setData({
              villageList: oldList,
              cellType:true
            })
            utils.setItem('villageList', oldList)
          } else {
            utils.showToast('当前城市未找到小区', 'none')
          }

        }
      })
    },
    //以下是按钮拖动事件
  
  },
  attached() {
    //请求数据(业务逻辑)
    let t = this,
         provincesData = utils.getItem('provincesData'),
         provincesIdx = utils.getItem('provincesIdx'),
         cityData = utils.getItem('cityData'),
         cityIdx = utils.getItem('cityIdx'),
         villageList = utils.getItem('villageList'),
         villageIdx = utils.getItem('villageIdx')
         t.getsize();
         if(villageIdx){
           t.setData({
            provincesData,
            provincesIdx,
            cityData,
            cityIdx,
            villageList,
            villageIdx,
            cellType:true,
            cityType:true
           })
         }else{
          api.getProvinces({}, (res) => {
            console.log(res)
            let oldList = res.data.data,
              list = []
            list = oldList.unshift({ province_name: '请选择省份' })
            t.setData({
              provincesData: oldList
            })
          })
         }


        //  wx.getSystemInfo({
        //   success: function (res) {
        //     console.log(res);
        //     // 屏幕宽度、高度
        //     console.log('height=' + res.windowHeight);
        //     console.log('width=' + res.windowWidth);
        //     // 高度,宽度 单位为px
        //     t.setData({
        //       windowHeight:  res.windowHeight,
        //       windowWidth:  res.windowWidth,
        //       buttonTop:res.windowHeight*0.70,//这里定义按钮的初始位置
        //       buttonLeft:res.windowWidth*0.70,//这里定义按钮的初始位置
        //     })
        //   }
        // })

    


  }

})

