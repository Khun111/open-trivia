let results = [
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "What is the largest organ of the human body?",
    correct_answer: "Skin",
    incorrect_answers: ["Heart", "large Intestine", "Liver"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "Which American president appears on a one dollar bill?",
    correct_answer: "George Washington",
    incorrect_answers: [
      "Thomas Jefferson",
      "Abraham Lincoln",
      "Benjamin Franklin",
    ],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "What is the nickname of the US state of California?",
    correct_answer: "Golden State",
    incorrect_answers: ["Sunshine State", "Bay State", "Treasure State"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "What do the letters in the GMT time zone stand for?",
    correct_answer: "Greenwich Mean Time",
    incorrect_answers: [
      "Global Meridian Time",
      "General Median Time",
      "Glasgow Man Time",
    ],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "Which candy is NOT made by Mars?",
    correct_answer: "Almond Joy",
    incorrect_answers: ["M&amp;M&#039;s", "Twix", "Snickers"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question:
      "When someone is cowardly, they are said to have what color belly?",
    correct_answer: "Yellow",
    incorrect_answers: ["Green", "Red", "Blue"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "Which of the following is not the host of a program on NPR?",
    correct_answer: "Ben Shapiro",
    incorrect_answers: ["Terry Gross", "Ira Glass", "Peter Sagal"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "Which country has the union jack in its flag?",
    correct_answer: "New Zealand",
    incorrect_answers: ["South Africa", "Canada", "Hong Kong"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "Who invented the first ever chocolate bar, in 1847?",
    correct_answer: "Joseph Fry",
    incorrect_answers: ["Andrew Johnson", "John Cadbury", "John Tyler"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question:
      "The &ldquo;fairy&rdquo; type made it&rsquo;s debut in which generation of the Pokemon core series games?",
    correct_answer: "6th",
    incorrect_answers: ["2nd", "7th", "4th"],
  },
];
window.onload = getData("categories", null)
  .then((categories) => {
    console.log(categories);
    categories.forEach(({ id, name }) => {
      option = document.createElement("option");
      option.value = id;
      option.textContent = name;
      category.appendChild(option);
    });
  })
  .catch((error) => console.log("Failed:", error));
async function getData(type, value = {}) {
  const apiUrl =
    type == "categories"
      ? "https://opentdb.com/api_category.php"
      : `https://opentdb.com/api.php?amount=10&category=${value.category}&difficulty=${value.difficulty}&type=multiple`;

  const data = await fetch(apiUrl);
  const json = await data.json();
  if (type !== "categories" && json.results) return json.results;
  if (type === "categories" && json.trivia_categories)
    return json.trivia_categories;
}
const start = document.getElementById("start-button");
start.addEventListener("click", displayQuestion);
function displayQuestion() {
  // const category = document.getElementById("category").value;
  // const difficulty = document.getElementById("difficulty").value;
  // console.log(category, difficulty);
  // let results = await getData("questions", {category, difficulty});
  let mapResult = results.map((result) => {
    let correctIndex = Math.floor(Math.random() * 4);
    console.log(correctIndex);
    console.log(result.incorrect_answers);
    formattedAnswer = [...result.incorrect_answers];
    formattedAnswer.splice(correctIndex, 0, result.correct_answer);
    console.log(formattedAnswer);
    return { ...result, formattedAnswer };
  });
  console.log(mapResult);
  let currentQestion = 0;
  let score = 0;
  const question = document.getElementById("question");
  const choice1 = document.getElementById("choice1");
  const choice2 = document.getElementById("choice2");
  const choice3 = document.getElementById("choice3");
  const choice4 = document.getElementById("choice4");
  const next = document.getElementById("submit");
  const form = document.getElementById("quiz-form");
  const scoreElement = document.getElementById("score");

  if (currentQestion < mapResult.length) {
    question.textContent = mapResult[currentQestion].question;
    choice1.textContent =
      mapResult[currentQestion].formattedAnswer[currentQestion];
    choice2.textContent =
      mapResult[currentQestion].formattedAnswer[currentQestion];
    choice3.textContent =
      mapResult[currentQestion].formattedAnswer[currentQestion];
    choice4.textContent =
      mapResult[currentQestion].formattedAnswer[currentQestion];
  } else {
    question.textContent = "You have completely answered the questions";
    form.style.display = none;
    scoreElement.textContent = `Final Score: ${score}`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const yourChoice = document.querySelector("input[name=choice]:checked");

    if (!yourChoice) alert("Select an option");
    if (yourChoice == mapResult[currentQestion].correct_answer) score++;
  });

  currentQestion++;
  displayQuestion();
}
