<template>
  <div class="row " style="margin: 0 10px">

    <div
      v-for="(item,index) in navigationList"
      class="col content-end text-center"
      style="padding: 0 10px;margin-top: 3px;"
    >
      <q-img
        :src="item.icon"
        spinner-color="white"
        style="height: 40px;width: 40px;margin-bottom: 2px"
      >
      </q-img>
      <p class="navigateText">{{item.text}}</p>
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
    color:rgba(51,51,51,1);
    line-height:17px;
  }
</style>
