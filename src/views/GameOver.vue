<template>
<div id="game_over">
    <header>
        <h1>Game over</h1>
        <div style="grid-column: 1">
            <h5>Category</h5>
            <p>{{ this.category }}</p>
        </div>
        <div style="grid-column: 2">
            <h5>Difficulty</h5>
            <p>{{ this.difficulty }}</p>
        </div>
    </header>
    <QuizResults v-bind:questions="questions" v-bind:result="result">
    </QuizResults>

    <section id="button_frame">
        <button v-on:click="onMainMenuClick">
            <h3>Back to main menu </h3>
        </button>
    </section>
    <footer>
        <p>Developed by Jarl-Idar Aasen, February 2020</p>
    </footer>
</div>
</template>

<script>
import QuizResults from "../components/QuizResults.vue";

export default {
    name: 'GameOver',
    data() {
        return {
            result: 0,
            category: "",
            difficulty: "",
            questions: []
        }
    },
    methods: {
        onMainMenuClick() {
            this.$router.push({
                name: 'MainMenu'
            });
        }
    },
    components: {
        QuizResults
    },
    mounted() {
        // Go back to main menu if not passed from the GamePlay component.
        if (this.$route.params.result) {
            this.result = this.$route.params.result;
            this.questions = this.$route.params.questions;
        } else
            this.$router.push({
                name: "MainMenu"
            });

        this.difficulty = sessionStorage.getItem("difficulty");
        this.category = sessionStorage.getItem("category");
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
button {
    border-radius: 10px;
    margin: auto;
    margin-top: 0px;
    margin-bottom: 20px;
    padding: 5px;
    border: inset 1px orange;
    background-color: orange;
    animation-name: growAnimation;
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-direction: alternate;
    animation-iteration-count: infinite;
}

@keyframes growAnimation {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(0.9);
    }
}

button:hover {
    border-color: red;
    background-color: red;
}

header {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto auto;
    font-size: x-large;
    font-weight: bolder;
}

header h1 {
    grid-column: 1 / span 2;
    margin: 0px;
}

header div {
    grid-row: 2;
}

header p {
    background-color: lightblue;
    border: solid 8px darkcyan;
    font-size: 80%;
    height: 60px;
    padding-top: 20px;
}

header h5 {
    margin: 0px;
    font-size: 120%;
}

section {
    font-size: x-large;
}

#game_over {
    background-color: darkcyan;
    border: dashed 1px white;
    border-radius: 20px;
    min-height: 90%;
    margin: auto;
}

footer {
    background: whitesmoke;
    padding: 10px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}

footer p {
    margin: 20px;
    font-weight: lighter;
    color: lightgray;
    vertical-align: center;
}
</style>
