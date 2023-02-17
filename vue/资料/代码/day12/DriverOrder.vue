<template>
  <div>
    <el-table :data="orderData" style="width: 100%" stripe border>
      <el-table-column prop="carPlate" label="车牌"> </el-table-column>
      <el-table-column prop="customerName" label="车主姓名"> </el-table-column>
      <el-table-column prop="customerPhone" label="车主电话"> </el-table-column>
      <el-table-column prop="province" label="提车地址">
        <template #default="order">
          {{
            order.row.province +
            order.row.city +
            order.row.area +
            order.row.address
          }}
        </template>
      </el-table-column>
      <el-table-column prop="placeTestTime" label="预检时间"> </el-table-column>
      <el-table-column prop="carType" label="车辆类型"> </el-table-column>
      <el-table-column prop="stationName" label="检测站"> </el-table-column>
      <el-table-column prop="driverName" label="代检司机"> </el-table-column>
      <el-table-column prop="paymentWay" label="订单来源"> </el-table-column>
      <el-table-column prop="placeOrderTime" label="下单时间">
      </el-table-column>
      <el-table-column label="订单状态" fixed="right">
        <template #default="scope">
            <el-tag effect="dark" type="success">{{scope.row.orderState}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template #default="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small"
            >修改</el-button
          >
          <el-button type="danger" size="small" v-if="scope.row.orderState!=='订单完成'">取消</el-button>
          <el-button type="info" size="small" v-else>结算</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.$http
      .post("/order/getDriverOrder", { pageNum: 1, pageSize: 10 })
      .then((res) => {
        this.orderData = res.data.object.list;
      });
  },
  data() {
    return {
      orderData: [],
    };
  },
};
</script>

<style>
</style>