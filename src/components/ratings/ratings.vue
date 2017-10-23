<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="left"></div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style>
  .ratings{
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }
  .overview{
    display: flex;
    padding: 18px 0;
  }
  .overview .left{
    flex: 0 0 137px;
    width: 137px;
    border-right: 1px solid rgba(7, 17, 27, .1);
    text-align: center;
  }
  .overview .right{
    flex: 1;
    padding-left: 24px;
  }
</style>
