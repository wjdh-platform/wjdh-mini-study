var tcity = require("../../utils/citys.js");

Page({
  data: {
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    startX: 0, //开始坐标

    startY: 0,

    items: [{

      'content': '没有去过的地方，都叫远方1。'

    }, {

      'content': '没有去过的地方，都叫远方2。'

    }, {

      'content': '没有去过的地方，都叫远方3。'

    }],

    countPic:9,//上传图片最大数量
    showImgUrl: "", //路径拼接，一般上传返回的都是文件名，
    uploadImgUrl:''//图片的上传的路径




  },

  onShow() {
    let list = this.data.items.map(item => {

      return { ...item, isActive: false }

    })

    this.setData({

      items: list

    })

    // wx.getLocation({
    //   type: 'wgs84',
    //   success: (res) => {
    //     var latitude = res.latitude // 纬度
    //     var longitude = res.longitude // 经度
    //     this.setData({
    //       latitude,
    //       longitude
    //     })
    //   }
    // })
  },
  //手指触摸动作开始 记录起点X坐标

    touchstart(e) {

        this.setData({
    
          startX: e.changedTouches[0].clientX,
    
          startY: e.changedTouches[0].clientY
    
        })
    
      },
    
      //滑动事件处理
    
      touchmove(e) {
    
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
    
        this.data.items.forEach((item, idx) => {
    
          item.isActive = false;
    
          if(Math.abs(angle) > 30) return;
    
          if(idx == index){
    
            item.isActive = touchMoveX > startX ? false : true
    
          }
    
        });
    
        //更新数据
    
        this.setData({
    
          items: this.data.items
    
        })
    
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
  
      this.data.items.splice(e.currentTarget.dataset.index, 1)
  
      this.setData({
  
        items: this.data.items
  
      })
  
    },
  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  onLoad: function () {
    console.log("onLoad");
    var that = this;

    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');


  }
})