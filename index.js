const QuizLists = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },

  {
    question:
      "Which of the following element is responsible for making the text bold in HTML?",
    a: "<pre>",
    b: "<p>",
    c: "<b>",
    d: "none of the above",
    correct: "c",
  },
  {
    question:
      "Which of the following tag is used for inserting the largest heading in HTML?",
    a: "<p>",
    b: "<b>",
    c: "<h1>",
    d: "none of the above",
    correct: "c",
  },
  {
    question:
      "How to create an unordered list (a list with the list items in bullets) in HTML?",
    a: "<ul>",
    b: "<u>",
    c: "<l>",
    d: "none of the above",
    correct: "a",
  },

  {
    question: " The <hr> tag in HTML is used for -",
    a: "horizontal ruler",
    b: "ruler",
    c: "line",
    d: "none of the above",
    correct: "a",
  },

  {
    question: "<input> is -",
    a: "an empty tag",
    b: "a format tag.",
    c: "a tag",
    d: "none of the above",
    correct: "a",
  },

  {
    question:
      "Which of the following element is responsible for making the text italic in HTML?",
    a: "<i>",
    b: "<Italic>",
    c: "<l>",
    d: "none of the above",
    correct: "a",
  },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const username = document.getElementById("username");
const loginform = document.getElementById("loginform");
const password = document.getElementById("password");

const card = document.getElementById("card");
card.style.display = "none";
let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizLists = QuizLists[currentQuiz];

  questionEl.innerText = currentQuizLists.question;
  a_text.innerText = currentQuizLists.a;
  b_text.innerText = currentQuizLists.b;
  c_text.innerText = currentQuizLists.c;
  d_text.innerText = currentQuizLists.d;
}

function loginByUsername() {
  if (!username.value || !password.value) {
    alert("Field must not be Empty");
  } else {
    localStorage.setItem("username", username.value);
    card.style.display = "block";
    loginform.style.display = "none";
  }
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

const setAnswer = (answer) => {
  let answers;
  if (localStorage.getItem("answer") === null) {
    answers = [];
  } else {
    answers = JSON.parse(localStorage.getItem("answer"));
  }
  answers += `${answer},`;

  localStorage.setItem("answer", JSON.stringify(answers));
};

const reload = () => {
  localStorage.removeItem("answer");
  location.reload();
};

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  let allans = [];
  if (answer) {
    allans += answer;
    setAnswer(allans);
    if (answer === QuizLists[currentQuiz].correct) {
      score++;

      let correct = 100 / score;
      let prog = (100 / correct) * 10;

      document.getElementById("progress").innerHTML = `
    <div class="progress" id="progress">
    <div class="progress-bar" role="progressbar" style="width: ${prog}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>

</div> `;
    }

    currentQuiz++;

    if (currentQuiz < QuizLists.length) {
      loadQuiz();
    } else {
      let correct = 100 / score;
      let prog = (100 / correct) * 10;
      let result = "";
      if (prog > 90) {
        result += " 😎 Excellent";
      } else if (prog > 60) {
        result += " 😃 Average";
      } else {
        result += " 😥 Poor";
      }

      const myusername = localStorage.getItem("username");

      quiz.innerHTML = `
 <center><h1>${result}</h1></center>

      <div class="progress" id="progress">
      <div class="progress-bar" role="progressbar" style="width: ${prog}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>

 </div>
                <h2>${myusername} - You answered ${score}/${QuizLists.length} questions correctly</h2>
                <button onclick="reload()">Reload</button>
        
               
        
                `;
    }
  }
});
