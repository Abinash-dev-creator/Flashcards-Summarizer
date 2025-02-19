

let cards = [];
let currentCardIndex = 0;
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let dataSource = "none";

const youtubeUrlInput = document.getElementById('youtubeUrl');
const fetchYoutubeButton = document.getElementById('fetchYoutube');
const aiResponse = document.getElementById('ai-response');
const wikipediaTopicInput = document.getElementById('wikipediaTopic');
const fetchWikipediaButton = document.getElementById('fetchWikipedia');
const flashcard = document.getElementById('flashcard');
const frontText = document.getElementById('front-text');
const backText = document.getElementById('back-text');
const prevCardButton = document.getElementById('prevCard');
const nextCardButton = document.getElementById('nextCard');
const shuffleCardButton = document.getElementById('shuffleCard');
const saveCardsButton = document.getElementById('saveCards');
const loadCardsButton = document.getElementById('loadCards');
const dataSourceTitle = document.getElementById('data-source-title');
const flashcardSection = document.querySelector('.flashcard-section');
const quizSection = document.querySelector('.quiz-section');
const theorySection = document.querySelector(".theory-section");
const theoryDataSource = document.getElementById("theory-data-source");
const theoryText = document.getElementById("theory-text");


// Music Player Elements
const audioPlayer = document.getElementById('backgroundMusic');
const playMusicButton = document.getElementById('playMusic');
const pauseMusicButton = document.getElementById('pauseMusic');
const stopMusicButton = document.getElementById('stopMusic');
const musicSearchInput = document.getElementById('musicSearchInput');
const musicSearchButton = document.getElementById('musicSearchButton');
const musicResultsContainer = document.getElementById('musicResults');

// Quiz Elements
const quizArea = document.querySelector('.quiz-area');
const questionArea = document.querySelector('.question-area');
const questionText = document.getElementById('question');
const optionsContainer = document.querySelector('.options');
const feedbackText = document.getElementById('feedback-text');
const startQuizButton = document.getElementById('startQuiz');
const nextQuestionButton = document.getElementById('nextQuestion');

// fetchYoutubeButton.addEventListener('click', async () => {
//     getAiResponseAndAppend()
// })
// const getAiResponseAndAppend = () => {
//     const url = youtubeUrlInput.value;
//     if (url) {
//         fetch('/ai/talking', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ url }),
//         })
//             .then(response => response.text())
//             .then(data => {
//                 aiResponse.innerText = data;
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 alert('An error occurred. Check console for details.');
//             });
//     } else {
//         alert('Please enter a YouTube URL');
//     }

//     youtubeUrlInput.value = '';
// };

// Function to update the displayed flashcard
function updateCardDisplay() {
    if (cards.length === 0) {
        frontText.innerText = "No cards created";
        backText.innerText = "";
        flashcardSection.style.display = "none";
        dataSource = "none";
        return;
    }

    frontText.innerText = cards[currentCardIndex].term;
    backText.innerText = cards[currentCardIndex].definition;
}

// Initial Load
updateCardDisplay();

// Placeholder summarization function (remove if you don't need it)
async function summarizeTranscript(text) {
    // Placeholder summarization
    if (text.length > 300) {
        return text.slice(0, 300) + ".....";
    } else {
        return text;
    }
}

// Event Listener for wikipedia fetch button
fetchWikipediaButton.addEventListener('click', async () => {
    const topic = wikipediaTopicInput.value;
    dataSource = "wikipedia";
    theorySection.style.display = "none";
    quizSection.style.display = "none";

    if (topic) {
        try {
            console.log("Fetching data from Wikipedia...");
            const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`);
            console.log("Response Received", response);
            if (response.ok) {
                console.log("Response status ok");
                const data = await response.json();
                console.log("Raw API Response:", data); // Log the raw response

                let description = data.extract || data.description || data.detail;
                console.log("Description", description);
                if (description) {
                    const sentences = description.split(".").filter(sentence => sentence.trim().length > 1).slice(0, 12); // Increased sentences
                    if (sentences.length > 2) {
                        cards = sentences.map(term => ({
                            term: term.trim(),
                            definition: term.trim()
                        }));
                        currentCardIndex = 0;
                        dataSourceTitle.innerText = "Data Source: Wikipedia";
                        flashcardSection.style.display = "block";
                        updateCardDisplay();
                    } else {
                        alert("Not enough data from wikipedia");
                        flashcardSection.style.display = "none";
                        cards = [];
                        updateCardDisplay();
                    }

                } else {
                    alert("No data Available");
                    flashcardSection.style.display = "none";
                    cards = [];
                    updateCardDisplay();
                }

            } else {
                console.error("Wikipedia API Error:", response.status, response.statusText);
                alert("Topic doesn't exist in wikipedia");
                flashcardSection.style.display = "none";
                cards = [];
                updateCardDisplay();
            }

        } catch (error) {
            console.error("Error during Wikipedia fetch:", error);
            alert("Something went wrong. Check console for errors");
            flashcardSection.style.display = "none";
            cards = [];
            updateCardDisplay();
        }
    } else {
        alert("Please Enter the Topic");
        flashcardSection.style.display = "none";
        cards = [];
        updateCardDisplay();
    }
});

flashcard.addEventListener('click', () => {
    const front = flashcard.querySelector('.front');
    const back = flashcard.querySelector('.back');

    if (front.style.display === "none") {
        front.style.display = 'block';
        back.style.display = 'none';
    } else {
        front.style.display = 'none';
        back.style.display = 'block';
    }
})

prevCardButton.addEventListener('click', () => {
    if (cards.length > 0) {
        currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
        updateCardDisplay();
        flashcard.querySelector('.front').style.display = "block";
        flashcard.querySelector('.back').style.display = "none";
    }
})

nextCardButton.addEventListener('click', () => {
    if (cards.length > 0) {
        currentCardIndex = (currentCardIndex + 1) % cards.length;
        updateCardDisplay();
        flashcard.querySelector('.front').style.display = "block";
        flashcard.querySelector('.back').style.display = "none";
    }
})

shuffleCardButton.addEventListener('click', () => {
    if (cards.length > 0) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        currentCardIndex = 0;
        updateCardDisplay();
    }
})

saveCardsButton.addEventListener('click', () => {
    localStorage.setItem('flashcards', JSON.stringify(cards));
    alert("Flashcards are saved locally");
})

loadCardsButton.addEventListener('click', () => {
    const savedCards = localStorage.getItem('flashcards');
    if (savedCards) {
        cards = JSON.parse(savedCards);
        currentCardIndex = 0;
        updateCardDisplay();
        alert("Flashcards are loaded successfully");
    }
})


// Quiz Generation and Logic
function generateQuizQuestions() {
    quizQuestions = cards.map((card, index) => {
        const incorrectOptions = cards.filter((_, i) => i !== index)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(incorrectCard => incorrectCard.definition);

        return {
            question: card.term,
            options: [...incorrectOptions, card.definition].sort(() => 0.5 - Math.random()),
            correctAnswer: card.definition,
        };
    });
}

function displayQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        questionText.innerText = question.question;

        optionsContainer.innerHTML = "";
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.classList.add("option");
            button.addEventListener('click', () => checkAnswer(option, question.correctAnswer));
            optionsContainer.appendChild(button);
        });
    } else {
        endQuiz();
    }
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        feedbackText.innerText = "Correct!";
        score++;
    } else {
        feedbackText.innerText = `Incorrect. Correct answer: ${correctAnswer}`;
    }

    optionsContainer.querySelectorAll('.option').forEach(button => {
        button.disabled = true;
    });
}
function startQuiz() {
    quizSection.style.display = 'block';
    generateQuizQuestions();
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
    questionArea.style.display = "block";
    nextQuestionButton.style.display = "block";
    startQuizButton.style.display = 'none';
}

function nextQuestion() {
    feedbackText.innerText = '';
    currentQuestionIndex++;
    optionsContainer.querySelectorAll('.option').forEach(button => {
        button.disabled = false;
    });
    displayQuestion();
}
function endQuiz() {
    questionText.innerText = `Quiz completed! Your score is ${score} out of ${quizQuestions.length}`;
    optionsContainer.innerHTML = "";
    nextQuestionButton.style.display = 'none';
    feedbackText.innerText = "";
    quizSection.style.display = 'none';
    startQuizButton.style.display = 'block';
}


startQuizButton.addEventListener('click', startQuiz);
nextQuestionButton.addEventListener('click', nextQuestion);