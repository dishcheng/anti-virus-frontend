<template>
  <q-page>
    <banner v-bind:banner-list="bannerList"></banner>
    <navigation></navigation>


  </q-page>
</template>
<script>
  import Banner from '../components/Index/Banner'
  import Navigation from '../components/Index/Navigation'

  export default {
    name: 'PageIndex',
    data () {
      return {
        bannerList: []
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
