<template>
    <div class="addproduct">
        <header>添加商品</header>
        <section></section>
    </div>
</template>
<script>
export default {
  name: "addproduct"
};
</script>

<style lang="scss" scoped>
.addproduct {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  header {
    width: 100%;
    height: pxTorem(44px);
    border-bottom: solid pxTorem(1px) #ccc;
    text-align: center;
    line-height: pxTorem(44px);
    font-size: pxTorem(16px);
  }
  section {
    flex: 1;
  }
}
</style>

