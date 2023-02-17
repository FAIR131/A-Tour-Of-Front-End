<template>
  <div>
    <FilmList :films="films"></FilmList>
  </div>
</template>

<script>
import axios from "@/utils/request2";
import FilmList from "@/components/FilmList";

export default {
  name: "NewFim",
  data() {
    return {
      films: [],
    }
  },
  components:{
    FilmList
  },
  mounted: async function () {
    let res = await this.$http.get("/",{
      params:{
        cityId:"330100",
        pageNum:1,
        pageSize:10,
        type:2,
        k:5017948
      }
    })

    console.log(res)
    this.films = res.data.data.films
  },

}
</script>

<style scoped>

</style>