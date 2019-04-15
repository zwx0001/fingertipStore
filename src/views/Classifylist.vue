/*
 * @Author: mikey.zhang 分类列表，添加分类
 * @Date: 2019-04-12 13:27:27 
 * @Last Modified by: mikey.zhang
 * @Last Modified time: 2019-04-12 17:01:29
 */

<template>
  <div class="classifylist">
    <header>分类列表</header>
    <section>
      <div class="item">
        <dl>
          <dt>分类名称: 水果</dt>
          <dd>添加时间:2018-06-21</dd>
        </dl>
        <div>
          <img src="../assets/images/write.png" alt="" style="margin-right:10px">
          <img src="../assets/images/delete.png" alt="">
        </div>
      </div>
      <div class="item" v-for="(i,k) in list" :key="i.cat">
        <dl>
          <dt>分类名称: {{i.cat_name}}</dt>
          <dd>添加时间:2018-06-21</dd>
        </dl>
        <div>
          <img src="../assets/images/write.png" alt="" style="margin-right:10px">
          <img src="../assets/images/delete.png" alt="">
        </div>
      </div>
    </section>
    <footer v-on:click="addclassify">添加分类</footer>
    <Dialog title="填写分类名称" v-show="isShow" :isShowFn="isShowFn">
      <input placeholder="填写分类名称" class="ipt">
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog.vue";
export default {
  name: "classifylist",
  components: {
    Dialog
  },
  data() {
    return {
      isShow: false,
      list: []
    };
  },
  created() {
    this.$http.get("/store/catagory").then(data => {
      if (data.code === 1) {
        this.list = data.list;
      } else {
        console.log(data);
      }
    });
  },
  methods: {
    addclassify() {
      this.isShow = true;
    },
    isShowFn() {
      this.isShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.classifylist {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  section {
    flex: 1;
    overflow-y: auto;
    .item {
      width: 90%;
      margin: pxTorem(15px) auto;
      box-shadow: 0 0 pxTorem(3px) pxTorem(3px) #eee;
      border-radius: pxTorem(5px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: pxTorem(5px) pxTorem(10px);
      dt {
        font-size: pxTorem(18px);
      }
      dd {
        font-size: pxTorem(15px);
        color: #ccc;
        line-height: pxTorem(30px);
      }
      img {
        width: pxTorem(30px);
      }
    }
  }

  .ipt {
    width: 100%;
    height: pxTorem(50px);
    background: #eee;
    border-radius: pxTorem(6px);
    padding: 0 pxTorem(10px);
    box-sizing: border-box;
    font-size: pxTorem(15px);
  }
}
header {
  width: 100%;
  height: pxTorem(50px);
  border-bottom: solid pxTorem(1px) #ccc;
  text-align: center;
  line-height: pxTorem(50px);
  font-size: pxTorem(20px);
  padding: 0 pxTorem(10px);
  box-sizing: border-box;
  a {
    float: left;
  }
}
footer {
  width: 100%;
  height: pxTorem(50px);
  background: #f2922f;
  text-align: center;
  line-height: pxTorem(50px);
  font-size: pxTorem(18px);
  color: #fff;
}
</style>


