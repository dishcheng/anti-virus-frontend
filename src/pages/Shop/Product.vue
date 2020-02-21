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
        this.$axios.put('/shop/product/' + code, {
          is_public: status
        })
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
      },
      changeName (code, name) {
        console.log(name)
        //修改产品名称
        this.$axios.put('/shop/product/' + code, {
          name: name
        })
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
      },
      changeSinglePrice (code, price) {
        console.log(code, price)
        //修改产品价格
        this.$axios.put('/shop/product/' + code, {
          single_price: price
        })
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
      },
      changeDesc (code, desc) {
        console.log(code, desc)
        //修改产品描述
        this.$axios.put('/shop/product/' + code, {
          desc: desc
        })
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
      },

    },
    created () {
      this.loadData()
    }
  }
</script>

<style scoped>

</style>
