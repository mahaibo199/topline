<template>
  <div class="contion">
    <el-card class="box">
      <img src="../../assets/img/logo_index.png" alt />
      <el-form :model="formLabel" :rules="loginRules" status-icon ref='formLabel'>
        <el-form-item prop="mobile">
          <el-input v-model="formLabel.mobile" class="status-icon" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input class="inpu" v-model="formLabel.code" placeholder="请输入验证码"></el-input>
          <el-button>默认按钮</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click='login()'>主要按钮</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入封装的方法
import store from '@/store'
// import { async } from 'q'
export default {
  data () {
    const checkAge = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机号码格式错误'))
      callback()
    }
    return {
      formLabel: {
        mobile: '',
        code: ''
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度为6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.formLabel.validate(async valid => {
        // if (valid) {
        //   this.$http.post('authorizations', this.formLabel).then(result => {
        //     // 在跳转的时候,调用srore封装的方法,存储用户信息
        //     store.setUser(result.data.data)
        //     this.$router.push({ path: '/' })
        //   })
        // }
        try {
          const { data: { data } } = await this.$http.post('authorizations', this.formLabel)
          store.setUser(data)
          this.$router.push({ path: '/' })
        } catch (e) {
          this.$message.error('手机号或者验证码输入错误')
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.contion {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/img/login_bg.jpg) no-repeat center / cover;
}
.box {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  img {
    display: block;
    width: 200px;
    margin: 0px auto 30px;
  }
  .inpu {
    width: 240px;
    margin-right: 20px;
  }
}
</style>
