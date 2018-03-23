<template>
  <scroll ref="listview" :data="data" class="listview">
      <ul>
          <li ref="listGroup" class="list-group" v-for="group in data">
              <h1 class="list-group-title">{{group.title}}</h1>
              <ul>
                  <li class="list-group-item" v-for="item in group.items">
                      <img :src="item.avata" class="avatar" alt="">
                      <span class="name">{{item.name}}</span>
                  </li>
              </ul>
          </li>
      </ul>
      <div class="shortcutList" 
            @touchstart="_shortcutTouchStart"  
            @touchmove.stop.prevent="_shortcutTouchMove">
          <ul>
              <li class="item" v-for="(item,index) in shortcutList" 
              :data-index="index"
              :class="{current:currentIndex===index}"
              >
                {{item}}
              </li>
          </ul>
      </div>
  </scroll>
</template>
<script>
 import Scroll from 'base/scroll/scroll';
 import {getData} from 'common/js/dom';
 const ITEM_LEN = 18;
export default {
  data(){
      return {
          currentIndex:0
      }
  },
  created(){
      this.touch={}
  },
  props:{
      data:{
          type:Array,
          default:[]
      }
  },
  computed:{
      shortcutList(){
        return  this.data.map(group => {
              return group.title.substr(0,1)
          })
      }
  },
  methods:{
      _shortcutTouchStart(e){
          let anchorIndex = getData(e.target,'index');
          let firstTouch = e.touches[0];
          this.touch.y1 = firstTouch.pageY;
          this.touch.anchorIndex = anchorIndex;
          this._scrollTo(anchorIndex);
      },
      _shortcutTouchMove(e){
          let firstTouch = e.touches[0];
          this.touch.y2 = firstTouch.pageY;
          let delta = (this.touch.y2-this.touch.y1)/ITEM_LEN | 0
          let anchorIndex = delta+ parseInt(this.touch.anchorIndex);
          this._scrollTo(anchorIndex);

      },
      _scrollTo(index){
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
      }
  },
  components:{
      Scroll
  }
}
</script>
<style scoped lang="scss">
    @import '~common/style/variable';
    .listview{
        position: relative;
        width:100%;
        height:100%;
        overflow: hidden;
        background: $color-background;
        .list-group{
            padding-bottom:20px;
            .list-group-title{
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                font-size: $font-size-small;
                color: $color-text-l;
                background: $color-highlight-background;
            }
              .list-group-item{
                    display: flex;
                    align-items: center;
                    padding:20px 0 0 30px;
                    .avatar{
                        width:50px;
                        height:50px;
                        border-radius: 50%;
                    }
                    .name{
                        margin-left:20px;
                        color:$color-text-l;
                        font-size: $font-size-medium;
                    }
                }
        }
        .shortcutList{
            position: absolute;
            top:50%;
            right:0;
            z-index:30;
            transform: translateY(-50%);
            width: 20px;
            padding: 20px 0;
            border-radius: 10px;
            text-align: center;
            background: $color-background-d;
            font-family: Helvetica;
            .item{
                padding: 3px;
                line-height: 1;
                color: $color-text-l;
                font-size: $font-size-small;
                &.current{
                    color: $color-theme;
                }
            }
        }
    }
</style>


