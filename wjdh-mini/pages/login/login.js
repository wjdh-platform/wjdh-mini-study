// pages/login/login.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // loginType: true,
    codeBtnText:"获取验证码",
    phone:'',
    currentTime: 61, //倒计时
    loginCode:'验证码登录',
    LoginPass: '密码登录',
    changeLoginType:true,//默认密码登录
    code:'',
    getCodeKey:'',
    loginPhoneVal:'',
    loginCodeVal:'',
    loginType:false,
    codeAgain:true,
    popupType:false
  },

  getUserInfo(e){
    console.log(e)
    let t = this,
         currentTime = Date.parse(new Date())//当前时间
    
    if(e.detail.userInfo){
      t.setData({
        userInfo: e.detail.userInfo,
        loginType: true
      })
    }else{
      utils.showToast('请授权获取用户信息','none')
    }
    if(t.data.popupType){
      api.loginNew({
        type:'weixin',
        encryptedData: t.data.encryptedData,
        iv: t.data.iv,
        name:e.detail.userInfo.nickName,
        avatar:e.detail.userInfo.avatarUrl,
        openid:t.data.openid,
        session_key:t.data.session_key
      }, (res) => {
        if (res.data.code == 1) {
            utils.showToast(res.data.msg, "none")
        } else {
          t.setData({
            popupType:false,
            loginType: false
          })
          utils.showToast(res.data.msg, "none")
          utils.setItem('accessToken',res.data.access_token)
          utils.setItem('avatar',res.data.avatar)
          utils.setItem('name',res.data.name)
          utils.setItem('userRoles',res.data.roles)
          utils.setItem('timestamp1', currentTime)
          wx.navigateBack({})
          if(t.data.pageType == 'activation'){
            let pages = getCurrentPages(); //页面栈
            let prevPage = pages[pages.length - 2];  //上一个页面
            prevPage .setData({//获取上级页面传的参数
              activationType:true
            })
          }
          
        }
      })
    }
    
  },
  //杨哲
  getPhoneNumber(e){
    console.log(e)
    let t = this
    if(e.detail.iv){
      t.setData({
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        popupType:true
      })
    }else{
      utils.showToast('请授权获取微信手机号','none')
    }
    
  },
  
  
  //切换登录方式
  changeLogin(){
    this.setData({
      changeLoginType: !this.data.changeLoginType
    })
  },

  //登录手机号失焦
  loginPhoneBlur(e){
    let t = this
      if(e.detail.value.length == 11){
        if (!/^1[3456789]\d{9}$/.test(e.detail.value)) {
          utils.showToast("请输入正确的手机号","none")
        }else{
          t.setData({
            loginPhoneVal: e.detail.value
          })
        }
      }else{
        t.setData({
          loginPhoneVal: e.detail.value
        })
        
      }
    
    
    
  },

  //登录密码失焦
  loginpassBlur(e) {
    this.setData({
      loginPassVal: e.detail.value
    })
  },

  //登录验证码失焦
  loginCodeBlur(e) {
    this.setData({
      loginCodeVal: e.detail.value
    })
  },

  //登录按钮
  loginBtn(){
    let t = this,
         currentTime = Date.parse(new Date())//当前时间

      if(t.data.loginPhoneVal ==''){
        utils.showToast('请输入手机号', 'none')
      } else{
        api.loginNew({
          type:'selfPhone',
          verification_key: t.data.getCodeKeyLogin,
          verification_code: t.data.loginCodeVal,
          name:t.data.userInfo.nickName,
          avatar:t.data.userInfo.avatarUrl,
          openid:t.data.openid,
        session_key:t.data.session_key
        }, (res) => {
          if (res.data.code == 1) {
              utils.showToast(res.data.msg, "none")
          } else {
            utils.showToast(res.data.msg, "none")
            utils.setItem('accessToken',res.data.access_token)
            utils.setItem('avatar',res.data.avatar)
            utils.setItem('name',res.data.name)
            utils.setItem('userRoles',res.data.roles)
            utils.setItem('timestamp1', currentTime)
            wx.navigateBack({})
            if(t.data.pageType == 'activation'){
              let pages = getCurrentPages(); //页面栈
              let prevPage = pages[pages.length - 2];  //上一个页面
              prevPage .setData({//获取上级页面传的参数
                activationType:true
              })
            }
          }
        })
        
      }
  },

  //登录获取验证码
  loginObtainCode() {
    var that = this;
    var phone = that.data.loginPhoneVal;
    var currentTime = that.data.currentTime
    if(that.data.codeAgain){
    if (phone == '') {
      utils.showToast("手机号码不能为空", "none")
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      utils.showToast("请输入正确的手机号", "none")
    } else {
      api.getCode({
        phone: that.data.loginPhoneVal,
        type:"register"
      }, (res) => {
        if(res.data.code == 1){
          utils.showToast(res.data.msg, "none")
          return
        }else{
          that.setData({
            getCodeKeyLogin: res.data.key,
            codeAgain:false
          })
          //设置一分钟的倒计时
          var interval = setInterval(function () {
            currentTime--; //每执行一次让倒计时秒数减一
            that.setData({
              codeBtnText: currentTime + 's', //按钮文字变成倒计时对应秒数
            })

            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                codeBtnText: '重新发送',
                currentTime: 61,
                codeAgain:true
              })
            }
          }, 1000);
        } 
      })
      
    };
  }
  },

  

  userRegister(){
    wx.redirectTo({
      url: '/pages/login/register/register',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options)
    let t = this,
    pageType = options.type
    // utils.token()
    t.setData({
      pageType
    })
    wx.login({
      success: res => {
        if(res.code){
          api.getOpenid({
            code:res.code
          },(res)=>{
           if(res.data.code == 0){
            t.setData({
              openid: res.data.openid,
              session_key:res.data.session_key
            })
           }
          })
        }
        
      }
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
    let t = this
    wx.login({
      success: res => {
        t.setData({
          code: res.code
        })
      }
    })

    
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