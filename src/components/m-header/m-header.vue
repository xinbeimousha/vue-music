<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
  </div>
</template>
<script>
  export default {

  }

</script>
<style scoped lang="scss">
  @import "~common/style/variable";
  @import "~common/style/mixin";
  .m-header {
    position: relative;
    height: 44px;
    text-align: center;
    color: $color-theme;
    font-size: 0;
    
    .icon {
      display: inline-block;
      width: 30px;
      height: 32px;
      vertical-align: middle;
      @include bg-image('logo');
      background-size: 30px 32px;
      margin-right: 9px;
    }

    .text {
      display: inline-block;
      vertical-align: middle;
      line-height: 44px;
      font-size: $font-size-large;
    }

  }

</style>
