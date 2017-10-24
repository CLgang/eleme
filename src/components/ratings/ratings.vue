<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :size="36" :score="seller.serviceScore" class="star"></Star>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :size="36" :score="seller.foodScore" class="star"></Star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">送达时间</span>
            <span class="deliveryTime">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <Split></Split>
      <RatingSelect @ratingSelectType="_selectType" :rating-select-type="selectType"
                    :rating-only-content="onlyContent" :ratings="ratings"
                    @ratingOnlyContent="_onlyContent">
      </RatingSelect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-wrapper">
                <Star :size="24" :score="rating.score"></Star>
                <span class="delivery" v-show="rating.deliveryTime"></span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{ item }}</span>
              </div>
              <div class="time">{{ rating.rateTime | formatDate }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import Star from '../star/star.vue'
import Split from '../split/split.vue'
import RatingSelect from '../ratingSelect/ratingSelect.vue'
import { formatDate } from '../../common/js/date'
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: false,
    }
  },
  created() {
    this.$http.get('api/ratings').then((response) => {
      response = response.body;
      if (response.errno === 0) {
        this.ratings = response.data;
        this.$nextTick(() =>{
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    })
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
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
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    _onlyContent(ratingOnlyContent) {
      this.onlyContent = ratingOnlyContent;
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  components: {
    Star,
    Split,
    RatingSelect
  }
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
    padding: 6px 0;
    width: 137px;
    border-right: 1px solid rgba(7, 17, 27, .1);
    text-align: center;
  }
  .overview .left .score{
    margin-bottom: 6px;
    line-height: 28px;
    font-size: 24px;
    color: rgb(255, 153, 0);
  }
  .overview .left .title{
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }
  .overview .left .rank{
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .overview .right{
    flex: 1;
    padding: 6px 0 6px 24px;
  }
  .overview .right .score-wrapper{
    margin-bottom: 18px;
    font-size: 0;
  }
  .score-wrapper .title{
    display: inline-block;
    vertical-align: top;
    line-height: 18px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }
  .score-wrapper .star{
    display: inline-block;
    vertical-align: top;
    margin-left: 12px;
  }
  .score-wrapper .score{
    display: inline-block;
    vertical-align: top;
    line-height: 18px;
    font-size: 12px;
    color: rgb(255, 153, 0);
  }
  .score-wrapper .deliveryTime{
    line-height: 18px;
    font-size: 12px;
    color: rgb(147, 153, 159);
    margin-left: 12px;
  }

  .ratings-content .rating-wrapper{
    padding: 0 18px;
  }
  .ratings-content .rating-wrapper .rating-item{
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, .1)
  }
  .ratings-content .rating-item .avatar{
    flex: 0 0 28px;
    width: 28px;
    margin-right: 12px;
  }
  .ratings-content .rating-item .avatar img{
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .ratings-content .rating-item .content{
    position: relative;
    flex: 1;
  }
  .ratings-content .rating-item .content .name{
    margin-bottom: 4px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(7, 17, 27);
  }
  .ratings-content .star-wrapper{
    margin-bottom: 6px;
    font-size: 0;
  }
  .ratings-content .star-wrapper .star{
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
  }
  .ratings-content .star-wrapper .delivery{
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .ratings-content .rating-item .content .text{
    margin-bottom: 8px;
    line-height: 18px;
    color: rgb(7, 17, 27);
    font-size: 12px;
  }
  .ratings-content .rating-item .content .recommend{
    line-height: 16px;
    font-size: 0;
  }
  .ratings-content .recommend .icon-thumb_up, .recommend .item{
    display: inline-block;
    margin: 0 8px 4px 0;
    font-size: 9px;
  }
  .ratings-content .icon-thumb_up{
    color: rgb(0, 160, 220);
  }
  .ratings-content .recommend .item{
    padding: 0 6px;
    border: 1px solid rgba(7, 17, 27, .1);
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    color: rgb(147, 153, 159);
    background: #fff;
  }
  .ratings-content .rating-item .content .time{
    position: absolute;
    top: 0;
    right: 0;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  @media only screen and (max-width: 320px) {
    .overview .left{
      flex: 0 0 116px;
      width: 116px;
    }
    .overview .right{
      flex: 1;
      padding: 6px 0 6px 6px;
    }
  }
</style>
