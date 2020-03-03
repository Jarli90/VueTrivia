<template>
<article>
    <div id="loadWrapper" v-if="availableCategories.length != 0">
        <header>
            <h1>Welcome to Vue Trivia!</h1>
        </header>
        <section id="main_menu">
            <div id="menu">
                <section required v-if="availableCategories.length != 0" id="categories">
                    <h3>Category:</h3>
                    <select v-model="selectedCategory">
                        <option hidden disabled>Select category</option>
                        <option v-for="category in availableCategories" v-bind:value="category" v-bind:key="category.id">
                            {{category.name}}
                        </option>
                    </select>
                </section>
                <section id="difficulty">
                    <h3>Difficulty:</h3>
                    <select v-model="selectedDifficulty">
                        <option hidden disabled>Select difficulty</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </section>
                <button id="start_button" v-on:click="onStartGameClick">Make selections</button>
            </div>
        </section>
        <footer>
            <p>Developed by Jarl-Idar Aasen, February 2020</p>
        </footer>
    </div>
    <div id="loader" v-else>
        <h1>Loading...</h1>
    </div>
</article>
</template>

<script>
import Axios from 'axios';
export default {
    name: 'GameMenu',
    data() {
        return {
            selectedDifficulty: "Select difficulty",
            selectedCategory: "Select category",
            availableCategories: []
        }
    },
    created() {
        this.fetchCategories();
    },
    watch: {
        'selectedDifficulty': function (difficulty) {
            sessionStorage.setItem("difficulty", difficulty);
            if (this.selectedCategory != "Select category" 
                && this.selectedDifficulty != "Select difficulty")
                this.enableStartGameButton();
        },
        'selectedCategory': function (category) {
            sessionStorage.setItem("category", category.name);
            if (this.selectedCategory != "Select category" 
                && this.selectedDifficulty != "Select difficulty")
                this.enableStartGameButton();
        }
    },
    methods: {
        /**
         * Fetches categories from opentdb.com
         */
        fetchCategories(){
            let self = this;
            Axios.get("https://opentdb.com/api_category.php")
                .then((res) => {
                    self.availableCategories = res.data.trivia_categories;
                })
                .catch((err) => console.log("Error while fetching categories:", err));  
        },
        /**
         * Checks if category and difficulty is selected
         */
        onStartGameClick() {
            if (this.selectedCategory.name && this.selectedDifficulty)
                this.startGame();
            else
                alert("Select category and difficulty!");
        },
        /**
         * Starts game
         */
        startGame(){
            this.$router.push({
                name: "Game",
                params: {
                    category: this.selectedCategory,
                    difficulty: this.selectedDifficulty
                }
            });
        },
        /**
         * Enables button if difficulty and category is selected
         */
        enableStartGameButton() {
                let button = document.getElementById("start_button");
                button.classList.add("ready");
                button.innerText = "Start game!";
        }
    }
}
</script>

<style scoped>
header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border: solid 0px black;
    background: lightblue;
    height: 15%;
    padding: 10px;
    margin-bottom: 0px !important;
}

header h1 {
    margin: 10px;
}

#loadWrapper {
    width: 90%;
    margin: auto;
    height: 100%;
}

#menu {
    margin: auto;
    border-radius: 10px;
    width: 400px;
    align-self: center;
    border: dashed 1px lightblue;
}

#main_menu {
    height: 60%;
    background-color: cadetblue;
    padding-top: 3%;
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
}

article {
    height: 100%;
}

select,
option {
    background-color: lightblue;
}

button {
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
    background-color: lightgray;
    border: inset 1px lightgray;
    color: black;
}

button.ready:hover {
    background-color: orangered;
    border-color: orangered;
}

button.ready {
    background-color: orange;
    border: inset 1px orange;
    color: white;
    animation-name: buttonAnimation;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-direction: alternate;
    animation-iteration-count: infinite;
}

@keyframes buttonAnimation {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.1);
    }
}

#loader {
    position: relative;
    top: 40%;
}
</style>
