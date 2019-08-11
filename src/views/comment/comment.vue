<template>
    <div>
        <el-card>
            <div slot="header">
                <my-bread>评论管理</my-bread>
            </div>
        <el-table :data="comments" >
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
              <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
              <el-table-column label="状态"></el-table-column>
              <el-table-column label="操作" width=120px></el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000"
            style="margin-top:20px"
            >
        </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      allDate: {
        total_comment_count: 0,
        fans_comment_count: 0
      },
      comments: []
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.allDate })
      this.comments = data.results
    }
  }
}
</script>

<style>

</style>
