// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({//发起网络请求
            url: 'http://local.zhouxi.me/login',
            data: {
              code: res.code
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            dataType: 'json',
            success: res1 => {
              console.log(res1.data); //测试，打印从后台收到的数据
              wx.setStorageSync("sessionid", res1.data.data);
              that.queryUsreInfo();
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    //查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({// 授权并返回成功后，跳转进入小程序首页
                url: '../homepage/homepage'
              })
            }
          });
        }
      }
    })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {//用户按了允许授权按钮
      var that = this;
      getApp().globalData.avatarUrl = e.detail.userInfo.avatarUrl,
      wx.switchTab({
        url: '../homepage/homepage'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    console.log(wx.getStorageSync("sessionid"))
    wx.request({
      url: 'http://local.zhouxi.me/test',
      data: {
      },
      method: 'GET',
      header: {
        'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid"),
        'content-type': 'application/json'
      },
      dataType: 'json',

      success: res => {
        //从数据库获取用户信息
        console.log(res.data); //测试，打印从后台收到的数据
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