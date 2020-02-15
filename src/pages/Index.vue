<template>
  <q-page>
    <banner v-bind:banner-list="bannerList"></banner>
    <navigation v-bind:navigation-list="navigationList"></navigation>


  </q-page>
</template>
<script>
  import Banner from '../components/Index/Banner'
  import Navigation from '../components/Index/Navigation'
  import Icon from '../assets/view.png'
  export default {
    name: 'PageIndex',
    data () {
      return {
        bannerList: [],
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
    components: {
      Banner,
      Navigation
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
