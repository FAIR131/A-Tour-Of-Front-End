<template>
  <div>
    <!--prop属性来对应对象中的键名即可填入数据-->
    <!--    表格-->
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column
          prop="carPlate"
          label="车牌"
          width="120">
      </el-table-column>
      <el-table-column
          prop="customerName"
          label="车主姓名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="customerPhone"
          label="车主电话"
          width="120">
      </el-table-column>
      <el-table-column
          prop="address"
          label="提车地址"
          width="120">
      </el-table-column>
      <el-table-column
          prop="placeTestTime"
          label="预检时间"
          width="120">
      </el-table-column>
      <el-table-column
          prop="carType"
          label="车辆类型"
          width="120">
      </el-table-column>
      <el-table-column
          prop="stationName"
          label="检测站"
          width="120">
      </el-table-column>
      <el-table-column
          prop="driverName"
          label="代检司机"
          width="120">
      </el-table-column>
      <el-table-column
          prop="paymentWay"
          label="订单来源"
          width="120">
      </el-table-column>
      <el-table-column
          prop="contactTime"
          label="下单时间"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="订单状态"
          width="120">
        <template #default="scope">
          <el-button type="danger" size="small" v-if="scope.row.orderState==='待开始'" style="width: 80px">待开始
          </el-button>
          <el-button type="warning" size="small" v-else-if="scope.row.orderState==='正在进行'">正在进行</el-button>
          <el-button type="success" size="small" v-else-if="scope.row.orderState==='订单完成'">订单完成</el-button>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="180">
        <template #default="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small" style="width: 70px">修改</el-button>
          <el-button type="info" size="small" v-if="scope.row.orderState==='订单完成'">结算</el-button>
          <el-button type="danger" size="small" v-else>取消</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    分页功能-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query.total">
    </el-pagination>

    <!--    描述列表-->
    <el-dialog
        title="订单详情"
        :visible.sync="dialogVisible"
        width="80%">

      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item>
          <template slot="label">
            订单ID
          </template>
          {{ newOrder.id }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            车牌
          </template>
          <el-input v-model="newOrder.carPlate"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            车型
          </template>
          {{ newOrder.carType}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            客户姓名
          </template>
          <el-input v-model="newOrder.customerName"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            客户电话
          </template>
          <el-input v-model="newOrder.customerPhone"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            下单时间
          </template>
          {{ newOrder.placeOrderTime}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            用户检测费
          </template>
          <el-input v-model="newOrder.orderMoney"></el-input>
        </el-descriptions-item>  <el-descriptions-item>
        <template slot="label">
          服务费
        </template>
        <el-input v-model="newOrder.orderServiceFee"></el-input>
      </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
          司机服务费
        </template>
        <el-input v-model="newOrder.payDriverFee"></el-input>
      </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
          检测站费
        </template>
        <el-input v-model="newOrder.payStationFee"></el-input>
      </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
          订单状态
        </template>
          <el-select v-model="newOrder.orderState" placeholder="请选择" clearable>
            <el-option value="待开始"></el-option>
            <el-option value="正在进行"></el-option>
            <el-option value="订单完成"></el-option>
          </el-select>
      </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
          检测站
        </template>
          <el-select v-model="newOrder.stationName" placeholder="请选择" clearable>
            <el-option value="待开始"></el-option>
            <el-option value="正在进行"></el-option>
            <el-option value="订单完成"></el-option>
          </el-select>

      </el-descriptions-item>

        <template slot="extra">
          <el-button type="primary" size="small">操作</el-button>
        </template>
      </el-descriptions>

    </el-dialog>



  </div>
</template>

<script>
export default {
  name: "driverOrder",
  data() {
    return {
      dialogVisible:false,
      tableData: [],
      newOrder: [],
      query: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
      }
    }
  },
  methods: {
    initOrders() {
      this.$http.post("/order/getDriverOrder", this.query).then(res => {
        // console.log(res)
        this.tableData = res.data.object.list;
        this.query.total = res.data.object.total
      })
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      // console.log(`每页 ${val} 条`);
      this.query.pageSize = pageSize;
      this.initOrders()

    },
    handleCurrentChange(pageNum) {
      // console.log(`当前页: ${val}`);
      this.query.pageNum = pageNum;
      this.initOrders()
    },

    handleClick(order) {
      // console.log(row)
      this.newOrder=order

      this.dialogVisible=true

      this.$http.get("/order/getOrderDetail", {
        //要求传query，所以用params，如果body就可以直接传
        params: {
          id: order.id
        }
      }).then(res => {
        // console.log(res)
        // this.newOrder = res.data.object.list;
      })
    },

    searchStation(stationName, cb) {
this.$http.get("/testStation/getAllStation",{
  params:{
    stationName,
    pageNum:1,
    pageSize:10
  }
}).then(res=>{
  console.log(res)
})
    }
  },
  mounted() {
    this.initOrders()
  }
}
</script>

<style scoped>

</style>