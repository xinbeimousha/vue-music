<template>
  <scroll :data="data" class="listview">
      <ul>
          <li class="list-group" v-for="group in data">
              <h1 class="list-group-title">{{group.title}}</h1>
              <ul>
                  <li class="list-group-item" v-for="item in group.items">
                      <img :src="item.avata" class="avatar" alt="">
                      <span class="name">{{item.name}}</span>
                  </li>
              </ul>
          </li>
      </ul>
      <div class="shortcutList">
          <ul>
              <li class="item" v-for="item in shortcutList">{{item}}</li>
          </ul>
      </div>
  </scroll>
</template>
<script>
 import Scroll from 'base/scroll/scroll';
export default {
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


