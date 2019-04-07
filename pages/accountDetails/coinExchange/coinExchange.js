// pages/coinExchange/coinExchange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gCoin: 0
  },
  tips: function(){
    wx.showModal({ // 提示框
      title: '提示',
      content: '目前只能兑换成爱币哦~',
      showCancel: false,
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
        }
      }
    })
  },
  duihuan: function(e){
    if (e.detail.value.gCoin > this.data.gCoin){
      wx.showModal({ // 提示框
        title: '提示',
        content: '超过可兑换数目，请重新输入！',
        showCancel: false,
        confirmText: '确定',
        success: function (res) {
          if (res.confirm) { }
        }
      })
      return
    }
    wx.showLoading({
      title: '兑换中',
      mask: false
    })
    wx.request({
      url: getApp().globalData.ip + '',
      header: { 'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid") },
      data:{
        'gCoin': e.detail.value.gCoin
      },
      dataType: 'json',
      method: 'GET',
      success: function (res) {
        wx.showToast({
          title: '兑换成功',
          icon: 'success',
          duration: 2000
        })
      },
    })
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gCoin: options.gCoin
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