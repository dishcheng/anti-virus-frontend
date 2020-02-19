<template>
  <q-page>
    <q-list>
      <q-item v-for="(item,index) in productList" :key="index">
        <q-item-section>
          <q-item-label>{{item.name}}</q-item-label>
          <q-item-label caption lines="10">
            {{item.desc}}
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <div style="width: 160px">
            <q-field :value="item.num" bottom-slots stack-label :dense="dense">
              <template v-slot:before>
                <q-avatar>
                  <q-btn round dense flat icon="remove" @click="remove(index)"/>
                </q-avatar>
              </template>
              <template v-slot:control>
                <div class="self-center" tabindex="0">{{item.num}}</div>
              </template>
              <template v-slot:hint>
                <span v-show="item.num>0" style="color: blue">小记：{{item.num* item.single_price}}元</span>
              </template>

              <template v-slot:after>
                <q-btn round dense flat icon="add" @click="add(index)"/>
              </template>
            </q-field>
          </div>
        </q-item-section>
      </q-item>


      <form @submit.prevent.stop="submitOrder" class="q-gutter-md">
        <q-input v-model="order_name"
                 filled
                 ref="order_name"

                 :rules="[val => !!val || '联系人姓名必填']"
                 label="联系人姓名"/>
        <q-input v-model="order_phone"
                 filled
                 ref="order_phone"
                 :rules="[val => !!val || '联系人手机号必填']"
                 label="联系人手机号"/>

        <q-select
          ref="order_address"
          :rules="[val => !!val || '收货地址必填']"
          v-model="order_address" :options="address_options" label="收货地址"/>

        <q-input v-model="order_address_detail"
                 filled
                 hint="如为小区请填写楼栋及门牌号；如为村组请填写门牌号"
                 label="位置补充(非必填)"/>

        <q-input v-model="order_remark"
                 filled
                 label="备注(非必填)"/>
        <p>
          xxxx公司专用，仅配送以下地区：xxx小区，xx村
        </p>
        <div style="margin-top: 20px">
          <q-btn :label="'提交订单('+this.order_total+'元)'" class="full-width" type="submit" color="primary"/>
        </div>
      </form>
    </q-list>
  </q-page>
</template>
<script>
  export default {
    name: 'PageIndex',
    components: {},
    data () {
      return {
        text: 1,
        dense: false,
        order_name: null,
        order_phone: null,
        order_address: null,
        order_address_detail: null,
        order_remark: null,
        order_total: 0,
        address_options: ['荆西小区', '荆西村'],
        productList: [
          {
            'code': 'P0001',
            'name': 'A套餐',
            'single_price': 1,
            'desc': '因项目需要，最近用vue写了个二级联动，刚开始用vue不熟悉，收集了两种方法，这也是我借鉴别人的文章和思路才写出来的，其实没什么区别，可以参考下：\n' +
              '第一种：\n' +
              '这是第一种方法的html部分代码：',
            'num': 0,
          },
          {
            'code': 'P0002',
            'name': 'B套餐',
            'single_price': 2,
            'desc': '因项目需要，最近用vue写了个二级联动，刚开始用vue不熟悉，收集了两种方法，这也是我借鉴别人的文章和思路才写出来的，其实没什么区别，可以参考下：\n' +
              '第一种：\n' +
              '这是第一种方法的html部分代码：',
            'num': 0,
          },
          {
            'code': 'P0003',
            'name': 'C套餐',
            'single_price': 3,
            'desc': '因项目需要，最近用vue写了个二级联动，刚开始用vue不熟悉，收集了两种方法，这也是我借鉴别人的文章和思路才写出来的，其实没什么区别，可以参考下：\n' +
              '第一种：\n' +
              '这是第一种方法的html部分代码：',
            'num': 0,

          },
          {
            'code': 'P0004',
            'name': 'D套餐',
            'single_price': 4,
            'desc': 'xxxxxxxx',
            'num': 0,
          },
          {
            'code': 'P0005',
            'name': 'E套餐',
            'single_price': 5,
            'desc': 'xxxxxxxx',
            'num': 0,
          },
        ],
        submitOrderProduct: []
      }
    },
    methods: {
      add (index) {
        ++this.productList[index].num
        this.computeOrderTotal()
      },
      remove (index) {
        if (this.productList[index].num >= 1) {
          console.log('--')
          --this.productList[index].num
          this.computeOrderTotal()
        }
      },
      computeOrderTotal () {
        let sum = 0
        this.productList.forEach((item) => {
          //遍历prodAllPrice这个字段，并累加
          sum += item.num * item.single_price
        })
        this.order_total = sum
      },
      submitOrder () {
        this.$refs.order_name.validate()
        this.$refs.order_phone.validate()
        this.$refs.order_address.validate()
        if (
          this.$refs.order_name.hasError
          ||
          this.$refs.order_phone.hasError
          ||
          this.$refs.order_address.hasError
        ) {
          return
        }

        if (this.order_total <= 0) {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: '请选择商品',
            icon: 'report_problem'
          })
        }
        let p = []
        this.productList.forEach((item) => {
          //遍历prodAllPrice这个字段，并累加
          if (item.num > 0) {
            p.push(item)
          }
        })

        let order_data = {
          order_name: this.order_name,
          order_phone: this.order_phone,
          order_address: this.order_address,
          order_address_detail: this.order_address_detail,
          order_remark: this.order_remark,
          order_products: p
        }
        this.$axios.post('/user/order', order_data)
          .then((response) => {
            let res = response.data
            if (res.status_code === 200) {
              console.log(res.data)
              this.$router.push({
                name: 'order_detail',
                query: {
                  orderId: res.data.order_id,
                },
                params: {
                  order_total: res.data.order_total,
                }
              })
            } else {
              this.$q.notify({
                color: 'negative',
                position: 'top',
                message: res.message,
                icon: 'report_problem'
              })
              return
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
      }
    },
    computed: {},
    created () {
    }
  }
</script>

<style scoped>
  .productList {
    padding: 5px 10px;
    /*padding-left: 10px;*/
  }
</style>
