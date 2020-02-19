<template>
  <q-layout>
    <keep-alive>
      <q-page-container>
        <router-view/>
      </q-page-container>
    </keep-alive>
  </q-layout>
</template>

<script>
  export default {
    name: 'AdminMainLayout',
    data () {
      return {}
    },
    components: {},
    methods: {},
    created () {
      // this.loadData()
    },
    computed: {}
  }
</script>
<style scoped>
  .shadow_circle {
    margin-left: 10px;
    width: 100px;
    height: 100px;
    border: red 1px solid;
    border-radius: 50px;
  }

  .div_out {
    width: 400px;
    height: 100px;
    border: red 1px solid;
  }

  .div_in {
    width: 70px;
    height: 50px;
    border: red 1px solid;
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    background: rgb(248, 248, 248);
    height: 49px;
    /*width: 100%;*/
  }

  .navImg {
    width: 29px;
    height: 29px;
  }

</style>
