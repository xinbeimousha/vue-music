<template>
  <div id="app">
     <MHeader/>
     <tab/>
    <keep-alive>
    <router-view/>
     </keep-alive>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import Tab from './components/tab/tab'
export default {
  name: 'App',
  components:{
    MHeader,
    Tab
  }
}
</script>

<style scoped lang="scss" >
   @import 'common/style/variable';
   #app {
     color:$color-theme;
   }
      
</style>
