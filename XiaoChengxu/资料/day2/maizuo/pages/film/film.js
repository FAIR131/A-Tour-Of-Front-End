// pages/film.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeMenu:1,
    films:[],
    pageNum:1,
    hasNextPage:true
  },
  pickFilm:function(e){
    this.setData({
      activeMenu:e.currentTarget.dataset.type
    })
    this.setData({
      films:[],
      pageNum:1,
      hasNextPage:true
    })
    this.initData()
  },
  initData:function(){
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: 'https://m.maizuo.com/gateway',
      header:{
        "X-host":"mall.film-ticket.film.list"
      },
      data:{
        cityId: 440300,
        pageNum: this.data.pageNum,
        pageSize: 10,
        type: this.data.activeMenu,
        k: 4810293
      },
      success:({data:{data:{films}}})=>{
        wx.hideLoading()
        if(films.length>0){
          this.setData({
            films:[...this.data.films,...films]
          })
        }else{
          this.setData({
            hasNextPage:false
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initData()
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
    console.log("我下拉了");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.hasNextPage){
      this.setData({
        pageNum:this.data.pageNum+1
      })
      this.initData()
    }else{
      wx.showToast({
        icon:"none",
        title: '没有更多了',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})