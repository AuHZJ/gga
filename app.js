//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    // wx.setStorageSync('logs'<<, logs)
  },

  globalData: {
    avatarUrl: "",//用户头像
    nickName: "",//用户昵称
    userGender: "", //性别
    userCity: "", //城市
    userProvince: "", //省份
    userCountry: "" ,//国家
    userType: "", //用户类型（志愿者，贫困户等）
    roleName: "",
    sessionid: '',
    // ip: 'http://192.168.43.190:8080' ,//后台ip
    ip: 'https://www.guangguangai.com' ,//后台ip
    appid: "wx31130462872316f3",
  }
})