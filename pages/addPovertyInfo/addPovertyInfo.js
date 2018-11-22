// pages/addPovertyInfo/addPovertyInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */

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
      }
    })
  },

  formSubmit: function (e) {
    var that = this;
    console.log('上传的图片路径：'+that.data.tempFilePaths)
    wx.uploadFile({ //上传包含图片的form表单
      url: 'http://localhost:8080/gga/login',
      filePath: that.data.tempFilePaths, // 图片文件路径
      name: 'coverPicUrl',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: {
        'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid"),
        'title': e.detail.value.title,
        'content': e.detail.value.content,
        'needMoney': e.detail.value.needMoney
      },
      success: function(res) {
        console.log('贫困信息id：'+res.data);
        console.log('上传图片和forData成功！');
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