<template>
  <transition name="slide">
       <div class="singer-detail"></div>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex';
import {getSingerDetail,getSongVkey} from 'api/singer';
import {createSong} from 'common/js/song';
import {ERR_OK} from 'api/config';
export default {
  data(){
      return {
          songs:[]
      }
  },
  computed:{
      ...mapGetters([
          'singer'
      ])
  },
  created(){
     this._getSingerDetail() 
  },
  methods:{
      _getSingerDetail(){
          if(!this.singer.id){
              this.$router.push({
                  path:'/singer'
              })
              return;
          }
          getSingerDetail(this.singer.id).then(res => {
              if(res.code === ERR_OK){
                 this.songs = this._normalizeSingerDetail(res.data.list)
                 console.log(this.songs)
              }
          })
      },
      _normalizeSingerDetail(list){
          let ret = [];
          list.forEach( (item,index) => {
              let {musicData} = item
             if(musicData.songid && musicData.albummid){
                 getSongVkey(musicData.songmid).then(res => {
                     let Vkey = res.data.items[0].vkey
                     ret.push(createSong(musicData,Vkey))
                 })
             }
          })
          return ret;
      }
  }
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


