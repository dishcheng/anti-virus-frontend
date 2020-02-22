<template>
  <q-page>
    <div class="fixed-top full-width content-center">
      订单ID：{{$route.query.orderId}},
      <p>
        待支付金额：{{orderInfo.order_total}}
      </p>
      <p>
        用户姓名：{{orderInfo.order_name}}
      </p>
      <p>
        联系方式：{{orderInfo.order_phone}}
      </p>

      <p>
        供应商名称：{{orderInfo.shop.shop_name}}
      </p>

      <p>
        系统提示：<span style="color: red">{{order_detail_sys_notice}}</span>
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
        order_detail_sys_notice: '',
        orderInfo: {
          order_total: '',
          shop: {
            kefu_qrcode: '',
            shop_name:''
          }
        }
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
      },
      getConfig () {
        this.$axios.get('/user/config/')
          .then((res) => {
            console.log(res.data)
            if (res.status_code === 200) {
              this.order_detail_sys_notice = res.data.order_detail_sys_notice
            }
          })
          .catch((e) => {
          })
      },
    },
    mounted () {
      this.getOrderDetail()
      this.getConfig()
    }
  }
</script>

<style scoped>

</style>
