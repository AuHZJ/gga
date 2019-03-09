// pages/accountDetails/accountList/accountList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: '1',
        content: '拍照识别成功，添加g_coin=0.15,a_coin=1.0',
        operateTime: '2018-11-27 01:18:54.0'
      },
      {
        id: '1',
        content: '拍照识别成功，添加g_coin=0.55,a_coin=1.0',
        operateTime: '2018-11-27 01:18:54.0'
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().globalData.ip +'/account-log/list?pageNum=1&pageSize=10',
      method: 'GET',
      header: { 
        'content-type': 'application/json;charset=utf-8',
        'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data.data.list
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