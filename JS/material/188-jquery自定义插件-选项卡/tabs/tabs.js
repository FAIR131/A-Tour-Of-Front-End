/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
$.fn.extend({
    tabs: function (index) {
        var oli = this.find(".header li ")
        var obox = this.find(".box li ")

        oli.eq(index).addClass("active")
        obox.eq(index).addClass("active")
        oli.click(function () {
            // console.log(this,$(this)) //body ===> $(body)

            $(this).addClass("active").siblings().removeClass("active")

            // console.log($(this).index()) 
            var index = $(this).index()
            // $(".box li").eq(index).addClass("active").siblings().removeClass("active")

            obox.removeClass("active").eq(index).addClass("active")
        })
    }
})