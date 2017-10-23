<template>
  <transition name="move">
    <div v-show="showFlag" class="food-detail" ref="foodDetail">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{ food.name }}</h1>
          <div class="extra">
            <span class="count">月售{{ food.sellCount }}份</span><span class="rating">好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{ food.price }}</span>
            <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
          </div>
          <div class="cartControl-wrapper">
            <CartControl :food="food"></CartControl>
          </div>
          <transition name="fade">
            <div @click="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
          </transition>
        </div>
        <Split v-show="food.info"></Split>
        <div v-show="food.info" class="info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{ food.info }}</p>
        </div>
        <Split></Split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <RatingSelect @ratingSelectType="_selectType" :rating-select-type="selectType"
                        :rating-only-content="onlyContent" :rating-desc="desc" :ratings="food.ratings"
                        @ratingOnlyContent="_onlyContent">
          </RatingSelect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                <div class="user">
                  <span class="name">{{ rating.username }}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{ rating.rateTime | formatDate }}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType === 0, 'icon-thumb_down':rating.rateType === 1}"></span>
                  {{ rating.text }}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import CartControl from '../cartcontrol/cartcontrol.vue'
import Split from '../split/split.vue'
import RatingSelect from '../ratingSelect/ratingSelect.vue'
import {formatDate} from '../../common/js/date'
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = false;
      this.$nextTick(() => {
        if(!this.scroll){
          this.scroll = new BScroll(this.$refs.foodDetail, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    back() {
      this.showFlag = false
    },
    addFirst() {
      this.$emit('increment', event.target);
      Vue.set(this.food, 'count', 1);
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    _selectType(type) {
      this.selectType = type
    },
    _onlyContent(ratingOnlyContent) {
      this.onlyContent = ratingOnlyContent
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    CartControl,
    Split,
    RatingSelect
  }
}
</script>
<style>
  .food-detail {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  .food-detail.move-enter,.food-detail.move-leave-to{
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
  .image-header{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }
  .image-header img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .image-header .back{
    position: absolute;
    top: 10px;
    left: 0;
  }
  .image-header .back .icon-arrow_lift{
    display: block;
    padding: 10px;
    font-size: 20px;
    color: #fff;
  }

  .food-detail .content{
    position: relative;
    padding: 18px;
  }
  .food-detail .content .title{
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
  }
  .food-detail .content .extra{
    margin-bottom: 18px;
    height: 10px;
    line-height: 10px;
    font-size: 0;
    color: rgb(147, 153, 159);
  }
  .food-detail .content .extra .count,.rating{
    margin-right: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .food-detail .content .price{
    font-weight: 700;
    line-height: 20px;
  }
  .food-detail .content .price .now{
      margin-right: 8px;
      font-size: 14px;
      color: rgb(240, 20, 20);
    }
  .food-detail .content .price .old{
      text-decoration: line-through;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }

  .cartControl-wrapper{
    position: absolute;
    right: 12px;
    bottom: 12px;
  }
  .buy{
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    font-size: 10px;
    color: #fff;
    background: rgb(0, 160, 220);
    -webkit-transition: all .2s;
    transition: all .2s;
    opacity: 1;
  }
  .buy.fade-enter,.buy.fade-leave-to{
    opacity: 0;
  }

  .info{
    padding: 18px;
  }
  .info .title{
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color: rgb(7, 17, 27)
  }
  .info .text{
    line-height: 24px;
    padding: 0 8px;
    font-size: 12px;
    color: rgb(77, 85, 93);
  }

  .rating{
    padding-top: 18px;
  }
  .rating .title{
    line-height: 14px;
    margin-left: 18px;
    font-size: 14px;
    color: rgb(7, 17, 27)
  }

  .rating-wrapper{
    padding: 0 18px;
  }
  .rating-wrapper .rating-item{
    position: relative;
    padding: 16px 0;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }
  .rating-item .user{
    position: absolute;
    right: 0;
    top: 16px;
    line-height: 12px;
    font-size: 0;
  }
  .rating-item .user .name{
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .rating-item .user .avatar{
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .rating-item .time{
    margin-bottom: 6px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .rating-item .text{
    line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }
  .icon-thumb_up,.icon-thumb_down{
    line-height: 16px;
    margin-right: 4px;
    font-size: 12px;
  }
  .text .icon-thumb_up{
    color: rgb(0, 160, 220);
  }
  .text .icon-thumb_down{
    color: rgb(147, 153, 159);
  }

  .rating-wrapper .no-rating{
    padding: 16px 0;
    font-size: 12px;
    color: rgb(147, 153, 159);
  }
</style>
