// pages/takeAPhoto/takeAPhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redEnvelopesHidden: true, //红包界面是否隐藏
    loveBgHidden: false, 
    rewardBgHidden: false,
    loveNumberHidden: true,
    rewardNumberHidden: true,
    loveBg: '/images/love.png',
    rewardBg: '/images/reward.png',
    loveNumber: 0.21,
    rewardNumber: 0.36,
    buttonHidden: true, //确定按钮是否隐藏
    display: 'none',//提示框显示否
    loading: false,
    submit: '开始识别',
    // MealsPaths: [
    //   '../../images/before.png', //餐前照片路径
    //   '../../images/after.png' //餐后照片路径
    // ],
    MealsPaths0: '../../images/before.png', //餐前照片路径
    MealsPaths1: '../../images/after.png' //餐后照片路径
  },

  closeTip: function () { //点击关闭
    console.log('用户点击关闭拍照攻略')
    this.setData({
      display: 'none'
    })
  },

  openTip: function () { // 点击查看拍照攻略
    console.log('用户点击查看拍照攻略')
    this.setData({
      display: 'block'
    })
  },

  openLove: function () {
    var that = this
    that.setData({
      loveBg: '/images/loveSuccess.png',
      loveBgHidden: true,
      loveNumberHidden: false,
      buttonHidden: false
    })
  },

  openReward: function () {
    var that = this
    that.setData({
      rewardBg: '/images/rewardSuccess.png',
      rewardBgHidden: true,
      rewardNumberHidden: false,
      buttonHidden: false
    })
  },

  comfirmButton: function () {
    this.setData({
      redEnvelopesHidden: true,
      loveBgHidden: false,
      rewardBgHidden: false,
      loveNumberHidden: true,
      rewardNumberHidden: true,
      loveBg: '/images/love.png',
      rewardBg: '/images/reward.png',
    })
  },

  chooseImage: function (event) {
    var that = this;
    // wx.navigateTo({
    //   url: 'newPhoto/newPhoto?id=' + event.currentTarget.dataset.a + '&MealsPaths0=' + that.data.MealsPaths0 + '&MealsPaths1=' + that.data.MealsPaths1
    // })
    that.chooseWxImage('camera', event.currentTarget.dataset.a)
    // wx.showActionSheet({
    //   itemList: ['从相册中选择', '拍照'],
    //   itemColor: "#000000",
    //   success: function (res) {
    //     if (!res.cancel) {
    //       if (res.tapIndex == 0) {
    //         that.chooseWxImage('album', event.currentTarget.dataset.a)
    //       } else if (res.tapIndex == 1) {
    //         that.chooseWxImage('camera', event.currentTarget.dataset.a)
    //       }
    //     }
    //   }
    // })
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
          ['MealsPaths'+time]: res.tempFilePaths[0],
        })
      }
    })
  },

  uploadFile: function() {
    var that = this
    if (that.data.MealsPaths0 == '../../images/before.png'){
      wx.showToast({
        title: '请上传餐前照片哦',
        icon: 'none',
        duration: 2000
      })
      // that.showModal('提示', '请上传餐前照片！', false, '确定', '用户点击了确定')
      return
    }
    if (that.data.MealsPaths1 == '../../images/after.png') {
      wx.showToast({
        title: '请上传餐后照片哦',
        icon: 'none',
        duration: 2000
      })
      // that.showModal('提示', '请上传餐后照片！', false, '确定', '用户点击了确定')
      return
    }
    that.uploadImage(that.data.MealsPaths0,'before')
  },

  uploadImage: function (path,time) {
    var that = this
    that.setData({
      loading: true,
      submit: '上传中'
    })
    wx.uploadFile({
      url: getApp().globalData.ip+'/compare',
      filePath: path,
      name: 'file',
      header: { 
        'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid"),
       },
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        let datas = JSON.parse(res.data)
        let status = datas.code
        console.log('正在上传：' + time)
        if (path == that.data.MealsPaths0){
          if (status == 200){
            that.uploadImage(that.data.MealsPaths1, 'after')
          }
        }
        if (path == that.data.MealsPaths1){  //两张图片全部上传完成
          if (status == 200){
            console.log(datas.data)
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            })
            if (datas.message == '比较成功'){
              that.onLoad()
              that.setData({
                loveNumber: datas.data.aCoin,
                rewardNumber: datas.data.gCoin,
                redEnvelopesHidden: false
              })
            }
          }else{
            wx.showToast({
              title: '服务器错误，再试一次哦~',
              icon: 'none',
              duration: 2000
            })
            // that.showModal('提示', '服务器错误！', false, '确定', '用户点击了确定')
          }
        }
      },
      fail: function () {
        wx.showToast({
          title: '上传失败，请检查网络是否连通哦',
          icon: 'none',
          duration: 2000
        })
        // that.showModal('提示', '上传失败，请检查网络是否连通！', false, '确定', '用户点击了确定')
      },
      complete: function () {
        that.setData({
          loading: false,
          submit: '开始识别'
        })
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
    this.setData({
      MealsPaths0: '../../images/before.png', //餐前照片路径
      MealsPaths1: '../../images/after.png' //餐后照片路径
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