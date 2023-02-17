<template>
  <ul class="stores">
    <li>
        沙县国际大酒店
    </li>
    <li>
        <!-- 单个(默认)插槽 -->
        <!-- 默认插槽的name叫default,可以不写,用的时候也可以不指定 -->
        <!-- 一个页面只能写一个默认插槽,多个插槽需要用命名区分 -->
        <slot></slot>

        <!-- <slot name="second"></slot> -->
    </li>
    <li>
        <slot name="third" :notify="notify"></slot>
    </li>
    <li>
        <slot name="fourth"></slot>
    </li>
  </ul>
</template>

<script>
export default {
    data:function(){
        return {
            notify:"整改通知"
        }
    }
};
</script>

<style>
*{
    margin:0;
    padding:0;
}
.stores{
    list-style: none;
    display: flex;
    margin-bottom: 10px;
}
.stores li{
    width: 200px;
    height: 200px;
    border: 2px solid black;
    margin-right: 2px;
}
</style>