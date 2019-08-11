<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="allData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <!-- 使用下拉的组件 -->
          <my-channel v-model='allData.channel_id'></my-channel>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="changeDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="heardr">根据筛选条件共查询到{{total}}条结果</div>
      <el-table :data="articles">
        <el-table-column label="封面" prop="img">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px">
              <div slot="error" class="image-slot">
                <img src="../../assets/img/error.gif" style="width:120px;height:80px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle plain @click="edit(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.id)" circle plain ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件
      -->
      <!-- :page-size是最下面显示多少页, -->
      <div style="text-align:center;margin-top:30px;">
        <el-pagination
          background
          layout="prev,pager,next"
          :total="total"
          :page-size="allData.per_page"
          @current-change="changeCurrent"
          :current-page="allData.page"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import func from '../../../vue-temp/vue-editor-bridge'
// import { log } from 'util'
export default {
  data () {
    return {
      allData: {
        status: null,
        channel_id: null,
        // 开始时间,结束时间,默认第一页,一页多少条数据
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      dataArr: [],
      dropdowData: [],
      articles: [],
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    // 删除功能,有有数字最大安全值问题封装下载json-bigint
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        this.$message.success('删除成功')
        this.getArticles()
      }).catch(() => {
      })
    },
    // 日期选择后事件
    changeDate (dateArr) {
      if (dateArr) {
        this.allData.begin_pubdate = dateArr[0]
        this.allData.end_pubdate = dateArr[1]
      } else {
        this.allData.begin_pubdate = null
        this.allData.end_pubdate = null
      }
    },
    search () {
      this.allData.page = 1
      this.getArticles()
    },
    // 改变分页,点击切换页码
    changeCurrent (newPage) {
      this.allData.page = newPage
      this.getArticles()
    },

    async getArticles () {
      // 数据渲染
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.allData })
      this.articles = data.results
      // 数据库里提供的total_count,查询到多少结果
      this.total = data.total_count
    }
  },
  watch: {
    'allData.channel_id': function (newVal, oldVal) {
      if (newVal === 0) {
        this.allData.channel_id = null
      }
    }
  }

  // created () {
  //   this.$http.get('articles').then(result => console.log(result.data))
  // }
}
</script>
<style lang="less" scoped>
</style>
