// pages/accountDetails/accountList/accountList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPageNum: 1,
    hasNextPage: true,
    list: [

    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.req(1, 10)
  },
  req: function (pageNum, pageSize){
    let that = this
    wx.request({
      url: getApp().globalData.ip + '/account-log/list?pageNum=' + pageNum + '&pageSize=' + pageSize,
      method: 'GET',
      header: {
        'content-type': 'application/json;charset=utf-8',
        'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: that.data.list.concat(res.data.data.list),
          hasNextPage: res.data.data.hasNextPage,
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
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasNextPage){
      var currentPageNum = this.data.currentPageNum + 1
      this.setData({
        currentPageNum: currentPageNum
      })
      this.req(currentPageNum, 10)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})