<template>
  <q-page>
    <banner v-bind:banner-list="bannerList"></banner>
    <navigation v-bind:navigation-list="navigationList"></navigation>
    <div class="productList">
      <product-list-item v-bind:item='item' v-for="(item,index) in 1000"></product-list-item>
    </div>
  </q-page>
</template>
<script>
  import Banner from '../components/Index/Banner'
  import Navigation from '../components/Index/Navigation'
  import ProductListItem from '../components/Common/ProductListItem'
  import Icon from '../assets/view.png'

  export default {
    name: 'PageIndex',
    components: {
      ProductListItem,
      Banner,
      Navigation
    },
    data () {
      return {
        bannerList: [],
        ProductListData: [
          {
            'icon': Icon,
            'text': '美食',
            'to': '',//todo::xxxxx
          },
        ],
        navigationList: [
          {
            'icon': Icon,
            'text': '美食',
            'to': '',//todo::xxxxx
          },
          {
            'icon': Icon,
            'text': '景点',
            'to': '',
          }, {
            'icon': Icon,
            'text': '酒店',
            'to': '',
          }, {
            'icon': Icon,
            'text': '旅游',
            'to': '',
          }, {
            'icon': Icon,
            'text': '其他',
            'to': '',
          },

        ],
      }
    },
    methods: {
      loadData () {
        let that = this
        this.$axios.get('/customer/module/index/banner')
          .then((response) => {
            console.log(response.data.data)
            that.bannerList = response.data.data
          })
          .catch(() => {
            that.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
          })
      },
    },
    created () {
      this.loadData()
    }
  }
</script>

<style scoped>
  .productList {
    padding: 5px 10px;
    /*padding-left: 10px;*/
  }
</style>
