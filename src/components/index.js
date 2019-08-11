import MyBread from '@/components/my-bread'
import MyTest from '@/components/my-test'
import mychannel from '@/components/my-channel.vue'
import myimage from '@/components/my-image.vue'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyTest.name, MyTest)
    Vue.component(mychannel.name, mychannel)
    Vue.component(myimage.name, myimage)
  }
}
