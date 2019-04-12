// pages/homepage/homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: '../../images/logo.png',
    showRedDot: true, //右上角的红点显示否
    authPanelHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */

  showInfo: function () {
    wx.showToast({
      title: '暂时没有新消息哦',
      icon: 'none'
    })
    return
    this.setData({
      showRedDot: true
    })
    wx.navigateTo({
      url: '/pages/messages/messages'
    })
  },

  takeAPhoto: function () {
    wx.navigateTo({
      url: '/pages/takeAPhoto/takeAPhoto'
    })
  },

  onLoad: function (options) {
    var that = this;
    //查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log('已经授过权，直接登录')
          that.login();
        }else{
          //授权
          that.setData({
            authPanelHidden: false
          })
        }
      }
    })
  },
  login: function () {
    var that = this;
    that.setData({
      authPanelHidden: true
    })
    console.log('正在准备登录。。')
    wx.login({
      success: res => {
        console.log('正在发起登录。。')
        if (res.code) {
          wx.request({//发起网络请求
            url: getApp().globalData.ip + '/login',
            data: { code: res.code },
            method: 'POST',
            header: { 'content-type': 'application/json;charset=utf-8' },
            dataType: 'json',
            success: res1 => {
              console.log("login返回的信息：", res1.data); //测试，打印从后台收到的数据
              wx.setStorageSync("sessionid", res1.data.data.session)
              getApp().globalData.sessionid = res1.data.data.session
              getApp().globalData.userType = res1.data.data.description
              if (res1.statusCode == '200') {
                console.log('登录成功！');
                wx.switchTab({// 授权并返回成功后，跳转进入小程序首页
                  url: '/pages/homepage/homepage'
                })
              } else { // 无网络
                that.comfirm('提示', '请检查您的网络', false, '确定', '用户点击确定') //
              }
            },
            fail: res1 => {
              console.log('发起登录请求失败！')
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  bindGetUserInfo: function (e) {
    console.log('用户点击授权登录')
    var that = this;
    if (e.detail.userInfo) {//用户按了允许授权按钮
      // wx.switchTab({// 授权并返回成功后，跳转进入小程序首页
      //   url: '/pages/homepage/homepage'
      // })
      getApp().globalData.userProvince = e.detail.userInfo.province
      that.login(); // 登录
    } else {
      //用户按了拒绝按钮
      that.comfirm('警告', '您点击了拒绝授权，将无法正常使用小程序，请授权之后再进入!', false, '返回授权', '用户点击了“返回授权”')
    }
  },

  comfirm: function (title, content, showCancel, confirmText, info) { //封装提示框
    wx.showModal({ // 提示框
      title: title,
      content: content,
      showCancel: showCancel,
      confirmText: confirmText,
      success: function (res) {
        if (res.confirm) {
          console.log(info)
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