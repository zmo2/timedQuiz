var quizTimer = document.getElementById("secondsToDisplay")
var questionToDisplay = document.getElementById("questionDisplay")
var answersToDisplayA = document.getElementById("option1")
var answersToDisplayB = document.getElementById("option2")
var answersToDisplayC = document.getElementById("option3")
var answersToDisplayD = document.getElementById("option4")
var inQuiz = document.getElementById("inQuiz")
var restartButton = document.getElementById("homePage")
var starterButton = document.getElementById("starter")
var isCorrect = document.getElementById("answerFeedback")
var questionsArry = ["Question 1. Which of the following is an Array?", "Question 2. What is === mean?" , "Question 3. what is ||?"]
var questionsArryCounter = 1
var answersArry = [["1", "Hello", "[1,2,3,4,5]", "1+1"], ["yes", "or", "absolute equal", "maybe"], ["eleven", "or", "for", "end"]]
var answersToDisplayCounter = 1
var correctAnswer = ["3", "3", "2"]
var correctAnswerCounter = 0
var timeLeft = 0
var submitEmail = document.getElementById("saveEmail")
var highscore = 0
var thirdScore = 0
var historicalHiscoreObj = [JSON.parse(localStorage.getItem("userHighscore"))]
var topScorerDisplay = document.getElementById("userHighscore")
var highscoreDisplay = document.getElementById("displayHighscore")
var clearHighscore = document.getElementById("clearHighscore")

quizTimer.textContent = "Time passed: " + timeLeft

restartButton.addEventListener("click", function(){
    location.reload(true);
})

clearHighscore.addEventListener("click", function(){
    localStorage.clear()
})

starterButton.addEventListener("click", function(){
    document.getElementById("beforeQuiz").style.display = "None"
    document.getElementById("inQuiz").style.display = "Block"
    timeLeft = questionsArry.length * 15
    // localStorage.clear()
    historicalHiscoreObj = JSON.parse(localStorage.getItem("userHighscore"))
    // console.log(historicalHiscoreObj)
    highscore = 0
    questionToDisplay.textContent = questionsArry[0]
    answersToDisplayA.textContent = answersArry[0][0]
    answersToDisplayB.textContent = answersArry[0][1]
    answersToDisplayC.textContent = answersArry[0][2]
    answersToDisplayD.textContent = answersArry[0][3]
    setTime()
})

answersToDisplayA.addEventListener("click", clickedButton)
answersToDisplayB.addEventListener("click", clickedButton)
answersToDisplayC.addEventListener("click", clickedButton)
answersToDisplayD.addEventListener("click", clickedButton)

function clickedButton(){
    //checks if answer correct
    if(this.id.substring(6,7)===correctAnswer[correctAnswerCounter]){
        isCorrect.textContent = "Correct!"
    } else {
        isCorrect.textContent = "Wrong!"
        console.log(timeLeft)
        timeLeft = timeLeft - 15
    }
    if(questionsArryCounter >= questionsArry.length){
        console.log(timeLeft)
        highscore = timeLeft
        // thirdScore = timeLeft
        timeLeft = 0
        return
    }
    console.log(questionsArryCounter + " " + questionsArry.length)
 
    // console.log(this.textContent)
    questionToDisplay.textContent = questionsArry[questionsArryCounter]
    questionsArryCounter ++
    answersToDisplayA.textContent = answersArry[answersToDisplayCounter][0]
    answersToDisplayB.textContent = answersArry[answersToDisplayCounter][1]
    answersToDisplayC.textContent = answersArry[answersToDisplayCounter][2]
    answersToDisplayD.textContent = answersArry[answersToDisplayCounter][3]
    answersToDisplayCounter ++
    correctAnswerCounter ++
}

function setTime() {
    var timerInterval = setInterval(function() {
    //   minutesDisplay.textContent = Math.floor(totalSeconds/60)
        secondsToDisplay.textContent = "Time passed: " + timeLeft
      if(timeLeft <= 0) {
          timeLeft = 0
          clearInterval(timerInterval);
          document.getElementById("inQuiz").style.display = "None"
          document.getElementById("afterQuiz").style.display = "Block"
          return
      }
      timeLeft --
    }, 1000);
  }

submitEmail.addEventListener("click", saveUser)

function saveUser(){
    
    console.log("old" + highscore)
    console.log(historicalHiscoreObj)
    if(historicalHiscoreObj === null){
        historicalHiscoreObj = [{email: document.getElementById("emailInput").value, score: highscore,}]
        localStorage.setItem("userHighscore", JSON.stringify(historicalHiscoreObj))
    }
    else{
        updateHighscore()
    }
    topScorerDisplay.textContent = "email: " + historicalHiscoreObj[0].email
    highscoreDisplay.textContent = "score: " + historicalHiscoreObj[0].score
    console.log(highscore)
}

// function to sort historical highscore 
// function sortScore(){
//     if(historicalHiscoreObj === null || historicalHiscoreObj.length<2){
//         return
//     }else {
//         for(i=0; i<historicalHiscoreObj.length; i++){
//             var temp = Object.value(historicalHiscoreObj)
//             temp.sort()
//         }
//     }

// }

function updateHighscore(){
            if(highscore > historicalHiscoreObj[0].score){
                historicalHiscoreObj[0].score = highscore
                historicalHiscoreObj[0].email = document.getElementById("emailInput").value
                localStorage.setItem("userHighscore", JSON.stringify(historicalHiscoreObj))
            }else{
            }
    }

  
