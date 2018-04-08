<template>
    <transition name="slide"> 
        <music-list :title="title" :bgImg="bgImg" :songs="songs"></music-list>
    </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list';
import {getSongList} from 'api/recommend';
import {getSongVkey} from 'api/singer';
import {createSong} from 'common/js/song';
import {ERR_OK} from 'api/config'
import {mapGetters} from 'vuex';
export default {
    data(){
        return {
            songs:[]
        }
    },
    computed:{
        title(){
            return this.disc.dissname
        },
        bgImg(){
            return this.disc.imgurl
        },
        ...mapGetters([
            'disc'
        ])
    },
    created(){
        this._getSongList()
    },
    methods:{
        _getSongList(){
            if(!this.disc.dissid){
                this.$router.push({
                    path:'/recommend'
                })
                return;
            }
            getSongList(this.disc.dissid).then(res => {
               if(res.code===ERR_OK){
                   this.songs=this._normalizeSongList(res.cdlist[0].songlist);
               }
            }) 
        },
        _normalizeSongList(list){
            let ret = []
            list.forEach(musicData => {
                if(musicData.songid && musicData.albummid){
                    getSongVkey(musicData.songmid).then(res => {
                        let Vkey = res.data.items[0].vkey;
                        ret.push(createSong(musicData,Vkey))
                    })
                }
            })
            return ret
        }
    },
    components:{
        MusicList
    }
}
</script>
<style lang="scss" scoped>
    .slide-enter-active,.slide-leave-active{
        transition: all .3s;
    }
    .slide-enter,.slide-leave-to{
        transform: translateX(100%)
    }
</style>


