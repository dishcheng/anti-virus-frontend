<template>
  <q-dialog ref="dialog" @hide="onDialogHide" >
    <q-card class="q-dialog-plugin" style="padding: 10px">
      <!--
        ...内容
        ...使用q-card-section展现它?
      -->
      <span>
        {{productItem.desc}}
      </span>
      <q-img
        v-show="productItem.img"
        :src="productItem.img"
      ></q-img>
      <!-- 按钮示例 -->
      <q-card-actions align="right">
        <q-btn color="primary" label="确定" @click="onOKClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: 'ProductItemAlert',
    props: [
      'productItem'
    ],
    data () {
      return {}
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
        this.$emit('ok')
        // 或带有有效负载：this.$emit('ok', { ... })

        // 然后隐藏对话框
        this.hide()
      },

      onCancelClick () {
        // 我们只需要隐藏对话框
        this.hide()
      }
    },
    watch: {}
  }
</script>

<style scoped>
  .navigateText {
    color: rgba(51, 51, 51, 1);
    line-height: 17px;
  }
</style>
