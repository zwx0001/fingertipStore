/*
 * @Author: mikey.zhang 创建店铺
 * @Date: 2019-04-12 13:27:27 
 * @Last Modified by: mikey.zhang
 * @Last Modified time: 2019-04-19 22:17:05
 */

<template>
  <div class="createstore">
    <header>创建店铺</header>
    <section>
      <dl>
        <dt>店铺名称:</dt>
        <dd>
          <input type="text" placeholder="请输入店铺名称" v-model="store_name">
        </dd>
      </dl>
      <dl>
        <dt>身份证号:</dt>
        <dd>
          <input type="text" placeholder="请输入身份证号" v-model="idcard">
        </dd>
      </dl>
      <dl>
        <dt>店铺专卖:</dt>
        <dd>
          <select name="" id="" v-on:change="(e)=>handlechange(e)">
            <option
              v-for="(i,k) in list"
              v-bind:key="i.cat_id"
              :value="i.cat_name"
              :data-id="i.cat_id"
            >{{i.cat_name}}</option>
          </select>
        </dd>
      </dl>
      <dl>
        <dt>专卖类型:</dt>
        <dd>
          <select name="" id="" @change="(e)=>subhandlechange(e)">
            <option v-for="(i,k) in sublist" v-bind:key="k" :value="i">{{i}}</option>
          </select>
        </dd>
      </dl>
      <p>您的选择是(点击取消):
        <br>
        <span v-for="(i,k) in sub_cat" v-bind:key="k" v-on:click="cancelsub_cat(i)">{{i}}</span>
      </p>
    </section>
    <footer v-on:click="createstore">我要开店</footer>
  </div>
</template>

<script>
export default {
  name: "createstore",
  data() {
    return {
      list: [],
      sublist: [],
      isShow: false,
      sub_cat: [], //二级分类
      i: "", //cat_id 一级分类id，
      idcard: "", //idcard身份证号
      uid: "asdascxv123asd", //用户id
      cat: "", //一级分类
      store_name: "" //店铺名称
    };
  },
  created() {
    this.$http.get("/store/catagory").then(data => {
      if (data.code === 1) {
        // console.log(data);
        this.list = data.list;
        this.cat = data.list[0].cat_name;
        this.sublist = this.list[0].sub_cat_name;
      } else {
        console.log(data);
      }
    });
  },
  methods: {
    handlechange(e) {
      let i = this.list.filter((item, index) => {
        return item.cat_name === e.target.value;
      })[0].cat_id;
      this.i = i;
      this.cat = e.target.value;
      this.sub_cat = [];
      this.sublist = this.list[i - 1].sub_cat_name;
    },
    subhandlechange(e) {
      let result = this.sub_cat.some(item => {
        return item === e.target.value;
      });
      if (!result) {
        this.sub_cat.push(e.target.value);
      }
    },
    cancelsub_cat(i) {
      this.sub_cat.forEach((item, index) => {
        if (item === i) {
          this.sub_cat.splice(index, 1);
        }
      });
    },
    ismessage() {
      this.isShow = false;
    },
    createstore() {
      let that = this;
      if (
        this.sub_cat &&
        this.i &&
        this.idcard &&
        this.uid &&
        this.cat &&
        this.store_name
      ) {
        this.$http
          .post("/store/create", {
            sub_cat: this.sub_cat.join(","), //二级分类
            cat_id: String(this.i), //cat_id 一级分类id
            idcard: this.idcard, //idcard身份证号
            uid: this.uid, //用户id
            cat: this.cat, //一级分类
            store_name: this.store_name //店铺名称
          })
          .then(data => {
            if (data && data.code === 1) {
              this.$message("恭喜你,创建成功!");
              // console.log(data);
              that.$router.push(
                `/storeindex?storename=${this.store_name}&storeid=${
                  data.store_id
                }&brandname=${this.store_name}`
              );
            } else {
              this.$message("传递参数有误");
            }
          })
          .catch(err => {
            console.log(err);
            return;
          });
      } else {
        this.isShow = true;
       this.$message("参数不完整");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.createstore {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  header {
    width: 100%;
    height: pxTorem(44px);
    text-align: center;
    line-height: pxTorem(44px);
    font-size: pxTorem(16px);
    padding: 0 pxTorem(10px);
    box-sizing: border-box;
    border-bottom: solid pxTorem(1px) #eee;
  }
  section {
    flex: 1;
    padding: pxTorem(20px) pxTorem(10px);
    box-sizing: border-box;
    p {
      font-size: pxTorem(16px);
      span {
        border: solid pxTorem(1px) #ccc;
        padding: pxTorem(4px) pxTorem(15px);
        margin-right: pxTorem(10px);
        display: inline-block;
        margin-top: pxTorem(8px);
      }
    }
    dl {
      display: flex;
      font-size: pxTorem(14px);
      margin-bottom: pxTorem(15px);
      dt {
        width: 50%;
        font-size: pxTorem(16px);
      }
      dd {
        width: 50%;
        input {
          border: solid pxTorem(1px) #ccc;
          padding: pxTorem(5px);
          box-sizing: border-box;
        }
        select {
          width: 100%;
          display: inline-block;
          height: pxTorem(30px);
          border: solid pxTorem(1px) #ccc;
          font-size: pxTorem(14px);
          option {
            display: inline-block;
            width: pxTorem(50px);
            font-size: pxTorem(10px);
          }
        }
      }
    }
  }
  footer {
    width: 100%;
    height: pxTorem(50px);
    background: #f2922f;
    font-size: pxTorem(18px);
    text-align: center;
    line-height: pxTorem(50px);
    color: #fff;
  }
}
</style>