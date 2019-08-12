<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans-list">
            <div class="item-list" v-for="item in listFans" :key="item.value">
              <el-avatar :src="item.photo"></el-avatar>
              <p style="font-size:12px">{{item.name}}</p>
              <el-button type="primary" plain size="mini">+关注</el-button>
            </div>
            <el-pagination background layout="prev, pager, next" :total="total"
            :page-size='allDate.per_page'
            :current-page='allDate.page'
            @current-change='changePager'
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="photo">
            <div ref='dom' style="width:600px;height:500px"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'list',
      allDate: {
        page: 1,
        per_page: 24
      },
      listFans: [],
      total: 0
    }
  },
  created () {
    this.getFansList()
  },
  mounted () {
    this.myecharts()
  },
  methods: {
    myecharts () {
      const mydom = this.$refs.dom
      const myChart = echarts.init(mydom)
      const options = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
      myChart.setOption(options)
    },
    changePager (newPage) {
      this.allDate.page = newPage
      this.getFansList()
    },
    async getFansList () {
      const { data: { data } } = await this.$http.get('followers', { params: this.allDate })
      this.listFans = data.results
      this.total = data.total_count
    }

  }
}
</script>

<style lang="less" scoped>
.item-list {
  display: inline-block;
  width: 120px;
  height: 150px;
  border: 1px dashed #ddd;
  margin-right: 20px;
  margin-bottom: 20px;
  padding-top: 15px;
  text-align: center;
}
</style>
