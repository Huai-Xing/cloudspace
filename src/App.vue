<template>
  <div id="app">
    <pgHeader></pgHeader>
        <up></up>
    <pgFooter></pgFooter>
  </div>
</template>


<script>
import up from './components/UserProfile/UserProfileForm.vue';

export default {
  data() {
    return {
    }
  },
  // mtds
  methods: {

  },
  //Register Locally
  components: {
    'up': up,
  }
}
</script>


<style>

</style>
