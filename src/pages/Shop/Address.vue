<template>
  <div class="q-pa-md">
    <q-table
      :data="data"
      :columns="columns"
      title="地址管理"
      :rows-per-page-options="[]"
      row-key="id"
      :loading="tableLoading"
    >
      <template v-slot:top>
        <q-btn color="primary" @click="toggleCreateFrom" label="创建"/>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="address" :props="props">
            {{ props.row.address }}
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
  import CreateAddressForm from '../../components/Shop/CreateAddressForm'

  const columns = [
    { name: 'id', align: 'center', label: 'id', field: 'id' },
    { name: 'address', align: 'center', label: '配送地址', field: 'address' },
    { name: 'handle', align: 'center', label: '操作', field: 'handle' },
  ]
  const data = []
  export default {
    data () {
      return {
        data,
        columns,
        tableLoading: true,
        showCreateFrom: false,
      }
    },
    methods: {
      loadData () {
        this.$axios.get('/shop/address', {})
          .then((res) => {
            // let res = response.data
            if (res.status_code === 200) {
              this.data = res.data
            }
          })
          .catch((e) => {
          })
        this.tableLoading = false
      },
      deleteAction (id) {

      },
      toggleCreateFrom () {
        this.$q.dialog({
          component: CreateAddressForm,
          parent: this, // 成为该Vue节点的子元素
        }).onOk((data) => {
          //创建地址
          this.$axios.post('/shop/address', data)
            .then((res) => {
              if (res.status_code === 200) {
                this.$q.notify({
                  color: 'primary',
                  position: 'top',
                  message: '创建成功',
                })
              }
            })
            .catch((e) => {
            })
          console.log('OK', data)
        }).onCancel(() => {
          console.log('Cancel')
        }).onDismiss(() => {
          console.log('Called on OK or Cancel')
        })
      },

    },
    created () {
      this.loadData()
    }
  }
</script>

<style scoped>

</style>
