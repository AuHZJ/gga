// pages/donation/donation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: '',   //搜索栏地址
    alreadyDonated: '',  //已捐赠数量
    info: [
      { 
        headImage: '../../images/headImage.png', 
        type: '贫困户', 
        city: '江西省南昌市', 
        realName: '已实名', 
        img: '../../images/1.jpg', 
        title: '“我们需要更好的环境!”', 
        totalAmount: 10000, 
        surplus:6150,
        width: ''
      },
      {
        headImage: '../../images/headImage.png',
        type: '贫困户',
        city: '江西省吉安市',
        realName: '已实名',
        img: '../../images/2.jpg',
        title: '“我们需要更好的环境!”',
        totalAmount: 20000,
        surplus: 8850,
        width: ''
      }
    ]

  },

  test: function () { //搜索
    console.log('用户点击搜索')
  },

  viewRecord: function () { //查看记录
    wx.navigateTo({
      url: '/pages/viewRecord/viewRecord'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      province: getApp().globalData.userProvince,
      alreadyDonated: getApp().globalData.donated,
    })
    for (var item in that.data.info){  // 设置进度条宽度
      var w = 'info[' + item + '].width'
      that.setData({
        [w]: 100 * (that.data.info[item]['surplus']) / that.data.info[item]['totalAmount'] + '%'
      })
    }
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