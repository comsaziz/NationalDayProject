const questions = {
  easy: [
    {
      name: "King Abdulaziz",
      image: "https://i.pinimg.com/236x/0b/ed/7c/0bed7c63737f578c2214a19a837cda23.jpg",
      hint: "None",
      questions: [
        { question: "Who is the founder of Saudi Arabia?", correct: "King Abdulaziz" },
        { question: "In which year was this King born?", correct: "1880" }
      ]
    },
    {
      name: "Prince Mohammed bin Salman",
      image: "https://i.pinimg.com/236x/89/a9/be/89a9be33ec0b1691eadc18e2359a17af.jpg",
      hint: "None",
      questions: [
        { question: "What is the name of the vision launched by this Prince?", correct: "2030" },
        { question: "What is the title of this prince?", correct: "Crown Prince" }
      ]
    },
    {
      name: "King Salman",
      image: "https://i.pinimg.com/236x/f0/79/dc/f079dc83d99132d2e46245bc510491f7.jpg",
      hint: "None",
      questions: [
        { question: "In what year did this King ascend to the throne?", correct: "2015" },
        { question: "Which city was this King the governor of before becoming King?", correct: "Riyadh" }
      ]
    },
  ],
  medium: [
    {
      name: "Prince Sultan bin Salman",
      image: "https://i.pinimg.com/236x/f6/0a/20/f60a201315e54fcdfdbe8b860e9025ee.jpg",
      hint: "None",
      questions: [
        { question: "Who was the first Arab astronaut?", correct: "Prince Sultan bin Salman" },
        { question: "In which year did this Prince go to space?", correct: "1985" }
      ]
    },
    {
      name: "King Faisal",
      image: "https://i.pinimg.com/564x/45/d6/9f/45d69f5de299973120058b6ac428516f.jpg",
      hint: "Assassinated in 1975",
      questions: [
        { question: "What major policy is this King known for?", correct: "Oil" },
       
      ]
    },
    {
      name: "King Saud",
      image: "https://i.pinimg.com/564x/98/2b/dc/982bdcc5071c71c1841902a410fa6978.jpg",
      hint: "Son of King Abdulaziz",
      questions: [
        { question: "Who was the first king after King Abdulaziz?", correct: "King Saud" },
      ]
    },
  ],
  hard: [
    {
      name: "Prince Saudi al-Faisal",
      image: "https://i.pinimg.com/564x/ab/6c/d3/ab6cd314b92d444f95642f4ebab12c52.jpg",
      hint: "Death",
      questions: [
        { question: "Who served as Saudi foreign minister from 1930 to 1954?", correct: "Prince Saudi al-Faisal" },
        
      ]
    },
    {
      name: "Prince Khalid bin Faisal",
      image: "https://i.pinimg.com/236x/3e/25/af/3e25af26c28c75a51282edd0f4203912.jpg",
      hint: "Knowen in Hajj Season",
      questions: [
        { question: "Which province does this Prince govern?", correct: "Mecca" }
      ]
    },
    {
      name: "Prince Bandar bin Sultan",
      image: "https://i.pinimg.com/236x/db/63/23/db6323a74d023ef5e7d2784af9036404.jpg",
      hint: "Retired in 2005",
      questions: [
        { question: "Who served as Saudi Arabia's ambassador to the United States?", correct: "Prince Bandar bin Sultan" },
     
      ]
    }
  ]
};

let currentQuestions = [];
let currentIndex = 0;
let score = 0;

document.getElementById("start-quiz").addEventListener("click", function () {
  const difficulty = document.getElementById("difficulty").value;


  const flatQuestions = questions[difficulty].flatMap(q => q.questions.map(question => ({
    ...q,
    question: question.question,
    correct: question.correct,
    image: q.image,
    hint: q.hint
  })));

 
  currentQuestions = shuffleArray(flatQuestions);
  startQuiz();
});

function startQuiz() {
  document.getElementById("level-selection").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const currentQuestion = currentQuestions[currentIndex];

  document.getElementById("question-text").textContent = currentQuestion.question + ` (Hint: ${currentQuestion.hint})`;
  document.getElementById("king-image").src = currentQuestion.image;
  document.getElementById("king-image").classList.remove("clear");
  document.getElementById("user-answer").value = '';
  document.getElementById("feedback").textContent = '';
}

document.getElementById("submit-answer").addEventListener("click", function () {
  const userAnswer = document.getElementById("user-answer").value.trim().toLowerCase();
  const correctAnswer = currentQuestions[currentIndex].correct.toLowerCase();

  if (userAnswer === correctAnswer) {
    document.getElementById("king-image").classList.add("clear");
    score++;
    document.getElementById("feedback").textContent = "Correct!";
  } else {
    document.getElementById("feedback").textContent = "Incorrect. Try again!";
  }

  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    setTimeout(showQuestion, 2000);
  } else {
    setTimeout(showResult, 2000);
  }
});

function showResult() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  let resultText = `Your score: ${score} / ${currentQuestions.length}`;

  if (score === currentQuestions.length) {
    resultText += ` <p>God Please you</p> <img src="https://i.pinimg.com/originals/19/cf/a3/19cfa3beb32452f23bf71786491e1162.gif" style="width: 500px; height: auto; opacity: 1; filter: none;">`; 
  } else {
    resultText +=`  <p>Come Down!</p> <img src="https://i.pinimg.com/originals/fd/6f/28/fd6f28e9909af277f9e8e83d37c36b11.gif" style="width: 500px; height: auto; opacity: 1; 
    filter: none; ">`; 
  }

  document.getElementById("result").innerHTML = resultText;
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
