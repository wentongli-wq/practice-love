let affection = 0;
let currentScene = 0;
let currentChapter = 1; 

const scenes = [
    {
        text: "Today, you received your partner's first gift - a cute teddy bear.",
        choices: [
            { text: "Thank you. I'll sleep with it in my arms every day.", affection: 2, feedback: "The atmosphere suddenly became more relaxed. He seemed to breathe a sigh of relief. The relationship has slightly warmed up."},
            { text: "Why did you suddenly give me this?", affection: 1, feedback:"There's no particular reason... I just wanted to give you something as a token of my appreciation. He spoke a little cautiously. The relationship is stable, but there is a certain distance." },
            { text: "It feels a bit childish, actually.", affection: 0, feedback:"He was silent for a second. Ah... really? He forced a smile, but it was obvious that he was a little down. The air has become a little cooler." }
        ]
    },
    {
        text: "It suddenly started raining after school. He opened an umbrella. 'Would you like to go together?'",
        choices: [
            { text: "Actually, I quite like rainy days, Because it allows me to get closer in a natural way.", affection: 2, feedback: "You two were very close. Their shoulders would occasionally touch. He didn't dodge."},
            { text: "The rain became less intense, but the distance between you two remained the same." , affection: 1, feedback:"He nodded. Then I'll wait with you. He didn't leave. He just stood by. The rain became less intense, but the distance between you two remained the same."},
            {text: "He took back the umbrella. ‘Then I'll be leaving now.’ You watched his back figure and suddenly felt a bit empty.", affection: 0, feedback:"He took back the umbrella. Then I'll be leaving now. You watched his back figure and suddenly felt a bit empty."}
        ]
    },
    {
        text: "You saw him chatting happily with a girl. They are standing a little too close. On the way back, he asked you: Why have you suddenly gone silent?",
        choices: [
            { text: "Direct expression--I'm feeling a bit unwell.", affection: 2, feedback:"Is it because of just now? She's just a classmate. He explained very carefully. You first talked about boundaries."},
            { text: "Acting as if nothing happened -- No.", affection: 1, feedback:"He looked at you for a few seconds: Really? There is now a thin barrier between you two." },
            { text: "Defensive reply - You seemed to be having a great time chatting, didn't you?", affection: 0, feedback:"He frowned and said, What do you mean? The atmosphere became tense for the first time."}
        ]
    },
    {
        text: "In the evening, he called. Did I make you unhappy?",
        choices: [
            { text: "Open communication - I'm just a little uneasy.", affection: 2, feedback:"There was a moment of silence on the other end of the phone. Well, I'll be more careful in the future. This is the first time that you have seriously discussed your feelings."},
            { text: "Lightly touch upon it - It's okay, don't worry too much.", affection: 1, feedback:"He smiled. That's good. But you know, the problem hasn't been solved yet." },
            { text: "Emotional outburst - You simply don't understand me.", affection: 0, feedback:"He remained silent for a long time. The air was heavy."}
        ]
    },
    {
        text: "The exhibition hall was bathed in soft light on the weekend. You two were walking side by side.",
        choices: [
            { text: "Take the initiative to hold hands - You gently grasp his hand.", affection: 1, feedback:"He visibly tensed up for a moment. But he didn't let go. Can I hold you like this?"},
            { text: "Act as if you didn't notice - retract your hand.", affection: 0, feedback:"He didn't move either. The atmosphere remained gentle, but there was a lack of courage." },
            { text: "Joking aside - Are you very nervous?", affection: -1, feedback:"He smiled. A little. The atmosphere became less tense."}
        ]
    },
    {
        text: "Because of a small matter, you two have a disagreement. You never explain things clearly. -- He said.",
        choices: [
            { text: "Calm communication - Let's talk it over slowly.", affection: 1, feedback:"Please sit down. The argument didn't escalate. The relationship has become a little more mature."},
            { text: "Angry silence - you turn and leave.", affection: 0, feedback:"He didn't manage to catch up. The first Cold War." },
            { text: "Resolute response - So are you.", affection: -1, feedback:"The volume of the sound increased. You all got injured."}
        ]
    },
    {
        text: "We hadn't communicated for several days. He sent a message. -- Could we meet?",
        choices: [
            { text: "Appointment - You went.", affection: 0, feedback:"He stood there, with no excuse. -- I don't want to lose you."},
            { text: "Hesitation - You took a whole day to reply.", affection: -1, feedback:"When we met, all of you became very cautious." },
            { text: "No response - You didn't reply to the message.", affection: -2, feedback:"The screen of the mobile phone has been dark for a long time."}
        ]
    },
];

function updateTeddyPosition(isChoicePage) {
    const imgcenter = document.getElementById("imgcenter");
    const imgRight = document.getElementById("imgRight");

    if (!imgcenter || !imgRight) return;

    imgcenter.style.display = "none";
    imgRight.style.display = "none";

    if (currentChapter === 1 && currentScene === 0 && isChoicePage) {
        imgcenter.style.display = "block";
    } else {
        imgRight.style.display = "block";
    }
}

function showScene() {
    document.body.classList.remove("chapter1-choice","chapter1-feedback","normal-choice","normal-feedback");

    if (currentChapter === 1) {
        document.body.classList.add("chapter1-choice");
    } else {
        document.body.classList.add("normal-choice");
    }

    let scene = scenes[currentScene];
    if (!scene) return;

    document.getElementById("storyText").innerText = scene.text;

    const girl = document.getElementById("girls"); 
    if (girl) {
        if (currentChapter === 1 && currentScene === 0) {
            girl.style.display = "none";
        } else {
            girl.style.display = "block";
        }
    }

    const hoverEffects = ["warm", "neutral", "awkward"];
    let choicesHTML = "";
    scene.choices.forEach((choice, index) => {
        choicesHTML += `
            <button class="choice ${hoverEffects[index]}" onclick="selectChoice(${index})">
                ${choice.text}
            </button>`;
    });
    document.getElementById("choices").innerHTML = choicesHTML;
    updateTeddyPosition(true);
}

function selectChoice(index) {
    let choice = scenes[currentScene].choices[index];
    affection += choice.affection;

    if (currentChapter === 1) {
        document.body.classList.remove("chapter1-choice");
        document.body.classList.add("chapter1-feedback");
    } else {
        document.body.classList.remove("normal-choice");
        document.body.classList.add("normal-feedback");
    }

    updateCharacter(choice.affection);    
    document.getElementById("storyText").innerText = choice.feedback;

    document.getElementById("choices").innerHTML = `
        <button class="choice next-btn" onclick="goToNextScene()">Continue</button>
    `;

    updateBar();

    updateTeddyPosition(false);
    
    const girl = document.getElementById("girls");
    if (girl) girl.style.display = "block"; 
}

function updateBar() {
    if (affection < 0) affection = 0;
    if (affection > 10) affection = 10;
    document.getElementById("affectionBar").src = "../images/bar" + affection + ".png";
}

function updateCharacter(change) {
    let girl = document.getElementById("girl");
    if (!girl) return;
    girl.style.display = "block";

    if (change >= 2) {
        girl.src = "../images/newdress.png"; 
        girl.style.width = "380px";  
    } else if (change >= 1) {
        girl.src = "../images/normal.png";
        girl.style.width = "230px"; 
    } else {
        girl.src = "../images/cry.png";
        girl.style.width = "350px";  
    }
}


function goToNextScene() {
    currentScene++;
    if (currentScene < scenes.length) {
        showScene();
    } else {
        showEnding();
    }
}

function showEnding() {

    let endingText = "He asked you: What are we now?";

    if (affection > 8) {
        endingText = "You smiled. -- It's your lover.";
    }
    else if (affection >= 4 && affection < 7) {
        endingText = "Let's just be friends.";
    }
    else {
        endingText = "I don't know -- he remained silent. -- Then I'll wait for you to figure it out. The story is not over; it has merely paused here.";
    }

    document.getElementById("storyText").innerText =
        endingText + "\n\nFinal Affection: " + affection;

    document.getElementById("choices").innerHTML =
        `<button class="choice" onclick="location.reload()">Play Again</button>`;
}

function startGame() {
    showScene();
}

startGame();