import * as api from '../api/api';

// 本地缓存存储
function setItem(key, value) {
  wx.setStorageSync(key, value);
  if (key == "accessToken") { //如果记录的缓存事件是token在此设置token失效时间
    wx.setStorageSync("accessTokenExpiration", Date.parse(new Date()) + 3600000);
  }
}
// 本地缓存获取
function getItem(key) {
  return wx.getStorageSync(key);
}
//删除本地缓存数据
function removeItem(key) {
  return wx.removeStorageSync(key);
}
//检测用户是否登录
function checkLogin() {
  if (wx.getStorageSync("accessToken") && wx.getStorageSync("accessToken") !== null) {
    return true;
  } else {
    return false;
  }
}


//提示框
function showToast(title, icon) {
  setTimeout(() => {
  wx.showToast({
    title: title,
    icon: icon
  })
  },300)
}

function token(){
  let  t = this,
        tocken = t.getItem('accessToken'),
        currentTime = Date.parse(new Date()),//当前时间
        timestamp1 = wx.getStorageSync('timestamp1')
         
      if (tocken && tocken != '') {
        if(currentTime>timestamp1+3000000){
          console.log("token过期")
          refreshToken({}).then(function(res) {
            console.log(res)
          
          // api.getTockenN({}, (res) => {
            if(res.data.code == 0){
            // t.setItem('accessToken', res.data.access_token)
            wx.setStorageSync('accessToken', res.data.access_token)
            t.setItem('userRoles', res.data.roles)
            t.setItem('timestamp1', currentTime)
            if(t.getItem('avatar')){
              return true
            }else{
              t.setItem('avatar', res.data.avatar)
              t.setItem('name', res.data.name)
            }
          }else{
            t.codeToken()
          }
        })
          // })
        }else{
          console.log("token未过期")
        }
      } else {
        t.codeToken()
      }
};
//code换token
 function codeToken(){
  let t = this,
       currentTime = Date.parse(new Date())//当前时间
  wx.login({
    success(res){
    console.log(res)
    getToken({code:res.code}).then((res)=>{
      if(res.data.code == 0){
            // t.setItem('accessToken', res.data.access_token)
            wx.setStorageSync('accessToken', res.data.access_token)
            t.setItem('userRoles', res.data.roles)
            t.setItem('timestamp1', currentTime)
            if(t.getItem('avatar')){
              return true
            }else{
              t.setItem('avatar', res.data.avatar)
              t.setItem('name', res.data.name)
            }
            
          }else if (res.data.code == 1){
            //游客身份
          }
    })
  // api.getTocken({
  //   code:res.code
  // }, (res) => {
  //   if(res.data.code == 0){
  //     t.setItem('accessToken', res.data.access_token)
  //     t.setItem('userRoles', res.data.roles)
  //     t.setItem('timestamp1', currentTime)
  //     if(t.getItem('avatar')){
  //       return true
  //     }else{
  //       t.setItem('avatar', res.data.avatar)
  //       t.setItem('name', res.data.name)
  //     }
      
  //   }else if (res.data.code == 1){
  //     //游客身份
  //   }
  // })
}
})
}


module.exports = {
  // formatTime: formatTime,
  setItem: setItem,
  getItem: getItem,
  removeItem: removeItem,
  checkLogin: checkLogin,
  showToast,
  // token,
  // codeToken,
}