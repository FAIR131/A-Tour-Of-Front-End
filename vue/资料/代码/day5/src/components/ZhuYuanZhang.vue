<template>
  <div>
    朱元璋
    <hr />
    <!-- <ZhuBiao></ZhuBiao>
    <ZhuDi></ZhuDi> -->

      <!-- 过渡组件 -->
    <transition name="cook" mode="out-in">
      <!-- 缓存组件 -->
      <keep-alive>
        <!-- 动态组件component -->
        <component :is="emperor"></component>
      </keep-alive>
    </transition>
    <!-- <ZhuBiao v-if="emperor==='ZhuBiao'"></ZhuBiao>
      <ZhuDi v-else></ZhuDi> -->

    <button @click="changeEmperor">篡位</button>
  </div>
</template>

<script>
import ZhuBiao from "./ZhuBiao.vue";
import ZhuDi from "./ZhuDi.vue";
export default {
  components: {
    ZhuBiao,
    ZhuDi,
  },
  data: function () {
    return {
      emperor: "ZhuBiao",
    };
  },
  methods: {
    changeEmperor: function () {
      if (this.emperor === "ZhuBiao") {
        this.emperor = "ZhuDi";
      } else {
        this.emperor = "ZhuBiao";
      }
    },
  },
};
</script>

<style scoped>
.cook-enter-active,
.cook-leave-active {
  transition: all 0.3s ease;
}
.cook-enter,
.cook-leave-to {
  opacity: 0;
}
</style>