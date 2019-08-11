<template>
  <div class="imgbox">
    <div >
      <img :src='value||defaultImg' @click="myImage()" alt />
    </div>
    <el-dialog title="封面内容" :visible.sync="dialogVisible" width="700px">
      <el-tabs v-model="allDate.activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="素材库" name="first">
          <el-radio-group v-model="allDate.collect" size="small" @change="shouCang">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img-list">
            <div
              class="img-item"
              :class="{selected:selectedImg===item.url}"
              @click="selectedImgs(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            v-if="allDate.per_page<total"
            :current-page="allDate.page"
            :page-size="allDate.per_page"
            @current-change="changePage"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :headers="upHeader"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button >取 消</el-button>
        <el-button type="primary"  @click="uploadImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImg from '../assets/img/pic_bg.png'
import store from '@/store/index.js'
export default {
  props: ['value'],
  name: 'my-image',
  data () {
    return {
      allDate: {
        collect: false,
        activeName: 'first',
        page: 1,
        per_page: 8
      },
      dialogVisible: false,
      images: [],
      total: 0,
      selectedImg: null,
      upHeader: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      imageUrl: null,
      defaultImg
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    uploadImg () {
      if (this.allDate.activeName === 'first') {
        this.$emit('input', this.selectedImg)
      } else {
        this.$emit('input', this.imageUrl)
      }
      this.dialogVisible = false
    },
    handleAvatarSuccess (res) {
      console.log(res)
      this.imageUrl = res.data.url
    },
    selectedImgs (url) {
      this.selectedImg = url
    },
    changePage (newPage) {
      this.allDate.page = newPage
      this.getImages()
    },
    shouCang () {
      this.allDate.page = 1
      this.getImages()
    },
    // 点击图片显示框
    myImage () {
      this.dialogVisible = true
      this.selectedImg = null
      this.imageUrl = null
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.allDate })
      this.images = data.results
      this.total = data.total_count
    },
    handleClick () {}
  }
}
</script>

<style lang="less" scoped>
.imgbox{
    margin-top:20px;
    display: inline-block;
    margin-left:20px;
    overflow: hidden;
}
.img-list {
  margin-top: 10px;
}
.img-item {
  width: 140px;
  height: 100px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 10px;
  position: relative;
  &.selected {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.1) url(../assets/img/selected.png) no-repeat
        center/ 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
.dialog-footer {
  display: block;
  width: 100%;
  text-align: center;
}
.imgbox {
  width: 160px;
  height: 160px;
  border: 1px dashed #ccc;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
