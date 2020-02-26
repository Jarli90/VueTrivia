<template>
<div>
    <div>
        Game over
    </div>
    <div>
        <QuizResult v-bind:result="this.result"></QuizResult>
    </div>
    <div>
        <button v-on:click="onClick">
            Back to start
        </button>
    </div>
</div>
</template>

<script>
import QuizResult from "./QuizResult.vue";

export default {
  name: 'GameOver',
  data() {
      return {
        result: 0
      }
  },
  components:{
      QuizResult
  },
  methods:{
      onClick(){
        this.$router.push({name:'MainMenu'})
      }
  },
  mounted(){
      this.result=this.$route.params.result;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
