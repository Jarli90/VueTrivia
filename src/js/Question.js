
class Question{
    set selectedAnswer(answer){
        this._selectedAnswer = answer;
        this.answeredCorrectly = this.checkAnswer(answer);
    }
    get selectedAnswer(){
        return this._selectedAnswer;
    }

    constructor(question){
        this.questionText = this.decode(question.question);
        this.correctAnswer = this.decode(question.correct_answer);
        this.wrongAnswers = question.incorrect_answers.map(a => this.decode(a));
        this.selectedAnswer = "";
        this.answeredCorrectly = false;
        this.options = [];
        this.randomizeOptions();
    }
    decode(encodedStr){
        let parser = new DOMParser;
        let dom = parser.parseFromString(
            '<!doctype html><body>' + encodedStr,
            'text/html');
    return dom.body.textContent;
    }
    randomizeOptions(){
        let correctIndex= Math.floor(Math.random() * 4); 
        let wrong = [...this.wrongAnswers];
        for(let i=0; i< 4; i++){
            if(i == correctIndex)
                this.options.push(this.correctAnswer);
            else
                this.options.push(wrong.pop());
        }
    }
    checkAnswer(answer){
        return(this.correctAnswer == answer);
    }
}

export default Question;