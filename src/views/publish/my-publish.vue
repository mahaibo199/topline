<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改文章':'发布文章'}}</my-bread>
      </div>
      <el-form :model="allDate" label-width="100px" :rules="rules" ref="ruleForm">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="allDate.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor v-model="allDate.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="allDate.cover.type" @click="typeImg">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="allDate.cover.type===1">
            <my-image v-model="allDate.cover.images[0]"></my-image>
          </div>
          <div v-if="allDate.cover.type===3">
            <my-image v-model="allDate.cover.images[0]"></my-image>
            <my-image v-model="allDate.cover.images[1]"></my-image>
            <my-image v-model="allDate.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道:" style="margin-top:40px">
          <my-channel v-model="allDate.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'Abc',
  components: {
    quillEditor
  },
  data () {
    return {
      allDate: {
        title: '',
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['image']
          ]
        }
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ]
      },
      articleId: null
    }
  },
  created () {
    this.articleId = this.$route.query.id

    if (this.articleId) {
      this.modifyContent()
    }
  },
  watch: {
    $route () {
      if (!this.$route.query.id) {
        this.articleId = null
        this.allDate = {
          title: '',
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  methods: {
    async modifyContent () {
      const { data: { data } } = await this.$http.get(`articles/${this.articleId}`)
      this.allDate = data
    },
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.allDate)
      this.$message.success(draft ? '存入草稿成功' : '发表文章成功')
    },
    async update (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.allDate)
      this.$message.success(draft ? '修改草稿成功' : '修改文章成功')
      this.$router.push('/article')
    },
    typeImg () {
      this.allDate.img = []
    }
  }
}
</script>

<style lang="less" scoped>

</style>
