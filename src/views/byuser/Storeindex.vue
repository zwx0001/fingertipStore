/*
 * @Author: mikey.zhang 店铺首页
 * @Date: 2019-04-21 14:35:49 
 * @Last Modified by: mikey.zhang
 * @Last Modified time: 2019-04-21 19:59:04
 */

<template>
  <div class="byuserstoreindex">
    <header>{{this.$route.query.storename}}</header>
    <div class="box">
      <section>
        <p class="down">下拉刷新……</p>
        <div class="address">
          <img src="../../assets/images/address.png" alt="">
          <span>请选择配送地址</span>
        </div>
        <div class="info">
          <div class="info_left">
            <img src="../../assets/images/u=1018545691,1639014916&fm=26&gp=0.jpg" alt="">
            <dl>
              <dt>
                喵掌柜杂货店
                <span>已打烊</span>
              </dt>
              <dd>满49包邮</dd>
            </dl>
          </div>
          <div class="info_right">
            <dl>
              <dt>
                <img src="../../assets/images/a.png" alt="">
              </dt>
              <dd>已关注</dd>
            </dl>
          </div>
        </div>
        <div id="container">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide class="swiper-slide games">
              <img src="../../assets/images/u=1018545691,1639014916&fm=26&gp=0.jpg" alt="">
            </swiper-slide>
            <swiper-slide class="swiper-slide games">
              <img src="../../assets/images/u=1092981779,1198674757&fm=26&gp=0.jpg" alt="">
            </swiper-slide>
            <swiper-slide class="swiper-slide games">
              <img src="../../assets/images/u=1927452578,751283800&fm=26&gp=0.jpg" alt="">
            </swiper-slide>
            <swiper-slide class="swiper-slide games">
              <img src="../../assets/images/u=3590069947,3609584061&fm=26&gp=0.jpg" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="main">
          <p class="tab">
            <span :class="tabidx===0?'active':''" v-on:click="tabIdx(0)">热卖商品</span>
            <span :class="tabidx===1?'active':''" v-on:click="tabIdx(1)">店家推荐</span>
            <span :class="tabidx===2?'active':''" v-on:click="tabIdx(2)">跳楼促销</span>
          </p>
          <div class="section1" v-show="tabidx===0">
            <dl v-for="(i,k) in list" v-bind:key="k">
              <dt>
                <img src="../../assets/images/u=236744911,919043854&fm=26&gp=0.jpg" alt="">
              </dt>
              <dd>
                <p>毛掌柜的邮件</p>
                <p>规格:1000G</p>
                <p>
                  <span>￥40.00</span>
                  <span></span>
                </p>
              </dd>
            </dl>
            <dl>
              <dt>
                <img src="../../assets/images/u=236744911,919043854&fm=26&gp=0.jpg" alt="">
              </dt>
              <dd>
                <p>毛掌柜的邮件</p>
                <p>规格:1000G</p>
                <p>
                  <span>￥40.00</span>
                  <span></span>
                </p>
              </dd>
            </dl>
          </div>
          <div class="section2" v-show="tabidx===1">2</div>
          <div class="section3" v-show="tabidx===2">3</div>
        </div>
        <p class="up">上拉加载……</p>
      </section>
    </div>
    <footer>
      <dl :class="idx===0?'isactive':''" v-on:click="isActive(0)">
        <dt>
          <i class="iconfont icon-home-fill"></i>
        </dt>
        <dd>首页</dd>
      </dl>
      <dl :class="idx===1?'isactive':''" v-on:click="isActive(1)">
        <dt>
          <i class="iconfont icon-gouwucheman"></i>
        </dt>
        <dd>购物车</dd>
      </dl>
      <dl :class="idx===2?'isactive':''" v-on:click="isActive(2)">
        <dt>
          <i class="iconfont icon-wode"></i>
        </dt>
        <dd>我的</dd>
      </dl>
    </footer>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import BScroll from "better-scroll";
const box = document.querySelector(".box");
const scroll = new BScroll(box);
let index = 0;
export default {
  name: "byuserstoreindex",
  data() {
    return {
      idx: 0,
      swiperOption: {
        autoplay: {
          disableOnInteraction: false, //用户操作后是否禁止自动循环
          delay: 3000 //自自动循环时间
        }, //可选选项，自动滑动
        speed: 2000, //切换速度，即slider自动滑动开始到结束的时间（单位ms）
        loop: true, //循环切换
        grabCursor: true, //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
        // setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
        scrollbar: ".swiper-scrollbar",
        mousewheelControl: true, //设置为true时，能使用鼠标滚轮控制slide滑动
        observeParents: true, //当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        }
      },
      tabidx: 0,
      list: []
    };
  },
  created() {
    this.$http
      .get("/store/goods/goodslist", {
        page: 4
      })
      .then(data => {
        console.log(data);
        if (data.code === 1) {
          this.list = data.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    isActive(idx) {
      this.idx = idx;
    },
    tabIdx(idx) {
      this.tabidx = idx;
    }
  }
};
</script>
<style lang="scss" scoped>
.byuserstoreindex {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
.box {
  width: 100%;
  height: 100%;
  background: green;
  overflow: hidden;
}
section {
  width: 100%;
  flex: 1;
  overflow-y: auto;
  position: relative;
  // background: pink;
  // > p {
  //   width: 100%;
  //   height: pxTorem(40px);
  //   line-height: pxTorem(40px);
  //   font-size: pxTorem(18px);
  //   background: rgba(0, 0, 0, 0.5);
  //   color: #fff;
  //   text-align: center;
  //   position: absolute;
  // }
  // .up {
  //   left: 0;
  //   bottom: pxTorem(-40px);
  // }
  // .down {
  //   left: 0;
  //   top: pxTorem(-40px);
  // }
  .address {
    width: 100%;
    height: pxTorem(40px);
    background: #333333;
    color: #fff;
    line-height: pxTorem(40px);
    padding: 0 pxTorem(20px);
    box-sizing: border-box;
    font-size: pxTorem(13px);
    img {
      height: 100%;
      vertical-align: top;
    }
    span {
      margin-left: pxTorem(6px);
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: pxTorem(10px);
    box-sizing: border-box;
    .info_left {
      img {
        width: pxTorem(50px);
        height: pxTorem(50px);
        border-radius: pxTorem(5px);
        margin-right: pxTorem(10px);
      }
      display: flex;
      dl {
        dt {
          font-size: pxTorem(14px);
        }
        dd {
          color: gray;
          line-height: pxTorem(25px);
        }
      }
    }
    .info_right {
      dl {
        text-align: center;
        dd {
          color: gray;
        }
      }
      img {
        width: pxTorem(30px);
      }
    }
  }
  #container {
    width: 100%;
    height: pxTorem(150px);
    position: relative;
    .swiper-container {
      width: 100%;
      height: pxTorem(150px);
    }
    .swiper-slide {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .swiper-pagination {
      color: #fff;
      background: rgba(0, 0, 0, 0.6);
      border-radius: pxTorem(10px);
      width: pxTorem(40px);
      height: pxTorem(20px);
      line-height: pxTorem(20px);

      margin-left: pxTorem(320px);
    }
  }
  .main {
    .tab {
      width: 100%;
      height: pxTorem(40px);
      border-bottom: solid pxTorem(1px) #ccc;
      display: flex;
      justify-content: space-around;
      font-size: pxTorem(15px);
      span {
        padding: 0 pxTorem(10px);
        line-height: pxTorem(40px);
      }
      .active {
        color: #f2922f;
        border-bottom: solid pxTorem(2px) #f2922f;
      }
    }
    .section1 {
      dl {
        width: 100%;
        padding: pxTorem(10px);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: solid pxTorem(1px) #ccc;
      }
      dt {
        img {
          width: pxTorem(80px);
          height: pxTorem(80px);
          border-radius: pxTorem(6px);
        }
        margin-right: pxTorem(10px);
      }
      dd {
        flex: 1;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        p:nth-child(1) {
          font-size: pxTorem(20px);
        }
        p:nth-child(2) {
          font-size: pxTorem(14px);
          color: gray;
        }
        p:nth-child(3) {
          font-size: pxTorem(18px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:nth-child(2) {
            display: inline-block;
            width: pxTorem(30px);
            height: pxTorem(30px);
            background: url("../../assets/images/add.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
header {
  width: 100%;
  height: pxTorem(44px);
  border-bottom: solid pxTorem(1px) #ccc;
  text-align: center;
  line-height: pxTorem(44px);
  font-size: pxTorem(18px);
}
footer {
  width: 100%;
  height: pxTorem(50px);
  border-top: solid pxTorem(1px) #ccc;
  display: flex;
  justify-content: space-around;
  flex-shrink: 0;
  align-items: center;
  dl {
    text-align: center;
    .iconfont {
      font-size: pxTorem(20px);
    }
  }
  dl.isactive {
    color: #f2922f;
  }
}
</style>


