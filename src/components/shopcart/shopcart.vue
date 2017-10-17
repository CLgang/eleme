<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount > 0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount > 0}"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice > 0}">￥{{ totalPrice }}</div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{ payDesc }}</div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls" v-show="ball.show" class="ball">
        <div class="inner"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selectFoods:{
      type: Array,
      default() {
        return [
          {
            price: 0,
            count: 0
          }
        ]
      }
    },
    deliveryPrice:{
      type: Number,
      default: 0
    },
    minPrice:{
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ]
    }
  },
  created() {
    this.$store.eventHub.$on('eventHubElement', function(val){
      console.log(val)
    })
  },
  computed:{
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0){
        return `￥${this.minPrice}元起送`;
      } else if(this.totalPrice < this.minPrice){
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return '去结算';
      }
    },
    payClass() {
      if(this.totalPrice < this.minPrice){
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  methods: {
//    addCart(el) {
//      console.log(el)
//    }
  }
}
</script>
<style>
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
  }
  .shopcart .content{
    display: flex;
    background: #141d27;
  }
  .content .content-left{
    flex: 1;
  }
  .content .content-left .logo-wrapper{
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #141d27;
  }
  .logo-wrapper .logo{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    background: #2b343c;
  }
  .logo-wrapper .logo.highlight{
    background: rgb(0, 160, 200)
  }
  .logo-wrapper .logo .icon-shopping_cart{
    line-height: 44px;
    font-size: 24px;
    color: #80858a;
  }
  .logo-wrapper .logo .icon-shopping_cart.highlight{
    color: rgb(255, 255, 255);
  }
  .logo-wrapper .num{
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    -webkit-border-radius: 16px;
    -moz-border-radius: 16px;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background: rgb(240, 20, 20);
    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
    -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
  }
  .content .content-left .price{
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    line-height: 24px;
    padding-right: 12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-right: 1px solid rgba(255, 255, 255, .1);
    font-size: 16px;
    font-weight: 700;
    color: rgba(255, 255, 255, .4);
  }
  .content .content-left .price.highlight{
    color: #fff;
  }
  .content .content-left .desc{
    display: inline-block;
    vertical-align: top;
    margin: 12px 0 0 12px;
    line-height: 24px;
    color: rgba(255, 255, 255, .4);
    font-size: 10px;
  }
  .content .content-right{
    flex: 0 0 105px;
    width: 105px;
  }
  .content .content-right .pay{
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255, 255, 255, .4);
  }
  .content .content-right .pay.not-enough{
    background: #2b333b;
  }
  .content .content-right .pay.enough{
    background: #00b43c;
    color: #fff;
  }

  .ball-container{

  }
  .ball-container .ball{
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
  }
  .ball-container .ball.drop-transition{
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -ms-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;
  }
  .ball-container .ball .inner{
    width: 16px;
    height: 16px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background: rgb(0, 160, 220);
    transition: all 0.4s;
  }

</style>
