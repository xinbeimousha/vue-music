<template>
  <div class="song-list">
      <ul>
          <li @click="selectItem(item,index)" class="item" v-for="(item,index) in songs">
              <div class="content">
                  <div class="name">{{item.name}}</div>
                  <div class="desc">{{getDesc(item)}}</div>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  props:{
      songs:{
          type:Array,
          default:[]
      }
  },
  methods:{
       selectItem(item,index){
           this.$emit('select',item,index)
       },
       getDesc(song) {
        return `${song.singer}·${song.album}`
      }
  },
}
</script>
<style scoped lang="scss">
    @import '~common/style/variable';
    @import "~common/style/mixin";
    .song-list{
        .item{
            display: flex;
            align-items: center;
            box-sizing: border-box;
            height: 64px;
            font-size: $font-size-medium;
            .content{
                flex:1;
                line-height:20px;
                overflow: hidden;
                .name{
                   @include no-wrap();
                   color:$color-text;
                }
                .desc{
                    @include no-wrap();
                    margin-top:4px;
                    color: $color-text-d;
                }
            }
        }
    }
</style>


