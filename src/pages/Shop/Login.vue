<template>
  <div class="login q-pa-md ">
    <form @submit.prevent.stop="submitForm" class="q-gutter-md content-end">
      <div class="q-gutter-md">
        <q-input
          ref="account"
          :rules="[val => !!val || '账号必填']"
          v-model="account" label="账号"/>
        <q-input
          ref="password"
          :rules="[val => !!val || '密码必填']"
          v-model="password" label="密码"/>
        <div style="margin-top: 20px">
          <q-btn label="登录" class="full-width" type="submit" color="primary"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        account: '',
        password: ''
      }
    },
    methods: {
      //提交登录
      submitForm () {
        this.$refs.account.validate()
        this.$refs.password.validate()
        if (
          this.$refs.account.hasError
          ||
          this.$refs.password.hasError
        ) {
          return
        }



      },
    },
  }
</script>

<style lang='css' scoped>
</style>
