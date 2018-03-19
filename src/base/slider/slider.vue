<template>
  <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
          <slot>  
          </slot>
      </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import {addClass} from 'common/js/dom'
export default {
    props:{
        loop:{
            type:Boolean,
            default:true
        },
        autoPlay:{
            type:Boolean,
            default:true
        },
        interVal:{
            type:Number,
            default:4000
        }
    },
    mounted(){
        setTimeout(() => {
            this._setSliderWidth();
            this._initSlider();
        },20)
    },
    methods:{
      _setSliderWidth(){
          this.children = this.$refs.sliderGroup.children;
          let sliderWidth = this.$refs.slider.clientWidth;
          let width = 0;
          for(let i=0;i<this.children.length;i++){
              let child = this.children[i];
              child.style.width = sliderWidth + 'px'; 
              addClass(child,'slider-item');
              width += sliderWidth ;
          }
          if(this.loop){
              width += 2*sliderWidth
          }
          this.$refs.sliderGroup.style.width = width + 'px';
      },
      _initSlider(){
           this.slider = new BScroll(this.$refs.slider, {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapLoop: this.loop,
            snapThreshold: 0.3,
            snapSpeed: 400
        })
      },
  }
}
</script>
<style scoped lang="stylus">
    @import "~common/stylus/variable"
    
    .slider
      min-height :1px;
      .slider-group
        position :relative;
        overflow :hidden;
        white-space :nowrap;
        .slider-item
          float:left;
          overflow :hidden;
          box-sizing:border-box;
          text-align :center;
          a 
           display :block;
           width:100%;
           overflow :hidden;
           text-decoration:none;
           img 
            display :block;
            width:100%; 

</style>


