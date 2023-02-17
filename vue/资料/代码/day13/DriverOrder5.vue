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
          <template slot="label"> 订单状态 </template>
          <el-select
            v-model="newOrder.orderState"
            clearable
            placeholder="请选择"
          >
            <el-option value="待开始"></el-option>
            <el-option value="正在进行"></el-option>
            <el-option value="订单完成"></el-option>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 代检司机 </template>
          <el-select
            v-model="newOrder.driverName"
            clearable
            placeholder="请选择"
            @change="changeDriver"
          >
            <el-option
              :value="item"
              :label="item.driverName"
              v-for="item in drivers"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 检测站 </template>
          <el-select
            v-model="newOrder.stationName"
            clearable
            placeholder="请选择"
            @change="changeStation"
          >
            <el-option
              :value="item"
              :label="item.name + `(${item.distance}km)`"
              v-for="item in stations"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 预检时间 </template>
          <el-date-picker
            v-model="newOrder.placeTestTime"
            type="datetime"
            placeholder="选择预检时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 行驶证 </template>
          <el-image
            style="width: 100px"
            :preview-src-list="newOrder.merchantLicenseImg"
            :src="item"
            v-for="item in newOrder.merchantLicenseImg"
            :key="item"
          ></el-image>
          <el-upload
            class="upload-demo"
            :action="$http.defaults.baseURL+'/file/uploadFile'"
            multiple
            :on-success="uploadImg"
            :show-file-list="false"
          >
            <i class="el-icon-plus" style="fontsize: 50px"></i>
          </el-upload>
        </el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" @click="updateOrder">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.initOrders();
    console.log(this.$http.defaults.baseURL);
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
      drivers: [],
      stations: [],
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
          this.query.total = res.data.object.total;
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
      this.$http
        .get("/driverUser/getAllDriver", {
          params: {
            province: order.province,
            city: order.city,
            pageNum: 1,
            pageSize: 10,
          },
        })
        .then((res) => {
          this.drivers = res.data.object.list;
        });

      this.$http
        .get("/testStation/getAllStation", {
          params: {
            province: order.province,
            city: order.city,
            pageNum: 1,
            pageSize: 10,
            coordinate: order.coordinate,
          },
        })
        .then((res) => {
          this.stations = res.data.object.list;
        });
      
        if(this.newOrder.merchantLicenseImg==null||this.newOrder.merchantLicenseImg=="null"){
          this.newOrder.merchantLicenseImg=[];
        }else{
          this.newOrder.merchantLicenseImg=JSON.parse(this.newOrder.merchantLicenseImg)
        }
      
      this.dialogVisible = true;
    },
    changeDriver: function (driver) {
      this.newOrder.driverId = driver.driverId;
      this.newOrder.driverName=driver.driverName;
    },
    changeStation: function (station) {
      this.newOrder.stationId = station.stationId;
      this.newOrder.stationName=station.name;
    },
    updateOrder: function () {

      let tmpOrder=JSON.parse(JSON.stringify(this.newOrder))

      tmpOrder.merchantLicenseImg=JSON.stringify(tmpOrder.merchantLicenseImg)

      this.$http.post("/order/updateDriverOrder", tmpOrder).then((res) => {
        this.$message.success("订单修改成功");
        this.dialogVisible = false;
      });
    },
    uploadImg:function(res){
      this.newOrder.merchantLicenseImg.push(res.object.url)
    }
  },
};
</script>

<style>
</style>