<template>
  <div>
    产品管理
  </div>
</template>

<script>
  const columns = [
    { name: 'id', align: 'center', label: '订单号码', field: 'id' },
    { name: 'order_products', align: 'center', label: '订单产品', field: 'order_products' },
    { name: 'order_name', align: 'center', label: '联系人', field: 'order_name' },
    { name: 'order_phone', align: 'center', label: '联系电话', field: 'order_phone' },
    { name: 'order_address', align: 'center', label: '地址', field: 'order_address' },
    { name: 'order_address_detail', align: 'center', label: '详细地址', field: 'order_address_detail' },
    { name: 'order_remark', align: 'center', label: '用户备注', field: 'order_remark' },
    { name: 'created_at', align: 'center', label: '提交时间', field: 'created_at' },
    { name: 'order_status', align: 'center', label: '状态标记', field: 'order_status' },
    { name: 'handle', align: 'center', label: '操作', field: 'handle' },
  ]
  const data = []
  export default {
    data () {
      return {
        data,
        columns,
        tableLoading: true,
        searchProductName: '',
      }
    },
    methods: {},
    created () {
    }
  }
</script>

<style scoped>

</style>
