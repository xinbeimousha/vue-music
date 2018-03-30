<template>
  <transition name="slide">
       <music-list :songs="songs" :bgImg="bgImg" :title="title"></music-list>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex';
import {getSingerDetail,getSongVkey} from 'api/singer';
import {createSong} from 'common/js/song';
import {ERR_OK} from 'api/config';
import MusicList from 'components/music-list/music-list';
export default {
  data(){
      return {
          songs:[]
      }
  },
  computed:{
      title(){
          return this.singer.name;
      },
      bgImg(){
          return this.singer.avata;
      },
      ...mapGetters([
          'singer'
      ]),
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
  },
  components:{
      MusicList
  }
}
</script>
<style lang="scss" scoped>
    @import '~common/style/variable';
    .slide-enter-active,.slide-leave-active{
        transition: all .3s
    }
    .slide-enter,.slide-leave-to{
        transform: translateX(100%);
    }
</style>


