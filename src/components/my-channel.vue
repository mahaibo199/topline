<template>
  <el-select :value='value' @change="fn" placeholder="请选择" clearable>
    <el-option v-for="item in dropdowData" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ['value'],
  name: 'my-channel',
  data () {
    return {
      dropdowData: []
    }
  },
  created () {
    this.getdrop()
  },
  methods: {
    async getdrop () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      // channels是api里面定义的,就是一个对象结构的数据下面results一样
      this.dropdowData = data.channels
    },
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
    }
  }
}
</script>

<style>
</style>
