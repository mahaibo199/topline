<template>
    <div>Article</div>
</template>

<script>
export default {
  created () {
    this.$http.get('articles').then(result => console.log(result.data))
  }
}
</script>
<style lang="less" scoped>

</style>
