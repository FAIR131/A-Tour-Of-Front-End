<template>
  <div>
    <!-- <p ref="myPNode">今天是星期{{day}}</p><el-button @click="changeDay">修改day</el-button> -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单总表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form inline>
      <el-form-item label="请输入">
        <el-input
          @change="initOrders"
          v-model="query.carPlate"
          placeholder="车牌号/订单号/车主手机号"
        ></el-input>
      </el-form-item>

      <el-form-item label="订单来源">
        <el-select v-model="query.paymentWay" @change="initOrders">
          <el-option value="商务端"></el-option>
          <el-option value="淘宝"></el-option>
          <el-option value="天猫"></el-option>
          <el-option value="中保车服"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="检测站">
        <el-autocomplete
          class="inline-input"
          :fetch-suggestions="searchStation"
          v-model="query.stationName"
          :trigger-on-focus="false"
          placeholder="请输入内容"
          @select="findByStation"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="司机">
        <el-autocomplete
          class="inline-input"
          :fetch-suggestions="searchDriver"
          v-model="query.driverName"
          :trigger-on-focus="false"
          placeholder="请输入内容"
          @select="findByDriver"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="区域">
        <pick-area :showArea="false" @getSite="getSite"></pick-area>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="initOrders">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="orderData"
      style="width: 100%"
      stripe
      border
      @expand-change="getOrderDetail"
      row-key="id"
      :expand-row-keys="expandRow"
    >
      <el-table-column type="expand">
        <template #default="scope">
          <el-steps direction="vertical" :active="3">
            <el-step title="预约">
              <template #description>
                <p class="desc">
                  订单号:<span>{{ scope.row.id }}</span>
                </p>
                <p class="desc">
                  车牌号:<span>{{ scope.row.carPlate }}</span>
                </p>
                <p class="desc">
                  预检时间:<span>{{ scope.row.placeTestTime }}</span>
                </p>
                <p class="desc">
                  地址:<span>{{
                    scope.row.province +
                    scope.row.city +
                    scope.row.area +
                    scope.row.address
                  }}</span>
                </p>
              </template>
            </el-step>
            <el-step title="预检">
              <template #description>
                <p class="desc">
                  客户姓名:<span>{{ scope.row.customerName }}</span>
                </p>
                <p class="desc">
                  客户电话:<span>{{ scope.row.customerPhone }}</span>
                </p>
                <p class="desc">
                  代检司机:<span>{{ scope.row.driverName }}</span>
                </p>
                <p class="desc">
                  实况照片:<span>
                    <el-image
                      style="width: 100px"
                      :src="item"
                      v-for="item in orderService.pickCarImg &&
                      JSON.parse(orderService.pickCarImg)"
                      :key="item"
                    ></el-image>
                  </span>
                </p>
                <p class="desc">
                  取车签字:
                  <el-image
                    style="width: 100px"
                    :src="orderService.pickCarCustomerSign"
                    :preview-src-list="[orderService.pickCarCustomerSign]"
                  ></el-image>
                  <el-image
                    style="width: 100px"
                    :src="orderService.pickCarDriverSign"
                    :preview-src-list="[orderService.pickCarDriverSign]"
                  ></el-image>
                </p>
              </template>
            </el-step>
            <el-step title="送检"></el-step>
            <el-step title="还车"></el-step>
            <el-step title="归档"></el-step>
          </el-steps>
        </template>
      </el-table-column>

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
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="这是一段内容确定删除吗？"
          >
            <el-button
              type="danger"
              size="small"
              v-if="scope.row.orderState !== '订单完成'"
              @click="cancelOrder(scope.row.id)"
              >取消</el-button
            >
          </el-popconfirm>

          <el-button
            type="info"
            size="small"
            v-if="scope.row.orderState === '订单完成'"
            >结算</el-button
          >
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
            :action="$http.defaults.baseURL + '/file/uploadFile'"
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
import PickArea from "../../components/pickArea.vue";
import driverOrder from "./driverOrder.js";
export default {
  inject: ["reload"],
  components: {
    PickArea,
  },
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
      orderService: {},
      drivers: [],
      stations: [],
      expandRow: [],
      day: 5,
    };
  },
  methods: {
    ...driverOrder,
  },
};
</script>

<style>
@import "./driverOrder.css";
</style>