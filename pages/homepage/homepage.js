// pages/homepage/homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: '../../images/logo.png',
    showRedDot: false //右上角的红点显示否
  },

  /**
   * 生命周期函数--监听页面加载
   */

  showInfo: function () {
    this.setData({
      showRedDot: true
    })
    wx.navigateTo({
      url: '/pages/messages/messages'
    })
  },

  chooseImage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#000000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },

  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          tempFilePaths: res.tempFilePaths[0],
        })
        wx.uploadFile({
          url: 'http:localhost:8080/gga/login',
          filePath: that.data.tempFilePaths,
          name: '盘子照片',
          success: function () {
            wx.showModal({
              title: '提示',
              content: '上传成功！',
              showCancel: false,
              confirmText: '确定',
              success: function (res1) {
                if (res1.confirm) {
                  console.log('用户点击了确定')
                }
              }
            })
          }
        })
      }
    })
  },

  onLoad: function (options) {
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