<template>
  <div class="player" v-show="playlist.length>0">
      <div class="normal-player" v-show="fullScreen">
          <div class="background">
              <img width="100%" height="100%" :src="currentSong.image" alt="">
          </div>
          <div class="top">
              <div class="back" @click="back">
                  <i class="icon-back"></i>
              </div>
              <h2 class="title" v-html="currentSong.name"></h2>
              <h2 class="subtitle" v-html="currentSong.singer"></h2>
          </div>
          <div class="middle">
              <div class="middle-l">
                  <div class="cd-wrapper">
                      <div class="cd" :class="cdCls">
                          <img class="image" :src="currentSong.image" alt="">
                      </div>
                  </div>
              </div>
          </div>
          <div class="bottom">
            <div class="progress-wrapper">
                <span class="time time-l">{{format(currentTime)}}</span>
                <div class="progress-bar-wrapper">
                    <progress-bar @percentChange="onProgressBarChange" :percent="percent"></progress-bar>
                </div>
                <span class="time time-r">{{format(currentSong.duration)}}</span>
            </div>
            <div class="operators">
                <div class="icon icon-left" @click="changePlayMode">
                    <i :class="iconMode"></i>
                </div>
                <div class="icon icon-left" :class="disableCls"  @click="prev">
                    <i class="icon-prev"></i>
                </div>
                <div class="icon icon-middle" :class="disableCls" @click="togglePlay">
                    <i :class="playIcon"></i>
                </div>
                <div class="icon icon-right" :class="disableCls" @click="next">
                    <i class="icon-next"></i>
                </div>
                <div class="icon icon-right">
                    <i class="icon-not-favorite"></i>
                </div>
            </div>     
         </div>
      </div>
      <div class="mini-player" v-show="!fullScreen" @click="open">
          <div class="icon">
              <img :class="cdCls" width="40" height="40" :src="currentSong.image" alt="">
          </div>
          <div class="text">
              <h2 class="name" v-html="currentSong.name"></h2>
              <p class="desc" v-html="currentSong.singer"></p>
          </div>
          <div class="control" @click.stop="togglePlay">
             <i :class="miniPlayIcon" class="icon-mini"></i>
          </div>
          <div class="control">
              <i class="icon-playlist"></i>
          </div>
      </div>
      <audio ref="audio" 
             :src="currentSong.url" 
             @canplay="ready" 
             @error="error"
             @timeupdate="updateTime"
             @ended="end"
             >
             
     </audio>
  </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex';
import ProgressBar  from 'base/progress-bar/progress-bar';
import {playMode} from 'common/js/config';
import {shuffe} from 'common/js/util';
export default {
    data(){
        return {
            songReady:false,
            currentTime:0
        }
    },
    computed:{
        percent(){
            return this.currentTime/this.currentSong.duration;
        },
        disableCls(){
            return this.songReady?'':'disable'
        },
        cdCls(){
            return this.playing?'play':'play pause';
        },
        iconMode(){
            return this.mode===playMode.sequence?'icon-sequence':this.mode===playMode.loop?'icon-loop':'icon-random'
        },
        playIcon(){
            return this.playing?'icon-pause':'icon-play'
        },
        miniPlayIcon(){
            return this.playing?'icon-pause-mini':'icon-play-mini'
        },
        ...mapGetters([
            'playlist',
            'fullScreen',
            'currentSong',
            'playing',
            'currentIndex',
            'mode',
            'sequenceList'
        ])
    },
    methods:{
        back(){
            this.setFullScreen(false)  
        },
        open(){
            this.setFullScreen(true)
        },
         togglePlay(){
             if(!this.songReady){
                return
            }
            this.setPlaying(!this.playing)
        },
        changePlayMode(){
            let mode = (this.mode+1)%3;
            this.setMode(mode);
            let list =null;
            if(mode===playMode.random){
                list = shuffe(this.sequenceList)
            }else{
                list = this.sequenceList
            }
            this.restCurrentIndex(list)
            this.setPlaylist(list)
        },
        restCurrentIndex(list){
            let index = list.findIndex((item) => {
                return item.id===this.currentSong.id
            })
            if(index===-1){
                for(let i=0;i<list.length;i++){
                    if(list[i].id=97774){
                        console.log(list[i].name)
                    }
                }
            }
            this.setCurrentIndex(index)
        },
        end(){
            if(this.mode===playMode.loop){
                this.loop()
            }else{
                this.next()
            }
        },
        loop(){
            this.$refs.audio.currentTime =0;
            this.$refs.audio.play();
        },
        next(){
            if(!this.songReady){
                return
            }
            let index = this.currentIndex +1;
            if(index===this.playlist.length){
                index=1
            }
            this.setCurrentIndex(index)
            if(!this.playing){
                this.togglePlay()
            }
            this.songReady = false;
            
        },
        prev(){
             if(!this.songReady){
                return
            }
              let index = this.currentIndex -1;
            if(index===-1){
                index=this.playlist.length-1;
            }
            this.setCurrentIndex(index)
            if(!this.playing){
                this.togglePlay()
            }
            this.songReady = false;
        },
        ready(){
            this.songReady = true;
        },
        error(){
            this.songReady = true;
        },
        updateTime(e){
            this.currentTime = e.target.currentTime;
        },
        format(interval){
            interval = interval | 0;
            const mimute = interval/60 | 0;
            const second = this._pad(interval%60 | 0);
            return `${mimute}:${second}`;
        },
        onProgressBarChange(percent){
            this.$refs.audio.currentTime = percent*this.currentSong.duration;
            if(!this.playing){
                this.togglePlay()
            }
        },
        _pad(num,n=2){
            let len = num.toString().length;
            while(len<n){
                num = '0'+num
                len ++;
            }
            return num
        },
        ...mapMutations({
            setFullScreen:'SET_FULL_SCREEN',
            setPlaying:'SET_PLAYING',
            setCurrentIndex:'SET_CURRENT_INDEX',
            setMode:'SET_PLAY_MODE ',
            setPlaylist:'SET_PLAY_LIST',
        })
    },
    watch:{
        currentSong(newSong,oldSong){
            if(newSong.id===oldSong.id){
                return;
            }
            this.$nextTick(() => {
                this.$refs.audio.play();
            })
        },
        playing(newPlaying){
            let audio = this.$refs.audio;
            this.$nextTick(() => {
                newPlaying?audio.play():audio.pause()
            })
        }
    },
    components:{
        ProgressBar
    }
}
</script>
<style lang="scss" scoped>
    @import '~common/style/variable';
    @import '~common/style/mixin';
    .player{
        .normal-player{
            position: fixed;
            left:0;
            right:0;
            top:0;
            bottom:0;
            z-index:150;
            background-color: $color-background;
            .background{
                position: absolute;
                left:0;
                top:0;
                width:100%;
                height:100%;
                z-index:-1;
                opacity: .6;
                filter: blur(20px)
            }
             .top{
                    position: relative;
                    margin-bottom: 25px;
                    .back{
                        position: absolute;
                        top:0;
                        left:6px;
                        z-index:50;
                        .icon-back{
                            display: block;
                            padding: 9px;
                            font-size: $font-size-large-x;
                            color: $color-theme;
                            transform: rotate(-90deg);
                        }
                    }
                    .title{
                            width: 70%;
                            margin: 0 auto;
                            line-height: 40px;
                            text-align: center;
                            @include no-wrap();
                            font-size: $font-size-large;
                            color: $color-text;
                        }
                    .subtitle{
                        line-height: 20px;
                        text-align: center;
                        font-size: $font-size-medium;
                        color: $color-text;
                    }    
                }
                .middle{
                    position: fixed;
                    width: 100%;
                    top: 80px;
                    bottom: 170px;
                    white-space: nowrap;
                    font-size: 0;
                    .middle-l{
                        display: inline-block;
                        vertical-align: top;
                        position: relative;
                        width: 100%;
                        height: 0;
                        padding-top: 80%;
                        .cd-wrapper{
                             position: absolute;
                             left: 10%;
                             top: 0;
                             width: 80%;
                             height: 100%;
                             .cd{
                                 &.play{
                                     animation: rotate 20s linear infinite;
                                 }
                                 &.pause{
                                     animation-play-state: paused
                                 }
                                    width: 100%;
                                    height: 100%;
                                    box-sizing: border-box;
                                    border: 10px solid rgba(255, 255, 255, 0.1);
                                    border-radius: 50%;
                                    .image{
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        width: 100%;
                                        height: 100%;
                                        border-radius: 50%;
                                    }
                             }
                        }
                        
                    }
                }
                .bottom{
                    position: absolute;
                    bottom:50px;
                    width:100%;
                    .progress-wrapper{
                        display:flex;
                        align-items: center;
                        width:80%;
                        margin:0 auto;
                        padding:10px 0;
                        .time{
                            color: $color-text;
                            font-size: $font-size-small;
                            flex: 0 0 30px;
                            line-height: 30px;
                            width: 30px;
                            &.time-l{
                                text-align: left;
                            }
                            &.time-r{
                                text-align: right;
                            }
                        }
                        .progress-bar-wrapper{
                            flex:1;
                        }
                    }
                    .operators{
                        display:flex;
                        align-items: center;
                        .icon{
                            flex:1;
                            color: $color-theme;
                            &.disable{
                                color: $color-theme-d;
                            }
                            i{
                                font-size:30px;
                            }
                        }
                        .icon-left{
                            text-align: right;
                        }
                        .icon-middle{
                            padding:0 20px;
                            text-align: center;
                            i{
                                font-size: 40px;
                            }
                        }
                        .icon-right{
                            text-align: left;
                        }
                    }
                }
        }
        .mini-player{
            display: flex;
            align-items: center;
            position: absolute;
            left:0;
            right:0;
            bottom:0;
            z-index:180;
            height:60px;
            background-color: $color-highlight-background;
            .icon{
                flex: 0 0 40px;
                width: 40px;
                padding: 0 10px 0 20px;
                img{
                    border-radius: 50%;
                    &.play{
                        animation: rotate 20s linear infinite;
                    }
                    &.pasue{
                        animation-play-state: paused;
                    }
                }
            }
            .text{
                display: flex;
                flex-direction: column;
                justify-content: center;
                flex: 1;
                line-height: 20px;
                overflow: hidden;
                .name{
                    margin-bottom: 2px;
                    @include no-wrap();
                    font-size: $font-size-medium;
                    color: $color-text;
                }
                .desc{
                     @include no-wrap();
                     font-size: $font-size-small;
                     color: $color-text-d;
                }
            }
            .control{
                flex: 0 0 30px;
                width: 30px;
                padding: 0 10px;
                .icon-playlist,.icon-play-mini,.icon-pause-mini{
                    font-size: 30px;
                    color: $color-theme-d;
                }
            }
        }
    }
    @keyframes rotate{
        0% {
            transform: rotate(0)
        }
        100%{
            transform: rotate(360deg)
        }
    }
</style>


