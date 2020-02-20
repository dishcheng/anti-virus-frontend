<template>
  <q-layout view="hHh lpR fFf">

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <q-list bordered separator>
        <q-item clickable v-ripple to="/admin/" exact>
          <q-item-section>订单管理</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/admin/product" exact>
          <q-item-section>
            产品管理
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/admin/address" exact>
          <q-item-section>
            地址管理
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
  export default {
    name: 'AdminMainLayout',
    data () {
      return {
        left: true
      }
    },
    components: {},
    methods: {
      toOrder () {
        this.$router.push({
          'name': 'adminIndex',
        })
      },
      toProduct () {
        this.$router.push({ 'name': 'adminProduct' })
      }
    },
    created () {
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
