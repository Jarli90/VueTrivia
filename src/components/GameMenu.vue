<template>
    <article>
        <div style="height:100%" v-if="availableCategories.length != 0">
            <header>
                <h1>Welcome to Vue Trivia!</h1>
            </header>
            <section id="main_menu">
                <section v-if="availableCategories.length != 0" id="categories">
                    <h3>Select Category:</h3>
                    <select v-model="selectedCategory">
                        <option disabled value="">Select category</option>
                        <option v-for="category in availableCategories"
                                v-bind:value="category.id"
                                v-bind:key="category.id">
                                <p>{{category.name}}</p>
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
        </div>
        <div v-else>
            <h1>Loading...</h1>
        </div>
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
        if(this.selectedCategory || this.selectedDifficulty){
            this.$router.push(
                {   name: "Game", 
                    params: {category: this.selectedCategory,  
                            difficulty: this.selectedDifficulty}
                });
        }
        else{
            alert("Select category and difficulty!");
        }
        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
    background: lightblue;
    height: 15%;
    padding: 10px;
    margin-bottom: 0px !important;
}
header h1{
    margin:10px;
}
#main_menu{
    height: 60%;
    background-color: cadetblue;
    margin-top: 0px !important;
}

footer{
    background: whitesmoke;
    padding:10px;
}
footer p{
    margin:20px;
    font-weight: lighter;
    color: lightgray;
    vertical-align: center;
}
article{
    height: 100%;
}
select, option{
    background-color: lightblue;
    text-align: center;
}
select{
    width: 40%;
}
option p{
    text-align: center;
}
button{
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
    background-color: rgb(255, 102, 0);
    color: white;
}
</style>
