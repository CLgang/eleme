<template>
  <div class="rating-select">
    <div class="rating-type">
      <span @click="select(2)" class="block positive" :class="{'active': ratingSelectType === 2}">{{ ratingDesc.all }}
        <span class="count">{{ ratings.length }}</span>
      </span>
      <span @click="select(0)" class="block positive" :class="{'active': ratingSelectType === 0}">{{ ratingDesc.positive }}
        <span class="count">{{ positives.length }}</span>
      </span>
      <span @click="select(1)" class="block negative" :class="{'active': ratingSelectType === 1}">{{ ratingDesc.negative }}
        <span class="count">{{ negatives.length }}</span>
      </span>
    </div>
    <div @click="switchContent" class="switch">
      <i class="icon-check_circle" :class="{'on': ratingOnlyContent}"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    ratingSelectType: {
      type: Number,
      default: ALL
    },
    ratingOnlyContent: {
      type: Boolean,
      default: false
    },
    ratingDesc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select(type) {
      this.ratingSelectType = type;
      this.$emit('ratingSelectType', type)
    },
    switchContent() {
      this.ratingOnlyContent = !this.ratingOnlyContent;
      this.$emit('ratingOnlyContent', this.ratingOnlyContent)
    }
  }
}
</script>
<style>
  .rating-select .rating-type{
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    font-size: 0;
  }
  .rating-type .block{
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    line-height: 16px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: 12px;
    color: rgb(77, 85, 93);
  }
  .block.active{
    color: #fff;
  }
  .block.positive{
    background: rgba(0, 160, 220, .2);
  }
  .block.positive.active{
    background: rgb(0, 160, 220);
  }
  .block.negative{
    background: rgba(77, 85, 93, .2);
  }
  .block.negative.active{
    background: rgb(77, 85, 93);
  }
  .block .count{
    margin-left: 2px;
    font-size: 8px;
  }
  .switch{
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    font-size: 0;
    color: rgb(147, 153, 159)
  }
  .switch .icon-check_circle{
    display: inline-block;
    vertical-align: top;
    margin-right: 4px;
    font-size: 24px;
  }
  .switch .icon-check_circle.on {
    color: #00c850;
  }
  .switch .text{
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
  }
</style>
