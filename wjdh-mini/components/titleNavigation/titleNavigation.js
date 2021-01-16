const systemInfo = wx.getSystemInfoSync();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    detail: {
      type: Boolean,
      value: false
    },
    classification: {
      type: Boolean,
      value: false
    },
    title:{
      type:String
    },
    backType:{
      type:Boolean
    }
  },
  data: {
    statusBarStyle: '',
    navigationBarStyle: '',
    navigationStyle: '',
    menuStyle: '',
    barHeight:"",
    navHeight:"",
    title:''
  },
  methods: {

    //返回上一页
    returnPage() {
      wx.navigateBack();
      let pages = getCurrentPages(); //页面栈
      let prevPage = pages[pages.length - 2];  //上一个页面
      prevPage .setData({//获取上级页面传的参数
          title:this.data.title
      })
    },
    /**
     * 获取胶囊按钮位置
     */
    getMenuPosition() {
      let top = 4
      let right = 7
      let width = 87
      let height = 32
      if (systemInfo.platform === 'devtools' && systemInfo.system.indexOf('Android') === -1) {
        top = 6
        right = 10
      } else if (systemInfo.platform === 'devtools' && systemInfo.system.indexOf('Android') != -1) {
        top = 8
        right = 10
      } else if (systemInfo.system.indexOf('Android') != -1) {
        top = 8
        right = 10
        width = 95
      }
      return {
        top: systemInfo.statusBarHeight + top,
        left: systemInfo.windowWidth - width - right,
        width: width,
        height: height
      }
    },
    /**
     * 获取状态栏样式
     */
    getStatusBarStyle() {
      let t = this;
      let statusBarPosition = {
        top: 0,
        left: 0,
        width: systemInfo.windowWidth,
        height: systemInfo.statusBarHeight
      }
      t.setData({
        barHeight: statusBarPosition.height
      });
      return this.formatStyle(statusBarPosition)
    },
    /**
     * 获取导航栏样式
     */
    getNavigationBarStyle() {
      let t=this;
      let menuPosition = this.getMenuPosition()
      //systemInfo.windowWidth,
      //
      let navigationBarPosition = {
        top: 0,
        left: 0,
        width: systemInfo.windowWidth,
        height: (menuPosition.top - systemInfo.statusBarHeight) * 2 + menuPosition.height
      }
      t.setData({
        navHeight: navigationBarPosition.height
      });
      return this.formatStyle(navigationBarPosition)
    },
    /**
     * 获取导航样式
     */
    getNavigationStyle() {
      let t = this;
      let menuPosition = this.getMenuPosition()
      let padding = systemInfo.windowWidth - menuPosition.left - menuPosition.width
      let navigationPosition = {
        top: menuPosition.top,
        left: padding,
        width: systemInfo.windowWidth - padding * 3 - menuPosition.width,
        height: menuPosition.height
      }
      return this.formatStyle(navigationPosition)
    },
    /**
     * 获取胶囊按钮样式
     */
    getMenuStyle() {
      return this.formatStyle(this.getMenuPosition())
    },
    /**
     * 格式化Style
     */
    formatStyle(position) {
      let styles = []
      for (let key in position) {
        styles.push(`${key}: ${position[key]}px;`)
      }
      return styles.join(' ')
    },
  },
  lifetimes: {
    ready: function() {
      let t = this;
      if (wx.getStorageSync("platform")==3){//检测安卓机
        t.setData({
          andFlag:true
        })
      }
      t.setData({
        statusBarStyle: t.getStatusBarStyle(),
        navigationBarStyle: t.getNavigationBarStyle(),
        navigationStyle: t.getNavigationStyle(),
        menuStyle: t.getMenuStyle()
      },()=>{
        t.triggerEvent('navHeight', t.data.navHeight+t.data.barHeight);
      });   
    },
  },
  attached() {
    let t = this,
      villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx')
    if (villageIdx&&villageIdx != 0) {
      t.setData({
        title:villageList[villageIdx].community_name
      })
    }
  }
})