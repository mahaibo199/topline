<template>
  <el-container class="templat">
    <el-aside  :width="isCollapse?'64px':'200px'">
      <div class="logo" :class={loimg:isCollapse}></div>
      <el-menu
        :collapse="isCollapse"
        :collapse-transition=false
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold iconSize" @click="switchover"></span>
        <span style="vertical-align: middle;">江苏传智播客科技教育有限公司</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img
              :src="photo"
              style="width:30px;heigth:30px;vertical-align:middle"
            />
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      isCollapse: false,
      names: '',
      photo: ''
    }
  },
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    switchover () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      this.$router.push('./setting')
    },
    loginout () {
      // name方法
      store.clearUser()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="less" scoped>
.templat {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside {
    background: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ccc;
    line-height: 60px;
    .iconSize {
      font-size: 25px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .el-dropdown {
      float: right;
    }
  }
  .el-menu {
    border-right: none;
  }
  .logo {
    background: url("../../assets/img/logo_admin.png") no-repeat center/140px
      auto;
    height:60px;
     width:100%;
  }
  .loimg{
    background-image: url('../../assets/img/logo_admin_01.png');
    background-size:38px auto;
  }
}
</style>
