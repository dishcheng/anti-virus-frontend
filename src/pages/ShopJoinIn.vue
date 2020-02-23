<template>
  <q-page>
    入驻条件：
    <ol>
      <li v-for="(item,index) in shop_join_in_needs">{{item}}</li>
    </ol>
    <p class="text-center">
      符合条件请，长按以下二维码，免费办理入驻
    </p>
    <q-img
      :src="kefuqrcode"
      style="width: 100%"
    >
    </q-img>
  </q-page>
</template>
<script>
  export default {
    name: 'PageIndex',
    components: {},
    data () {
      return {
        kefuqrcode: require('../statics/kefuqrcode.jpeg'),
        shop_join_in_needs: [],
      }
    },
    mounted () {
      this.getConfig()
    },
    methods: {
      getConfig () {
        this.$axios.get('/user/config/')
          .then((res) => {
            console.log(res.data)
            if (res.status_code === 200) {
              this.shop_join_in_needs = res.data.shop_join_in_needs
            }
          })
          .catch((e) => {
          })
      },
    }
  }
</script>

<style scoped>
  .productList {
    padding: 5px 10px;
    /*padding-left: 10px;*/
  }
</style>
