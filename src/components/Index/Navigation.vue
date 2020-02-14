<template>
  <div class="row " style="margin: 0 10px">

    <div
      v-for="(item,index) in 5"
      class="col content-end text-center"
      style="padding: 0 10px;margin-top: 3px;"
    >
      <q-img
        src="http://img0.imgtn.bdimg.com/it/u=2785129070,2571118520&fm=26&gp=0.jpg"
        spinner-color="white"
        style="height: 40px;width: 40px;margin-bottom: 2px"
      >
      </q-img>
      <p class="navigateText">美食</p>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Navigation',
    props: [
      'navigationList'
    ],
    data () {
      return {}
    },
    watch: {}
  }
</script>

<style scoped>
  .navigateText {
    /*width:24px;*/
    /*height:17px;*/
    /*font-size:12px;*/
    /*font-family:PingFangSC-Regular,PingFang SC;*/
    /*font-weight:400;*/
    color:rgba(51,51,51,1);
    line-height:17px;
  }
</style>
