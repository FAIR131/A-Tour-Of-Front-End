<template>
  <div>
    <el-table :data="orderData" style="width: 100%" stripe border>
      <el-table-column prop="carPlate" label="车牌"></el-table-column>
      <el-table-column prop="customerName" label="车主姓名"></el-table-column>
      <el-table-column prop="customerPhone" label="车主电话"></el-table-column>
      <el-table-column prop="province" label="提车地址" width="180">
        <template #default="order">
          {{
            order.row.province +
            order.row.city +
            order.row.area +
            order.row.address
          }}
        </template>
      </el-table-column>
      <el-table-column prop="placeTestTime" label="预检时间"></el-table-column>
      <el-table-column prop="carType" label="车辆类型"></el-table-column>
      <el-table-column prop="stationName" label="检测站"></el-table-column>
      <el-table-column prop="driverName" label="代检司机"></el-table-column>
      <el-table-column prop="paymentWay" label="订单来源"></el-table-column>
      <el-table-column prop="placeOrderTime" label="下单时间">
      </el-table-column>
      <el-table-column label="订单状态" fixed="right">
        <template #default="scope">
          <el-tag
              effect="dark"
              v-if="scope.row.orderState === '待开始'"
              type="danger"
          >{{ scope.row.orderState }}
          </el-tag
          >
          <el-tag
              effect="dark"
              v-else-if="scope.row.orderState === '正在进行'"
              type="warning"
          >{{ scope.row.orderState }}
          </el-tag
          >
          <el-tag effect="dark" v-else type="success">{{
              scope.row.orderState
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template #default="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">修改
          </el-button>
          <el-button
              type="danger"
              size="small"
              v-if="scope.row.orderState !== '订单完成'">取消
          </el-button>
          <el-button type="info" size="small" v-else>结算</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.initOrders();
  },
  data() {
    return {
      orderData: [],
      query: {
        total: 0,
        pageSize: 10,
        pageNum: 1,
      },
    };
  },
  methods: {
    initOrders: function () {
      this.$http.post("/order/getDriverOrder", {
        pageNum: this.query.pageNum,
        pageSize: this.query.pageSize,
      })
          .then((res) => {
            this.orderData = res.data.object.list;
            this.total = res.data.object.total;
          });
    },
    handleSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.initOrders();
    },
    handleCurrentChange(pageNum) {
      this.query.pageNum = pageNum;
      this.initOrders();
    },
  },
};
</script>

<style>
</style>