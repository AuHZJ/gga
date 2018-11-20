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
    //查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: function (res) {
    //           //从数据库获取用户信息
    //           that.queryUsreInfo();
    //           //用户已经授权过
    //           wx.switchTab({
    //             url: '../homepage/homepage'
    //           })
    //         }
    //       });
    //     }
    //   }
    // })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {//用户按了允许授权按钮
      var that = this;
      // getApp().globalData.avatarUrl = e.detail.userInfo.avatarUrl;
      // getApp().globalData.nickName = e.detail.userInfo.nickName;
      // getApp().globalData.userGender = e.detail.userInfo.userGender;
      // getApp().globalData.userCity = e.detail.userInfo.userCity;
      // getApp().globalData.userProvince = e.detail.userInfo.userProvince;
      // getApp().globalData.userCountry = e.detail.userInfo.userCountry;
      
      wx.login({
        success :res=> {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'http://localhost:8080/login', //服务器地址
              data: {
                code: res.code
              },
              header: {
                'content-type': 'application/json'
              },
              method: 'POST',
              success :res1=> {
                //从数据库获取用户信息
                console.log(res1.data); //测试，打印从后台收到的数据
                that.queryUsreInfo();
                console.log("插入小程序登录用户信息成功！");
                // 授权并返回成功后，跳转进入小程序首页
                wx.switchTab({
                  url: '../homepage/homepage'
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
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
    // wx.request({
    //   url: '',
    //   data: {
    //     // openid: getApp().globalData.openid
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     getApp().globalData.userInfo = res.data;
    //   }
    // });
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