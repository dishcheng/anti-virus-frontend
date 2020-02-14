<template>
  <div>
    <q-carousel
      v-model="show"
      animated
      navigation
      infinite
      :autoplay="true"
      transition-prev="slide-right"
      transition-next="slide-left"
      height="200px"
    >
      <q-carousel-slide
                        v-for="(item,index) in bannerList" :key="index" :name="index"
                        :img-src="'http://lby-img-dev.tinali.cn/'+item.img_uri"/>
    </q-carousel>
    <p v-for="(item,index) in bannerList">{{item}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Banner',
    props: [
      'bannerList'
    ],
    data () {
      return {
        show: 1,
      }
    },
    watch: {
      bannerList (newVal) {
        console.log(newVal)
      }
    }
  }
</script>

<style scoped>

</style>
