<template>
<section>
    <section id="result">
        <h2>Result</h2>
        <h2 id="result_text">{{this.result}}/100</h2>
    </section>
    <table>
        <tr>
            <th>Question</th>
            <th>Correct answer</th>
            <th>Your answer</th>
        </tr>
        <tr v-for="question in questions" v-bind:key="question.questionText">
            <td>{{question.questionText}}</td>
            <td>{{question.correctAnswer}}</td>
            <td style="background-color:lime" v-if="question.answeredCorrectly">{{question.selectedAnswer}}</td>
            <td style="background-color:red" v-else>{{question.selectedAnswer}}</td>
        </tr>
        <div id="last_row"></div>

    </table>
</section>
</template>

<script>
export default {
    name: 'QuizResult',
    props: {
        result: Number,
        questions: Array
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
table {
    border-radius: 10px;
    background-color: teal;
    margin: auto;
    margin-bottom: 20px;
    width: 90%;
    max-width: 100%;
    padding: 1%;
}

th {
    padding: 10px;
    font-size: 80%;
}

td {
    background-color: lightblue;
    font-size: small;
    padding: 10px;
}

#last_row {
    height: 30px;
}

#result {
    border: dashed 1px teal;
    width: 50%;
    margin: auto;
    margin-bottom: 40px;
    border-radius: 10px;
    background-color: lightblue;
}
</style>
