//app.js
import utils from './utils/util.js'
App({
  servers: "http://wjdh-platform.test/",
  onLaunch(){
    wx.getSystemInfo({
      success: res => {
        this.globalData.navHeight = res.statusBarHeight + 46; // 赋值导航高度
      }, fail(err) {
      console.log(err);
    }
  })

  },
  globalData: {
    roles: '',
    access_token:'',
    community_identifier:'',
    villageList:[],
    villageIdx:0,
    community_name:'',
    navHeight: 0
  }
})