<template>
<section id="game_area">
    <h1>Gameplay</h1>
    <QuizQuestion v-bind:question="this.currentQuestion"
                v-on:correct-answer="updateGame(true)"
                v-on:wrong-answer="updateGame(false)">
    </QuizQuestion>
    <h1>Current score: {{ this.result }}</h1>
</section>
</template>

<script>
import QuizQuestion from "./QuizQuestion.vue";
import axios from "axios";

class Question{
    constructor(question){
        this.question = question.question;
        this.correct_answer = question.correct_answer;
        this.wrong_answers = question.incorrect_answers;
        this.options = [];
        this.randomizeOptions();
        console.log(this);
    }
    randomizeOptions(){
        let correctIndex= Math.floor(Math.random() * 4); 
        let wrong = [...this.wrong_answers];
        console.log(wrong);
        for(let i=0; i< 4; i++){
            if(i == correctIndex)
                this.options.push(this.correct_answer);
            else{
                this.options.push(wrong.pop());
            }  
        }
        console.log(this.options);
    }
    checkAnswer(answer){
        return(this.correct_answer == answer);
    }
}
let getQuestionIterator = function*(list){
        for(let item of list){
            yield item;
        }
    }


export default {
    name: 'GamePlay',
    data(){
        return {
            questions: [],
            questionsIterator: null,
            currentQuestion: {},
            result: 0
        }
    },
    methods: {
        updateGame(correctAnswer){
            if(correctAnswer){
                this.result += 10;
            }
            this.currentQuestion = this.questionsIterator.next().value;
            if(!this.currentQuestion){
                this.$router.push({
                    name:"GameOver",
                    params: {"result": this.result}});
            }
        }
    },
    mounted(){
        let self = this;
        console.log("params");
        console.log(this.$route.params);
        let {difficulty, category} =this.$route.params;
        let url = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty.toLowerCase()}&category=${category}&type=multiple`;
        console.log(url);
        axios.get(url).then(function (response) {
                self.questions = response.data.results.map(q => new Question(q));
                self.questionsIterator = getQuestionIterator(self.questions);
                self.currentQuestion = self.questionsIterator.next().value;
                console.log(self.currentQuestion);
            })
    },
  components: {
      QuizQuestion
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#game_area{
    background: lightgray;
}
</style>
