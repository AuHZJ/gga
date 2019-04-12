// pages/addPovertyInfo/addPovertyInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbox: [],
    title: '',
    content: '',
    name: '',
    tel: '',
    address: '',
    userClass: '',
    money1: '',
    uri: [],
    titleFontNum: 0
  },
  countNum: function(e){
    this.setData({
      titleFontNum: e.detail.value.length
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
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
  imgDelete: function(e){
    let that = this;
    let index = e.currentTarget.dataset.deindex
    let imgbox = this.data.imgbox
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },

  formSubmit: function(e, index = 0) {
    var that = this;
    if(!that.check(e))//表单验证
      return
    console.log('正在上传：' + that.data.imgbox[index])
    wx.uploadFile({
      url: getApp().globalData.ip + '/upload',
      filePath: that.data.imgbox[index], // 图片文件路径
      name: 'file',
      header: {
        'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid"),
        'content-type': 'charset=utf-8'
      },
      dataType: 'json',
      success: function(res) {
        let datas = JSON.parse(res.data)
        console.log('imgbox['+index+']上传成功！')
        var new_url = that.data.uri.concat(datas.data)
        that.setData({
          uri: new_url
        })
        if (index == that.data.imgbox.length - 1){
          that.uploadData(e.detail.value)
        }
        else
          that.formSubmit(e, index + 1)
      }
    })
  },
  uploadData: function(v){
    var that = this
    
    console.log('上传数据' + that.data.uri.join(' '))
    wx.request({
      url: getApp().globalData.ip + '/poor-man-info/insert',
      header: {
        'cookie': 'JSESSIONID=' + wx.getStorageSync("sessionid"),
        'content-type': 'application/json;charset=utf-8'
      },
      data: {
        'user_name': v.userName,
        'title': v.title,
        'content': v.content,
        'needMoney': v.needMoney,
        'location': v.address,
        'coverPicUrl': that.data.uri.join(' ')
      },
      method: 'POST',
      dataType: 'json',
      success: function(res){
        that.onLoad()
        console.log(res)
          wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000
    })
      }
    })
  },
  check: function(e){ //表单验证
    if (e.detail.value.title == ''){
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      })
      // this.comfirm('提示', '请输入标题', false, '返回输入', '用户点击了“返回输入”')
      return false;
    }
    if (e.detail.value.title.length > 15) {
      wx.showToast({
        title: '标题在15字以内',
        icon: 'none'
      })
      // this.comfirm('提示', '标题在15字以内', false, '返回输入', '用户点击了“返回输入”')
      return false;
    }
    if (e.detail.value.content == ''){
      wx.showToast({
        title: '请输入内容描述',
        icon: 'none'
      })
      // this.comfirm('提示', '请输入内容描述', false, '返回输入', '用户点击了“返回输入”')
      return false;
    }
    if (this.data.imgbox.length == 0){
      wx.showToast({
        title: '请上传照片',
        icon: 'none'
      })
      // this.comfirm('提示', '请上传照片', false, '返回上传', '用户点击了“返回上传”')
      return false;
    }
    if (e.detail.value.userName == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      // this.comfirm('提示', '请输入姓名', false, '返回输入', '用户点击了“返回输入”')
      return false;
    }
    if (e.detail.value.userTel == '') {
      wx.showToast({
        title: '请输入电话号码',
        icon: 'none'
      })
      // this.comfirm('提示', '请输入电话号码', false, '返回输入', '用户点击了“返回输入”')
      return false;
    }
    if (e.detail.value.address == '') {
      wx.showToast({
        title: '请输入地址',
        icon: 'none'
      })
      // this.comfirm('提示', '请输入地址', false, '返回输入', '用户点击了“返回输入”')
      return false;
    }
    if (e.detail.value.money == '') {
      wx.showToast({
        title: '请输入所需金额',
        icon: 'none'
      })
      // this.comfirm('提示', '请输入所需金额', false, '返回输入', '用户点击了“返回输入”')
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
  chooseUserType: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['贫困户', '管理员', '志愿者'],
      itemColor: "#000000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.setData({
              userClass: "贫困户"
            })
          } else if (res.tapIndex == 1) {
            that.setData({
              userClass: "管理员"
            })
          }else{
            that.setData({
              userClass: "志愿者"
            })
          }
        }
      }
    })
  },
 

  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      imgbox: [],
      title: '',
      content: '',
      name: '',
      tel: '',
      address: '',
      userClass: '',
      money1: '',
      uri: []
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})