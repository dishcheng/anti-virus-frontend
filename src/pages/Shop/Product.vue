<template>
  <div class="q-pa-md">
    <q-table
      :data="data"
      :columns="columns"
      title="产品管理"
      row-key="code"
      :pagination.sync="pagination"
      :rows-per-page-options=[]
      :loading="tableLoading"
      @request="loadData"
    >
      <template v-slot:top>
        <q-btn color="primary" @click="toggleCreateFrom" label="创建"/>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="code" :props="props">
            {{ props.row.code }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name" buttons title="编辑标题"
                          @save="changeName(props.row.code,props.row.name)">
              <q-input v-model="props.row.name" dense autofocus counter/>
            </q-popup-edit>
          </q-td>

          <q-td key="desc" :props="props">
            {{ props.row.desc }}
            <q-popup-edit v-model="props.row.desc" buttons title="编辑描述"
                          @save="changeDesc(props.row.code,props.row.desc)"
            >
              <q-input
                type="textarea"
                v-model="props.row.desc" dense autofocus counter
              />
            </q-popup-edit>
          </q-td>

          <q-td key="single_price" :props="props">
            {{ props.row.single_price }}
            <q-popup-edit v-model="props.row.single_price" buttons title="编辑价格"
                          @save="changeSinglePrice(props.row.code,props.row.single_price)">
              <q-input
                type="number"
                v-model.number="props.row.single_price" dense autofocus counter/>
            </q-popup-edit>
            元
          </q-td>

          <q-td key="is_public" :props="props">
            <q-toggle
              v-model="props.row.is_public"
              color="green"
              left-label
              @input="changePublicStatus(props.row.code,props.row.is_public)"
            />

          </q-td>
          <q-td>
            <q-btn color="red" round @click="deleteAction(props.row.code,props.row.name)" label="删除"/>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
  import CreateProductForm from '../../components/Shop/CreateProductForm'

  const columns = [
    { name: 'code', align: 'center', label: '产品编号', field: 'code' },
    { name: 'name', align: 'center', label: '名称', field: 'name' },
    { name: 'desc', align: 'center', label: '描述', field: 'desc' },
    { name: 'single_price', align: 'center', label: '单价', field: 'single_price' },
    { name: 'is_public', align: 'center', label: '是否展示', field: 'is_public' },
    { name: 'handle', align: 'center', label: '操作', field: 'handle' },
  ]
  const data = []
  export default {
    data () {
      return {
        data,
        columns,
        tableLoading: true,
        pagination: {
          sortBy: 'desc',
          descending: false,
          page: 1,
          rowsPerPage: 15,
          rowsNumber: 0
        },
      }
    },
    methods: {
      loadData (props) {
        console.log(props.pagination)
        const { page, rowsPerPage, sortBy, descending } = props.pagination
        let QueryObject = {
          page:page,
        }
        console.log(QueryObject)

        this.$axios.get('/shop/product', {
          params:QueryObject
        })
          .then((res) => {
            // let res = response.data
            if (res.status_code === 200) {
              this.data = res.data
              this.pagination.page = res.meta.current_page
              this.pagination.rowsPerPage = res.meta.per_page
              this.pagination.rowsNumber = res.meta.total
            }
          })
          .catch((e) => {
          })
        this.tableLoading = false
      },
      deleteAction (code, name) {
        console.log(code, name)
        this.$q.dialog({
          title: '确认删除' + name + '?',
          message: '',
          cancel: true,
          persistent: true
        }).onOk(() => {
          // console.log('>>>> OK')
          this.$axios.delete('/shop/product/' + code)
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
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      },
      toggleCreateFrom () {
        this.$q.dialog({
          component: CreateProductForm,
          parent: this, // 成为该Vue节点的子元素
        }).onOk((data) => {
          //创建产品
          this.$axios.post('/shop/product', data)
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
      changePublicStatus (code, status) {
        //修改产品状态
        this.changeProductRequest(code, { is_public: status })
      },
      changeName (code, name) {
        console.log(name)
        //修改产品名称
        this.changeProductRequest(code, { name: name })
      },
      changeSinglePrice (code, price) {
        //修改产品价格
        console.log(code, price)
        this.changeProductRequest(code, { single_price: price })
      },
      changeDesc (code, desc) {
        console.log(code, desc)
        //修改产品描述
        this.changeProductRequest(code, { desc: desc })
      },
      changeProductRequest (code, object) {
        this.$axios.put('/shop/product/' + code, object)
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
    mounted () {
      this.loadData({
        pagination: this.pagination,
        filter: undefined
      })
    },

    // created () {
    //   this.loadData()
    // }
  }
</script>

<style scoped>

</style>
