<template>

  <ul class="store">
    <li>沙县国际大酒店</li>
    <li>
      <!--   默认插槽     -->
<!--      <slot name="second"></slot>-->
   <slot></slot>
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
  name: "Street",
  data(){
    return {
      notify:'整改通知'
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.store {
  list-style: none;
  display: flex;
  margin-bottom: 10px;
}

.store li {
  width: 200px;
  height: 200px;
  border: 2px solid black;
}

</style>