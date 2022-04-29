// Author: Shalu Madan
//  Matriculation number: 40537396 
//  Last date of modification: 29/04/2022
//  SET08101 – Web Technologies Coursework 2
//  website design for a quiz - Gamer quiz js
// References: https://fedingo.com/how-to-shuffle-array-in-javascript/
//            https://codepen.io/Liberacorpus/pen/bGrNvLW
//            https://www.w3schools.com/ai/tryit.asp?filename=tryai_chartjs_bars_colors_more
//            https://www.w3schools.com/


// Quiz Questions

var questions = [{

        question: "When was the Playstation 5 released?",
        A: "January 2020",
        B: "June 2020",
        C: "November 2020",
        D: "January 2021",
        correct: "C",
    },

    {

        question: "What was the first commercially successful video game?",
        A: "Pong",
        B: "Dokey Kong country",
        C: "Super Mario Bros",
        D: "Shaq Fu",
        correct: "A",
    },

    {

        question: "What inspired games maker Satoshi Tajiri to create Pokémon?",
        A: "A dream",
        B: "Butterflies",
        C: "An old TV show",
        D: "His mum",
        correct: "B",
    },

    {

        question: "What is the best selling game of all time?",
        A: "Red Dead Redemption 2",
        B: "FIFA 18",
        C: "Minecraft",
        D: "Call of Duty: Modern Warfare 3",
        correct: "C",
    },

    {

        question: "What is a ‘frag’?",
        A: "The number of things you have killed in a game",
        B: "A cheat code",
        C: "A french bag",
        D: "A burrowing marsupial that lives in the south Australian outback and feeds on grubs, rocks and dice",
        correct: "A",
    },

    {

        question: "What was Sonic the Hedgehog's original name?",
        A: "Fast Blue Hedgehog",
        B: "Colin the Hedgehog",
        C: "Steven",
        D: "Mr Needlemouse",
        correct: "D",
    },

    {
        question: "What is the fictional language in The Sims?",
        A: "Simian",
        B: "Simlish",
        C: "Simali",
        D: "Simento",
        correct: "B",
    },

    {
        question: "How many Playstation 4 consoles have been sold?",
        A: "5 million",
        B: "56 million",
        C: "62.5 million",
        D: "Over 102 million",
        correct: "D",
    },

    {
        question: "Pac-Man is often credited with being a landmark in video game history, and is among the most famous arcade games of all time. In the classic game Pac-Man if you wanted to eat a ghost for bonus points you first had to eat what?",
        A: "Fruit",
        B: "Pac-dot",
        C: "Power-pellet",
        D: "A power up mushroom",
        correct: "C",
    },

    {
        question: "What was the first home video game console?",
        A: "Atari 2600",
        B: "Odyssey",
        C: "Coleco Vision",
        D: "Playstation",
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
};
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