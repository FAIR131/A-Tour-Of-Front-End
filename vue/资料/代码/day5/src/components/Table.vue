<template>
  <table border="1" cellspacing="0" style="margin-left: 50%">
    <!-- <tr>
      <th>名称</th>
      <th>年龄</th>
      <th>分数</th>
    </tr> -->
    <tr v-for="(item, index) in users" :key="index">
      <td>{{ item.username }}</td>
      <td>{{ item.age }}</td>
      <td>{{ item.score }}</td>
      <slot :stu="item"></slot>
    </tr>
  </table>
</template>

<script>
export default {
  props: ["users"],
};
</script>

<style>
</style>