<template>
  <div class="addproduct">
    <header>
      添加商品
      <span v-on:click="addplatpro">添加平台商品</span>
    </header>
    <section id="box">
      <div class="item">
        <span>商品名称</span>
        <input type="text" placeholder="选择商品名称" v-model="goods_name">
      </div>
      <div class="item">
        <span>选择分类</span>
        <select name="" id="" v-model="cat_id" @change="selectcatid">
          <option :value="i.cat_id" v-for="(i,k) in catlist" v-bind:key="i.cat_id">{{i.cat_name}}</option>
        </select>
      </div>
      <div class="prodetail">
        <div class="item weight">
          <span>重量</span>
          <input type="text" placeholder="请输入重量">
          <select name="" id="">
            <option value="商品1">克</option>
            <option value="商品1">千克</option>
          </select>
        </div>
        <div class="item">
          <span>商品售价</span>
          <input type="text" placeholder="请输入商品售价" v-model="price">
        </div>
        <div class="item">
          <span>商品市场价</span>
          <input type="text" placeholder="请输入商品市场价" v-model="market_price">
        </div>
        <div class="item">
          <span>商品成本价</span>
          <input type="text" placeholder="请输入商品成本价" v-model=" cost_price">
        </div>
        <div class="item">
          <span>商品条码</span>
          <input type="text" placeholder="请输入商品条码(选填)" v-model="code_bar">
        </div>
      </div>
      <div class="proimg">
        <p>
          商品图片
          <span style="font-size:25px">(可以上传多张图片)</span>
        </p>
        <div class="proimg_box">
          <li v-for="(i,k) in proimg" v-bind:key="k">
            <img :src="i.url" alt="">
            <span v-on:click="closeproimg(k)">X</span>
          </li>
        </div>
        <dl class="upload">
          <dt>+</dt>
          <dd>上传图片</dd>
          <!-- <img :src="logoUrl" alt=""> -->
          <input type="file" name="files" v-on:change="(e)=>uploadbanner(e)" multiple>
        </dl>
        <p>购物车图（必选）</p>
        <dl class="upload">
          <dt>+</dt>
          <dd>上传图片</dd>
          <img :src="shopcarimg" alt="">
          <input type="file" name="files" v-on:change="(e)=>uploadshop(e,'car')">
        </dl>
        <p>商品详情</p>
        <dl class="upload" style="width:100%">
          <dt>+</dt>
          <dd>上传图片</dd>
          <img :src="prodetailimg" alt="">
          <input type="file" name="files" v-on:change="(e)=>uploadshop(e,'detail')">
        </dl>
        <textarea name="" id="" placeholder="请对您的商品进行描述" v-model="detail"></textarea>
      </div>
      <!-- <div class="prodetail" v-for="(i,k) in listlen" v-bind:key="k">
        <div class="item weight">
          <span>重量</span>
          <input type="text" placeholder="请输入重量">
          <select name="" id="">
            <option value="商品1">克</option>
            <option value="商品1">千克</option>
          </select>
        </div>
        <div class="item">
          <span>商品售价</span>
          <input type="text" placeholder="请输入商品售价">
        </div>
        <div class="item">
          <span>商品条码</span>
          <input type="text" placeholder="请输入商品条码(选填)">
        </div>
        <p>购物车图（必选）</p>
        <dl class="upload">
          <dt>+</dt>
          <dd>上传图片</dd>
          <img :src="shopcarimg" alt="">
          <input type="file" name="files">
        </dl>
        <span v-on:click="cancelweight(k)">X</span>
      </div>-->
      <div class="prodetail">
        <b>请对商品进行选择</b>
        <br>
        <div
          style="display:flex;justify-content:space-between;marginBottom:20px"
          v-for="(i,k) in addskupro"
          v-bind:key="k"
        >
          <select name="" id="" v-model="i.pro">
            <option :value="i1" v-for="(i1,k1) in pro" v-bind:key="k1">{{i1.group}}</option>
          </select>
          <select name="" id="" v-model="i.type">
            <option :value="i2" v-for="(i2,k2) in i.pro.params" v-bind:key="k2">{{i2}}</option>
          </select>
        </div>
      </div>
      <h3 v-on:click="addsku">+添加SKU</h3>
    </section>
    <footer v-on:click="applysale">申请上架</footer>
  </div>
</template>
<script>
import formData from "../utils/formdata";
export default {
  name: "addproduct",
  data() {
    return {
      imgUrl: [],
      listlen: [],
      shopcarimg: "", //cart_image
      proimg: [], //image
      prodetailimg: "",
      pro: [],
      addskupro: [
        {
          pro: "",
          type: ""
        }
      ],
      catlist: [],
      goods_name: "",
      cat: "",
      price: "",
      detail: "",
      sku: "",
      cat_id: "",
      market_price: "",
      cost_price: "",
      code_bar: ""
    };
  },
  created() {
    this.$http
      .post("/store/goods/cat.list", {
        store_id: formData(window.location.search)["storeid"]
      })
      .then(data => {
        if (data.code === 1) {
          this.catlist = data.result;
        }
        // console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    selectcatid() {
      let pro = this.catlist.filter(item => {
        return item.cat_id === this.cat_id;
      });
      this.cat = pro[0].cat_name;
      // console.log(this.cat_id);
      this.$http
        .post("/store/goods/sku.get", {
          store_id: formData(window.location.search)["storeid"],
          cat_id: this.cat_id
        })
        .then(data => {
          if (data.code === 1) {
            let sku = JSON.parse(data.sku);
            this.pro = sku;
            // console.log(this.pro);
          }
          // console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeimg(id) {
      let arr = this.imgUrl.map((item, index) => {
        if (item.id === id) {
          item.isTrue = false;
        }
        return item;
      });

      this.imgUrl = arr;
    },
    addsku() {
      this.addskupro.push({
        pro: "",
        type: ""
      });
    },
    cancelweight(k) {
      let arr = this.listlen;
      arr.forEach((item, index) => {
        if (index === k) {
          arr.splice(index, 1);
        }
      });
    },
    uploadbanner(e) {
      let formdata = new FormData();
      for (let i in e.target.files) {
        formdata.append("files", e.target.files[i]);
      }

      this.$http
        .post(
          `/upload?store_id=${formData(window.location.search)["storeid"]}`,
          formdata
        )
        .then(data => {
          if (data.code === 1) {
            this.proimg = [...this.proimg, ...data.url];
          } else {
            alert(data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeproimg(k) {
      this.proimg.splice(k, 1);
    },
    uploadshop(e, style) {
      let formdata = new FormData();
      formdata.append("files", e.target.files[0]);
      this.$http
        .post(
          `/upload?store_id=${formData(window.location.search)["storeid"]}`,
          formdata
        )
        .then(data => {
          if (data.code === 1) {
            if (style === "car") {
              this.shopcarimg = data.url[0].url;
            } else {
              this.prodetailimg = data.url[0].url;
            }
          } else {
            alert(data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    applysale() {
      if (
        formData(window.location.search)["storeid"] &&
        this.goods_name &&
        this.cat &&
        this.price &&
        JSON.stringify(this.proimg) &&
        this.detail &&
        this.cat_id &&
        this.shopcarimg
      ) {
        this.$http
          .post("/store/goods/create", {
            store_id: formData(window.location.search)["storeid"],
            goods_name: this.goods_name,
            cat: this.cat,
            price: this.price,
            image: JSON.stringify(this.proimg),
            detail: this.detail,
            cat_id: this.cat_id,
            cart_image: this.shopcarimg,
            sku: JSON.stringify(this.addskupro),
            market_price: this.market_price,
            cost_price: this.cost_price,
            code_bar: this.code_bar
          })
          .then(data => {
            if (data.code === 1) {
              this.$message("添加成功");
              this.$router.push(`/storeindex${window.location.search}`);
            }
            // console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message("请填写完整信息");
      }
    },
    addplatpro() {
      this.$router.push(`/addplatformpro${window.location.search}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.addproduct {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: #fff;
  header {
    width: 100%;
    height: pxTorem(44px);
    border-bottom: solid pxTorem(1px) #ccc;
    text-align: center;
    line-height: pxTorem(44px);
    font-size: pxTorem(16px);
    padding: 0 pxTorem(10px);
    box-sizing: border-box;
    span {
      font-size: pxTorem(13px);
      float: right;
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
  section {
    flex: 1;
    font-size: pxTorem(16px);
    overflow-y: auto;
    padding-bottom: pxTorem(10px);
    textarea {
      width: 100%;
      font-size: pxTorem(20px);
      height: pxTorem(150px);
      border: solid pxTorem(1px) #ccc;
    }
    .upload {
      width: pxTorem(100px);
      height: pxTorem(100px);
      border: dashed pxTorem(1px) #ccc;
      text-align: center;
      position: relative;
      color: gray;
      margin: pxTorem(8px) 0;
      dt {
        font-size: pxTorem(50px);
      }
      input {
        display: inline-block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    h3 {
      margin-left: 40%;
      display: inline-block;
      padding: pxTorem(5px) pxTorem(10px);
      background: #5adad0;
      color: #fff;
      font-size: pxTorem(12px);
      border-radius: pxTorem(6px);
    }
    .prodetail {
      width: 90%;
      margin: pxTorem(10px) auto;
      box-shadow: 0 0 pxTorem(10px) #ccc;
      border-radius: pxTorem(5px);
      position: relative;
      padding: pxTorem(6px);
      > b {
        line-height: pxTorem(35px);
      }
      select {
        display: inline-block;
        width: pxTorem(150px);
        height: pxTorem(30px);
        font-size: pxTorem(16px);
      }
      > span {
        background: rgba(0, 0, 0, 0.8);
        border-radius: 50%;
        color: #fff;
        display: inline-block;
        width: pxTorem(16px);
        height: pxTorem(16px);
        font-size: pxTorem(12px);
        text-align: center;
        line-height: pxTorem(16px);
        position: absolute;
        right: pxTorem(-5px);
        top: pxTorem(-5px);
      }
      h3 {
        margin-left: 40%;
        display: inline-block;
        padding: pxTorem(5px) pxTorem(10px);
        background: #5adad0;
        color: #fff;
        font-size: pxTorem(12px);
        border-radius: pxTorem(6px);
      }
      .weight {
        display: flex;
        justify-content: space-around;
        span {
          flex-shrink: 0;
          margin-right: pxTorem(10px);
        }
      }
      > p {
        line-height: pxTorem(30px);
        padding: 0 pxTorem(10px);
        box-sizing: border-box;
      }
      .upload {
        margin-left: pxTorem(10px);
        margin-bottom: pxTorem(10px);
      }
    }
    .item {
      border-bottom: solid pxTorem(1px) #ccc;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 pxTorem(10px);
      box-sizing: border-box;
      line-height: pxTorem(40px);
      .time {
        input {
          width: pxTorem(100px);
        }
      }
      select {
        width: pxTorem(100px);
        display: inline-block;
        height: pxTorem(30px);
        border: solid pxTorem(1px) #ccc;
        font-size: pxTorem(14px);
      }
    }
  }
  .proimg {
    width: 100%;
    padding: pxTorem(10px);
    box-sizing: border-box;

    > p {
      line-height: pxTorem(30px);
    }
    .proimg_box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 32%;
        list-style: none;
        position: relative;
        span {
          background: rgba(0, 0, 0, 0.8);
          border-radius: 50%;
          color: #fff;
          display: inline-block;
          width: pxTorem(16px);
          height: pxTorem(16px);
          font-size: pxTorem(12px);
          text-align: center;
          line-height: pxTorem(16px);
          position: absolute;
          right: pxTorem(5px);
          top: pxTorem(5px);
        }
      }
      img {
        width: 100%;
        height: pxTorem(100px);
      }
    }
  }
}
</style>

