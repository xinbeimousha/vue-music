<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
      <div class="bar-inner">
          <div class="progress" ref="progress"></div>
          <div class="progress-btn-wrapper"
            @touchstart="progressTouchStart"
            @touchmove="progressTouchMove"
            @touchend="progressTouchEnd"
           >
              <div class="progress-btn" ref="progressBtn"></div>
          </div>
      </div>
  </div>
</template>
<script>
import {prefixStyle} from 'common/js/dom';
const transform = prefixStyle('transform');
const BTN_WIDTH = 16;
export default {
    props:{
        percent:{
            type:Number,
            default:0
        }
    },
    created(){
        this.touch={}
    },
    methods:{
        progressTouchStart(e){
            this.touch.initiated = true;
            this.touch.startY = e.touches[0].pageX;
            this.touch.left = this.$refs.progress.clientWidth;
        },
        progressTouchMove(e){
            if(!this.touch.initiated){
                return
            }
            const detalX = e.touches[0].pageX-this.touch.startY;
            const offsetWidth =Math.min(this.$refs.progressBar.clientWidth-BTN_WIDTH,Math.max(0,this.touch.left+detalX));
            this._offset(offsetWidth) 
        },
        progressTouchEnd(){
            this.touch.initiated = false;
            this._triggerPercent();
        },
        progressClick(e){
            const rect = this.$refs.progressBar.getBoundingClientRect();
            const offsetWidth = e.pageX-rect.left
            this._offset(offsetWidth);
            this._triggerPercent();
        },
        // 告诉父组件滑动之后，当前的准确时间，实现实时拖动
        _triggerPercent(){
            const barWidth = this.$refs.progressBar.clientWidth-BTN_WIDTH;
            const percent = this.$refs.progress.clientWidth/barWidth;
            this.$emit('percentChange',percent);
        },
        _offset(offsetWidth){
             this.$refs.progress.style.width = `${offsetWidth}px`;
             this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
        }
    },
    watch:{
        percent(newPercent){
            if(newPercent>=0&&!this.touch.initiated){
                const barWidth = this.$refs.progressBar.clientWidth-BTN_WIDTH;
                const offsetWidth = barWidth*newPercent;
                this._offset(offsetWidth)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '~common/style/variable';
    .progress-bar{
        height:30px;
        .bar-inner{
            position: relative;
            top: 13px;
            height: 4px;
            background: rgba(0, 0, 0, 0.3);
            .progress{
                position: absolute;
                height: 100%;
                background: $color-theme;
            }
             .progress-btn-wrapper{
                    position: absolute;
                    left: -8px;
                    top: -13px;
                    width: 30px;
                    height: 30px;
                    .progress-btn{
                        position: relative;
                        top: 7px;
                        left: 7px;
                        box-sizing: border-box;
                        width: 16px;
                        height: 16px;
                        border: 3px solid $color-text;
                        border-radius: 50%;
                        background: $color-theme;
                    }
                }
        }
    }
</style>


