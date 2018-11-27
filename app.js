//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  globalData: {
    avatarUrl: "",//用户头像
    nickName: "",//用户昵称
    userGender: "", //性别
    userCity: "", //城市
    userProvince: "", //省份
    userCountry: "" ,//国家
    userType: "贫困户", //用户类型（志愿者，贫困户等）
    donated: "520.13", //已捐赠
    // userInfo: null,
    // wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx31130462872316f3&secret=675a814cceaa2ea111f2ee4528c54149&js_code=',
    // wx_url_2: '&grant_type=authorization_code'
  }
})