<template>
  <div>
    <MainNavigationPanel/>
    <router-view></router-view>
  </div>
</template>

<script>
import MainNavigationPanel from '../components/NavPanel';

export default {
  name: 'mainlayout',
  components: {
    MainNavigationPanel,
  },
  data: () => ({
    
  }),
   created: function () {
      
      
    }
   
};
</script>
<style  scoped>
 
</style>