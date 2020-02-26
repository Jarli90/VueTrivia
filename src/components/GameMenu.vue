<template>
    <article>
            <header>
                <h1>Welcome to Vue Trivia!</h1>
            </header>
            <section id="main_menu">
                <section id="categories">
                    <h3>Select Category:</h3>
                    <select v-model="selectedCategory">
                        <option disabled value="">Select category</option>
                        <option v-for="category in availableCategories"
                                v-bind:value="category.id"
                                v-bind:key="category.id">
                                {{category.name}}
                        </option>
                    </select>
                </section>
                <section id="difficulty">
                    <h3>Select difficulty:</h3>
                    <select v-model="selectedDifficulty">
                        <option value="" disabled>Select difficulty</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </section>
                <button v-on:click="onStartGameClick">Start Quiz!</button>
                <p>{{ selectedDifficulty.toLowerCase() }}</p>
            </section>
            <footer>
                <p>Developed by Jarl-Idar Aasen, February 2020</p>
            </footer>
    </article>
</template>

<script>
import Axios from 'axios';
export default {
  name: 'GameMenu',
  data(){
      return{
          selectedDifficulty: "",
          selectedCategory: "",
          availableCategories: []
      }
  },
  mounted(){
      let self = this;
      Axios.get("https://opentdb.com/api_category.php")
      .then((res) => {
          console.log(res.data);
          self.availableCategories = res.data.trivia_categories;
      } );
  },
  methods:{
    onStartGameClick(){
        this.$router.push(
            {   name: "Game", 
                params: {category: this.selectedCategory,  
                        difficulty: this.selectedDifficulty}
            });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
    background: lightblue;
    height: 15%;
}
.main_menu{
    height: 70%;
}

footer{
    background: whitesmoke;
    height: 15%;
}
footer p{
    font-weight: lighter;
    color: lightgray;
}
article{
    height: 100%;
}
</style>
