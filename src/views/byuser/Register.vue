<template>
  <div class="register">
    <div class="box">
      <input placeholder="请输入手机号" v-model="username" name="username" @input="(e)=>handleInput(e)">
      <br>
      <input placeholder="请输入密码" v-model="password" name="password" @input="(e)=>handleInput(e)">
      <br>
      <div class="yzm">
        <input placeholder="请输入验证码" v-model="yzm" name="yzm" @input="(e)=>handleInput(e)">
        <span>验证码</span>
      </div>
      <br>
      <button v-on:click="gohome">注册</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "byuserregister",
  data() {
    return {
      username: "",
      password: "",
      yzm: ""
    };
  },
  methods: {
    handleInput: function(e) {
      this[e.target.name] = e.target.value;
    },
    gohome: function() {
      console.log(this.username);
      console.log(this.password);
      console.log(this.yzm);
      if (this.username.trim() && this.password.trim() && this.yzm.trim()) {
        this.$http
          .post("/buyer/user/register",{
            username:this.username.trim(),
            
          })
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message("请填写完整信息");
      }
      //this.$router.push("/byuserhome");
    }
  }
};
</script>
<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  background: #f2922f;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .box {
    width: 80%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    input {
      width: 100%;
      height: pxTorem(40px);
      border: solid pxTorem(1px) #ccc;
      padding-left: pxTorem(10px);
      box-sizing: border-box;
      border-radius: pxTorem(10px);
      font-size: pxTorem(15px);
    }
    button {
      width: 100%;
      height: pxTorem(40px);
      font-size: pxTorem(15px);
      border-radius: pxTorem(10px);
      background: cornflowerblue;
    }
    .yzm {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        width: pxTorem(100px);
      }
    }
  }
}
</style>

