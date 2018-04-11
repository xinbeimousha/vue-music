<template>
  <div class="recommend" ref="recommend">
     <scroll ref="sroll" class="recommend-content" :data="discList">
        <div> 
         <div v-if="recommends.length" class="slider-wrapper">
             <slider>
                 <div v-for="item in recommends">
                 <a :href="item.linkUrl">
                     <img @load="imageLoad" :src="item.picUrl" alt="">
                 </a>
             </div>
             </slider>
         </div>
         <div class="recommend-list">
            <h1 class="list-title">热门推荐歌单</h1>
            <ul>
                <li v-for="item in discList" class="item" @click="selectItem(item)">
                    <div class="icon">
                        <img width="60" height="60" v-lazy="item.imgurl" alt="">
                    </div>
                    <div class="text">
                        <h2 class="name" v-html="item.creator.name"></h2>
                        <p class="desc" v-html="item.dissname"></p>
                    </div>
                </li>
            </ul>
         </div>
        </div>
          <div class="loading-container" v-show="!this.discList.length">
             <loading/>
         </div>
     </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import {getRecommend,getDiscList} from 'api/recommend';
import {ERR_OK} from 'api/config';
import Slider from 'base/slider/slider';
import Scroll from 'base/scroll/scroll';
import Loading from 'base/loading/loading';
import {mapMutations} from 'vuex';
import {playlistMixin} from 'common/js/mixin';
export default {
  mixins:[playlistMixin],
  data(){
      return {
          recommends:[],
          discList:[]
      }
  },
  created(){
      this._getRecommend();
      this._getDiscList();
  },
  methods:{
      handlePlaylist(playlist){
        const bottom = playlist.length>0?'60px':'';
        this.$refs.recommend.style.bottom = bottom;
        this.$refs.sroll.refresh();
      },
      selectItem(item){
          this.$router.push({
              path:`/recommend/${item.dissid}`
          })
          this.setDisc(item)
      },
      _getRecommend(){
        getRecommend().then(res => {
            if(res.code === ERR_OK){
                this.recommends = res.data.slider
            }
        })
      },
      _getDiscList(){
          getDiscList().then(res => {
              if(res.code ===ERR_OK){
                  this.discList = res.data.list
              }
          })
      },
      imageLoad(){
          if(!this.checkLoad){
              this.$refs.sroll.refresh()
          }
      },
      ...mapMutations({
          setDisc:'SET_DISC'
      })
  },
  components:{
      Slider,
      Scroll,
      Loading
  }
}
</script>
<style scoped lang="scss">
   @import '~common/style/variable';

    .recommend{
        position: fixed;
        width:100%;
        top:88px;
        bottom:0;
        .recommend-content{
            height:100%;
            overflow: hidden;
             .slider-wrapper{
                position: relative;
                width: 100%;
                overflow: hidden;

             }
             .recommend-list{
                 .list-title{
                    height: 65px;
                    line-height: 65px;
                    text-align: center;
                    font-size: $font-size-medium;
                    color: $color-theme;
                 }
                 .item{
                     display: flex;
                     align-items: center;
                     padding: 0 20px 20px 20px;
                     .icon{
                         flex: 0 0 60px;
                         width: 60px;
                         padding-right: 20px;
                     }
                     .text{
                         display: flex;
                         flex-direction: column;
                         line-height: 20px;
                         flex:1;
                         font-size: $font-size-medium;
                         overflow: hidden;
                         .name{
                             margin-bottom:20px;
                             color:$color-text;
                         }
                         .desc{
                             color:$color-text-d;
                         }
                     }
                 }
             }
        .loading-container{
            position: absolute;
            width:100%;
            top:50%;
            transform: translateY(-50%);
        }
        }
    }
    
</style>


