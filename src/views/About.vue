<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>num:{{$store.state.count}}</h2>
  </div>
</template>
<script>
  export default {
    name: 'about',
    created(){
      console.log("成功啦")
      this.$store.dispatch('incrementAsync', {
        amount: 10
      })
    }
  }
</script>