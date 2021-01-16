import request from './base'


// 获取验证码
export const getCode = (params, cb) => {
  request('api/v1/verificationCodes/phone', params, cb, 'post')
}

//注册
export const registerBtn = (params, cb) => {
  request('api/v1/weapp/users',params,cb,'post')
}

//账号密码登录
export const loginPass = (params, cb) => {
  request('api/v1/weapp/authorizations', params, cb, 'post')
}

//手机号验证码登录
export const loginCode = (params, cb) => {
  request('api/v1/weapp/athorizations/phone', params, cb, 'POST')
}

//登录改
export const loginNew = (params, cb) => {
  request('api/v1/weapp/users', params, cb, 'POST')
}

//open Id
export const getOpenid = (params, cb) => {
  request('api/v1/weapp/code', params, cb, 'POST')
}

//刷新tocken值
export const getTockenN= (params, cb) => {
  request('api/v1/authorizations/current', params, cb, 'put')
}

//获取tocken值
export const getTocken = (params, cb) => {
  request('api/v1/weapp/authorizations', params, cb, 'post')
}

//手机号校验是否绑定一标三实
export const verificationPhone = (params, cb) => {
  request('api/v1/security/phone', params, cb, 'post')
}

//获取小区
export const getVillage = (params, cb) => {
  request('api/v1/communities', params, cb, 'post')
}
//获取楼栋
export const getBuildings = (params, cb) => {
  request('api/v1/buildings', params, cb, 'post')
}
//获取单元
export const getUnits = (params, cb) => {
  request('api/v1/units', params, cb, 'post')
}
//获取楼层
export const getFloor = (params, cb) => {
  request('api/v1/floors', params, cb, 'post')
}
//获取房间号
export const getRoom = (params, cb) => {
  request('api/v1/houses', params, cb, 'post')
}
//查询该房间是否绑定业主
export const yezhu = (params, cb) => {
  request('api/v1/security/yezhu', params, cb, 'post')
}
//绑定小区初始化
export const bellInitialize = (params, cb) => {
  request('api/v1/weapp/initialize', params, cb, 'post')
}
//提交一标三实
export const yibiaosanshi = (params, cb) => {
  request('api/v1/weapp/yibiaosanshi', params, cb, 'post')
}
//业主手机校验
export const yezhuCode = (params, cb) => {
  request('api/v1/security/yezhu-code', params, cb, 'post')
}
//小区列表
export const housesList = (params, cb) => {
  request('api/v1/user/housesList', params, cb, 'post')
}

//小区详情
export const housesDetails = (params, cb) => {
  request('api/v1/house/detail', params, cb, 'post')
}

//身份证验证
export const idcard = (params, cb) => {
  request('api/v1/idcard/photo', params, cb, 'post')
}

//获取新角色
export const getRoles = (params, cb) => {
  request('api/v1/people/permissions', params, cb, 'post')
}

//审核详情
export const getShenheDetail = (params, cb) => {
  request('api/v1/shenhe/detail', params, cb, 'post')
}
//审核详情
export const houseDel = (params, cb) => {
  request('api/v1/shenhe/detail', params, cb, 'DELETE')
}
//支付信息
export const payment = (params, cb) => {
  request('api/v1/weapp/payment', params, cb, 'post')
}
//用户授权
export const shouquan = (params, cb) => {
  request('api/v1/house/shouquan', params, cb, 'put')
}
//解绑
export const listJB = (params, cb) => {
  request('api/v1/house/shouquan', params, cb, 'DELETE')
}
//订单列表
export const orderList = (params, cb) => {
  request('api/v1/orders/list', params, cb, 'POST')
}
//用户激活
export const jihuo = (params, cb) => {
  request('api/v1/people/jihuo', params, cb, 'POST')
}
//账单列表
export const payList = (params, cb) => {
  request('api/v1/payments/list', params, cb, 'POST')
}
//账单详情
export const orderDetail = (params, cb) => {
  request('api/v1/order', params, cb, 'POST')
}
//获得省份
export const getProvinces = (params, cb) => {
  request('api/v1/provinces', params, cb, 'POST')
}
//获得城市
export const getCity = (params, cb) => {
  request('api/v1/cities', params, cb, 'POST')
}
//添加家属
export const housesJiashuList = (params, cb) => {
  request('api/v1/user/manager/houseList', params, cb, 'POST')
}
//提交报修
export const submitRepair = (params, cb) => {
  request('api/v1/repair/new', params, cb, 'POST')
}
//我的报修
export const getRepairList = (params, cb) => {
  request('api/v1/repair/list', params, cb, 'POST')
}
//行业
export const industries = (params, cb) => {
  request('api/v1/industries', params, cb, 'POST')
}
//细分行业
export const smallindustries = (params, cb) => {
  request('api/v1/smallindustries', params, cb, 'POST')
}
//职业
export const jobs = (params, cb) => {
  request('api/v1/jobs', params, cb, 'POST')
}
//公告列表
export const noticeList = (params, cb) => {
  request('api/v1/announcements/list', params, cb, 'POST')
}
//公告详情
export const noticeDetails = (params, cb) => {
  request('api/v1/announcement', params, cb, 'POST')
}
//禁用授权支付
export const charge = (params, cb) => {
  request('api/v1/house/charge', params, cb, 'PUT')
}
//投诉建议初始化
export const proposalInitial = (params, cb) => {
  request('api/v1/suggestion/initial', params, cb, 'POST')
}
//提交投诉与建议
export const proposalSub = (params, cb) => {
  request('api/v1/suggestion/new', params, cb, 'POST')
}
//投诉建议列表
export const proposalList = (params, cb) => {
  request('api/v1/suggestions/list', params, cb, 'POST')
}
//判断用户在该小区是否有房屋
export const houseExist = (params, cb) => {
  request('api/v1/weapp/house', params, cb, 'POST')
}
//删除房屋
export const houseDelete = (params, cb) => {
  request('api/v1/user/houseList', params, cb, 'DELETE')
}
//获得温馨提示
export const getPins = (params, cb) => {
  request('api/v1/pins', params, cb, 'POST')
}






