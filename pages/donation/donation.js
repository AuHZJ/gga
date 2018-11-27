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
        headImage: '../../images/headImage.png',  //头像
        type: '贫困户',  // 用户类型
        city: '江西省南昌市',  //地区
        realName: '已实名', //是否实名
        img: '../../images/1.png',  //封面图
        title: '“我们需要更好的环境!”', //标题
        totalAmount: 10000, //总共需要资金
        surplus:6150, //剩余所需
        width: '100%', //进度条宽度
        animation: '' //动画
      },
      {
        headImage: '../../images/headImage.png',
        type: '贫困户',
        city: '江西省吉安市',
        realName: '已实名',
        img: '../../images/2.png',
        title: '“我们需要更好的环境!”',
        totalAmount: 20000,
        surplus: 8850,
        width: '100%',
        animation: '',
      },
      {
        headImage: '../../images/headImage.png',
        type: '贫困户',
        city: '江西省吉安市',
        realName: '已实名',
        img: '../../images/3.png',
        title: '“我们需要更好的环境!”',
        totalAmount: 6000,
        surplus: 4450,
        width: '100%',
        animation: '',
      },
      {
        headImage: '../../images/headImage.png',
        type: '贫困户',
        city: '江西省吉安市',
        realName: '已实名',
        img: '../../images/4.png',
        title: '“我们需要更好的环境!”',
        totalAmount: 50000,
        surplus: 18850,
        width: '100%',
        animation: '',
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
      var width = 100 * (that.data.info[item]['surplus']) / that.data.info[item]['totalAmount'] + '%'
      var animation = 'info[' + item + '].animation'
      var _animation = wx.createAnimation({ //创建动画
        duration: 700, //持续时间（毫秒为单位）
      })
      _animation.width(width).step();
      that.setData({
        [animation]: _animation.export()
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