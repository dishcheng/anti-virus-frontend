<template>
  <q-item clickable v-ripple class="item">
    <q-item-section top thumbnail class="q-ml-none">
      <img src="https://cdn.quasar.dev/img/mountains.jpg" class="itemImg">
    </q-item-section>
    <q-item-section top class="relative-position">
      <q-item-label class="title">广州长隆水上乐园平日家庭票（2大+1小）</q-item-label>
      <q-item-label caption>
        <q-badge class="bg-deep-orange-2">
          <span style="color: #FF7A2B">#FF7A2B</span>
        </q-badge>
      </q-item-label>

      <q-item-label caption bottom>
        <div class="absolute-bottom">
          <span class="priceText" style="color: #F85454">¥233.33</span>
        </div>
      </q-item-label>

    </q-item-section>
  </q-item>
</template>

<script>
  export default {
    name: 'ProductListItem',
    props: [
      'item'
    ]
  }
</script>

<style scoped>
  .item {
    /*width: 117px;*/
    height: 117px;
  }

  .title{
    font-size: medium;
  }
  .itemImg {
    width: 117px;
    height: 102px;
    border-radius: 8px;
  }
  .priceText{
    color: #F85454;
    font-size: 10px;
    font-weight: bold;
  }
</style>

