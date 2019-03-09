// pages/accountDetails/accountDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aCoin: '00.00',
    gCoin: '00.00',
  },

  /**
   * 生命周期函数--监听页面加载
   */

  accountList: function () {
    wx.navigateTo({
      url: 'accountList/accountList'
    })
  },
  exchange: function(){
    wx.navigateTo({
      url: 'coinExchange/coinExchange'
    })
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().globalData.ip +'/account/detail',
      header: { 'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid") },
      method: 'GET',
      success: function (res) {
        that.setData({
          aCoin: res.data.data.aCoin,
          gCoin: res.data.data.gCoin
        })
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