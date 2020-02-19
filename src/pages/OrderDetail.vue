<template>
  <q-page>
    <div class="fixed-top full-width content-center">
      订单ID：{{$route.query.orderId}},
      <p>
        待支付金额：{{$route.params.order_total}}
      </p>
      <p>
        请截图保存本页面并长按以下图片，添加客服进行付款，必须付款否则本单作废
      </p>
      <q-img
        :src="kefuqrcode"
        style="width: 100%"
      >
      </q-img>
    </div>
  </q-page>
</template>
<script>
  export default {
    name: 'PageOrder',
    components: {},
    data () {
      return {
        kefuqrcode: require('../assets/kefuqrcode.jpeg')
      }
    },
    methods: {},
    created () {

    }
  }
</script>

<style scoped>

</style>
