<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active:currentPageIndex===index}" v-for="(item,index) in dots"></span>
    </div>
  </div>
</template>
<script>
  import BScroll from "better-scroll";
  import {
    addClass
  } from "common/js/dom";
  export default {
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      };
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interVal: {
        type: Number,
        default: 4000
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth();
        this._initDots();
        this._initSlider();
        if (this.autoPlay) {
          this._play();
        }
      }, 20);
    },
    methods: {
      _setSliderWidth() {
        this.children = this.$refs.sliderGroup.children;
        let sliderWidth = this.$refs.slider.clientWidth;
        let width = 0;
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          child.style.width = sliderWidth + "px";
          addClass(child, "slider-item");
          width += sliderWidth;
        }
        if (this.loop) {
          width += 2 * sliderWidth;
        }
        this.$refs.sliderGroup.style.width = width + "px";
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        });
        this.slider.on("scrollEnd", () => {
          let pageIndex = this.slider.getCurrentPage().pageX;
          if (this.loop) {
            pageIndex -= 1;
          }
          this.currentPageIndex = pageIndex;
          if (this.autoPlay) {
            this._play();
          }
        });
      },
      _initDots() {
        this.dots = new Array(this.children.length);
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1;
        if (this.loop) {
          pageIndex += 1;
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400);
        }, this.interVal);
      }
    }
  };

</script>
<style scoped lang="scss">
  @import "~common/style/variable";

  .slider {
    min-height: 1px;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-item {
        float: left;
        overflow: hidden;
        box-sizing: border-box;
        text-align: center;
        a {
          display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
          img {
            display: block;
            width: 100%;
          }
        }
      }
    }
    .dots {
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
      bottom: 12px;
      .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: $color-text-l;
        &.active {
          width: 20px;
          border-radius: 5px;
          background: $color-text-ll;
        }
      }
    }
  }

</style>
