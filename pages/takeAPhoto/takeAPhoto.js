// pages/takeAPhoto/takeAPhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    submit: '提交照片',
    MealsPaths: [
      '../../images/logo.png', //餐前照片路径
      '../../images/logo.png' //餐后照片路径
    ],
  },

  chooseImage: function (event) {
    console.log()
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#000000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album', event.currentTarget.dataset.a)
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera', event.currentTarget.dataset.a)
          }
        }
      }
    })
  },

  chooseWxImage: function (type,time) { // time代表餐前还是餐后
    var that = this;
    wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          ['MealsPaths['+time+']']: res.tempFilePaths[0],
        })
      }
    })
  },

  uploadFile: function() {
    var that = this
    this.uploadImage(this.data.MealsPaths[0])
    this.uploadImage(this.data.MealsPaths[1])
  },

  uploadImage: function (path) {
    var that = this
    that.setData({
      loading: true,
      submit: '上传中，请稍等'
    })
    wx.uploadFile({
      url: 'https://www.baidu.com',
      filePath: path,
      name: '盘子照片',
      header: { 'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid"), },
      success: function () {
        that.setData({
          loading: false,
          submit: '提交照片'
        })
        if (path == that.data.MealsPaths[1]){  //两张图片全部上传完成
          that.showModal('提示', '上传成功！', false, '确定','用户点击了确定')
        }
      }
    })
  },

  showModal: function (title, content, showCancel, confirmText, info) { //封装提示框
    wx.showModal({ // 提示框
      title: title,
      content: content,
      showCancel: showCancel,
      confirmText: confirmText,
      success: function (res) {
        if (res.confirm) {
          console.log(info)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
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