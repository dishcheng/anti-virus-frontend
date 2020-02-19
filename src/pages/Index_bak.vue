<template>
  <q-page>
    <banner v-bind:banner-list="bannerList"></banner>
    <navigation v-bind:navigation-list="navigationList"></navigation>
    <div class="productList">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="black"
          indicator-color="orange"
          align="justify"
          narrow-indicator
        >
          <q-tab name="recommend" label="为您推荐"/>
          <q-tab name="sold_best" label="销量最高"/>
          <q-tab name="later" label="即将开抢"/>
        </q-tabs>

        <q-separator/>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="recommend">
            <product-list-item v-bind:item='item' :key="index" v-for="(item,index) in 10"></product-list-item>
          </q-tab-panel>

          <q-tab-panel name="sold_best">
            <product-list-item v-bind:item='item' :key="index" v-for="(item,index) in 10"></product-list-item>
          </q-tab-panel>

          <q-tab-panel name="later">
            <product-list-item v-bind:item='item' :key="index" v-for="(item,index) in 10"></product-list-item>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
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
        tab: 'recommend',
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
