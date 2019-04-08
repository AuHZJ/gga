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
        headImage: '../../images/questionMark.png',  //头像
        type: '贫困户',  // 用户类型
        city: '江西省南昌市',  //地区
        realName: '已实名', //是否实名
        img: '../../images/3.png',  //封面图
        title: '“我们需要更好的环境!”', //标题
        needMoney: 10000, //总共需要资金
        currentMoney:6150, //剩余所需
        width: '100%', //进度条宽度
        animation: '', //动画
        content: '',
        createTime: '',
        id: '1',
        userId: '1',
        publishTime: '',
        updateTime: ''
      },
      // {
      //   headImage: '../../images/questionMark.png',
      //   type: '贫困户',
      //   city: '江西省吉安市',
      //   realName: '已实名',
      //   img: '../../images/3.png',
      //   title: '“我们需要更好的环境!”',
      //   needMoney: 20000,
      //   currentMoney: 8850,
      //   width: '100%',
      //   animation: ''
      // },
      // {
      //   headImage: '../../images/questionMark.png',
      //   type: '贫困户',
      //   city: '江西省吉安市',
      //   realName: '已实名',
      //   img: '../../images/3.png',
      //   title: '“我们需要更好的环境!”',
      //   needMoney: 6000,
      //   currentMoney: 4450,
      //   width: '100%',
      //   animation: ''
      // },
      // {
      //   headImage: '../../images/questionMark.png',
      //   type: '贫困户',
      //   city: '江西省吉安市',
      //   realName: '已实名',
      //   img: getApp().globalData.ip +'/images/3935c59c-685a-495b-b7ee-067a0c0dd048.jpg',
      //   title: '“我们需要更好的环境!”',
      //   needMoney: 50000,
      //   currentMoney: 18850,
      //   width: '100%',
      //   animation: ''
      // }
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this
    wx.request({
      url: getApp().globalData.ip+'/poor-man-info/public/list',
      method: 'GET',
      header: {
        'content-type': 'application/json;charset=utf-8',
        'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        var newList = [];
        for (var item in res.data.data.list){
          var value = res.data.data.list[item];
          var newInfo = {};

          newInfo['animation'] = ''
          newInfo['width'] = '100%'
          newInfo['type'] = '贫困户'
          newInfo['content'] = value.content
          newInfo['img'] = getApp().globalData.ip + '/' + value.coverPicUrl.split(' ')[0]
          newInfo['createTime'] = value.createTime
          newInfo['currentMoney'] = value.currentMoney
          newInfo['id'] = value.id
          newInfo['city'] = value.location
          newInfo['needMoney'] = value.needMoney
          newInfo['publishTime'] = value.publishTime
          newInfo['review'] = value.review
          newInfo['title'] = value.title
          newInfo['updateTime'] = value.updateTime
          newInfo['userId'] = value.userId
          newList.push(newInfo)
        }
        that.setData({
          info: newList
        })
        console.log(that.data.info)
      }
    })
    that.setData({
      province: getApp().globalData.userProvince,
      alreadyDonated: getApp().globalData.donated,
    })
    for (var item in that.data.info){  // 设置进度条宽度
      var width = 100 * (that.data.info[item]['currentMoney']) / that.data.info[item]['needMoney'] + '%'
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
  toDetails: function(e){
    wx.navigateTo({
      url: "/pages/donation/donationInfoDetails/donationInfoDetails?index="+e.currentTarget.dataset.index
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