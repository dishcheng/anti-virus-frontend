<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="height: 600px;width: 500px;padding: 10px">
      <q-input hint="标题" v-model="name">
        <template v-slot:before>
          <span>标题</span>
        </template>
      </q-input>

      <q-input hint="描述" type="textarea" v-model="desc">
        <template v-slot:before>
          <span>描述</span>
        </template>
      </q-input>

      <q-input hint="单价" v-model.number="single_price"
               type="number">
        <template v-slot:before>
          <span>单价</span>
        </template>
        <template v-slot:append>
          <span>元</span>
        </template>
      </q-input>

      <q-toggle
        v-model="is_public"
        color="green"
        label="是否展示"
        left-label
      />

<!--      <q-uploader-->
<!--        :url="url"-->
<!--        accept=".jpg, image/*"-->
<!--        label="图片上传(非必填)"-->
<!--        color="purple"-->
<!--        no-thumbnails-->
<!--        auto-upload-->
<!--        bordered-->
<!--        :headers="[{name: 'Authorization', value: token}]"-->
<!--        field-name="file"-->
<!--        @uploaded="afterUploadImg"-->
<!--        style="max-width: 250px;margin-left: 60px"-->
<!--      />-->

      <q-card-actions align="right">
        <q-btn color="primary" label="创建" @click="onOKClick"/>
        <q-btn color="primary" label="取消" @click="onCancelClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  import { LocalStorage } from 'quasar'
  import requestInfo from '../../boot/requestHost'

  export default {
    name: 'CreateShopForm',
    data () {
      return {
        name: '',
        desc: '',
        single_price: '',
        is_public: true,
        img: '',
        url: '',
        token: '',
      }
    },
    props: [
      // 'product_name', 'desc', 'single_price', 'is_public'
      // product_name: 'required',
      // desc: 'required',
      // single_price: 'required',
      // is_public: 'required'
    ],
    mounted () {
      this.url = requestInfo.host + 'shop/imgUpload'
      this.token = LocalStorage.getItem('shop_token')
    },
    methods: {
      // 以下方法是必需的
      // (不要改变它的名称 --> "show")
      show () {
        this.$refs.dialog.show()
      },
      // 以下方法是必需的
      // (不要改变它的名称 --> "hide")
      hide () {
        this.$refs.dialog.hide()
      },
      onDialogHide () {
        // QDialog发出“hide”事件时
        // 需要发出
        this.$emit('hide')
      },
      onOKClick () {
        // 按OK，在隐藏QDialog之前
        // 发出“ok”事件（带有可选的有效负载）
        // 是必需的
        if (
          this.name === '' ||
          this.desc === '' ||
          this.single_price === ''
        ) {
          return
        }
        this.$emit('ok', {
          name: this.name,
          desc: this.desc,
          single_price: this.single_price,
          is_public: this.is_public,
          img: this.img,
        })
        // 或带有有效负载：this.$emit('ok', { ... })
        // 然后隐藏对话框
        this.hide()
      },
      onCancelClick () {
        // 我们只需要隐藏对话框
        this.hide()
      },
      // uploadImg (uploadImg) {
      //   return new Promise((resolve, reject) => {
      //     // 从您的存储中检索JWT令牌。
      //     const token = LocalStorage.getItem('shop_token')
      //     resolve({
      //       url: requestInfo.host + 'shop/imgUpload',
      //       method: 'post',
      //       headers: [
      //         { name: 'Authorization', value: token }
      //       ],
      //     })
      //   })
      // },
      afterUploadImg (info) {
        console.log(info)
      }
    }
  }
</script>

<style scoped>

</style>
