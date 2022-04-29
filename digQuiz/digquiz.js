// Author: Shalu Madan
//  Matriculation number: 40537396 
//  Last date of modification: 29/04/2022
//  SET08101 – Web Technologies Coursework 2
//  website design for a quiz - Digital Footprint quiz js
// References: https://fedingo.com/how-to-shuffle-array-in-javascript/
//            https://codepen.io/Liberacorpus/pen/bGrNvLW
//            https://www.w3schools.com/ai/tryit.asp?filename=tryai_chartjs_bars_colors_more
//            https://www.w3schools.com/


// Quiz Questions

var questions = [{

        question: "What is your ‘digital footprint’?",
        A: "The time you spend on your computer",
        B: "The digital trail left by everything you do online",
        C: "It is the opposite of your digital fingerprint",
        D: "The amount of electronic devices you buy in a year",
        correct: "B",
    },

    {

        question: "How long is your digital footprint visible for?",
        A: "It depends on the websites you spend most time on",
        B: "Your digital footprint wipes clean after a year",
        C: "The record lasts for more than a month",
        D: "It creates a permanent record",
        correct: "D",
    },

    {

        question: "Who can see or use data from my digital footprint?",
        A: "Only the police have access to the possible private information a digital footprint can hold",
        B: "Your digital footprint is potentially visible to anyone",
        C: "It is visible to professional but they need special permission to go through the data",
        D: "Data from your digital footprint cannot be used for commercial purpose by others",
        correct: "B",
    },

    {

        question: "What can you do to minimise any negative consequences of your digital footprint?",
        A: "Always ask friend’s permission before posting a picture or video of them online",
        B: "Don’t post anything because it is too risky",
        C: "There is nothing you can do",
        D: "Create false accounts to keep yourself safe",
        correct: "A",
    },

    {

        question: "What is ‘personal data’?",
        A: "Information which nobody else can access other than you personally",
        B: "A secret that only you know about",
        C: "Information that could identify you as who you are",
        D: "Data concerning personnel working for a company",
        correct: "C",
    },

    {

        question: "To get a sense of your digital footprint, you should: ",
        A: "Google yourself once a year",
        B: "Google yourself every few weeks",
        C: "Google yourself regularly, and monitor what your friends post, in case they've posted something about you",
        D: "Delete all of your accounts and start fresh",
        correct: "C",
    },

    {
        question: "You can use the following online tools to help craft a digital footprint that is appealing to employers: ",
        A: "Twitter",
        B: "Personal web site",
        C: "Linked In",
        D: "All of these answers are correct",
        correct: "D",
    },

    {
        question: "The advertising you see online is: ",
        A: "Something you should just ignore",
        B: "Sometimes the result of corporations tracking your online activities",
        C: "Only connected to your online activities if you shop online using a credit card",
        D: "All of these answers are correct",
        correct: "B",
    },

    {
        question: "If you're very careful about what you post, your digital footprint should be in great shape. Right?",
        A: "Yes, but you should still monitor your footprint, because others' actions can affect it",
        B: "Yes, but others may still post something unflattering about you in the future",
        C: "Yes, because you can do a lot to shape your digital footprint",
        D: "All of these answers are correct",
        correct: "A",
    },

    {
        question: "How could you improve your digital footprint?",
        A: "Its best not to post anything if you want to stay safe",
        B: "Its not necessary to think before you post",
        C: "Check your social media privacy settings to make sure you’re only sharing with people you know and trust",
        D: "Share your personal information with a good friend or family member so they can help you stay safe online",
        correct: "C",
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

var time = 30;
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