<template>
  <div id="app">
     <MHeader/>
     <tab/>
    <keep-alive>
    <router-view/>
     </keep-alive>
     <player/>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import Tab from './components/tab/tab'
import Player from './components/player/player'
export default {
  name: 'App',
  components:{
    MHeader,
    Tab,
    Player
  }
}
</script>

<style scoped lang="scss" >
</style>
