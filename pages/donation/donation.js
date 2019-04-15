// pages/donation/donation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alreadyDonated: '0',  //已捐赠数量
    key: '',  //搜索关键字
    pageNum: 1,
    hasNextPage: true,
    info: [
      // { 
      //   headImage: '/images/headimg.png',  //头像
      //   type: '贫困户',  // 用户类型
      //   city: '江西省南昌市',  //地区
      //   realName: 1, //是否实名
      //   img: '/images/donationBG.png',  //封面图
      //   title: '“我们需要更好的环境!”', //标题
      //   needMoney: 100000, //总共需要资金
      //   currentMoney: 26001, //当前金额
      //   width: '100%', //进度条宽度
      //   animation: '', //动画
      //   content: '',
      //   createTime: '',
      //   id: '1',
      //   userId: '1',
      //   publishTime: '',
      //   updateTime: ''
      // },
    ]
  },

  inputKey: function(e){
    console.log(e)
    this.setData({
      key: e.detail.value
    })
    this.search()
  },

  search: function () { //搜索
    let that = this
    console.log('用户点击搜索,搜索内容：' + that.data.key)
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    
    wx.request({
      url: getApp().globalData.ip + '/poor-man-info/public/list',
      method: 'GET',
      header: {
        'content-type': 'application/json;charset=utf-8',
        'cookie': 'JSESSIONID=' + wx.getorageSync("sessionid")
      },
      data:{
        key: that.data.key
      },
      dataType: 'json',
      complete: function(){
        wx.hideLoading()
      },
      success: function (res) {
        console.log('0' +res.data.data)
        var newList = [];
        for (var item in res.data.data.list) {
          var value = res.data.data.list[item];
          var newInfo = {};

          newInfo['headImage'] = '../../images/headimg.png',  //头像
            newInfo['animation'] = ''
          newInfo['width'] = '100%'
          newInfo['type'] = '贫困户'
          newInfo['realName'] = 1
          newInfo['content'] = value.content
          newInfo['img'] = getApp().globalData.ip + '/' + value.coverPicUrl.split(' ')[0]
          newInfo['createTime'] = value.createTime
          newInfo['currentMoney'] = value.needMoney - value.currentMoney
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
        // console.log(that.data.info)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
    for (var item in that.data.info) {  // 设置进度条宽度
      var width = 100 * (that.data.info[item]['needMoney'] - that.data.info[item]['currentMoney']) / that.data.info[item]['needMoney'] + '%'
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
    that.setData({
      info: that.data.info.splice(1, 5)
    })
    wx.request({
      url: getApp().globalData.ip + '/donate/donateaccount',
      method: 'GET',
      header: {
        'content-type': 'application/json;charset=utf-8',
        'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      dataType: '其他',
      success: function (res) {
        if(res.data.length > 10)
          return
        that.setData({
          alreadyDonated: res.data
        })
      }
    })
    that.findList(1, 5, true)
  },

  findList: function(pageNum, pageSize, reload){
    let that = this
    if (reload){
      that.setData({
        info: []
      })
    }
    wx.request({
      url: getApp().globalData.ip + '/poor-man-info/public/list?pageNum=' + pageNum + '&pageSize='+pageSize,
      method: 'GET',
      header: {
        'content-type': 'application/json;charset=utf-8',
        'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          hasNextPage: res.data.data.hasNextPage
        })
        var newList = []
        for (var item in res.data.data.list) {
          var value = res.data.data.list[item]
          var newInfo = {};

          newInfo['headImage'] = '../../images/headimg.png',  //头像
            newInfo['animation'] = ''
          newInfo['width'] = '100%'
          newInfo['type'] = '贫困户'
          newInfo['realName'] = 1
          newInfo['content'] = value.content
          newInfo['img'] = getApp().globalData.ip + '/' + value.coverPicUrl.split(' ')[0]
          newInfo['createTime'] = value.createTime
          newInfo['currentMoney'] = value.needMoney - value.currentMoney
          newInfo['id'] = value.id
          newInfo['city'] = value.location
          newInfo['needMoney'] = value.needMoney
          newInfo['publishTime'] = value.publishTime
          newInfo['review'] = value.review
          newInfo['title'] = value.title
          newInfo['updateTime'] = value.updateTime
          newInfo['userId'] = value.userId
          newList.push(newInfo)
          that.setData({
            info: that.data.info.concat(newInfo)
          })
        }
       
      },
      complete: function () {

      }
    })
    for (var item in that.data.info) {  // 设置进度条宽度
      var width = 100 * (that.data.info[item]['needMoney'] - that.data.info[item]['currentMoney']) / that.data.info[item]['needMoney'] + '%'
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
    // this.onLoad()
    this.onReady()
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
    this.onReady()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.hasNextPage){
      this.setData({
        pageNum: this.data.pageNum+ 1
      })
      this.findList(this.data.pageNum, 5, false)
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})