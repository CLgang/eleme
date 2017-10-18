<template>
  <div class="shop-cart">
    <div class="content" @click="toggleList">
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
      <div class="content-right" @click.stop.prevent="payoff">
        <div class="pay" :class="payClass">{{ payDesc }}</div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold">
      <div class="shopCart-list" v-show="listShow">
        <div class="list-header">
          <div class="title">购物车</div>
          <div class="clear" @click="clear">清空</div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{ food.name }}</span>
              <div class="price">
                <span>￥{{ food.price*food.count }}</span>
              </div>
              <div class="cartControl-wrapper">
                <CartControl :food="food"></CartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>
<script>
import CartControl from '../cartcontrol/cartcontrol.vue'
import BScroll from 'better-scroll'
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
      dropBalls: [],
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
      ],
      fold: true
    }
  },
  created() {
//    this.$store.eventHub.$on('eventHubElement', (val) => {
//      this.drop(val)
//    })
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
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while(count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
          el.style.transform = `translate3d(0, ${y}px, 0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
          inner.style.transform = `translate3d(${x}px, 0, 0)`;
        }
      }
    },
    enter(el) {
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)';
        el.style.transform = 'translate3d(0, 0, 0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0, 0, 0)';
        inner.style.transform = 'translate3d(0, 0, 0)';
      })
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold
    },
    clear() {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    hideList() {
      this.fold = true
    },
    payoff() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert(`可以支付${this.totalPrice}元`)
    },
  },
  components: {
    CartControl
  }

}
</script>
<style>
  .shop-cart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
  }
  .shop-cart .content{
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
    -webkit-transition: all .4s cubic-bezier(.49, -.29, .75, .41);
    transition: all .4s cubic-bezier(.49, -.29, .75, .41);
  }
  .ball-container .ball .inner{
    width: 16px;
    height: 16px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: rgb(0, 160, 220);
    -webkit-transition: all .4s linear;
    transition: all .4s linear;
  }

  .shopCart-list{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    -webkit-transition: all .4s;
    transition: all .4s;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  .fold-enter,.fold-leave-to{
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
  .shopCart-list .list-header{
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }
  .shopCart-list .list-header .title{
    float: left;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .shopCart-list .list-header .clear{
    float: right;
    font-size: 12px;
    color: rgb(0, 120, 220)
  }
  .shopCart-list .list-content{
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
    background: #fff;
  }
  .shopCart-list .list-content .food{
    position: relative;
    padding: 12px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }
  .list-content .food .name{
    line-height: 24px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .list-content .food .price{
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
  }
  .list-content .food .cartControl-wrapper{
    position: absolute;
    right: 0;
    top: 6px;
  }
  .list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    -webkit-backdrop-filter: blur(10px);
    -webkit-transition: all .4s;
    transition: all .4s;
    opacity: 1;
    background: rgba(7, 17, 27, .6);
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }

</style>
