<template>
  <div class="q-pa-md">
    <q-table
      :data="data"
      :columns="columns"
      title="订单列表"
      :rows-per-page-options="[]"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>

          <q-td key="order_products" :props="props">
            <div v-for="(item2,index) in props.row.order_products">
              {{item2.name}}---数量：{{item2.num}}
            </div>
          </q-td>

          <q-td key="order_name" :props="props">
            {{ props.row.order_name }}
            <q-popup-edit v-model="props.row.order_name">
              <q-input v-model.number="props.row.order_name" dense/>
            </q-popup-edit>
          </q-td>

          <q-td key="order_phone" :props="props">
            {{ props.row.order_phone }}
            <q-popup-edit v-model.number="props.row.order_phone">
              <q-input type="number" v-model.number="props.row.order_phone" dense/>
            </q-popup-edit>
          </q-td>

          <q-td key="order_address" :props="props">
            {{ props.row.order_address }}
            <q-popup-edit v-model="props.row.order_address">
              <q-input v-model="props.row.order_address" dense/>
            </q-popup-edit>
          </q-td>

          <q-td key="order_address_detail" :props="props">
            {{ props.row.order_address_detail }}
            <q-popup-edit v-model="props.row.order_address_detail">
              <q-input v-model="props.row.order_address_detail" dense/>
            </q-popup-edit>
          </q-td>

          <q-td key="order_remark" :props="props">
            {{ props.row.order_remark }}
            <q-popup-edit v-model="props.row.order_remark">
              <q-input v-model="props.row.order_remark" dense/>
            </q-popup-edit>
          </q-td>

          <q-td key="created_at" :props="props">
            {{ props.row.created_at }}
          </q-td>

          <q-td key="order_total" :props="props">
            {{ props.row.order_total }}
            <q-popup-edit v-model="props.row.order_total">
              <q-input v-model="props.row.order_total" dense autofocus/>
            </q-popup-edit>
          </q-td>

          <q-td key="mmm" :props="props">
            <q-btn color="primary" icon="mail" label="On Left" />
          </q-td>

        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
  const columns = [
    { name: 'id', align: 'left', label: '订单号码', field: 'id' },
    { name: 'order_products', align: 'center', label: '订单产品', field: 'order_products' },
    { name: 'order_name', align: 'center', label: '联系人', field: 'order_name' },
    { name: 'order_phone', label: '联系电话', field: 'order_phone' },
    { name: 'order_address', label: '地址', field: 'order_address' },
    { name: 'order_address_detail', label: '详细地址', field: 'order_address_detail' },
    { name: 'order_remark', label: '用户备注', field: 'order_remark' },
    { name: 'created_at', label: '提交时间', field: 'created_at' },
    { name: 'handle', label: '操作', field: 'handle' },
  ]
  const data = [
    {
      id: 'id',
      order_name: '姓名',
      order_phone: '电话',
      order_address: '地址',
      order_address_detail: '详细地址',
      order_total: '1999.00',
      created_at: '订单提交时间',
      order_remark: '备注',
      order_products: [
        {
          'code': 'sss',
          'name': 'A陶产',
          'num': '1',
        },
        {
          'code': 'sss',
          'name': 'sssss',
          'num': '111',
        },

      ]
    },
  ]

  export default {
    data () {
      return {
        data,
        columns
      }
    },
    methods: {},
    created () {

    }
  }
</script>

<style scoped>

</style>
