<template>
  <div class="shopcar">
    <header>购物车</header>
    <section>
      <div class="item" v-for="(i,k) in list" :key="i.goods_id">
        <Checkbox v-model="i.flag" @change="handlechange"></Checkbox>
        <div class="con">
          <img :src="i.cart_image" alt="">
          <div>
            <p>{{i.goods_name}}</p>
            <p>￥{{i.price}}</p>
          </div>
        </div>
        <dl>
          <img src="../../assets/images/delete.png" alt="" @click="del(i.goods_id)">
          <div class="btn">
            <button v-on:click="minus(i)">-</button>
            <span>{{i.sold_count}}</span>
            <button v-on:click="add(i)">+</button>
          </div>
        </dl>
      </div>
    </section>
    <footer>
      <p>
        <Checkbox v-model="bool"></Checkbox>
        <span>全选</span>
        <span>
          总价:￥
          <b>{{sum}}</b>
        </span>
      </p>
      <span>去结算</span>
    </footer>
  </div>
</template>
<script>
import Checkbox from "../../components/checkbox/checkbox";

export default {
  name: "shopcar",
  data() {
    return {
      list: [],
      bool: false,
      sum: 0
    };
  },
  components: {
    Checkbox
  },
  watch: {
    bool() {
      this.sum = 0;
      this.list.map(item => {
        item.flag = this.bool;
        if (item.flag) {
          this.sum += item.price * item.sold_count;
        }
      });
    }
  },
  created() {
    this.list = this.$store.state.pros;
    let list = this.list.map(item => {
      item.flag = false;
      return item;
    });
    this.list = JSON.parse(JSON.stringify(list));
  },
  methods: {
    handlechange() {
      if (
        this.list.every(item => {
          return item.flag;
        })
      ) {
        this.bool = true;
      } else {
        this.bool = false;
      }
      this.total();
    },
    total() {
      this.sum = 0;
      this.list.map(item => {
        if (item.flag) {
          this.sum += item.price * item.sold_count;
        }
      });
    },
    add(i) {
      this.list.map(item => {
        if (item.goods_id === i.goods_id) {
          item.sold_count++;
        }
      });
      this.total();
      this.$store.commit("car", this.list);
    },
    minus(i) {
      this.list.map(item => {
        if (item.goods_id === i.goods_id) {
          item.sold_count--;
          if (item.sold_count < 0) {
            item.sold_count = 0;
          }
        }
      });
      this.total();
      this.$store.commit("car", this.lsit);
    },
    del(id) {
      this.$confirm("确定删除嘛？？？", flag => {
        if (flag) {
          this.list.map((item, index) => {
            if (item.goods_id === id) {
              this.list.splice(index, 1);
            }
          });
          this.total();
          this.$store.commit("car", this.lsit);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.shopcar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  section {
    width: 100%;
    flex: 1;
    .item {
      display: flex;
      justify-content: space-between;
      border-bottom: solid pxTorem(1px) #ccc;
      padding: pxTorem(10px);
      box-sizing: border-box;
      .con {
        display: flex;
        flex: 1;
        margin-left: pxTorem(10px);
        img {
          width: pxTorem(100px);
          height: pxTorem(100px);
          margin-right: pxTorem(10px);
        }
        div {
          font-size: pxTorem(18px);
          display: flex;
          justify-content: space-between;
          flex-direction: column;
        }
      }
      dl {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        img {
          width: 30%;
          margin-left: pxTorem(30px);
        }
      }
      .btn {
        button {
          display: inline-block;
          width: pxTorem(30px);
          height: pxTorem(30px);
          font-size: pxTorem(16px);
        }
        span {
          margin: 0 pxTorem(10px);
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
    background: #fff;
  }
  footer {
    width: 100%;
    height: pxTorem(50px);
    border-top: solid pxTorem(1px) #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span {
      background: orange;
      color: #fff;
      height: 100%;
      line-height: pxTorem(50px);
      padding: 0 pxTorem(20px);
      font-size: pxTorem(16px);
    }
    > p {
      margin-left: pxTorem(15px);
      span {
        position: relative;
        top: pxTorem(-5px);
        margin: 0 pxTorem(10px);
        b {
          font-size: pxTorem(16px);
          color: red;
        }
      }
    }
  }
}
</style>

