<template>
  <transition name="slide">
      <music-list :title="title" :bgImg="bgImg" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>
<script>
    import MusicList from 'components/music-list/music-list';
    import {mapGetters} from 'vuex';
    import {getMusicList} from 'api/rank';
    import {getSongVkey} from 'api/singer';
    import {ERR_OK} from 'api/config';
    import {createSong} from 'common/js/song';
export default {
    data(){
        return {
            songs:[],
        }
    },
    computed:{
        bgImg(){
         return this.topList.picUrl;
        },
        title(){
            return this.topList.topTitle
        },
        ...mapGetters([
            'topList'
        ])
    },
    created(){
        this._getMusicList();
        this.rank = true;
    },
    methods:{
        _getMusicList(){
            getMusicList(this.topList.id).then(res => {
                if(res.code===ERR_OK){
                    this.songs = this._normalizeMusicList(res.songlist)
                }
            })
        },
        _normalizeMusicList(list){
            let ret = [];
            list.forEach(item => {
                const musicData = item.data;
                if(musicData.songid && musicData.albummid){
                getSongVkey(musicData.songmid).then(res => {
                    if(res.code === ERR_OK){
                         let Vkey = res.data.items[0].vkey
                     ret.push(createSong(musicData,Vkey))
                    }
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
    .slide-enter-active,.slide-leave-active{
        transition: all .3s
    }
    .slide-enter,.slide-leave-to{
        transform: translateX(100%)
    }
</style>


