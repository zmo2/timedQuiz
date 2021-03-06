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
var historicalHiscoreObj = []
var topScorerDisplay = document.getElementById("userHighscore")
var clearHighscore = document.getElementById("clearHighscore")
var submitEmail = document.getElementById("saveEmail")
var questionsArry = ["Question 1. Which of the following is an Array?", "Question 2. What is === mean?" , "Question 3. what is ||?"]
var questionsArryCounter = 1
var answersArry = [["1", "Hello", "[1,2,3,4,5]", "1+1"], ["yes", "or", "absolute equal", "maybe"], ["eleven", "or", "for", "end"]]
var answersToDisplayCounter = 1
var correctAnswer = ["3", "3", "2"]
var correctAnswerCounter = 0
var timeLeft = 0
var lowScore = 0
var highscore = 0

//display timer
// quizTimer.textContent = "Time Remaining: " + timeLeft

//initialize/setup the quiz and start the timer
starterButton.addEventListener("click", function(){
    document.getElementById("beforeQuiz").style.display = "None"
    inQuiz.style.display = "Block"
    timeLeft = questionsArry.length * 15
    historicalHiscoreObj = JSON.parse(localStorage.getItem("userHighscore"))
    highscore = 0
    questionToDisplay.textContent = questionsArry[0]
    answersToDisplayA.textContent = answersArry[0][0]
    answersToDisplayB.textContent = answersArry[0][1]
    answersToDisplayC.textContent = answersArry[0][2]
    answersToDisplayD.textContent = answersArry[0][3]
    setTime()
})

//quiz mc options
answersToDisplayA.addEventListener("click", clickedButton)
answersToDisplayB.addEventListener("click", clickedButton)
answersToDisplayC.addEventListener("click", clickedButton)
answersToDisplayD.addEventListener("click", clickedButton)

//function that checks if answer is correct on MC, checks if end of quiz 
function clickedButton(){
    //checks if answer correct
    if(this.id.substring(6,7)===correctAnswer[correctAnswerCounter]){
        isCorrect.textContent = "Correct!"
        } else {
            isCorrect.textContent = "Wrong!"
            timeLeft = timeLeft - 15
        }
        if(questionsArryCounter >= questionsArry.length){
            highscore = timeLeft
            timeLeft = 0
            return
        }
        //updates counter and moves to next question
        questionToDisplay.textContent = questionsArry[questionsArryCounter]
        questionsArryCounter ++
        answersToDisplayA.textContent = answersArry[answersToDisplayCounter][0]
        answersToDisplayB.textContent = answersArry[answersToDisplayCounter][1]
        answersToDisplayC.textContent = answersArry[answersToDisplayCounter][2]
        answersToDisplayD.textContent = answersArry[answersToDisplayCounter][3]
        answersToDisplayCounter ++
        correctAnswerCounter ++
    }

    //function to keep track of timer
function setTime() {
    var timerInterval = setInterval(function() {
    //   minutesDisplay.textContent = Math.floor(totalSeconds/60)
        secondsToDisplay.textContent = "Time remaining: " + timeLeft
      if(timeLeft <= 0) {
          timeLeft = 0
          clearInterval(timerInterval);
          inQuiz.style.display = "None"
          document.getElementById("afterQuiz").style.display = "Block"
          return
      }
      timeLeft --
    }, 1000);
  }

  //collects user email and checks if should be added to highscore
submitEmail.addEventListener("click", saveUser)

// resets the page back to intro page
restartButton.addEventListener("click", function(){
    location.reload(true);
})

//clears highscores from local storage
clearHighscore.addEventListener("click", function(){
    localStorage.clear()
})

//saves the highscore if applicable
function saveUser(){
    if(historicalHiscoreObj === null){
        historicalHiscoreObj = [{email: document.getElementById("emailInput").value, score: highscore,}]
        localStorage.setItem("userHighscore", JSON.stringify(historicalHiscoreObj))
    } else if(historicalHiscoreObj.length<3){
        historicalHiscoreObj[historicalHiscoreObj.length] = {email: document.getElementById("emailInput").value, score: highscore,}
        localStorage.setItem("userHighscore", JSON.stringify(historicalHiscoreObj))
    }
    else{
        sortHighscore()
        updateHighscore()
    }
    for (i=0;i<historicalHiscoreObj.length;i++){
        finalHighscores = finalHighscores + historicalHiscoreObj[i].email + ":" + historicalHiscoreObj[i].score + " | "
    }
    topScorerDisplay.textContent = finalHighscores
}

var highscoreArr = []
var finalHighscores = ""
var tempHigh = []

//sorts the local storage highscores and obtain the lowest sccore
function sortHighscore(){
    if(historicalHiscoreObj === null){
                return
            }else {
                for(i=0; i<historicalHiscoreObj.length; i++){
                    highscoreArr[i] = historicalHiscoreObj[i].score
                    tempHigh[i]=historicalHiscoreObj[i].score
                }
         tempHigh =  tempHigh.sort(function(a,b) {
            return (+a) - (+b);
          });
          lowScore = tempHigh[0]        
    }
}

// checks if user score is larger than highscore and replace the lowest score
function updateHighscore(){
            if(highscore > lowScore){
                var replaceIndex = highscoreArr.indexOf(lowScore)
                historicalHiscoreObj[replaceIndex].score = highscore
                historicalHiscoreObj[replaceIndex].email = document.getElementById("emailInput").value
                localStorage.setItem("userHighscore", JSON.stringify(historicalHiscoreObj))
            }else{
            }
    }

  
