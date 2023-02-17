<template>
  <div>
    <div>朱元璋</div>
    <hr>
    <!--  <zhubiao></zhubiao>
      <zhudi></zhudi>-->
    <transition name="cook" mode="out-in">
      <!-- component 动态组件-->
      <keep-alive>
        <component :is="emperor"></component>
      </keep-alive>
    </transition>


    <button @click="changeEmp">篡位</button>

  </div>
</template>

<script>
import zhubiao from "@/components/Zhubiao";
import zhudi from "@/components/Zhudi";

export default {
  name: "Zhuyuanzhang",
  components: {
    zhubiao,
    zhudi
  },
  data() {
    return {
      emperor: 'zhubiao'
    }
  },
  methods: {
    changeEmp() {
      if (this.emperor === 'zhubiao') {
        this.emperor = 'zhudi'
      } else {
        this.emperor = 'zhubiao'
      }
    }
  }
}
</script>

<style scoped>
.cook-enter-active, .cook-leave-active {
  transition: all .3s ease;
}

.cook-enter,.cook-leave-to{
  opacity: 0;
}
</style>