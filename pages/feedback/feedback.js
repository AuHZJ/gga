// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbox: [],
    uri: []
  },

  // 添加图片 
  chooseImage: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#000000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.addImg('album')
          } else if (res.tapIndex == 1) {
            that.addImg('camera')
          }
        }
      }
    })
  },
  addImg: function (type) {
    var imgbox = this.data.imgbox;
    var that = this;
    wx.chooseImage({
      count: 3, // 最多3张
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        imgbox = imgbox.concat(tempFilePaths)
        that.setData({
          imgbox: imgbox
        })
      }
    })
  },
  //删除图片
  imgDelete: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex
    let imgbox = this.data.imgbox
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },

  formSubmit: function (e, index = 0){
    var that = this
    if (!that.check(e))//表单验证
      return
    if (index == that.data.imgbox.length)
      return
    console.log('正在上传：' + that.data.imgbox[index])
    wx.uploadFile({ //上传包含图片的form表单
      url: getApp().globalData.ip + '/upload',
      filePath: that.data.imgbox[index], // 图片文件路径
      name: 'file',
      header: {
        'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid"),
      },
      success: function (res) {
        c
        var new_url = that.data.uri.concat(datas.data)
        that.setData({
          uri: new_url
        })
        console.log('imgbox[' + index + ']上传成功！');
        if (index == that.data.imgbox.length - 1)
          that.uploadData(e.detail.value)
        else
          that.formSubmit(e, index + 1)
      }
    })
  },

  uploadData: function (v) {
    var that = this
    console.log('上传数据' + that.data.uri.join(' '))
    wx.request({
      url: getApp().globalData.ip + '/feedback/insert',
      header: {
        'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid"),
        'content-type': 'application/json;charset=utf-8'
      },
      data: {
        'content': v.content,
        'coverPicUrl': that.data.uri.join(' ')
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        that.onLoad()
        console.log(res)
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  check: function (e) { //表单验证
    if (e.detail.value.content == '') {
      this.comfirm('提示', '请输入内容描述！', false, '返回输入', '用户点击了“返回输入”')
      return false;
    }
    if (this.data.imgbox.length == 0) {
      this.comfirm('提示', '请上传照片！', false, '返回上传', '用户点击了“返回上传”')
      return false;
    }
    return true;
  },

  comfirm: function (title, content, showCancel, confirmText, info) { //封装提示框
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
    this.setData({
      uri: [],
      imgbox: [],
      content: ''
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