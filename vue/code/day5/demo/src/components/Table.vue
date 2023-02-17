<template>
  <table border="1" cellspacing="0" style="margin-left: 10px">
    <tr>
      <th>姓名</th>
      <th>年龄</th>
      <th>成绩</th>
    </tr>
    <tr v-for="(item,index) in users" :key="index">
      <td>{{ item.username }}</td>
      <td>{{ item.age }}</td>
      <td>{{ item.score }}</td>
      <slot :stu="item"></slot>
    </tr>
  </table>
</template>

<script>
export default {
  name: "Table",
  props:['users']
}
</script>

<style scoped>

</style>