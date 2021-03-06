<template>
  <div class="music-list">
      <div class="back" @click="back">
          <i class="icon-back"></i>
      </div>
      <h1 class="title" v-html="title"></h1>
      <div class="bg-image" :style="bgStyle" ref="bgImg">
          <div class="play-wrapper">
              <div ref="playBtn" @click="random" v-show="songs.length>0" class="play">
                  <i class="icon-play"></i>
                  <span class="text">随机播放全部</span>
              </div>
          </div>
          <div class="filter"></div>
      </div>
      <div class="bg-layer" ref="layer"></div>
     <scroll class="list" 
              ref="list"
              :data="songs"
              :probeType="probeType"
              :listenScroll="listenScroll" 
              @scroll="scroll"
              >
          <div class="song-list-wrapper">
            <song-list @select="selectItem" :songs="songs" :rank="rank"></song-list>   
         </div>
         <div class="loading-container" v-show="!songs.length">
             <loading/>
         </div>
     </scroll>    
  </div>
</template>
<script>
import SongList from 'base/song-list/song-list';
import Scroll from 'base/scroll/scroll';
import Loading from 'base/loading/loading';
import {prefixStyle} from 'common/js/dom';
import {mapActions} from'vuex';
import {playlistMixin} from 'common/js/mixin';
const RESERVED_HEIGHT = 44;
const transform = prefixStyle('transform')
export default {
    mixins:[playlistMixin],
    props:{
        bgImg:{
            type:String,
            default:''
        },
        songs:{
            type:Array,
            default:[]
        },
        title:{
            type:String,
            default:''
        },
        rank:{
            type:Boolean,
            default:false
        },
    },
    data(){
        return {
            scrollY:0
        }
    },
     computed:{
        bgStyle(){
            return `background-image:url(${this.bgImg})`;
        }
    },
    methods:{
        handlePlaylist(playlist){
            const bottom = playlist.length>0?'60px':'';
            this.$refs.list.$el.style.bottom = bottom;
            this.$refs.list.refresh();
        },
        selectItem(item,index){
            this.selectPlay({
                list:this.songs,
                index
            })
        },
        back(){
            this.$router.back();
        },
        scroll(pos){
            this.scrollY = pos.y;
        },
        random(){
            this.randomPlay({
                list:this.songs
            })
        },
        ...mapActions(
            ['selectPlay','randomPlay']
        )
    },
    created(){
        this.probeType = 3;
        this.listenScroll = true;
    },
    mounted(){
        this.imageHeight= this.$refs.bgImg.clientHeight;
        this.minTranslateY = RESERVED_HEIGHT-this.imageHeight;
        this.$refs.list.$el.style.top = `${this.imageHeight}px`;
    },
    watch:{
        scrollY(newY){
            let translateY = Math.max(this.minTranslateY,newY)
            let zIndex = 0;
            let scale = 1;
            const percent = Math.abs(newY / this.imageHeight)
             if(newY>0){
                 scale = 1+percent;
                 zIndex =10;
            }
            this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
            if(newY<this.minTranslateY){
                zIndex = 10
                this.$refs.bgImg.style.paddingTop = 0;
                this.$refs.bgImg.style.height = `${RESERVED_HEIGHT}px`
                this.$refs.playBtn.style.display = 'none'
            }else{
                this.$refs.bgImg.style.paddingTop = '70%';
                this.$refs.bgImg.style.height = 0;
                this.$refs.playBtn.style.display = ''
            }
            this.$refs.bgImg.style.zIndex = zIndex;
            this.$refs.bgImg.style[transform] = `scale(${scale})`;
        }
    },
    components:{
        SongList,
        Scroll,
        Loading
    }
}
</script>
<style scoped lang="scss">
    @import '~common/style/variable';
    .music-list{
        position: fixed;
        left:0;
        right:0;
        top:0;
        bottom: 0;
        z-index: 100;
        background-color: $color-background;
        .back{
            position: absolute;
            top:0;
            left:6px;
            z-index:50;
            .icon-back{
                display: block;
                padding:10px;
                font-size: $font-size-large-x;
                color: $color-theme;
            }
        }
        .title{
            position: absolute;
            left:10%;
            width:80%;
            text-align: center;
            z-index: 50;
            line-height: 44px;
            font-size: $font-size-large;
            color: $color-text;
        }
        .bg-image{
           position: relative;
           width:100%;
           height:0;
           padding-top:70%;
           transform-origin: top;
           background-size:cover;
           .filter{
               position: absolute;
               left:0;
               right:0;
               top:0;
               bottom:0;
               background-color: rgba(0,0,0,.6)
           }
           .play-wrapper{
               position:absolute;
               width:100%;
               z-index:50;
               bottom:20px;
               .play{
                   width:137px;
                   padding:7px 0;
                   margin:0 auto;
                   text-align: center;
                   border: 1px solid $color-theme;
                   color: $color-theme;
                   border-radius: 100px;
                   .icon-play{
                       display: inline-block;
                        vertical-align: middle;
                         margin-right: 6px;
                        font-size: $font-size-medium-x;
                   }
                   .text{
                       display: inline-block;
                       font-size: $font-size-small;
                       vertical-align: middle;
                   }
               }
           }
        }
        .bg-layer{
            height:100%;
            position: relative;
            background: $color-background;
        }
        .list{
            position: fixed;
            top:0;
            bottom:0;
            width:100%;
            background: $color-background;
            .song-list-wrapper{
                padding:20px 30px;
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



