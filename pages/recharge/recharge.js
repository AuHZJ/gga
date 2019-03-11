// pages/recharge/recharge.js
Page({
  data: {
    bankCard: '建设银行(1361)'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toinput1: function () {
    this.setData({
      money: 5
    })
  },
  toinput2: function () {
    this.setData({
      money: 10
    })
  },
  toinput3: function () {
    this.setData({
      money: 25
    })
  }


})