// pages/donation/donationInfoDetails/donationInfoDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '',
    userId: '', //发布该页信息的用户id
    hasNextPage: true,
    need: 100000,
    surplus: 73999,
    donationPanelHidden: true,
    img0: '',
    img1: '',
    img2: '',
    title: '"我们需要更好的环境!"',
    name: '王小明',
    location: '江西省 鹰潭市 余江县 xx村',
    content: '这是我校初三的学生，成绩在班上数一数二，就是家里特别困难，父亲又是农民。成绩在班上数一数二，就是家里特别困难，父亲又是农民。这是我校初三的学生，成绩在班上数一数二，就是家里特别困难，。这是我校初三的学生，成绩在班上数一数二，就是家里特别困难，这是我校初三的学生，成绩在班上数一数二，父亲又是农民。这是我校初三的学生，成绩在班上数一数二，就是家里特别困难，父亲又是农民。'
  },

  donation: function(){
    console.log("捐赠")
    this.setData({
      donationPanelHidden: false
    })
    
  },
  donation_comfirm: function(e){
    wx.showLoading({
      title: '捐赠中...',
    })
    console.log('e:' + e.detail.value.donate)
    let that = this
    this.setData({
      donationPanelHidden: true
    })
    wx.request({
      url: getApp().globalData.ip + '/donate/donate',
      method: 'GET',
      header: {
        'content-type': 'application/json;charset=utf-8',
        'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        poorManId: that.data.index,
        donate: e.detail.value.donate
      },
      dataType: 'json',
      success: function(res){
        wx.hideLoading()
        console.log(res.data)
        that.onLoad({ 'index': that.data.index })
        if(res.data.message == '捐赠成功'){
          wx.showToast({
            title: '捐赠成功',
            icon: 'success',
            duration: 2000
          })
        }
        
      },
      fail: function(){
        wx.hideLoading()
      }
    })
  },
  donation_cancel: function () {
    this.setData({
      donationPanelHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      index: options.index
    })
    wx.request({
      url: getApp().globalData.ip + '/poor-man-info/public/findlistbyid',
      method: 'GET',
      header: {
        'content-type': 'application/json;charset=utf-8',
        'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        id: that.data.index
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        that.setData({
          title: res.data.data.title,
          userId: res.data.data.userId,
          img0: getApp().globalData.ip + res.data.data.coverPicUrl.split(' ')[0],
          img1: getApp().globalData.ip + res.data.data.coverPicUrl.split(' ')[1],
          img2: getApp().globalData.ip + res.data.data.coverPicUrl.split(' ')[2],
          
          name: res.data.data.username,
          location: res.data.data.location,
          need: res.data.data.needMoney,
          surplus: res.data.data.needMoney - res.data.data.currentMoney,
          content: res.data.data.content
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
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