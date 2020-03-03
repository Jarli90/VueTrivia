<template>
<section id="game_area">
    <h1>Question {{10-this.questions.length}}/10</h1>
    <section id="questionArea">
        <QuizQuestion v-bind:question="this.currentQuestion" v-on:update-game="onUpdateGame">
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
            currentQuestion: {}
        }
    },
    /**
     * Checks that params are present, and initializes the game or return to the main menu
     */
    created() {
        let params = this.$route.params;

        // Checks params sent from GameMenu
        if (Object.entries(params).length === 0 
            || !params.difficulty 
            || !params.category
        )
            this.toMainMenu();
        else
            this.fetchQuestions(params);
    },
    methods: {
        /**
         * Updates answered questions and ends game if there are no more questions
         * @param {String} answer String containing the selected answer from QuizQuestion
         */
        onUpdateGame(question) {
            this.answeredQuestions.push(question);

            //Display next question to screen
            this.currentQuestion = this.questions.pop();

            if (!this.currentQuestion)
                this.endGame();
        },
        /**
         * Ends the game and routes to the GameOver component
         */
        endGame() {
            this.$router.push({
                name: "GameOver",
                params: {
                    "questions": this.answeredQuestions
                }
            });
        },
        /**
         * Routes to Main Menu
         */
        toMainMenu(){
            this.$router.push({
                name: "MainMenu"
            });
        },
        /**
         * Fetches the questions from opentdb.com
         * @param {Object} params parameters passed from the GameMenu component
         */
        fetchQuestions(params){
            let {
                difficulty,
                category
            } = params;
            let self = this;
            let url = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty.toLowerCase()}&category=${category.id}&type=multiple`;
            axios.get(url)
                .then(function (response) {
                    self.questions = response.data.results.map(q => new Question(q));
                    self.currentQuestion = self.questions.pop();
                })
                .catch((err) => console.log("Error while fetching questions:", err));
        }
    },
    components: {
        QuizQuestion
    }
}
</script>

<style scoped>
#game_area {
    width: 80%;
    margin: auto;
    border: dashed 1px white;
    border-radius: 20px;
    background-color: darkcyan;
    padding-bottom: 3%;
    /* height: 80% */
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
