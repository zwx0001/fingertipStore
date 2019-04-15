<template>
  <div class="message">
    <div :class="{'ani':isActive}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Message",
  props: {
    ismessage: Function
  },
  data() {
    return {
      isActive: false
    };
  },
  created() {
    setTimeout(() => {
      this.isActive = true;
    }, 1000);

    setTimeout(() => {
      this.isActive = false;
      this.ismessage();
    }, 4000);
  }
};
</script>

<style lang="scss" scoped>
.message {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  div {
    width: 90%;
    height: pxTorem(40px);
    background: #fff;
    margin: 0 auto;
    text-align: center;
    line-height: pxTorem(40px);
    font-size: pxTorem(20px);
    border-radius: pxTorem(8px);
    position: absolute;
    top: pxTorem(-50px);
    left: 5%;
    background: skyblue;
  }
  div.ani {
    transition: 0.6s;
    transform: translateY(130px);
  }
}
</style>

