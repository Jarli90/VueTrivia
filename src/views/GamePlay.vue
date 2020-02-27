<template>
<section id="game_area">
    <h1>Question {{10-this.questions.length}}/10</h1>
    <section id="questionArea">
        <QuizQuestion v-bind:question="this.currentQuestion" v-on:update="updateGame">
        </QuizQuestion>
    </section>
</section>
</template>

<script>
import QuizQuestion from "../components/QuizQuestion.vue";
import axios from "axios";
import Question from "../js/Question.js";

export default {
    name: 'GamePlay',
    data() {
        return {
            // initialize array so header doesn't show 10/10 before start
            questions: new Array(10),
            answeredQuestions: [],
            currentQuestion: {},
            result: 0
        }
    },
    methods: {
        updateGame(answer) {
            this.currentQuestion.selectedAnswer = answer;
            let isCorrect = this.currentQuestion.answeredCorrectly;
            if (isCorrect)
                this.result += 10;

            this.answeredQuestions.push(this.currentQuestion);
            this.currentQuestion = this.questions.pop();

            if (!this.currentQuestion)
                this.endGame();
        },
        endGame() {
            this.$router.push({
                name: "GameOver",
                params: {
                    "result": this.result,
                    "questions": this.answeredQuestions
                }
            });
        }
    },
    mounted() {
        let self = this;
        let params = this.$route.params;
        // If no params are passed, the game returns to the main menu
        if (Object.entries(params).length === 0 && params.constructor === Object)
            this.$router.push({
                name: "MainMenu"
            });

        let {
            difficulty,
            category
        } = params;
        let url = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty.toLowerCase()}&category=${category.id}&type=multiple`;
        axios.get(url).then(function (response) {
            self.questions = response.data.results.map(q => new Question(q));
            self.currentQuestion = self.questions.pop();
        });
    },
    components: {
        QuizQuestion
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#game_area {
    width: 80%;
    margin: auto;
    border: dashed 1px white;
    border-radius: 20px;
    background-color: darkcyan;
    height: 80%
}

#questionArea {
    width: 80%;
    margin: auto;
    border: dashed 1px white;
    border-radius: 20px;
    padding: 30px;
    background-color: cadetblue;
}
</style>
