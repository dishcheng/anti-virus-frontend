<template>
  <q-page>
    入驻条件：
    <ul>
      <li>1、具备公司资质（提供营业执照图片）</li>
      <li>2、有村级以上单位担保信用</li>
    </ul>
    <p class="text-center">
      符合条件请，长按以下二维码，办理入驻
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
        kefuqrcode: require('../assets/kefuqrcode.jpeg')
      }
    },
    methods: {},
    computed: {},
    created () {
      this.loadShopsList()
    },
    watch: {
      activeShopCode (newVal, oldVal) {
        if (newVal !== '') {
          this.loadProductsAndAddressList()
        }
      }
    }
  }
</script>

<style scoped>
  .productList {
    padding: 5px 10px;
    /*padding-left: 10px;*/
  }
</style>
