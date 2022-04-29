// Author: Shalu Madan
//  Matriculation number: 40537396 
//  Last date of modification: 29/04/2022
//  SET08101 – Web Technologies Coursework 2
//  website design for a quiz - Mars quiz js
// References: https://fedingo.com/how-to-shuffle-array-in-javascript/
//            https://codepen.io/Liberacorpus/pen/bGrNvLW
//            https://www.w3schools.com/ai/tryit.asp?filename=tryai_chartjs_bars_colors_more
//            https://www.w3schools.com/


// Quiz Questions

var questions = [{

        question: "What is the length of space journey from Earth to Mars?",
        A: "6 months",
        B: "7 months",
        C: "10 months",
        D: "5 months",
        correct: "B",
    },

    {

        question: "What is the location of Mars in context of sun?",
        A: "Fourth rock from the sun",
        B: "Third rock from the sun",
        C: "Fifth rock from the sun",
        D: "Seventh rock from the sun",
        correct: "A",
    },

    {

        question: "In which year the scientists confirmed water flows on Mars, raising questions about whether life could exist on the red planet",
        A: "2017",
        B: "2015",
        C: "2010",
        D: "2013",
        correct: "B",
    },

    {

        question: "How many moons mars have?",
        A: "Four",
        B: "Six",
        C: "Seven",
        D: "Two",
        correct: "D",
    },

    {

        question: "How is Mars sometimes referred to?",
        A: "Blue Planet",
        B: "Green Planet",
        C: "Red Planet",
        D: "Yellow Planet",
        correct: "C",
    },

    {

        question: "Which spacecraft first visited Mars?",
        A: "Mariner 4",
        B: "Pioneer 7",
        C: "Viking 2",
        D: "Ulysses",
        correct: "A",
    },

    {
        question: "Which gas composes 95.32% of Mars’s atmosphere?",
        A: "Oxygen",
        B: "Carbon Dioxide",
        C: "Hydrogen",
        D: "Ozone",
        correct: "B",
    },

    {
        question: "How many days does Mars take to orbit the Sun?",
        A: "365",
        B: "445.28",
        C: "524",
        D: "686.98",
        correct: "D",
    },

    {
        question: "Who is Mars in mythology?",
        A: "God of Weather",
        B: "King of Peace",
        C: "God of War",
        D: "God of Hunting",
        correct: "C",
    },

    {
        question: "What is the length of day of Mars?",
        A: "14.9259 hours",
        B: "24.6229 hours",
        C: "26 hours",
        D: "34 hours",
        correct: "B",
    },

];

let scoreList = [];
var myScore;

// function to store and display score in local storage
function store() {
    myScore = ($("#level" + (i - 1)).text());

    scoreList.push(myScore);
    // sort scores
    scoreList = scoreList.sort((a, b) => {
            if (a.score < b.score) {
                return 1;
            } else {
                return -1;
            }
        })
        // storing scores in local storage
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }

    document.getElementById("myscore").innerHTML = scoreList;

    $(document).ready(function() {
        $("#myBtn").click(function() {
            $("#myscore").toggle();
        });
    });
};


// timer function

var time = 15;
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");


function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time; // put value of time in timeCount
        time--; //countdown
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if (time < 0) {
            clearInterval(counter); //clear counter
            timeText.textContent = "Time up"; //change the time text to 'time up'
            $("#quizEnd").show(); // show end of quiz message
            $("#result").text("Quiz is finished. " + "You scored " + $("#level" + (i - 1)).text()); // display the score 
            store();
        }
    }
};


// function to play audio

function play() {
    var audio = document.getElementById("audio");
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
};


//start game with start button, hide landing page
$(".start").on("click", function(e) {

    $("#begin").hide();
    startTimer(time);
});

$("#quizEnd").click(function() {
    location.reload();
});


//change colour on hover
$("#a,#b,#c,#d").hover(
    function() {
        $(this).css("background-color", "MediumAquamarine");
    },
    function() {
        $(this).css("background-color", "white");
    }
);


// function to randomise questions

function shuffle(array) {

    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
};

// call the function
shuffle(questions);
// console.log(questions);


//function to display question & answer options
var i = 0;

function display() {

    if (i < questions.length) {
        $("#quizFrame").text("Question: " + questions[i].question);
        $("#a").text("A: " + questions[i].A);
        $("#b").text("B: " + questions[i].B);
        $("#c").text("C: " + questions[i].C);
        $("#d").text("D: " + questions[i].D);
        $(".question").css("background-image", "url(" + questions[i].question + ")");
        $("#a,#b,#c,#d").show();

    } else {
        $("#quizEnd").show();
        $("#result").text("Quiz is finished. " + "You scored " + $("#level" + (i - 1)).text());
        clearInterval(counter); //clear counter 
        store();
    }
}
display();



//if answer is correct, then display next question
//if answer is incorrect, provide alert for quiz end


$("#a, #b, #c, #d").click(function(e) {
    clearInterval(counter); // clear counter
    startTimer(time); // restart time
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left

    var correct = questions[i].correct;
    var clickedAnswer = $(this).text()[0];
    if (correct == clickedAnswer) {
        play()
        $("#level" + i).css("background-color", "green");
        $("#level" + (i - 1)).css("background-color", "skyblue");
        i++;
        display();
    } else {
        clearInterval(counter); //clear counter
        $("#quizEnd").show();
        $("#result").text("Quiz is finished. " + "You scored " + $("#level" + (i - 1)).text());

        store();
    }
    // console.log(scoreList);
});


//restart button
$("#restart").click(function(e) {
    location.reload();
    clearInterval(counter); // clear counter
    startTimer(time); // restart time
    timeText.textContent = "Time Left";
});


//-----------  Lifelines -------------

//50/50 button

$("#half").click(function(e) {
    var correct = questions[i].correct;
    var a = $("#a").text()[0];
    var b = $("#b").text()[0];
    var c = $("#c").text()[0];
    var d = $("#d").text()[0];
    //one correct, one wrong
    var half = [];
    var choices = [a, b, c, d];
    //get the index of the correct answer
    var index = choices.indexOf(correct);
    //put the correct one into the half array
    half.push(choices[index]);
    //the choices array contains 3 wrong answers
    choices.splice(index, 1);
    //get a random wrong answer from the choices array
    var randWrong = Math.floor(Math.random() * choices.length);
    //push this wrong choice into half array
    half.push(choices[randWrong]);
    //style them
    console.log(half);
    $("#a,#b,#c,#d").hide();
    $(("#" + half[0]).toLowerCase()).show();
    $(("#" + half[1]).toLowerCase()).show();
    $("#half").css("display", "none");
});


// best choice button

$("#best").click(function(f) {
    var correct = questions[i].correct;
    var a = $("#a").text()[0];
    var b = $("#b").text()[0];
    var c = $("#c").text()[0];
    var d = $("#d").text()[0];
    var choices = [a, b, c, d];
    //get the index of the correct answer
    var index = choices.indexOf(correct);
    let bestAnswer = [`The answer is definitely ${choices[index]}`,
        `The answer could be ${choices[index]}`,
        `The answer is ${choices[index]}`,
        `I'm 60% sure the answer is ${choices[index]}`
    ];
    alert(bestAnswer[Math.floor(Math.random() * bestAnswer.length)]);
    $("#best").css("display", "none");
});


// info function
function myFunction() {
    // play()
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
};


//people's poll button and bar graph 
//Reference for bar chart: https://www.w3schools.com/ai/ai_chartjs.asp

$("#poll").click(function(y) {
    var correct = questions[i].correct;
    var a = $("#a").text()[0];
    var b = $("#b").text()[0];
    var c = $("#c").text()[0];
    var d = $("#d").text()[0];
    //one correct, one wrong
    var ppoll = [];
    var choices = [a, b, c, d];
    //get the index of the correct answer
    var index = choices.indexOf(correct);
    //put the correct one into the poll array
    ppoll.push(choices[index]);
    //the choices array contains 3 wrong answers
    choices.splice(index, 1);
    //push the wrong choices into poll array
    ppoll.push(choices[0]);
    ppoll.push(choices[1]);
    ppoll.push(choices[2]);

    var xValues = ppoll;
    var yValues = [65, 10, 5, 20];
    var barColors = ["red", "green", "blue", "orange", "brown"];
    // console.log(xValues);

    new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "People's Poll"
            }
        }
    })
    $("#poll").css("display", "none");
    $("#a, #b, #c, #d").click(function(z) {
        $("#myChart").css("display", "none");

    })

});



// ==========================================================================