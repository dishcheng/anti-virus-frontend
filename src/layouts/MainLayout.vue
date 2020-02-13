<template>
  <div>
    sss
    <p class="text-h1">h1</p>
    <p class="text-h2">h2</p>
    <p class="text-h3">h3</p>
    <p class="text-h4">h4</p>
    <p class="text-h5">h5</p>
    <p class="text-h6">h6</p>
    <p class="text-subtitle1">text-subtitle1</p>
    <p class="text-subtitle2">text-subtitle2</p>
    <p class="text-body1">Body 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
      suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat
      deleniti? Eum quasi quidem quibusdam.</p>
    <p class="text-body2">Body 2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aliquid ad quas
      sunt voluptatum officia dolorum cumque, possimus nihil molestias sapiente necessitatibus dolor saepe inventore,
      soluta id accusantium voluptas beatae.</p>
    <ul>
      <li class="bg-red-1">bg-red-1</li>
      <li class="bg-red-2">bg-red-2</li>
      <li class="bg-red-3">bg-red-3</li>
      <li class="bg-red-4">bg-red-4</li>
      <li class="bg-red-5">bg-red-5</li>
      <li class="bg-red-6">bg-red-6</li>
      ...
      <li class="bg-red-6">bg-red-14</li>
    </ul>

    <ul>
      <li class="text-red-1">text-red-1</li>
      <li class="text-red-2">text-red-2</li>
      <li class="text-red-3">text-red-3</li>
      <li class="text-red-4">text-red-4</li>
      <li class="text-red-5">text-red-5</li>
      <li class="text-red-6">text-red-6</li>
      ...
      <li class="text-red-14">text-red-14</li>
    </ul>

    <div class="shadow-up-24	 shadow_circle"></div>
    <div class="inset-shadow	 shadow_circle"></div>

    <p class="desktop-only">
      元素可见性
    </p>

    <div class="absolute-top">
      <a href="http://www.quasarchs.com/style/positioning">固定顶部</a>
    </div>


    <div class="row">
      <div class="shadow_circle">flex row 布局1</div>
      <div class="shadow_circle">flex row 布局2</div>
      <div class="shadow_circle">flex row 布局3</div>
    </div>

    <div class="column">
      <div class="shadow_circle">flex column 布局1</div>
      <div class="shadow_circle">flex column 布局2</div>
      <div class="shadow_circle">flex column 布局3</div>
    </div>


    <!--http://www.quasarchs.com/layout/grid/introduction-to-flexbox-->
    <div class="row div_out justify-center">
      <div class="div_in">布局对齐item1</div>
      <div class="div_in">布局对齐item2</div>
      <div class="div_in">布局对齐item3</div>
    </div>


    <!--布局控制水平分12份-->
    <div class="row">
      <div class="col-8">two thirds</div>
      <div class="col-2">one sixth</div>
      <div class="col-auto">auto size based on content and available space</div>
      <div class="col">fills remaining available space</div>
    </div>
    <div class="row">
      <div class="col">1</div>
      <div class="col">1</div>
      <div class="col">1</div>
      <!--
         我们有3个子列，所以以上示例相当于
         对每个子列使用`col-4`
      -->
    </div>
    <!--    布局排序-->
    <div class="row">
      <div style="order: 2">Second column</div>
      <div class="order-last">Third column</div>
      <div class="order-first">First column</div>
    </div>


    <!--    按钮http://www.quasarchs.com/vue-components/button-->
    <div class="q-pa-md q-gutter-sm">
      <q-btn color="white" label="Trigger" text-color="black" @click="loadData()"/>
      <q-btn color="primary" label="Primary"/>
      <q-btn color="secondary" label="Secondary"/>
      <q-btn color="amber" glossy label="Amber"/>
      <q-btn color="brown-5" label="Brown 5"/>
      <q-btn color="deep-orange" glossy label="Deep Orange"/>
      <q-btn color="purple" label="Purple"/>
      <q-btn color="black" label="Black"/>
    </div>


    <!--    头像http://www.quasarchs.com/vue-components/avatar-->
    <div class="q-pa-md q-gutter-sm">
      <q-avatar color="red" text-color="white" icon="directions"/>
      <q-avatar color="primary" text-color="white">J</q-avatar>
      <q-avatar size="100px" font-size="52px" color="teal" text-color="white" icon="directions"/>
      <q-avatar size="24px" color="orange">J</q-avatar>
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/avatar.png">
      </q-avatar>
    </div>


    <!--    幻灯片http://www.quasarchs.com/vue-components/carousel-->
    <div class="q-gutter-md">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="300px"
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="style" size="56px"/>
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px"/>
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" size="56px"/>
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" size="56px"/>
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>


    <!--   内部加载http://www.quasarchs.com/vue-components/inner-loading#Introduction-->
    <div class="q-pa-md q-gutter-md">
      <q-btn color="primary" @click="showTextLoading">
        内部加载
      </q-btn>

      <q-card class="bg-grey-3 relative-position card-example">
        <q-card-section class="q-pb-none">
          <div class="text-h6">标题</div>
        </q-card-section>

        <q-card-section>
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <div v-show="showSimulatedReturnData">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel magna eu risus laoreet tristique.
              Nulla ut fermentum elit, nec consequat augue. Morbi et dolor nec metus tincidunt pellentesque. Nullam non
              semper ante. Fusce pellentesque sagittis felis quis porta. Aenean condimentum neque sed erat suscipit
              malesuada. Nulla eget rhoncus enim. Duis dictum interdum eros.
            </div>
          </transition>
        </q-card-section>
        <!--        加载loading-->
        <q-inner-loading :showing="visible">
          <q-spinner-gears size="50px" color="primary"/>
        </q-inner-loading>
      </q-card>
    </div>
  </div>
</template>

<script>
  import EssentialLink from 'components/EssentialLink'

  export default {
    name: 'MainLayout',
    data () {
      return {
        slide: 'style',
        lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.',
        visible: false,
        showSimulatedReturnData: false
      }
    },
    components: {
      EssentialLink
    },
    methods: {
      loadData () {
        console.log(this.$axios)
        let that = this
        this.$axios.get('/customer/module/index/banner')
          .then((response) => {
            this.data = response.data
          })
          .catch(() => {
            that.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
          })
      },
      showTextLoading () {
        this.visible = true
        this.showSimulatedReturnData = false
        setTimeout(() => {
          this.visible = false
          this.showSimulatedReturnData = true
        }, 3000)
      }
    },
    created () {
      // this.loadData()
    }
  }
</script>
<style scoped>
  .shadow_circle {
    margin-left: 10px;
    width: 100px;
    height: 100px;
    border: red 1px solid;
    border-radius: 50px;
  }

  .div_out {
    width: 400px;
    height: 100px;
    border: red 1px solid;
  }

  .div_in {
    width: 70px;
    height: 50px;
    border: red 1px solid;
  }


</style>
