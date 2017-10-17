<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCount">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props:{
    food: {
      type: Object
    }
  },
  created() {

  },
  methods: {
    addCart() {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count ++
      }
//      this.$store.dispatch('cartAdd', event.target)
//      this.eventHub.$emit('add-cart', event.target)
      this.$store.eventHub.$emit('eventHubElement', event.target)
    },
    decreaseCount() {
      if(this.food.count) {
        this.food.count --
      }
    }
  }
}
</script>
<style>
  .cartcontrol{
    font-size: 0;
  }
  .cartcontrol .cart-add{
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
  .cartcontrol .cart-decrease{
    display: inline-block;
    padding: 6px;
    -webkit-transition: all 0.4s linear;
    -moz-transition: all 0.4s linear;
    -ms-transition: all 0.4s linear;
    -o-transition: all 0.4s linear;
    transition: all 0.4s linear;
  }
  .move-enter-active, .move-leave-active{
    opacity: 1;
    -webkit-transform: translate3D(0, 0, 0) rotate(0);
    -moz-transform: translate3D(0, 0, 0) rotate(0);
    -ms-transform: translate3D(0, 0, 0) rotate(0);
    -o-transform: translate3D(0, 0, 0) rotate(0);
    transform: translate3D(0, 0, 0) rotate(0);
  }
  .move-enter,.move-leave-to{
    opacity: 0;
    -webkit-transform: translate3D(24px, 0, 0) rotate(180deg);
    -moz-transform: translate3D(24px, 0, 0) rotate(180deg);
    -ms-transform: translate3D(24px, 0, 0) rotate(180deg);
    -o-transform: translate3D(24px, 0, 0) rotate(180deg);
    transform: translate3D(24px, 0, 0) rotate(180deg);
  }
  .cart-decrease .inner{
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
    -webkit-transition: all 0.4s linear;
    -moz-transition: all 0.4s linear;
    -ms-transition: all 0.4s linear;
    -o-transition: all 0.4s linear;
    transition: all 0.4s linear;
  }
  .cartcontrol .cart-count{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
</style>
