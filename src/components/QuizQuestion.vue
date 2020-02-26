<template>
<div>
    <h1>Question</h1>
    <div id="question">
        {{ question.question }}
    </div>
    <div >
        <div v-if="!question.options"> no datas!</div>
        <div id="options" v-else>
            <button v-on:click="onClick(question.options[0])" 
                    id="first">
                {{ question.options[0] }}
            </button>
            <button v-on:click="onClick(question.options[1])"
                    id="second">
                {{ question.options[1] }}
            </button>
            <button v-on:click="onClick(question.options[2])"
                    id="third">
                {{ question.options[2] }}
            </button>
            <button v-on:click="onClick(question.options[3])"
                    id="fourth">
                {{ question.options[3] }}
            </button>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'QuizQuestion',
  props:{
      question: Object
  },
  methods:{
      onClick(option){
          console.log("onClick event:", option);
          if(this.question.checkAnswer(option)){
            this.$emit("correct-answer");
          }
          else{
            this.$emit("wrong-answer");
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#options{
 display: grid;
 grid-template-columns: 50% 50%;
 grid-template-rows: auto auto;
}
#first{
    grid-column: 1;
    grid-row: 1;
}
#second{
    grid-column: 2;
    grid-row: 1;
}
#thid{
    grid-column: 1;
    grid-row: 2;
}
#fourth{
    grid-column: 2;
    grid-row: 2;
}
button{
    border-radius: 10px;
    position: relative;
    height: 50px;
    margin: 5px;
}
</style>
