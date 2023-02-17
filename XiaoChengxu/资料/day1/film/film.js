// pages/film.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeMenu:1,
    films:[]
  },
  pickFilm:function(e){
    this.setData({
      activeMenu:e.currentTarget.dataset.type
    })
    this.initData()
  },
  initData:function(){
    wx.request({
      url: 'https://m.maizuo.com/gateway',
      header:{
        "X-host":"mall.film-ticket.film.list"
      },
      data:{
        cityId: 440300,
        pageNum: 1,
        pageSize: 10,
        type: 1,
        k: 4810293
      },
      success:(res)=>{
        this.setData({
          films:res.data.data.films
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})