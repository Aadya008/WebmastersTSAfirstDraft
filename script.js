/* =====================================================
   NEXUS AI GAME ENGINE
   ===================================================== */


/* ================= GAME DATA ================= */

const games = {

    foundation: {

        name: "AI FOUNDATIONS",

        questions: [

            {
                question:
                    "Which statement best describes Artificial Intelligence?",

                answers: [

                    "A computer that only follows fixed instructions",

                    "Technology that enables computers to perform tasks associated with human intelligence",

                    "A database containing human knowledge",

                    "A type of computer hardware"

                ],

                correct: 1,

                explanation:
                    "AI refers to computer systems designed to perform tasks that can involve abilities such as learning, reasoning, or recognizing patterns."
            },

            {

                question:
                    "What does a machine learning model learn from?",

                answers: [

                    "Random guesses",

                    "Only human emotions",

                    "Data and examples",

                    "Computer screens"

                ],

                correct: 2,

                explanation:
                    "Machine learning algorithms use data and examples to identify patterns."
            },

            {

                question:
                    "What happens during AI inference?",

                answers: [

                    "A model uses what it learned to produce an output",

                    "The computer is turned off",

                    "All training data is deleted",

                    "The model is physically rebuilt"

                ],

                correct: 0,

                explanation:
                    "Inference is when a trained model applies what it learned to new input."
            }

        ]

    },


    tools: {

        name: "AI TOOLS",

        questions: [

            {

                question:
                    "Which prompt is most likely to produce a useful explanation of photosynthesis?",

                answers: [

                    "Photosynthesis",

                    "Tell me stuff about plants",

                    "Explain photosynthesis to a ninth-grade student using a simple analogy and three examples.",

                    "Explain."

                ],

                correct: 2,

                explanation:
                    "Specific prompts provide context, audience, and desired output."
            },

            {

                question:
                    "What should you do when an AI gives you an important factual claim?",

                answers: [

                    "Immediately assume it is correct",

                    "Verify the claim using reliable sources",

                    "Copy it without checking",

                    "Ask another AI if it is true"

                ],

                correct: 1,

                explanation:
                    "AI systems can make mistakes, so important information should be independently verified."
            },

            {

                question:
                    "Which is an appropriate use of AI while studying?",

                answers: [

                    "Having AI complete every assignment",

                    "Using AI to explain a difficult concept",

                    "Submitting AI output as your own work",

                    "Avoiding learning the material"

                ],

                correct: 1,

                explanation:
                    "AI can be useful as a learning assistant when it supports your own understanding."
            }

        ]

    },


    ethics: {

        name: "AI ETHICS",

        questions: [

            {

                question:
                    "An AI system produces different results for different groups of people. What should you investigate?",

                answers: [

                    "The color of the computer",

                    "Potential bias in the data or system",

                    "The computer's wallpaper",

                    "Nothing"

                ],

                correct: 1,

                explanation:
                    "Differences in outcomes can be a reason to investigate possible bias in data, design, or deployment."
            },

            {

                question:
                    "Which information should you generally avoid entering into an AI tool unless you know it is appropriate and protected?",

                answers: [

                    "A fictional character",

                    "A general school topic",

                    "Sensitive personal information",

                    "A math equation"

                ],

                correct: 2,

                explanation:
                    "Students should think carefully before sharing sensitive or personal information with AI systems."
            },

            {

                question:
                    "What is the most responsible approach to using AI for schoolwork?",

                answers: [

                    "Use AI to replace your own thinking",

                    "Hide all AI use",

                    "Follow your school's rules and use AI in ways that support learning",

                    "Submit AI output without checking it"

                ],

                correct: 2,

                explanation:
                    "Responsible academic AI use depends on school policies, transparency, verification, and maintaining your own learning."
            }

        ]

    },


    mission: {

        name: "FINAL AI MISSION",

        questions: [

            {

                question:
                    "Your team wants to use AI to analyze environmental data. What should happen FIRST?",

                answers: [

                    "Immediately deploy the AI",

                    "Understand the problem, data, goals, and limitations",

                    "Delete unusual data",

                    "Let the AI make every decision"

                ],

                correct: 1,

                explanation:
                    "Responsible AI projects begin by clearly defining the problem, understanding the data, and identifying limitations."
            },

            {

                question:
                    "Your AI model gives an unexpected prediction. What should you do?",

                answers: [

                    "Automatically trust it",

                    "Hide the result",

                    "Investigate the data, model, and possible explanations",

                    "Delete the entire project"

                ],

                correct: 2,

                explanation:
                    "Unexpected results should be investigated rather than automatically accepted or discarded."
            },

            {

                question:
                    "What principle connects everything you learned in NEXUS AI?",

                answers: [

                    "AI should replace humans",

                    "AI should never be used",

                    "AI should be understood, evaluated, and used responsibly",

                    "AI always knows the correct answer"

                ],

                correct: 2,

                explanation:
                    "AI literacy means understanding how AI works, recognizing limitations, and using it thoughtfully."
            }

        ]

    }

};


/* ================= PLAYER ================= */

let player = {

    xp: 0,

    level: 1,

    completed: {

        foundation: false,

        tools: false,

        ethics: false,

        mission: false

    }

};


/* ================= GAME STATE ================= */

let currentGame = null;

let currentQuestion = 0;

let questionAnswered = false;


/* ================= START ================= */

function startAcademy() {

    document
        .getElementById("academy")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= OPEN GAME ================= */

function openGame(type) {

    if (player.completed[type]) {

        return;

    }


    /* Don't allow final mission until other modules */

    if (
        type === "mission" &&
        (
            !player.completed.foundation ||
            !player.completed.tools ||
            !player.completed.ethics
        )
    ) {

        alert(
            "Complete the first three challenges before starting the Final Mission!"
        );

        return;

    }


    currentGame = type;

    currentQuestion = 0;

    questionAnswered = false;


    document
        .getElementById("gameOverlay")
        .classList.add("active");


    document
        .getElementById("gameModule")
        .textContent =
        games[type].name;


    document
        .getElementById("questionTotal")
        .textContent =
        games[type].questions.length;


    loadQuestion();

}


/* ================= LOAD QUESTION ================= */

function loadQuestion() {

    const game =
        games[currentGame];

    const question =
        game.questions[currentQuestion];


    questionAnswered = false;


    document
        .getElementById("questionNumber")
        .textContent =
        currentQuestion + 1;


    document
        .getElementById("question")
        .textContent =
        question.question;


    const answers =
        document.getElementById("answers");


    answers.innerHTML = "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.className =
                "answer";

            button.textContent =
                answer;

            button.onclick =
                () => chooseAnswer(index, button);

            answers.appendChild(button);

        }
    );


    document
        .getElementById("feedback")
        .textContent = "";


    document
        .getElementById("nextButton")
        .style.display =
        "none";


    updateGameProgress();

}


/* ================= ANSWER ================= */

function chooseAnswer(index, button) {

    if (questionAnswered)
        return;


    questionAnswered = true;


    const question =
        games[currentGame]
            .questions[currentQuestion];


    const allAnswers =
        document.querySelectorAll(".answer");


    allAnswers.forEach(
        answer => {

            answer.disabled = true;

        }
    );


    if (index === question.correct) {

        button.classList.add("correct");


        addXP(40);


        document
            .getElementById("feedback")
            .textContent =
            "✓ Correct! " +
            question.explanation;

    }

    else {

        button.classList.add("wrong");


        allAnswers[
            question.correct
        ].classList.add("correct");


        document
            .getElementById("feedback")
            .textContent =
            "Not quite. " +
            question.explanation;

    }


    document
        .getElementById("nextButton")
        .style.display =
        "block";

}


/* ================= NEXT ================= */

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion >=
        games[currentGame].questions.length
    ) {

        completeGame();

        return;

    }


    loadQuestion();

}


/* ================= GAME PROGRESS ================= */

function updateGameProgress() {

    const game =
        games[currentGame];


    const percentage =
        (
            currentQuestion /
            game.questions.length
        ) * 100;


    document
        .getElementById("gameProgressBar")
        .style.width =
        percentage + "%";

}


/* ================= COMPLETE ================= */

function completeGame() {

    player.completed[currentGame] = true;


    /* Completion XP */

    addXP(130);


    unlockBadge(currentGame);


    updateDashboard();


    document
        .getElementById("gameProgressBar")
        .style.width =
        "100%";


    document
        .getElementById("question")
        .textContent =
        "MISSION COMPLETE!";


    document
        .getElementById("answers")
        .innerHTML =
        `
        <div style="
            text-align:center;
            padding:30px;
            color:#4ade80;
            font-size:18px;
        ">

            ✓ Challenge completed<br><br>

            <span style="
                color:#8791ab;
                font-size:12px;
            ">

                XP earned and badge progress updated.

            </span>

        </div>
        `;


    document
        .getElementById("feedback")
        .textContent =
        "You've completed " +
        games[currentGame].name + "!";


    document
        .getElementById("nextButton")
        .style.display =
        "none";


    updateButton(currentGame);

}


/* ================= CLOSE ================= */

function closeGame() {

    document
        .getElementById("gameOverlay")
        .classList.remove("active");

}


/* ================= XP ================= */

function addXP(amount) {

    player.xp += amount;


    if (player.xp > 1000) {

        player.xp = 1000;

    }


    updateDashboard();

}


/* ================= LEVEL ================= */

function calculateLevel() {

    if (player.xp >= 750)
        return 4;

    if (player.xp >= 500)
        return 3;

    if (player.xp >= 250)
        return 2;

    return 1;

}


/* ================= DASHBOARD ================= */

function updateDashboard() {

    player.level =
        calculateLevel();


    document
        .getElementById("xp")
        .textContent =
        player.xp;


    document
        .getElementById("level")
        .textContent =
        player.level;


    document
        .getElementById("navLevel")
        .textContent =
        player.level;


    document
        .getElementById("xpBar")
        .style.width =
        (player.xp / 10) + "%";


    updateModuleProgress();


    if (player.xp === 0) {

        document
            .getElementById("xpMessage")
            .textContent =
            "Start learning!";

    }

    else if (player.xp < 250) {

        document
            .getElementById("xpMessage")
            .textContent =
            "You're getting started!";

    }

    else if (player.xp < 500) {

        document
            .getElementById("xpMessage")
            .textContent =
            "AI Explorer unlocked!";

    }

    else if (player.xp < 750) {

        document
            .getElementById("xpMessage")
            .textContent =
            "You're becoming an AI Builder!";

    }

    else {

        document
            .getElementById("xpMessage")
            .textContent =
            "AI Innovator status approaching!";

    }

}


/* ================= MODULE PROGRESS ================= */

function updateModuleProgress() {

    updateModule(
        "foundation",
        "foundationProgress",
        "foundationBar"
    );

    updateModule(
        "tools",
        "toolsProgress",
        "toolsBar"
    );

    updateModule(
        "ethics",
        "ethicsProgress",
        "ethicsBar"
    );

    updateModule(
        "mission",
        "missionProgress",
        "missionBar"
    );

}


function updateModule(type, textID, barID) {

    const percentage =
        player.completed[type]
            ? 100
            : 0;


    document
        .getElementById(textID)
        .textContent =
        percentage +
        "% complete";


    document
        .getElementById(barID)
        .style.width =
        percentage + "%";

}


/* ================= BADGES ================= */

function unlockBadge(type) {

    const badgeMap = {

        foundation: "badge1",

        tools: "badge2",

        ethics: "badge3",

        mission: "badge4"

    };


    const badge =
        document.getElementById(
            badgeMap[type]
        );


    badge.classList.remove("locked");

    badge.classList.add("unlocked");

}


/* ================= BUTTON ================= */

function updateButton(type) {

    const button =
        document.getElementById(
            type + "Button"
        );


    button.textContent =
        "✓ COMPLETED";


    button.disabled = true;

}


/* ================= INITIAL STATE ================= */

updateDashboard();