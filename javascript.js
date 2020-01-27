var quizTimer = document.getElementById("secondsToDisplay")
var questionToDisplay = document.getElementById("questionDisplay")
var answersToDisplayA = document.getElementById("option1")
var answersToDisplayB = document.getElementById("option2")
var answersToDisplayC = document.getElementById("option3")
var answersToDisplayD = document.getElementById("option4")
var inQuiz = document.getElementById("inQuiz")
var starterButton = document.getElementById("starter")
var isCorrect = document.getElementById("answerFeedback")
var questionsArry = ["Question1", "Question 2", "Question 3"]
var questionsArryCounter = 1
var answersArry = [["1a", "1b", "1c", "1d"], ["2a", "2b", "2c", "2d"], ["3a", "3b", "3c", "3d"]]
var answersToDisplayCounter = 1
var correctAnswer = ["1", "4", "3"]
var correctAnswerCounter = 0
var timeLeft = 0
var submitEmail = document.getElementById("saveEmail")
var highscore = 0

quizTimer.textContent = "Time passed: " + timeLeft

starterButton.addEventListener("click", function(){
    document.getElementById("beforeQuiz").style.display = "None"
    document.getElementById("inQuiz").style.display = "Block"
    timeLeft = questionsArry.length * 15
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
        if(questionsArryCounter >= questionsArry.length){
        highscore = timeLeft
        timeLeft = 0
        console.log("done!")
        // console.log(questionsArryCounter)
        return
    }
    //checks if answer correct
    if(this.id.substring(6,7)===correctAnswer[correctAnswerCounter]){
        isCorrect.textContent = "Correct!"
    } else {
        isCorrect.textContent = "Wrong!"
        timeLeft = timeLeft - 15
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
          console.log("quiz over");
          return
      }
      timeLeft --
    }, 1000);
  }

submitEmail.addEventListener("click", saveUser)

function saveUser(){
    var user = {email: document.getElementById("emailInput").value, score: highscore,}
    localStorage.setItem("userHighscore",JSON.stringify(user))
    console.log(user)
}
//   //saves top 3 highscore
//   function saveHighscore(){
//     localStorage.getItem()
//     highScore = timeLeft
//   }
  
  
