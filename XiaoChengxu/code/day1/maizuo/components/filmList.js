// components/filmList.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    films:{
      type:Array,
      default:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    collectFilm:function(e){
      app.globalData.collect_films.push(e.currentTarget.dataset.film)    
    },
  }
})
