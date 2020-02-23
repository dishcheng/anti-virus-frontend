**Describe the bug**
when I use uploader,not multiple mode, when I uploaded first img success,and I uploaded the second,the the list show all of them.I think it should just show the second img

**Codepen/jsFiddle/Codesandbox (required)**
Fork a Codepen (https://codepen.quasar.dev) or a jsFiddle (https://jsfiddle.quasar.dev) or a Codesandbox (https://codesandbox.quasar.dev) and hit save then copy-paste link here.

App dir........... /Users/caicheng/code/vue/quasar-cli
App URL........... http://localhost:8081
Dev mode.......... spa
Pkg quasar........ v1.8.5
Pkg @quasar/app... v1.5.3


**Expected behavior**
I think it should just show the second img

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Platform (please complete the following information):**
OS:yes
Node:
NPM:yes
Yarn:
Browsers:yes
iOS:
Android:
Electron:

**Additional context**
mycode
```
<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="height: 600px;width: 500px;padding: 10px">
      <q-uploader
        :url="url"
        accept=".jpg, image/*"
        label="图片上传(非必填)"
        color="purple"
        no-thumbnails
        auto-upload
        bordered
        :headers="[{name: 'Authorization', value: token}]"
        field-name="file"
        @uploaded="afterUploadImg"
        style="max-width: 250px;margin-left: 60px"
      />

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
        this.hide()
      },
      onCancelClick () {
        this.hide()
      },
      // uploadImg (uploadImg) {
      //   return new Promise((resolve, reject) => {
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

```

it showed
