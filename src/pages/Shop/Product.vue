<template>
  <div class="q-pa-md">
    <q-table
      :data="data"
      :columns="columns"
      title="产品管理"
      :rows-per-page-options="[]"
      row-key="code"
      :loading="tableLoading"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="code" :props="props">
            {{ props.row.code }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="single_price" :props="props">
            {{ props.row.single_price }}元/1份
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
    { name: 'code', align: 'center', label: 'id', field: 'code' },
    { name: 'name', align: 'center', label: '名称', field: 'name' },
    { name: 'single_price', align: 'center', label: '单价', field: 'single_price' },
    { name: 'handle', align: 'center', label: '操作', field: 'handle' },
  ]
  const data = []
  export default {
    data () {
      return {
        data,
        columns,
        tableLoading: true,
      }
    },
    methods: {
      loadData () {
        this.$axios.get('/shop/product', {})
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

      }
    },
    created () {
      this.loadData()
    }
  }
</script>

<style scoped>

</style>
