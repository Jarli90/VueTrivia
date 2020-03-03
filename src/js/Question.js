/**
 * Helper Class
 */
class Question{
    /**
     * Initializes properties from the data from opentdb.com
     * @param {Object} question Object from opentdb
     */
    constructor(question){
        this.questionText = decode(question.question);
        this.correctAnswer = decode(question.correct_answer);
        this.wrongAnswers = question.incorrect_answers.map(a => decode(a));
        this.selectedAnswer = "";
        this.answeredCorrectly = false;
        this.options = this.randomizeOptions();
    }
    set selectedAnswer(answer){
        this._selectedAnswer = answer;
        this.answeredCorrectly = (this.correctAnswer == answer);
    }
    get selectedAnswer(){
        return this._selectedAnswer;
    }
    /**
     * Creates a randomized list of answers
     */
    randomizeOptions(){
        let correctIndex= Math.floor(Math.random() * 4); 
        let wrong = [...this.wrongAnswers];
        let options = [];
        for(let i=0; i< 4; i++){
            if(i == correctIndex)
                options.push(this.correctAnswer);
            else
                options.push(wrong.pop());
        }
        return options;
    }
}
/**
 * Helper function to decode data returned from opentdb.com
 * @param {String} encodedStr 
 */
const decode = function(encodedStr){
    let parser = new DOMParser;
    let dom = parser.parseFromString(
        '<!doctype html><body>' + encodedStr,
        'text/html');
    return dom.body.textContent;
}
export default Question;