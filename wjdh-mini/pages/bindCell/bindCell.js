// pages/bindCell/bindCell.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeBtnText: '获取验证码',
    codeBtnTextYZ: '获取验证码',
    moreText: '点击录入更多信息',
    popupType: false,
    moreType: false,
    shipType: false,
    phoneVal: '',
    currentTime: 61,
    currentTimeYZ: 61,
    codeVal: '',
    villageIdx: 0,
    buildingsIdx: 0,
    unitsIdx: 0,
    floorIdx: 0,
    roomIdx: 0,
    fwytIdx: 0,
    fwxzIdx: 0,
    jzxzIdx: 0,
    zhlxIdx: 0,
    sfdbIdx: 0,
    twjrIdx: 0,
    sfjlIdx: 0,
    zzmmIdx: 0,
    shipIdx: 0,
    photoBase64: '',
    verificationPhoneVal: '验证手机号',
    buildingsType: true,
    unitsType: true,
    floorType: true,
    roomType: true,
    cellDetail: true,
    cellList: false,
    pagesType: false,
    ownerType: false,
    codeAgain: true,
    codeAgainYZ: true,
    pageType: true,
    photoUrl: '',
    inputDisable: false,
    // placeholder:'业主只能是使用拍照识别身份证',
    villageIdxP: 0,
    bindListP: [
      { id: 1, name: '为本人绑定' },
      { id: 0, name: '为他人绑定' }
    ],
    bindListPIdx: 0,
    bindPeo: false,
    codeValYZ: '',
    yezhuOldPhone: '',
    timer: 3,
    idcardData: '',
    verificationName: '',
    changeCellType: false,
    homeListIdx: 0,
    homeListDis: false,
    backType:true,
    bigJobsText:'',
    smallJobsText:'',
    jobsText:'',
    bigJobsType:true,
    smallJobsType:false,
    jobsType:false,
    jobsPopup:false,
    jobOther:false
  },

  jobsPopupTab(){
    // console.log(11)
    this.getIndustries()
    this.setData({
      jobsPopup:true,
      bigJobsType:true,
      smallJobsType:false,
      jobsType:false,
    })
  },

  bindHomeList(e) {
    let val = e.detail.value,
         t = this
    this.setData({
      homeListIdx: val,
      community_identifier:t.data.homeList[val].community_identifier,
      building_number:t.data.homeList[val].building_number,
      unit_number:t.data.homeList[val].unit_number,
      floor_number:t.data.homeList[val].floor_number,
      house_number:t.data.homeList[val].house_number
    })
  },

  changeClose(res) {
    console.log(res)
    let t = this,
      villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx'),
      userRoles = utils.getItem('userRoles'),
      arr = []
      for (let i = 0; i < userRoles.length; i++) {
        let arrN = userRoles[i].name;
        arr.push(arrN)
      }
      if (arr.includes('NewMember')) {
        t.setData({
          popupType: true
        })
      } else {
        t.setData({
          popupType: false
        })
        t.getBuildingsList(villageList, villageIdx)
      }
    t.setData({
      changeCellType:res.detail.changeCellType,
      title:res.detail.community_name,
    })
    if (villageIdx != 0) {
      if (t.data.pageEntry == 'family') {
        t.housesJiashuList({ community_identifier: villageList[villageIdx].community_identifier,type:'shouquan' })
        
      } else {
        t.getBuildingsList(villageList, villageIdx)
      }
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

  bindlistPeople(e) {
    let t = this
    t.setData({
      bindListPIdx: e.detail.value
    })
  },

  bindvillageListP(e) {
    this.setData({
      villageIdxP: e.detail.value
    })
  },
  bindFwyt(e) {
    this.setData({
      fwytIdx: e.detail.value
    })
  },

  bindFwxz(e) {
    this.setData({
      fwxzIdx: e.detail.value
    })
  },

  inputDis(e) {
    utils.showToast('业主只能是使用拍照识别身份证', 'none')
  },

  bindShip(e) {
    let t = this
    console.log(e.detail.value)
    if(t.data.pageEntry == 'family'){
      t.setData({
        ownerType: false,
        inputDisable: false,
        bindPeo: true,
        examineData: {},
        'examineData.photo': '',
        inputDisable: false,
        shipIdx: e.detail.value,
        job:'',
        jobOther:false
      })
      return
    }
    if (e.detail.value != "1") {//非业主外
      t.setData({
        ownerType: false,
        inputDisable: false,
        bindPeo: true,
        examineData: {},
        'examineData.photo': '',
        inputDisable: false,
      })
    } else {//业主
      t.setData({
        ownerType: true,
        inputDisable: true,
        bindPeo: false,
        examineData: utils.getItem('examineData'),
        inputDisable: true,
        who:1,
        
      })
    }


    t.setData({
      shipIdx: e.detail.value,
      job:'',
        jobOther:false,
        bigJobsText:'',
        smallJobsText:'',
        jobsText:''
    })

  },

  bindJzxz(e) {
    this.setData({
      jzxzIdx: e.detail.value
    })
  },

  bindZhlx(e) {
    this.setData({
      zhlxIdx: e.detail.value
    })
  },

  bindSfdb(e) {
    this.setData({
      sfdbIdx: e.detail.value
    })
  },

  bindTwjr(e) {
    this.setData({
      twjrIdx: e.detail.value
    })
  },
  bindZzmm(e) {
    this.setData({
      zzmmIdx: e.detail.value
    })
  },

  bindSfjl(e) {
    this.setData({
      sfjlIdx: e.detail.value
    })
  },

  checkMoreBtn() {
    let t = this;
    t.setData({
      moreType: !this.data.moreType,
    })
    if (t.data.moreType) {
      t.setData({
        moreText: '收起',
      })
    } else {
      t.setData({
        moreText: '点击录入更多信息',
      })
    }

  },

  //关闭弹层
  closePopup() {
    this.setData({
      popupType: false
    })
  },

  nameBlur(e) {
    this.setData({
      verificationName: e.detail.value
    })
  },

  //手机号失焦
  phoneBlur(e) {
    let t = this,
         val = e.detail.value.replace(/\s*/g, "")
    if (val.length == 11) {
      if (!/^1[3456789]\d{9}$/.test(val)) {
        utils.showToast("请输入正确的手机号", "none")
      } else {
        t.setData({
          phoneVal: val
        })
      }
    } else {
      t.setData({
        phoneVal: val
      })

    }
  },


  //验证码失焦
  codeBlur(e) {
    if (e.detail.value.length == 4) {
      this.setData({
        codeVal: e.detail.value
      })
    }

  },

  //业主验证码失焦
  codeBlurYZ(e) {
    this.setData({
      codeValYZ: e.detail.value
    })
  },

  //业主获取验证码
  obtainCodeYZ() {
    let that = this,
    villageList = utils.getItem('villageList'),
    villageIdx = utils.getItem('villageIdx'),
      data = that.data,
      phone = data.yezhuOldPhone,
      currentTime = data.currentTimeYZ,
      villageName = villageList[villageIdx].community_name,
      buildingName = data.buildingsList[data.buildingsIdx].building_name,
      unitsName = data.unitsList[data.unitsIdx].unit_name,
      floorName = data.floorList[data.floorIdx].floor_name,
      roomName = data.roomList[data.roomIdx].house_name
    if (data.codeAgainYZ) {
      api.getCode({
        phone: phone,
        type: "yezhu",
        community_house_name: villageName + buildingName + unitsName + floorName + roomName
      }, (res) => {
        if (res.data.code == 1) {
          utils.showToast(res.data.msg, "none")
          return
        } else if (res.data.code == 0) {
          that.setData({
            getCodeKeyLoginYZ: res.data.key,
            codeAgainYZ: false,

          })
          utils.showToast("短信验证码已发送", "none")
          var interval = setInterval(function () {
            currentTime--;
            that.setData({
              codeBtnTextYZ: currentTime + 's',
            })
            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                codeBtnTextYZ: '重新发送',
                currentTimeYZ: 61,
                codeAgainYZ: true
              })
            }
          }, 1000);
          that.setData({
            clearInterval: interval
          })
        }
      })
    }
    // };
  },

  //获取验证码
  obtainCode() {
    var that = this;
    var phone = that.data.phoneVal;
    var currentTime = that.data.currentTime
    if (that.data.codeAgain) {
      if (phone == '') {
        utils.showToast("手机号码不能为空", "none")
      } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
        utils.showToast("请输入正确的手机号", "none")
      } else {
        api.getCode({
          phone: that.data.phoneVal,
          type: "verify",
        }, (res) => {
          if (res.data.code == 1) {
            utils.showToast(res.data.msg, "none")
            return
          } else {
            that.setData({
              getCodeKeyLogin: res.data.key,
              codeAgain: false
            })
            utils.showToast("短信验证码已发送", "none")
            var interval = setInterval(function () {
              currentTime--;
              that.setData({
                codeBtnText: currentTime + 's',
              })
              if (currentTime <= 0) {
                clearInterval(interval)
                that.setData({
                  codeBtnText: '重新发送',
                  currentTime: 61,
                  codeAgain: true
                })
              }
            }, 1000);
            that.setData({
              clearInterval: interval
            })
          }
        })
      }
    }
  },



  //验证手机号
  verificationBtn() {
    let t = this
    // if (t.data.villageIdx == 0) {
    //   utils.showToast("请选择小区", "none")
    // }else 
    if (t.data.verificationName == '') {
      utils.showToast("请输入姓名", "none")
    } else if (t.data.phoneVal == '') {
      utils.showToast("请输入手机号", "none")
    } else if (t.data.codeVal == '') {
      utils.showToast("请输入验证码，并点击验证按钮", "none")
    } else {
      let villageList = utils.getItem("villageList"),
        villageIdx = utils.getItem("villageIdx")
      api.verificationPhone({
        verification_key: t.data.getCodeKeyLogin,
        verification_code: t.data.codeVal,
        community_identifier: villageList[villageIdx].community_identifier,
        name: t.data.verificationName
      }, (res) => {
        if (res.data.code == 0) {
          utils.showToast(res.data.msg, "none")
          t.setData({
            popupType: false,
          })
          wx.redirectTo({
            url: '/pages/houseList/ownerHouseList/ownerHouseList',
          })
        } else if (res.data.code == 1) {
          utils.showToast(res.data.msg, "none")
        } else {
          t.setData({
            popupType: false
          })
          t.getBuildingsList(villageList, villageIdx)
        }
      })
    }
  },

  //选择小区
  bindvillageList(e) {
    let t = this,
      list = t.data.villageList,
      idx = e.detail.value
    if (t.data.villageIdx != idx) {
      t.setData({
        buildingsType: false,
        unitsType: false,
        floorType: false,
        roomType: false,
        buildingsIdx: 0,
        unitsIdx: 0,
        floorIdx: 0,
        roomIdx: 0,
      })
    }
    t.setData({
      villageIdx: idx
    })
    api.getBuildings({ community_indentifier: list[idx].community_identifier }, (res) => {
      let data = res.data
      if (data.code == 1) {
        utils.showToast(res.data.msg, "none")
      } else if (data.code == 0 && data.data.length > 0) {
        let list = [],
          oldList = data.data
        list = oldList.unshift({ building_name: '请选择' })
        t.setData({
          buildingsList: oldList,
          buildingsType: true,
          unitsType: true,
          floorType: true,
          roomType: true,
        })
      }
    })
  },

  //选择楼栋
  bindBuildingsList(e) {
    let t = this,
      list = t.data.buildingsList,
      idx = e.detail.value
    if (t.data.buildingsIdx != idx) {
      t.setData({
        unitsType: false,
        floorType: false,
        roomType: false,
        unitsIdx: 0,
        floorIdx: 0,
        roomIdx: 0,
      })
    }
    t.setData({
      buildingsIdx: e.detail.value
    })
    api.getUnits({ building_id: list[idx].id }, (res) => {
      let data = res.data
      if (data.code == 1) {
        utils.showToast(res.data.msg, "none")
      } else if (data.code == 0 && data.data.length > 0) {
        let list = [],
          oldList = data.data
        list = oldList.unshift({ unit_name: '请选择' })
        t.setData({
          unitsList: oldList,
          unitsType: true,
          floorType: false,
          roomType: false,
        })
      }
    })
  },
  //选择单元
  bindUnitsList(e) {
    let t = this,
      list = t.data.unitsList,
      idx = e.detail.value
    if (t.data.unitsIdx != idx) {
      t.setData({
        floorType: false,
        roomType: false,
        floorIdx: 0,
        roomIdx: 0,
      })
    }
    t.setData({
      unitsIdx: e.detail.value
    })
    api.getFloor({ unit_id: list[idx].id }, (res) => {
      let data = res.data
      if (data.code == 1) {
        utils.showToast(res.data.msg, "none")
      } else if (data.code == 0 && data.data.length > 0) {
        let list = [],
          oldList = data.data
        list = oldList.unshift({ floor_name: '请选择' })
        t.setData({
          floorList: oldList,
          floorType: true,
          roomType: false,
        })
      }
    })
  },
  //选择楼层
  bindFloorList(e) {
    let t = this,
      list = t.data.floorList,
      idx = e.detail.value
    if (t.data.floorIdx != idx) {
      t.setData({
        roomType: false,
        roomIdx: 0,
      })
    }
    t.setData({
      floorIdx: e.detail.value
    })
    api.getRoom({ floor_id: list[idx].id }, (res) => {
      let data = res.data
      if (data.code == 1) {
        utils.showToast(res.data.msg, "none")
      } else if (data.code == 0) {
        let list = [],
          oldList = data.data
        list = oldList.unshift({ house_name: '请选择' })
        t.setData({
          roomList: oldList,
          roomType: true,
        })
      }
    })
  },
  //选择房间号
  bindRoomList(e) {
    let t = this,
      list = t.data.roomList,
      idx = e.detail.value

    t.setData({
      roomIdx: e.detail.value
    })
    api.yezhu({ id: list[idx].id }, (res) => {
      let data = res.data
      if (data.code == 1) {
        utils.showToast(res.data.msg, "none")
      } else if (data.code == 0) {
        t.setData({
          encryptionPhone: data.data.phone,
          yezhuOldPhone: data.data.people_phone
        })
      } else {
        t.setData({
          pageType: false,
          // ownerType:true,
          shipType: true,
          encryptionPhone: '',
          yezhuOldPhone: ''
        })
      }
    })
  },

  //获取小区名字
  getVillage() {
    let t = this
    api.getVillage({}, (res) => {
      if (res.data.code == 0) {
        let list = [],
          oldList = res.data.data
        list = oldList.unshift({ community_name: '请选择' })
        t.setData({
          villageList: oldList
        })
      }
    })
  },

  //初始化
  bellInitialize() {
    let t = this
    api.bellInitialize({}, (res) => {
      if (res.data.code == 0) {
        
        let rolesOld = res.data.data.role,
          role = [],
          arrChange
          if(t.data.pageEntry == 'family'){
                 arrChange=rolesOld.shift()
          }
        role = rolesOld.unshift({ key: '请选择', value: '请选择' })
        t.setData({
          dataList: res.data.data,
          'dataList.role': rolesOld
        })
      }
    })
  },


  // 上传图片
  uploadImg: function () {
    let t = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        // 路径转化为base64图片
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths[0],
          encoding: 'base64',
          success: res => {
            api.idcard({
              image: res.data
            }, (res) => {
              if (res.data.data) {
                t.setData({
                  idcardData: res.data.data,
                  // inputDisable: false
                })
              }
              t.setData({

              })
            })
          },
          fail: res => {
            console.log('读图片数据fail', res.data);
          }
        })
      }
    })
  },




  addImg(e) {
    var _this = this,
      data = _this.data
    if (data.roomIdx == 0&&data.homeListIdx ==0) {
      utils.showToast('请先选择要绑定的房子', 'none')
      return
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (photo) {
        wx.getImageInfo({
          src: photo.tempFilePaths[0],
          success: function (res) {
            wx.showLoading({
              title: '照片上传中',
            })
            var ctx = wx.createCanvasContext('photo_canvas');
            var ratio = 0;
            var canvasWidth = res.width
            var canvasHeight = res.height;
            _this.setData({
              // aaa: photo.tempFilePaths[0],
              canvasWidth2: res.width,
              canvasHeight2: res.height
            })
            // 保证宽高均在300以内
            while (canvasWidth > 300 || canvasHeight > 300) {
              //比例取整
              canvasWidth = Math.trunc(res.width / ratio)
              canvasHeight = Math.trunc(res.height / ratio)
              ratio++;
            }
            _this.setData({
              canvasWidth: canvasWidth,
              canvasHeight: canvasHeight
            }) //设置canvas尺寸
            ctx.drawImage(photo.tempFilePaths[0], 0, 0, canvasWidth, canvasHeight) //将图片填充在canvas上
            ctx.draw()
            //下载canvas图片
            setTimeout(function () {
              wx.canvasToTempFilePath({
                canvasId: 'photo_canvas',
                success: function (res) {
                  console.log(res.tempFilePath)
                  _this.setData({
                    imgSrc: res.tempFilePath
                  })
                  let villageList = utils.getItem("villageList"),
                    villageIdx = utils.getItem("villageIdx")
                  wx.uploadFile({
                    filePath: res.tempFilePath,
                    formData: {
                      'community_identifier': data.community_identifier?data.community_identifier:villageList[villageIdx].community_identifier,
                      'building_number': data.building_number?data.building_number:data.buildingsList[data.buildingsIdx].building_number,
                      'unit_number': data.unit_number?data.unit_number:data.unitsList[data.unitsIdx].unit_number,
                      'floor_number': data.floor_number?data.floor_number:data.floorList[data.floorIdx].floor_number,
                      'house_number': data.house_number?data.house_number:data.roomList[data.roomIdx].house_number
                    },
                    name: 'file',
                    url: 'http://wjdh-platform.test/api/v1/people/photo',
                    success(res) {
                      let data = JSON.parse(res.data)

                      _this.setData({
                        photoUrl: data.data
                      }, () => {
                        wx.hideLoading({
                          success: (res) => { },
                        })
                      })
                    }
                  })
                },
                fail: function (error) {
                  console.log(error)
                }
              }, _this)
            }, 100)
          },
          fail: function (error) {
            console.log(error)
          }
        })
      },
      error: function (res) {
        console.log(res);
      }
    })
  },

  delPhoto() {
    let t = this
    // if (t.data.shipIdx == 1) {
    //   t.setData({
    //     inputDisable: true
    //   })
    // } else {
    //   t.setData({
    //     inputDisable: false
    //   })
    // }
    t.setData({
      imgSrc: '',
      'examineData.photo': '',
    })
  },

  radioChange(e) {
    let t = this
    if (e.detail.value == "1") {
      t.setData({
        shipType: true,
        ownerType:false
      })
    } else {
      t.setData({
        shipType: false,
        ownerType:true,
        pageType: false,
        bindPeo: false,
        inputDisable: true
      })
    }

  },

  //提交
  submitCell(e) {
    let t = this,
      val = e.detail.value,
      data = t.data,
      dataList = data.dataList,
      param = {},
      reg = /^1[3456789]\d{9}$/,
      villageIdx = utils.getItem('villageIdx')
    // return false
    if (t.data.pageEntry == 'family') {
      if(t.data.homeListIdx == 0){
        utils.showToast('请选择房屋','none')
        return
      }
      if (data.inputDisable) {
        if (data.examineData && data.examineData.idcard && data.examineData.name || data.examineData.photo) {
        } else if (data.idcardData == '') {
          utils.showToast('请识别身份信息', 'none')
          return
        } else if (data.photoUrl == '') {
          utils.showToast('请上传照片', 'none')
          return
        }
      } else {
        if (val.IDNumber == '') {
          utils.showToast('请输入身份证号', 'none')
          return
        } else if (val.userName == '') {
          utils.showToast('请输入真实姓名', 'none')
          return
        } else if (data.photoUrl == '') {
          utils.showToast('请上传照片', 'none')
          return
        }
      }
      if(data.jobOther == true&&val.jobName == ''){
        utils.showToast('请输入职业', 'none')
        return
      }
      if (!(reg.test(val.phone))) {
        utils.showToast('请输入正确的联系电话', 'none')
        return
      }
      else if (val.job == '') {
        utils.showToast('请选择职业', 'none')
        return
      } else if (val.company == '') {
        utils.showToast('请输入工作单位', 'none')
        return
      }
      else {
        param = {
          who: '0',
          phone: data.phoneVal ? data.phoneVal : val.phone,
          idcard: val.IDNumber ? val.IDNumber : data.idcardData ? data.idcardData.idcard : data.examineData.idcard,
          name: val.userName ? val.userName : data.idcardData ? data.idcardData.name : data.examineData.name,
          photo: data.photoUrl ? data.photoUrl : data.examineData.photo,
          job: val.jobName&&val.jobName !=''?data.job+ '-'+val.jobName:data.job,
          company: val.company ? val.company : data.examineData.job,
          house_id: data.homeList[data.homeListIdx].people_house_id,
          zzmm: dataList.zzmm[data.zzmmIdx].key,
          tyjr: dataList.tyjr[data.twjrIdx].key,
          dibao: dataList.dibao[data.sfdbIdx].key,
          shangfang: dataList.shangfang[data.sfjlIdx].key,
          choice:1,
          role: dataList.role[data.shipIdx].key,
        }
        
      }
    } else {
      if (villageIdx == 0) {
        utils.showToast('请选择小区', 'none')
        return
      } else if (data.buildingsIdx == 0) {
        utils.showToast('请选择楼栋', 'none')
        return
      } else if (data.unitsIdx == 0) {
        utils.showToast('请选择单元', 'none')
        return
      } else if (data.floorIdx == 0) {
        utils.showToast('请选择楼层', 'none')
        return
      } else if (data.roomIdx == 0) {
        utils.showToast('请选择房间号', 'none')
        return
      } else if (data.shipIdx == 0 && data.yezhuOldPhone == '') {
        utils.showToast('请选择与业主关系', 'none')
        return
      }

      if (data.verificationPhoneVal == '验证手机号' && data.yezhuOldPhone != '') {
        utils.showToast('请输入业主手机验证码', 'none')
        return
      } else {
        if (val.radio == '') {
          utils.showToast('请选择与业主绑定或替换原业主', 'none')
          return
        } else if (val.radio == '1' && data.shipIdx == 0) {
          utils.showToast('请选择与业主关系', 'none')
          return
        } else {

        }
      }
      if (data.inputDisable) {
        if (data.examineData && data.examineData.idcard && data.examineData.name || data.examineData.photo) {

        } else if (data.idcardData == '') {
          utils.showToast('请识别身份信息', 'none')
          return
        } else if (data.photoUrl == '') {
          utils.showToast('请上传照片', 'none')
          return
        }

      } else {
        if (val.IDNumber == '') {
          utils.showToast('请输入身份证号', 'none')
          return
        } else if (val.userName == '') {
          utils.showToast('请输入真实姓名', 'none')
          return
        } else if (data.photoUrl == '') {
          utils.showToast('请上传照片', 'none')
          return
        }
      }
      if(data.jobOther == true&&val.jobName == ''){
        utils.showToast('请输入职业', 'none')
        return
      }
      if (val.address == '') {
        utils.showToast('请输入户籍地址', 'none')
        return
      } else if (val.nation == '') {
        utils.showToast('请输入民族', 'none')
        return
      }
      else if (!(reg.test(val.phone))) {
        utils.showToast('请输入正确的联系电话', 'none')
        return
      }
      else if (val.sex == '') {
        utils.showToast('请输入性别', 'none')
        return
      }
      else if (val.birth == '') {
        utils.showToast('请输入生日', 'none')
        return
      } else if (data.job == '') {
        utils.showToast('请选择职业', 'none')
        return
      } else if (val.company == '') {
        utils.showToast('请输入工作单位', 'none')
        return
      }
      else {

        param = {
          who: data.bindListP[data.bindListPIdx].id,
          phone: data.phoneVal ? data.phoneVal : val.phone,
          idcard: val.IDNumber ? val.IDNumber : data.idcardData ? data.idcardData.idcard : data.examineData.idcard,
          name: val.userName ? val.userName : data.idcardData ? data.idcardData.name : data.examineData.name,
          photo: data.photoUrl ? data.photoUrl : data.examineData.photo,
          sex: data.idcardData ? data.idcardData.gender : '',
          birth: data.idcardData ? data.idcardData.birthday : '',
          nation: data.idcardData ? data.idcardData.nation : '',
          address: data.idcardData ? data.idcardData.address : '',
          zzmm: dataList.zzmm[data.zzmmIdx].key,
          tyjr: dataList.tyjr[data.twjrIdx].key,
          dibao: dataList.dibao[data.sfdbIdx].key,
          shangfang: dataList.shangfang[data.sfjlIdx].key,
          job: val.jobName&&val.jobName !=''?data.job+ '-'+val.jobName:data.job,
          company: val.company ? val.company : data.examineData.job,
          house_id: data.roomIdx == 0 ? '' : data.roomList[data.roomIdx].id,
          role: dataList.role[data.shipIdx].key,
          status: dataList.status[data.jzxzIdx].key,
          use: dataList.use[data.fwytIdx].key,
          xingzhi: dataList.xingzhi[data.fwxzIdx].key,
          choice: val.radio ? val.radio : '1',
          type: dataList.type[data.zhlxIdx].key
        }
        
      }
    }

    api.yibiaosanshi(param, (res) => {
      if (res.data.code == 1) {
        utils.showToast(res.data.msg, 'none')
      } else if (res.data.code == 0) {
        utils.showToast(res.data.msg, 'none')
        utils.setItem('examineData', res.data.shenhe_data)
        utils.setItem('userRoles', res.data.data)
        wx.redirectTo({
          url: '/pages/houseList/ownerHouseList/ownerHouseList',
        })
      }
    })
  },

  verificationPhone() {
    let t = this
    api.yezhuCode({
      verification_key: t.data.getCodeKeyLoginYZ,
      verification_code: t.data.codeValYZ,
    }, (res) => {
      if (res.data.code == 0) {
        utils.showToast(res.data.msg, "none")
        t.setData({
          verificationPhoneVal: "验证成功",
          pageType: false,
        })
      } else {
        utils.showToast(res.data.msg, "none")
      }
    })
  },

  getBuildingsList(villageList, villageIdx) {
    let t = this
    api.getBuildings({ community_indentifier: villageList[villageIdx].community_identifier }, (res) => {
      let data = res.data
      if (data.code == 1) {
        utils.showToast(res.data.msg, "none")
        // } else if (data.code == 0 && data.data.length > 0) {
      } else if (data.code == 0) {
        
        let list = [],
          oldList = data.data
          if(oldList.length>0){
            list = oldList.unshift({ building_name: '请选择' })
            t.setData({
              buildingsList: oldList,
              buildingsType: true,
              unitsType: true,
              floorType: true,
              roomType: true,
              homeListDis: false,
            })
          }else{
            list = oldList.unshift({ building_name: '该小区暂无可选楼栋' })
            this.setData({
              buildingsList: oldList,
              homeListDis: true,
            })
          }
        
      }
    })
  },

  housesJiashuList(param) {
    api.housesJiashuList(param, (res) => {
      let data = res.data,
        oldList = data.data,
        list = [],
        msgList = []
        console.log('房间',res)
      if (data.code == 0) {
        list = oldList.unshift({ introduction: '请选择' })
        this.setData({
          homeList: oldList,
          homeListDis: false,
          cellDetail: false,
        })
      } else if (data.code == 2) {
        // utils.showToast(data.msg,'none')
        list = msgList.unshift({ introduction: '您在该小区没有可管理的房屋' })
        this.setData({
          homeList: msgList,
          homeListDis: true,
        })
      }
    })
  },

  getIndustries(){
    api.industries({},(res)=>{
      let data = res.data
      if(data.code == 0){
        // list = oldList.unshift({industry_name:'请选择'})
        data.data.forEach((item)=>{
          item.isShow = false
        }) 
        this.setData({
          bigJobsList:data.data
        })
      }
    })
  },

  smallindustries(param){
    api.smallindustries(param,(res)=>{
      let data = res.data
      if(data.code == 0){
        // list = oldList.unshift({industry_name:'请选择'})
        data.data.forEach((item)=>{
          item.isShow = false
        }) 
        this.setData({
          smallJobsList:data.data
        })
      }
    })


    
  },

  jobs(param){
    api.jobs(param,(res)=>{
      let data = res.data
      if(data.code == 0){
        data.data.forEach((item)=>{
          item.isShow = false
        }) 
        // list = oldList.unshift({industry_name:'请选择'})
        this.setData({
          jobsList:data.data
        })
      }
    })
  },

  packUp(data, index) {
    for (let i = 0, len = data.length; i < len; i++) {
      if (index != i) {
        data[i].isShow = false
      }
    }
  },

  bigJobsTab(e){
    console.log(e)
    let t = this,
         idx = e.currentTarget.dataset.idx,
         id = e.currentTarget.dataset.id,
         dataList = t.data.bigJobsList
         dataList[idx].isShow = !dataList[idx].isShow
         if (dataList[idx].isShow) {
           t.packUp(dataList, idx);
         }
         if(idx != t.data.idx){
           t.setData({
             smallJobsText:'',
             jobsText:''
           })
         }
    t.setData({
      bigJobsText: t.data.bigJobsList[idx].industry_name,
      bigJobsType:false,
      smallJobsType:true,
      bigJobsList:dataList,
      idx,
    })
    t.smallindustries({industry_id:id})
  },

  smallJobsTab(e){
    console.log(e)
    let t = this,
         idx = e.currentTarget.dataset.idx,
         id = e.currentTarget.dataset.id,
         dataList = t.data.smallJobsList
         dataList[idx].isShow = !dataList[idx].isShow
         if (dataList[idx].isShow) {
           t.packUp(dataList, idx);
         }
    t.setData({
      smallJobsText: t.data.smallJobsList[idx].small_industry_name,
      bigJobsType:false,
      smallJobsType:false,
      jobsType:true,
      smallJobsList:dataList
    })
    t.jobs({small_industry_id:id})
  },


  jobsTab(e){
    let t = this,
         idx = e.currentTarget.dataset.idx,
         id = e.currentTarget.dataset.id,
         jobName = e.currentTarget.dataset.name
         if(jobName.indexOf("其他")!==-1){
           t.setData({
            jobOther:true
           })
         }else{
          t.setData({
            jobOther:false
           })
         }
    t.setData({
      jobsText: t.data.jobsList[idx].job_name,
      job:t.data.bigJobsText+'-'+t.data.smallJobsText+'-'+t.data.jobsList[idx].job_name
    })
  },
  jobsBtnEnter(){
    this.setData({
      jobsPopup:false,
    })
  },
  jobsBtnClo(){
    let t =this
    t.setData({
      jobsPopup:false,
      job:'',
      bigJobsText:'',
      smallJobsText:'',
      jobsText:''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this,
      userRoles = utils.getItem('userRoles'),
      examineData = utils.getItem('examineData'),
      arr = [],
      villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx')
      t.setData({
        navH: app.globalData.navHeight,
      })
    t.bellInitialize();
    
    if (examineData) {
      if (arr.includes('NewMember')) {
        t.setData({
          popupType: false
        })
      }
      t.setData({
        examineData,
        inputDisable: true
      })
    }
    if (options.type == 'family') {
      t.setData({
        examineData:'',
        inputDisable:false
      })
    if(villageIdx&&villageIdx!=0){
        t.setData({
          cellDetail: false,
          pageEntry: 'family'
        })
        t.housesJiashuList({ community_identifier: villageList[villageIdx].community_identifier ,type:'shouquan'})
        return
    }else{
      t.setData({
        changeCellType:true,
        pageEntry: 'family'
      })
      return
    }
  }
    
    for (let i = 0; i < userRoles.length; i++) {
      let arrN = userRoles[i].name;
      arr.push(arrN)
    }

    if (villageIdx == 0 || villageIdx == '') {
      t.setData({
        changeCellType: true
      })
    } else {
      t.setData({
        villageList: app.globalData.villageList,
      })
      if (arr.includes('NewMember')) {
        t.setData({
          popupType: true
        })
      } else {
        t.setData({
          popupType: false
        })
        t.getBuildingsList(villageList, villageIdx)
      }
    }
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
  onShareAppMessage: function () {

  }
})
