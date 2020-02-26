<template>
<div><p>Result: {{this.result}}</p></div>
</template>

<script>
export default {
  name: 'QuizResult',
  props:{
    result: Number
  },
  mounted(){
    this.result = 0;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
