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
            <q-popup-edit v-model="props.row.address" buttons title="编辑地址"
                          @save="changeAddress(props.row.id,props.row.address)">
              <q-input v-model="props.row.address" dense autofocus counter/>
            </q-popup-edit>
          </q-td>

          <q-td key="is_public" :props="props">
            <q-toggle
              v-model="props.row.is_public"
              color="green"
              left-label
              @input="changePublicStatus(props.row.id,props.row.is_public)"
            />
          </q-td>


          <q-td>
            <q-btn color="red" round @click="deleteAction(props.row.id,props.row.address)" label="删除"/>
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
    { name: 'is_public', align: 'center', label: '是否开启', field: 'is_public' },
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
        this.tableLoading = true
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
      deleteAction (id, name) {
        this.$q.dialog({
          title: '确认删除' + name + '?',
          message: '',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$axios.delete('/shop/address/' + id)
            .then((res) => {
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
      changePublicStatus (id, status) {
        this.changeAddressRequest(id, { is_public: status })
      },
      changeAddress (id, address) {
        this.changeAddressRequest(id, { address: address })
      },
      changeAddressRequest (id, object) {
        this.$axios.put('/shop/address/' + id, object)
          .then((res) => {
            if (res.status_code === 200) {
              this.$q.notify({
                color: 'primary',
                position: 'top',
                message: '修改成功',
              })
            }
          })
          .catch((e) => {
          })
      }

    },
    created () {
      this.loadData()
    }
  }
</script>

<style scoped>

</style>
