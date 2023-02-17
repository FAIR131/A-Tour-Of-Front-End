<template>
  <div>
    <el-form style="width: 30%"  label-width="80px":model="order" :rules="rules" ref="inputOrder">
      <el-form-item label="订单来源" prop="paymentWay">
        <el-select v-model="order.paymentWay">
          <el-option value="淘宝"></el-option>
          <el-option value="天猫"></el-option>
          <el-option value="支付宝"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车牌号" prop="carPlate">
        <el-input v-model="order.carPlate"></el-input>
      </el-form-item>
      <el-form-item label="预检时间">
        <el-date-picker
          type="datetime"
          placeholder="选择预检时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="order.placeTestTime"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实付价格" prop="price">
        <el-input type="number" v-model="order.price"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名" prop="customerName">
        <el-input v-model="order.customerName"></el-input>
      </el-form-item>
      <el-form-item label="客户电话" prop="customerPhone">
        <el-input v-model="order.customerPhone"></el-input>
      </el-form-item>
      <el-form-item label="居住地址" prop="address">
        <PickArea @getSite="getSite"></PickArea>
        <el-input v-model="order.address"></el-input>
      </el-form-item>
      <el-form-item label="行驶证或车辆照片">
        <el-upload
          class="upload-demo"
          drag
          :action="$http.defaults.baseURL + '/file/uploadFile'"
          multiple
          :on-success="uploadLicenseImg"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="电子保单(非必填)">
        <el-upload
          class="upload-demo"
          drag
          :action="$http.defaults.baseURL + '/file/uploadFile'"
          multiple
          :on-success="uploadPolicyImg"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="order.remarks"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitOrder">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PickArea from "../../components/pickArea.vue";
export default {
  components: {
    PickArea,
  },
  data: function () {
    return {
      order:{licenseImgs:[],policyImgs:[]},
      rules:{
        paymentWay:[
            { required: true, message: '请选择订单来源', trigger: 'change' },
        ],
        carPlate:[
            { required: true, message: '请输入车牌号', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        price:[
            { required: true, message: '请输入实付价格', trigger: 'blur' }
        ],
        customerName:[
            { required: true, message: '请输入客户姓名', trigger: 'blur' }
        ],
        customerPhone:[
            { required: true, message: '请输入客户电话', trigger: 'blur' }
        ],
        address:[
            { required: true, message: '请输入居住地址', trigger: 'blur' }
        ]
      }
    };
  },
  methods:{
    submitOrder:function(){
        this.$refs.inputOrder.validate(async valid=>{
            if(valid){
                let res=await this.$http.post("/order/placeCStoreOrder",this.order);
                if(res.data.code){
                    this.$message.success(res.data.message)
                }
            }else{
                this.$message.error("请完善信息")
            }
        })
    },
    getSite:function(prov,city,area){
        this.order.province=prov;
        this.order.city=city;
        this.order.area=area;
    },
    uploadLicenseImg: function (res) {
        this.order.licenseImgs.push(res.object.url);
    },
    uploadPolicyImg:function(res){
        this.order.policyImgs.push(res.object.url);
    }
  }
};
</script>

<style>
</style>