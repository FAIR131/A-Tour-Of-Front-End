<template>
  <teleport to="body">
    <button @click="modalOpen=true">打开全屏的模态框</button>
    <div v-if="modalOpen" class="modal">
      <div>
        这是一个模态框
        <button @click="modalOpen=false">关闭</button>
      </div>
    </div>
  </teleport>

</template>

<script>
import {ref} from "vue"
export default {
  name: "mask",
  setup(props){
    const modalOpen = ref(false);
    return{
      modalOpen
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>