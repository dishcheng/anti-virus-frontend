<template>
  <q-page>
    <div class="fixed-top full-width content-center">
      订单ID：{{$route.query.orderId}},
      <p>
        待支付金额：{{$route.params.order_total}}
      </p>
      <p>
        请截图保存本页面并长按以下图片，添加以下客服进行付款并得到客服确认回复，必须付款否则本单作废
      </p>
      <q-img
        :src="orderInfo.shop.kefu_qrcode"
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
        orderInfo: []
      }
    },
    methods: {
      getOrderDetail () {
        console.log(this.$route.query)
        let orderId = this.$route.query.orderId
        this.$axios.get('/user/order/' + orderId)
          .then((res) => {
            console.log(res.data)
            if (res.status_code === 200) {
              this.orderInfo = res.data
            }
          })
          .catch((e) => {
          })
      }
    },
    created () {
      this.getOrderDetail()
    }
  }
</script>

<style scoped>

</style>
