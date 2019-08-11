<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div>
        <el-radio-group v-model="allDate.collect" @change="changeCollect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button size="small" type="success" style="float:right" @click="openDialog">添加素材</el-button>
      </div>
      <div class="list_img">
        <div class="item_img" v-for="item in image" :key="item.id">
          <img :src="item.url" alt />
          <div class="color_img" v-show="!allDate.collect">
            <span @click="clickCollect(item)" class="el-icon-star-off" :class="{select:item.is_collected}"></span>
            <span @click="clickRemove(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <div>
        <el-pagination
          v-if="total>allDate.per_page"
          class="pagin"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="allDate.per_page"
          :current-page="allDate.page"
          @current-change="changePage"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="300px" >
      <span>
          <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleAvatar"
        :headers="setHeader"
        name='image'
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import sort from '@/store'
// import { async } from 'q'
export default {
  data () {
    return {
      allDate: {
        collect: false,
        page: 1,
        per_page: 10
      },
      image: [],
      total: [],
      dialogVisible: false,
      //   图片地址
      imageUrl: null,
      setHeader: {
        Authorization: `Bearer ${sort.getUser().token}`
      }
    }
  },
  created () {
    this.getImage()
  },
  methods: {
    // 点击收藏
    async clickCollect (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      item.is_collected = data.collect
    },
    // 点击删除
    async clickRemove (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除成功')
        this.getImage()
      }).catch(() => {
      })
    },
    // 图片上传成功
    handleAvatar (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.allDate.page = 1
        this.getImage()
      }, 2000)
    },
    openDialog () {
    // 上传成功之前图片空
      this.imageUrl = null
      this.dialogVisible = true
    },
    changeCollect () {
      this.dialogVisible = false
    },
    async getImage () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.allDate })
      this.image = data.results
      this.total = data.total_count
    },
    changePage (newPage) {
      this.allDate.page = newPage
      this.getImage()
    }
  }
}
</script>

<style lang="less" scoped>
.list_img {
  margin-top: 20px;
  .item_img {
    position: relative;
    display: inline-block;
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    margin: 10px 20px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .color_img {
      display: inline-block;
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.5);
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        margin: 0 20px;
        color: white;
        &.select {
          color: red;
        }
      }
    }
  }
}
.pagin {
  margin-top: 10px;
}
</style>
