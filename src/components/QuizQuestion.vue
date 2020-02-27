<template>
<section v-if="this.question.questionText != null">
    <div id="question">
        <h1>{{ question.questionText }}</h1>
    </div>
    <h1>{{ this.statusText }}</h1>
    <div>
        <div id="options">
            <button v-on:click="onSelectAnswer(question.options[0], 'first')" id="first">
                {{ question.options[0] }}
            </button>
            <button v-on:click="onSelectAnswer(question.options[1], 'second')" id="second">
                {{ question.options[1] }}
            </button>
            <button v-on:click="onSelectAnswer(question.options[2], 'third')" id="third">
                {{ question.options[2] }}
            </button>
            <button v-on:click="onSelectAnswer(question.options[3], 'fourth')" id="fourth">
                {{ question.options[3] }}
            </button>
        </div>
    </div>
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
        onSelectAnswer(option, id) {
            this.disableButtons();
            let isCorrect = this.question.checkAnswer(option);
            let className = isCorrect ? "correct" : "wrong";
            document.getElementById(id).classList.add(className);
            this.statusText = isCorrect ? "Correct answer!" : "Wrong answer!";
            setTimeout(() => {
                this.$emit("update", option);
                document.getElementById(id).classList.remove(className);
                this.statusText = "Select an answer";
                this.enableButtons();
            }, 1000);
        },
        disableButtons() {
            document.querySelectorAll("button").forEach(b => b.classList.add("disabled"));
        },
        enableButtons() {
            document.querySelectorAll("button").forEach(b => b.classList.remove("disabled"));
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

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
