// pages/personal/personal.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    ID: '小飞侠',
    type: ''
  },

  personalData: function () { //个人资料
    wx.navigateTo({
      url: '../personalData/personalData'
    })
  },

  accountDetails: function () { //账户明细
    wx.navigateTo({
      url: '../accountDetails/accountDetails'
    })
  },

  recharge: function () { //充值
    wx.navigateTo({
      url: '../recharge/recharge'
    })
  },

  enterpriseEntry: function () { //企业入驻
    wx.showModal({ // 提示框
      title: '提示',
      content: '该功能尚未开放,试试别的吧~',
      showCancel: false,
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          
        }
      }
    })
    // wx.navigateTo({
    //   url: '../enterpriseEntry/enterpriseEntry'
    // })
  },

  info: function () { //发布信息
    if(getApp().globalData.roleName != "admin"){
      wx.showModal({ // 提示框
        title: '提示',
        content: '请联系管理员发布信息',
        showCancel: false,
        confirmText: '确定',
        success: function (res) {
          if (res.confirm) {
            console.log("发布信息：用户点击确定")
          }
        }
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/addPovertyInfo/addPovertyInfo'
    })
  },

  feedback: function () { //反馈
    wx.navigateTo({
      url: '../feedback/feedback'
    })
  },

  tapSetting: function () { //点击设置
    wx.navigateTo({
      url: '../setting/setting'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: getApp().globalData.userType
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