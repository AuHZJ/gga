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
        sw: 120,
        activeColor: 'rgba(255,255,255,0.5)',
        bgcolor: 'rgba(255,255,255,0)',
        isActive: true,
        isSi: false
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
    this.setData({
      province: getApp().globalData.userProvince,
      alreadyDonated: getApp().globalData.donated
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