
import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/login/index.vue'
import Home from '@/views/home/login.vue'
import Welcome from '@/views/welcome/welcome.vue'
import Undefined from '@/views/404/404.vue'
import Article from '@/views/article/index.vue'
// 首先引入之前封装的获取登录信息的方法
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: index

    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'welcome',
          component: Welcome

        },
        {
          path: '/article',
          name: 'article',
          component: Article
        }
      ]

    },
    {
      path: '*',
      name: '404',
      component: Undefined

    }
  ]
})
// 运用了VueRouter的方法,导航守卫to 是从那个路由来的,from是去哪个路由,next(),必须调用时下一个
router.beforeEach((to, from, next) => {
  // 判断是不是登录的路由,因为to是从哪里来的,所以点path ,若果是就next()
  // if (to.path === '/login') return next()
  // // 判断是否获取到登录的信息(是否登录),token是里面的信息,若登录就跳转,取反就会回到原来的页面
  // if (!Store.getUser().token) return next('/login')
  // // 最后跳转成功
  // next()

  // 上面的简化
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
