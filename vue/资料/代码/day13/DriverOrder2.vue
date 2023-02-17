<template>
  <div>
    <el-table :data="orderData" style="width: 100%" stripe border>
      <el-table-column prop="carPlate" label="车牌"> </el-table-column>
      <el-table-column prop="customerName" label="车主姓名"> </el-table-column>
      <el-table-column prop="customerPhone" label="车主电话"> </el-table-column>
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
      <el-table-column prop="placeTestTime" label="预检时间"> </el-table-column>
      <el-table-column prop="carType" label="车辆类型"> </el-table-column>
      <el-table-column prop="stationName" label="检测站"> </el-table-column>
      <el-table-column prop="driverName" label="代检司机"> </el-table-column>
      <el-table-column prop="paymentWay" label="订单来源"> </el-table-column>
      <el-table-column prop="placeOrderTime" label="下单时间">
      </el-table-column>
      <el-table-column label="订单状态" fixed="right">
        <template #default="scope">
          <el-tag
            effect="dark"
            v-if="scope.row.orderState === '待开始'"
            type="danger"
            >{{ scope.row.orderState }}</el-tag
          >
          <el-tag
            effect="dark"
            v-else-if="scope.row.orderState === '正在进行'"
            type="warning"
            >{{ scope.row.orderState }}</el-tag
          >
          <el-tag effect="dark" v-else type="success">{{
            scope.row.orderState
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template #default="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="small"
            v-if="scope.row.orderState !== '订单完成'"
            >取消</el-button
          >
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
      :total="query.total"
    >
    </el-pagination>

    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="80%">
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            订单id
          </template>
          {{ newOrder.id }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            车牌
          </template>
          <el-input v-model="newOrder.carPlate"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            车型
          </template>
          {{ newOrder.carType }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            客户姓名
          </template>
          <el-input v-model="newOrder.customerName"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            客户电话
          </template>
          <el-input v-model="newOrder.customerPhone"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            下单时间
          </template>
          {{ newOrder.placeOrderTime }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            用户检测费
          </template>
          {{ newOrder.orderMoney }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            订单状态
          </template>
          <el-select v-model="newOrder.orderState" clearable placeholder="请选择">
            <el-option value="待开始"></el-option>
            <el-option value="正在进行"></el-option>
            <el-option value="订单完成"></el-option>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            代检司机
          </template>
          <el-select v-model="newOrder.driverName" clearable placeholder="请选择">
            <el-option :value="item.id" v-for="item in drivers" :key="item.id">{{item.driverName}}</el-option>
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
      <el-button type="primary">提交</el-button>
    </el-dialog>
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
      dialogVisible: false,
      query: {
        total: 0,
        pageSize: 10,
        pageNum: 1,
      },
      newOrder: {},
      drivers:[]
    };
  },
  methods: {
    initOrders: function () {
      this.$http
        .post("/order/getDriverOrder", {
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
    handleClick: function (order) {
      this.newOrder = order;
      this.$http.get("/driverUser/getAllDriver",{params:{
        province:order.province,
        city:order.city,
        pageNum:1,
        pageSize:10
      }}).then(res=>{
        this.drivers=res.data.object.list;
      })
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
</style>