<template>
  <div id="app">
    <div class="index">
      <IndexHeader :seller="seller"></IndexHeader>
      <div class="tab">
        <div class="tab-item">
          <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
      </div>
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script>
import IndexHeader from './components/header/indexHeader.vue'
export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('/api/seller').then((response) =>{
      response = response.body;
      if (response.errno === 0) {
        this.seller = response.data;
      }
    })
  },
  components: {
    IndexHeader
  }
}
</script>

<style>
  @import "common/css/icon.css";
  @import "common/css/base.css";
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .tab .tab-item{
    flex: 1;
    text-align: center;
  }
  .tab .tab-item a{
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }
  .tab .tab-item a.active{
    color: rgb(240, 20, 20);
  }
</style>
