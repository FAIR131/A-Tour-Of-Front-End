// pages/mine/mine.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect_films:[]
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
    this.setData({
      collect_films:app.globalData.collect_films
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // console.log("我的页面影藏了");
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
    console.log("下拉我的页面");
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