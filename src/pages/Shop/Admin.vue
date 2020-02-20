<template>
  <div class="q-pa-md">
    <q-table
      :data="data"
      :columns="columns"
      title="订单列表"
      :rows-per-page-options="[]"
      row-key="id"
      :loading="tableLoading"
    >

      <template v-slot:top>
        <q-space/>
        <q-input dense debounce="300" hint="检索订单编号" color="primary" v-model="searchOrderId">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
        <q-input dense debounce="300" hint="检索用户手机号" color="primary" v-model="searchOrderPhone">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
        <q-btn color="primary" @click="loadOrders" label="查询"/>
        <q-btn color="primary" @click="downloadExcel" label="导出"/>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <!--          <q-td auto-width>-->
          <!--            <q-toggle dense v-model="props.selected"/>-->
          <!--          </q-td>-->


          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>

          <q-td key="order_products" :props="props">
            <div v-for="(item2,index) in props.row.order_products">
              {{item2.name}}---产品单价:{{item2.single_price}}---下单数量：{{item2.num}}
            </div>
          </q-td>

          <q-td key="order_name" :props="props">
            {{ props.row.order_name }}
            <!--            <q-popup-edit v-model="props.row.order_name">-->
            <!--              <q-input v-model.number="props.row.order_name" dense/>-->
            <!--            </q-popup-edit>-->
          </q-td>

          <q-td key="order_phone" :props="props">
            {{ props.row.order_phone }}
            <!--            <q-popup-edit v-model.number="props.row.order_phone">-->
            <!--              <q-input type="number" v-model.number="props.row.order_phone" dense/>-->
            <!--            </q-popup-edit>-->
          </q-td>

          <q-td key="order_address" :props="props">
            {{ props.row.order_address }}
            <!--            <q-popup-edit v-model="props.row.order_address">-->
            <!--              <q-input v-model="props.row.order_address" dense/>-->
            <!--            </q-popup-edit>-->
          </q-td>

          <q-td key="order_address_detail" :props="props">
            {{ props.row.order_address_detail }}
            <!--            <q-popup-edit v-model="props.row.order_address_detail">-->
            <!--              <q-input v-model="props.row.order_address_detail" dense/>-->
            <!--            </q-popup-edit>-->
          </q-td>

          <q-td key="order_remark" :props="props">
            {{ props.row.order_remark }}
            <!--            <q-popup-edit v-model="props.row.order_remark">-->
            <!--              <q-input v-model="props.row.order_remark" dense/>-->
            <!--            </q-popup-edit>-->
          </q-td>

          <q-td key="created_at" :props="props">
            {{ props.row.created_at }}
          </q-td>

          <q-td key="order_total" :props="props">
            {{ props.row.order_total }}
            <!--            <q-popup-edit v-model="props.row.order_total">-->
            <!--              <q-input v-model="props.row.order_total" dense autofocus/>-->
            <!--            </q-popup-edit>-->
          </q-td>


          <q-td>
            <q-option-group
              :options="orderStatusOptions"
              type="radio"
              v-model="props.row.status"
              @input="updateOrderStatus(props.row.status,props.row.id)"
            />
          </q-td>

          <q-td>
            <q-btn color="red" round @click="deleteAction(props.row.id)" label="删除"/>
          </q-td>
        </q-tr>
      </template>
    </q-table>
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
  const data = [
    // {
    //   id: 'id',
    //   order_name: '姓名',
    //   order_phone: '电话',
    //   order_address: '地址',
    //   order_address_detail: '详细地址',
    //   order_total: '1999.00',
    //   created_at: '订单提交时间',
    //   order_remark: '备注',
    //   order_products: [
    //     {
    //       'code': 'sss',
    //       'name': 'A陶产',
    //       'num': '1',
    //     },
    //     {
    //       'code': 'sss',
    //       'name': 'sssss',
    //       'num': '111',
    //     },
    //   ]
    // },
  ]

  export default {
    data () {
      return {
        data,
        columns,
        tableLoading: true,
        selected: [],
        searchOrderId: '',
        searchOrderPhone: '',
        orderStatusOptions: [
          {
            'label': '待支付',
            'value': 'unpay',
          },
          {
            'label': '已支付',
            'value': 'paid',
          },
          {
            'label': '已发货',
            'value': 'send',
          },
          {
            'label': '已退款',
            'value': 'refunded',
          },
        ]
      }
    },
    methods: {
      loadOrders () {
        this.tableLoading = false
        let orderQuery = {}
        if (this.searchOrderId !== '') {
          orderQuery.order_id = this.searchOrderId
          // orderQuery.append({ 'order_id': this.searchOrderId })
        }
        if (this.searchOrderPhone !== '') {
          orderQuery.order_phone = this.searchOrderPhone
          // orderQuery.append({ 'order_phone': this.searchOrderPhone })
        }
        this.$axios.get('/shop/order', {
          params: orderQuery
        })
          .then((res) => {
            // let res = response.data
            if (res.status_code === 200) {
              this.data = res.data
            } else {
              this.$q.notify({
                color: 'negative',
                position: 'top',
                message: res.message,
                icon: 'report_problem'
              })
            }
          })
          .catch((e) => {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: e.message,
              icon: 'report_problem'
            })
          })
        this.tableLoading = false
      },

      downloadExcel () {
        let orderQuery = {}
        if (this.searchOrderId !== '') {
          orderQuery.order_id = this.searchOrderId
          // orderQuery.append({ 'order_id': this.searchOrderId })
        }
        if (this.searchOrderPhone !== '') {
          orderQuery.order_phone = this.searchOrderPhone
          // orderQuery.append({ 'order_phone': this.searchOrderPhone })
        }
        this.$axios.get('/shop/order/downloadExcel', {
          params: orderQuery
        })
          .then((res) => {
            // let res = response.data
            if (res.status_code === 200) {
              console.log(res)
              window.open(res.data.path)
            }
          })
          .catch((e) => {
            // this.$q.notify({
            //   color: 'negative',
            //   position: 'top',
            //   message: e.message,
            //   icon: 'report_problem'
            // })
          })
      },
      deleteAction (orderId) {
        console.log(orderId)
        this.$q.dialog({
          title: '确认删除' + orderId + '?',
          message: '',
          cancel: true,
          persistent: true
        }).onOk(() => {
          // console.log('>>>> OK')
          console.log(orderId)
          this.$axios.delete('/shop/order/' + orderId)
            .then((res) => {
              // let res = response.data
              if (res.status_code === 200) {
                this.$q.notify({
                  color: 'primary',
                  position: 'top',
                  message: '删除成功',
                })
              }
            })
            .catch((e) => {
            })

        }).onOk(() => {
          // console.log('>>>> second OK catcher')
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      },
      updateOrderStatus (value, order_id) {
        console.log(value, order_id)
        this.$axios.put('/shop/order/' + order_id, {
          'status': value
        })
          .then((res) => {
            // let res = response.data
            if (res.status_code === 200) {
              this.$q.notify({
                color: 'primary',
                position: 'top',
                message: '修改订单状态成功',
              })
            } else {
            }
          })
          .catch((e) => {
          })

      }
    },
    created () {
      this.loadOrders();
    }
  }
</script>

<style scoped>

</style>
