<template>
  <transition name="slide">
       <div class="singer-detail"></div>
  </transition>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
    @import '~common/style/variable';
    .singer-detail{
        position: fixed;
        top:0;
        right:0;
        bottom:0;
        left:0;
        z-index:100;
        background-color: $color-background;
    }
    .slide-enter-active,.slide-leave-active{
        transition: all .3s
    }
    .slide-enter,.slide-leave-to{
        transform: translateX(100%);
    }
</style>


