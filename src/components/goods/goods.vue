<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="[{'current':currentIndex === index}]"
            @click="selectMenu(index)">
          <span class="text">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span><span class="rating">好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cart-control-wrapper">
                  <CartControl :food="food" @increment="_drop"></CartControl>
                  <!--<CartControl :food="food"></CartControl>-->
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart ref="shopCart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></ShopCart>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import ShopCart from '../shopcart/shopcart.vue'
import CartControl from '../cartcontrol/cartcontrol.vue'
export default {
  props:{
    seller:{
      type: Object
    },
  },
  data() {
    return{
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  computed: {
    currentIndex(){
      for(let i = 0; i < this.listHeight.length; i++){
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
          return i
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count){
            foods.push(food);
          }
        })
      });
      return foods
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/goods').then((response) =>{
      response = response.body;
      if (response.errno === 0) {
        this.goods = response.data;
        this.$nextTick(() =>{
          this.initScroll();
          this.calculateHeight();
        })
      }
    })
  },
  methods: {
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for(let i = 0; i < foodList.length; i++){
        height += foodList[i].clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index) {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let item = foodList[index];
      this.foodsScroll.scrollToElement(item, 200)
    },
    _drop(target) {
      // 体验优化，异步执行
      this.$nextTick(() => {
        this.$refs.shopCart.drop(target);
      })
    }
  },
  components: {
    ShopCart,
    CartControl
  }
}
</script>
<style>
  .goods{
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
  }
  .menu-wrapper{
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }
  .menu-wrapper .menu-item{
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding: 0 12px;
  }
  .menu-item.current{
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background: #fff;
    font-weight: 700;
  }
  .menu-item.current .text{
    border-bottom: none;
  }
  .menu-item .text{
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    font-size: 12px;
  }
  .menu-item .icon{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }
  .menu-item .icon.decrease{
    background-image: url('decrease_3@2x.png');
  }
  .menu-item .icon.discount{
    background-image: url('discount_3@2x.png');
  }
  .menu-item .icon.guarantee{
    background-image: url('guarantee_3@2x.png');
  }
  .menu-item .icon.invoice{
    background-image: url('invoice_3@2x.png');
  }
  .menu-item .icon.special{
    background-image: url('special_3@2x.png');
  }

  .foods-wrapper{
    flex: 1;
  }
  .foods-wrapper .title{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
  }
  .food-item{
    display: flex;
    padding: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }
  .food-item:last-child{
    border-bottom: none;
    margin-bottom: 0;
  }
  .food-item .icon{
    flex: 0 0 57px;
    margin-right: 10px;
  }
  .food-item .content{
    position: relative;
    flex: 1;
  }
  .food-item .content .name{
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .food-item .content .desc{
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .food-item .content .extra{
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .food-item .content .extra .count{
    margin-right: 12px;
  }
  .food-item .content .price{
    font-weight: 700;
    line-height: 20px;
  }
  .food-item .content .price .now{
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }
  .food-item .content .price .old{
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .food-item .content .cart-control-wrapper{
    position: absolute;
    right: 0;
    bottom: -8px;
  }


</style>
