<template>
  <q-page>
    <banner v-bind:banner-list="bannerList"></banner>
  </q-page>
</template>
<script>
  import Banner from '../components/Index/Banner'
  export default {
    name: 'PageIndex',
    data () {
      return {
        bannerList: []
      }
    },
    components: {
      Banner
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
