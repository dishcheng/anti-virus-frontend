<template>
  <q-page>
    <q-select v-model="activeShop"
              :options="shopList"
              option-value="shop_code"
              option-label="shop_name"
              map-options
              label="请选择供应商"/>
    <q-list style="margin-top: 20px" bordered separator>
      <q-item v-for="(item,index) in productList" :key="index">
        <q-item-section>
          <q-item-label>{{item.name}}</q-item-label>
          <!--          <q-item-label caption>-->
          <!--            {{item.desc}}-->
          <!--          </q-item-label>-->
          <q-item-label caption>
            <q-btn @click="alertProductInfo(item)" color="white" text-color="blue" label="查看信息"/>
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
                 rounded outlined
                 ref="order_name"

                 :rules="[val => !!val || '联系人姓名必填']"
                 label="联系人姓名"/>
        <q-input v-model="order_phone"
                 rounded outlined
                 ref="order_phone"
                 :rules="[val => !!val || '联系人手机号必填']"
                 label="联系人手机号"/>

        <q-select
          ref="order_address"
          option-value="address"
          option-label="address"
          map-options
          emit-value
          :rules="[val => !!val || '收货地址必填']"
          v-model="order_address" :options="address_options" label="收货地址"
        />

        <q-input v-model="order_address_detail"
                 rounded outlined
                 hint="如为小区请填写楼栋及门牌号；如为村组请填写门牌号"
                 label="位置补充(非必填)"/>

        <q-input v-model="order_remark"
                 rounded outlined
                 label="备注(非必填)"/>
        <div style="margin-top: 20px">
          <q-btn :label="'提交订单('+this.order_total+'元)'" class="full-width" type="submit" color="primary"/>
        </div>
        <div style="margin-top: 20px">
          <q-btn label="供应商入驻" class="full-width" type="button" @click="shopJoinIn" color="primary"/>
        </div>
      </form>
    </q-list>
  </q-page>
</template>
<script>
  import ProductItemAlert from '../components/Index/ProductItemAlert'

  export default {
    name: 'PageIndex',
    components: {},
    data () {
      return {
        text: 1,
        dense: false,
        shopList: [],
        activeShop: '',
        order_name: null,
        order_phone: null,
        order_address: null,
        order_address_detail: null,
        order_remark: null,
        order_total: 0,
        address_options: [],
        productList: [
          // {
          //   'code': 'P0001',
          //   'name': 'A套餐',
          //   'single_price': 20,
          //   'desc': '套餐A 20元/份,生姜,大蒜,小葱',
          //   'num': 0,
          // },
          // {
          //   'code': 'P0002',
          //   'name': 'B套餐',
          //   'single_price': 25,
          //   'desc': '套餐B 25元/份\n' +
          //     '莴笋两根,' +
          //     '胡萝卜两根,' +
          //     '白萝卜一根,' +
          //     '红菜苔一把,' +
          //     '西蓝花一个,' +
          //     '蒜苗一把',
          //   'num': 0,
          // },
          // {
          //   'code': 'P0003',
          //   'name': 'C套餐',
          //   'single_price': 30,
          //   'desc': '莴笋两根\n' +
          //     '菜苔一把（白或红）\n' +
          //     '白萝卜一根\n' +
          //     '蒜苗一把\n' +
          //     '胡萝卜二根\n' +
          //     '白花菜一个\n' +
          //     '西红柿三个',
          //   'num': 0,
          //
          // },
          // {
          //   'code': 'P0004',
          //   'name': 'D套餐',
          //   'single_price': 40,
          //   'desc': '白菜苔 一把  \n' +
          //     '红菜苔一把  \n' +
          //     '包菜两个  \n' +
          //     ' 莴笋两根\n' +
          //     '蒜苗 一把\n' +
          //     '白萝卜 两个\n' +
          //     '白花菜一个\n' +
          //     '西蓝花一个',
          //   'num': 0,
          // },
          // {
          //   'code': 'P0005',
          //   'name': 'E套餐',
          //   'single_price': 50,
          //   'desc': '套餐E 50元/份\n' +
          //     '莴笋两根\n' +
          //     '大白菜一个\n' +
          //     '蒜苗一把\n' +
          //     '西蓝花两个 \n' +
          //     '白菜苔两把\n' +
          //     '土豆 两斤\n' +
          //     '白花菜 两个 \n' +
          //     '白萝卜 两个',
          //   'num': 0,
          // },
          // {
          //   'code': 'P0005',
          //   'name': 'F套餐',
          //   'single_price': 55,
          //   'desc': '套餐F 55元/份\n' +
          //     '莴笋 四根  \n' +
          //     '青椒一斤\n' +
          //     '洋葱 两个 \n' +
          //     '土豆 两斤\n' +
          //     '蒜苗一把\n' +
          //     '红菜苔两把\n' +
          //     '大白菜一颗\n' +
          //     '白萝卜两个  \n' +
          //     '芹菜 一斤',
          //   'num': 0,
          // },
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
          return
        }
        this.$q.dialog({
          title: '供应商提示',
          message: this.activeShop.shop_message,
          cancel: '取消',
          ok: '确认下单',
          persistent: true,
        }).onOk(() => {
          // console.log('OK')

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
            .then((res) => {
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
              }
            })
            .catch((e) => {
            })

        }).onCancel(() => {
          // console.log('Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      },
      loadShopsList () {
        this.$axios.get('/user/shops')
          .then((res) => {
            if (res.status_code === 200) {
              this.shopList = res.data
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
      },
      alertProductInfo (productItem) {
        this.$q.dialog({
          component: ProductItemAlert,
          // 如果要访问自定义组件中的
          // 路由管理器、Vuex存储等,
          // 则为可选：
          parent: this, // 成为该Vue节点的子元素
                        // （“this”指向您的Vue组件）
                        // （此属性在<1.1.0中称为“root”
                        //  仍然可以使用，但建议切换到
                        //  更合适的“parent”名称）

          // 传递给组件的属性
          // （上述“component”和“parent”属性除外）：
          productItem: productItem
          // ...更多属性...
        }).onOk(() => {
          console.log('OK')
        }).onCancel(() => {
          console.log('Cancel')
        }).onDismiss(() => {
          console.log('Called on OK or Cancel')
        })
      },
      loadProductsAndAddressList () {
        this.$axios.get('/user/products', {
          params: { 'shop_code': this.activeShop.shop_code }
        })
          .then((res) => {
            // let res = response.data
            if (res.status_code === 200) {
              let tempProductData = []
              res.data.products.forEach((item) => {
                //遍历prodAllPrice这个字段，并累加
                item.num = 0
                tempProductData.push(item)
              })
              this.productList = tempProductData
              this.address_options = res.data.address
              this.order_address = null
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
      },

      shopJoinIn () {
        this.$router.push({
          name: 'shopJoinIn'
        })
      },
    },
    computed: {},
    mounted () {
      this.loadShopsList()
    },
    watch: {
      activeShop (newVal, oldVal) {
        if (newVal !== '') {
          this.loadProductsAndAddressList()
        }
      }
    }
  }
</script>

<style scoped>
  .productList {
    padding: 5px 10px;
    /*padding-left: 10px;*/
  }
</style>
