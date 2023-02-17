<template>
  <div>
    <el-form style="width: 30%" inline>
      <el-form-item label="订单来源">
        <el-select>
          <el-option value="淘宝"></el-option>
          <el-option value="天猫"></el-option>
          <el-option value="支付宝"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车牌号">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="预检时间">
        <el-date-picker
          type="datetime"
          placeholder="选择预检时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实付价格">
        <el-input type="number" v-model="price"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="客户电话">
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <label style="float:left">居住地址</label>
        <PickArea></PickArea>
        <el-input style="width:80%;float:right;"></el-input>
      </el-form-item>
      <el-form-item label="行驶证或车辆照片">
        <el-upload
          class="upload-demo"
          drag
          :action="$http.defaults.baseURL + '/file/uploadFile'"
          multiple
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
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">立即创建</el-button>
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
      price: 0,
    };
  },
};
</script>

<style>
</style>