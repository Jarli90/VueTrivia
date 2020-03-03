<template>
<section v-if="question.questionText != null">
    <header id="question">
        <h1>{{ question.questionText }}</h1>
    </header>
    <h1>{{ this.statusText }}</h1>
    <section>
        <div id="options">
            <button v-on:click="onSelectAnswer($event, question.options[0])" id="first">
                {{ question.options[0] }}
            </button>
            <button v-on:click="onSelectAnswer($event, question.options[1])" id="second">
                {{ question.options[1] }}
            </button>
            <button v-on:click="onSelectAnswer($event, question.options[2])" id="third">
                {{ question.options[2] }}
            </button>
            <button v-on:click="onSelectAnswer($event, question.options[3])" id="fourth">
                {{ question.options[3] }}
            </button>
        </div>
    </section>
</section>
<section v-else>
    <h1>Loading Quiz...</h1>
</section>
</template>

<script>
export default {
    name: 'QuizQuestion',
    props: {
        question: Object
    },
    data() {
        return {
            statusText: "Select an answer"
        }
    },
    methods: {
        /**
         * Selected answer click handler
         * @param {Event} event event object passed from button
         * @param {String} answer selected answer
         */
        onSelectAnswer(event, answer) {
            this.question.selectedAnswer = answer;

            this.updateButtons(event.target);
            this.statusText = this.question.answeredCorrectly ? "Correct answer!" : "Wrong answer!";

            const oneSecond = 1000; //ms
            setTimeout(() => {
                this.$emit("update-game", this.question);

                this.statusText = "Select an answer";
                this.resetButtons(event.target);
            }, oneSecond);
        },
        /**
         * Updates button-styling to show correct or wrong answer, and disables buttons
         * @param {Button} selectedButton Button clicked 
         */
        updateButtons(selectedButton) {
            this.disableButtons();
            let className = this.question.answeredCorrectly ? "correct" : "wrong";
            selectedButton.classList.add(className);
        },
        /**
         * Resets button-styling, and enables buttons
         * @param {Button} selectedButton Button clicked 
         */
        resetButtons(selectedButton) {
            let className = this.question.answeredCorrectly ? "correct" : "wrong";
            selectedButton.classList.remove(className);
            this.enableButtons();
        },
        disableButtons() {
            document.querySelectorAll("button")
                .forEach(b => b.classList.add("disabled"));
        },
        enableButtons() {
            document.querySelectorAll("button")
                .forEach(b => b.classList.remove("disabled"));
        }
    }
}
</script>

<style scoped>
#options {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto auto;
}

#question {
    padding: 10px;
    background-color: lightblue;
    border-radius: 10px;
    margin: auto;
    height: 100px;
}

#first {
    grid-column: 1;
    grid-row: 1;
}

#second {
    grid-column: 2;
    grid-row: 1;
}

#thid {
    grid-column: 1;
    grid-row: 2;
}

#fourth {
    grid-column: 2;
    grid-row: 2;
}

button {
    border-radius: 10px;
    position: relative;
    height: 50px;
    margin: 5px;
    background-color: lightblue;
    border-color: lightblue;
}

button:hover {
    background-color: lightseagreen;
    border-color: lightseagreen;
}

button.correct {
    border-style: inset;
    border-color: lightgreen;
    background-color: lightgreen;
}

button.wrong {
    border-style: inset;
    border-color: red;
    background-color: red;
}

button.disabled {
    pointer-events: none;
}
</style>
