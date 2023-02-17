<template>
  <div style="width:250px;">
    <el-select v-model="prov" style="width: 32%" @change="changeProv">
      <el-option v-for="(option,index) in arr" :value="option.name" :key="index">
        {{ option.name }}
      </el-option>
    </el-select>
    <el-select v-model="city" style="width: 32%" @change="changeCity">
      <el-option v-for="(option,index) in cityArr" :value="option.name" :key="index" >
        {{ option.name }}
      </el-option>
    </el-select>
    <el-select v-model="district" v-if="showArea || showArea === null" style="width: 32%"
      @change="changeDistrict">
      <el-option v-for="(option,index) in districtArr" :value="option.name" :key="index">
        {{ option.name }}
      </el-option>
    </el-select>
  </div>
</template>
<script>
import area from "./area.js"; //这里引入城市信息
export default {
  name: "Cselect",
  props: {
    showArea: {
      type: Boolean,
      default: true,
    },
    imProv: {
      type: String,
      default: "省份",
    },
    imCity: {
      type: String,
      default: "城市",
    },
    imdistrict: {
      type: String,
      default: "区域",
    },
  },
  data() {
    return {
      arr: area.arrAll,
      prov: this.imProv,
      city: this.imCity,
      district: this.imdistrict,
      cityArr: [],
      districtArr: [],
    };
  },
  methods: {
    changeProv() {
      this.updateCity();
      this.updateDistrict();
      if (
        this.prov !== "省份" &&
        this.city !== "城市" &&
        this.district !== "区域"
      ) {
        this.$emit("getSite", this.prov, this.city, this.district);
      }else{
        this.prov="省份"
        this.city="城市"
        this.district="区域"
        this.$emit("getSite", this.prov, this.city, this.district);
      }
    },
    changeCity() {
      this.updateDistrict();
      if (
        this.prov !== "省份" &&
        this.city !== "城市" &&
        this.district !== "区域"
      ) {
        this.$emit("getSite", this.prov, this.city, this.district);
      }else{
        this.prov="省份"
        this.city="城市"
        this.district="区域"
        this.$emit("getSite", this.prov, this.city, this.district);
      }
    },
    changeDistrict() {
      if (
        this.prov !== "省份" &&
        this.city !== "城市" &&
        this.district !== "区域"
      ) {
        this.$emit("getSite", this.prov, this.city, this.district);
      }else{
        this.prov="省份"
        this.city="城市"
        this.district="区域"
        this.$emit("getSite", this.prov, this.city, this.district);
      }
    },
    updateCity: function () {
      for (var i in this.arr) {
        var obj = this.arr[i];
        if (obj.name) {
          if (obj.name == this.prov) {
            this.cityArr = obj.sub;
            break;
          }
        }
      }
      if (!this.cityArr[1] && this.cityArr[0]) {
        this.city = this.cityArr[0].name;
        return;
      }
      if (this.prov !== null) {
        this.city = this.cityArr[0].name;
      }
    },
    updateDistrict: function () {
      for (var i in this.cityArr) {
        var obj = this.cityArr[i];
        if (obj.name == this.city) {
          this.districtArr = obj.sub;
          break;
        }
      }
      if (this.districtArr && this.districtArr.length > 0) {
        if (!this.districtArr[1]) {
          this.district = this.districtArr[0].name;
          return;
        }
        this.district = this.districtArr[1].name;
      } else {
        this.district = "";
      }
    },
  },
  beforeMount() {},
  watch: {
    imProv: function (val1, val2) {
      if (val1 !== "省份") {
        for (var i in this.arr) {
          var obj = this.arr[i];
          if (obj.name) {
            if (obj.name == val1) {
              this.cityArr = obj.sub;
            }
          }
        }
      }else{
        this.prov="省份"
        this.city="城市"
        this.district="区域"
        return false
      }
      this.prov = val1;
    },
    imCity: function (val1, val2) {
      if (val1 !== "城市") {
        for (var i in this.cityArr) {
          var obj = this.cityArr[i];
          if (obj.name == val1) {
            this.districtArr = obj.sub;
          }
        }
      }else{
        this.prov="省份"
        this.city="城市"
        this.district="区域"
        return false
      }
      this.city = val1;
    },
    imdistrict: function (val1, val2) {
      this.district = val1;
    },
  },
};
</script>
          
