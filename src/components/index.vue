<template>
  <div class="index">
    <IndexHeader></IndexHeader>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评论</div>
      <div class="tab-item">商家</div>
    </div>
    <div class="content">
      I am content
    </div>
  </div>
</template>

<script>
import IndexHeader from './header/indexHeader.vue'
export default {
  name: 'Index',
  data () {
    return {

    }
  },
  components: {
    IndexHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .tab .tab-item{
    flex: 1;
    text-align: center;
  }
</style>
