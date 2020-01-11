'use strict';

/*

1. The starting screen should have a button that users can click to start the quiz.
2. Users should be prompted through a series of at least 5 multiple choice questions that they can answer.
3. Users should be asked questions 1 after the other.
4. Users should only be prompted with 1 question at a time.
5. Users should not be able to skip questions.
6. Users should also be able to see which question they're on (for instance, "7 out of 10") and their current score ("5 correct, 2 incorrect").
7. Upon submitting an answer, users should:
         receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
         be moved onto the next question (or interact with an element to move on).
8. Users should be shown their overall score at the end of the quiz. In other words, how many questions they got right out of the total questions asked.
9. Users should be able to start a new quiz. */


$(document).ready(function() {

  // store keeps track of all our quiz data - questions, answers, score, question number, whether
  // the quiz has started, whether it's the first quiz being played, whether the last question
  // was answered correctly or incorrectly. 
  const store = {
    questions: [
      {
        question: 'How do you say "cat" in Spanish?',
        answers: [
          'Gato',
          'Leon',
          'Raton',
          'Perro',
          'Pajaro'
        ],
        correctAnswer: 'Gato',
        questionNumber: 1,
      },
      {
        question: 'What is a Biblioteca?',
        answers: [
          'Gas Station',
          'Hardware Store',
          'Library',
          'Police Station',
          'School'
        ],
        correctAnswer: 'Library',
        questionNumber: 2,
      },
      {
        question: 'Pablo toca la guitara. What instrument does Pablo play?',
        answers: [
          'Piano',
          'Trumpet',
          'Drums',
          'Bass',
          'Guitar'
        ],
        correctAnswer: 'Guitar',
        questionNumber: 3,
      },
      {
        question: 'Daisy tiene puesto zapatos verdes. What color are Daisys shoes ?',
        answers: [
          'Brown',
          'Red',
          'Purple',
          'Green',
          'Yellow'
        ],
        correctAnswer: 'Green',
        questionNumber: 4,
      },
      {
        question: 'What day is Cinco de Mayo on?',
        answers: [
          'May 5th',
          'September 16th',
          'July 4th',
          'Febuary 12th',
          'June 6th'
        ],
        correctAnswer: 'May 5th',
        questionNumber: 5,
      }
    ],
    score: 0,
    questionCounter: 0,
    quizStarted: false,
    lastQuestionIncorrect: null,
    firstGame: true,
    
  };

  // our render function is responsible for rendering all html to the page. it uses conditionals 
  // to figure out which html should be rendered.

  function render() {

    // if it's the questionCounter is 5 (after the last next button has been pressed) and 
    // quizStarted is true, the html rendered will be the game over page.

    if (store.questionCounter === 5 && store.quizStarted === true) {
      $('main').html(`<section>
      <h2 class="gameover">Game Over!</h2>
    
      <p class="finalscore">final score: ${store.score}/5</p>
      <button class="startbutton">start new quiz</button>
    </section>` 
      );
      // if true, we return from this function to keep any further render conditionals from running
      return;
    }

    // if the quiz hasn't started and it's the first game, we render the welcome page view

    if (store.quizStarted === false && store.firstGame === true) {
      $('main').html(`<section> <h1 class="quiztitle">Spanish Quiz</h1>
      <h2 class="starttext">Do you want to play a game?</h2>
        <button class="startbutton">Si!</button>
    </section>`);
    } 
    // otherwise, we render the question view
    else if (store.quizStarted === true) {
      $('main').html(generateQuestionHtml());
    }

    // if the last question was answered correctly, display correct answer view, and visa versa

    if (store.lastQuestionIncorrect === false) {
      let correctAnswerHtml = generateQuestionHtml();
      $('main').html('<section>' + correctAnswerHtml + 

          `<p class="correctAnswer">You are Correct!</p>
          <p class="correctScore">Score: ${store.score}</p>
          <button class="nextbutton">Next</button>
    
        </section>`);
    } else if (store.lastQuestionIncorrect === true) {
      let correctAnswerHtml = generateQuestionHtml();
      let displayCorrect = store.questions[store.questionCounter].correctAnswer;
      $('main').html('<section>' + correctAnswerHtml +

          `<p class="incorrectAnswer">You are incorrect!</p>
          <p class="incorrectAnswer"> The Correct answer is ${displayCorrect}</p>
          <p class="incorrectScore">Score: ${store.score}</p>
          <button class="nextbutton">Next</button>
        </section>`);
    }
  }

  // this function listens for a click on the next button
  // when clicked, it resets lastQuestionIncorrect in the store object to 
  // null and adds 1 to the question counter. then it calls our render function

  function handleNextClick() {
    $('body').on('click', '.nextbutton', function(event) {
      store.lastQuestionIncorrect = null;
      store.questionCounter += 1;
      // event.preventDefault();
      console.log('next button clicked');
      render();
    });
  }

  // this function generates our question view html

  function generateQuestionHtml() {
    let questionNumber = store.questions[store.questionCounter].questionNumber;
    let currentQuestion = store.questions[store.questionCounter];
    let questionHtml = `
      
    <p class="questionNumber"> Question ${questionNumber}/5</p>
    <p class="question">${currentQuestion.question}</p> 

    <form class="questionform">
      <fieldset>
      <input class="inputselect" type="radio" id="correct" name="choice" value="${currentQuestion.answers[0]}" tabindex="0" required>
      <label for="correct">${currentQuestion.answers[0]}</label>
      <input class="inputselect" type="radio" id="wrong1" name="choice" value="${currentQuestion.answers[1]}" tabindex="1" required>
      <label for="wrong1">${currentQuestion.answers[1]}</label>
      <input class="inputselect" type="radio" id="wrong2" name="choice" value="${currentQuestion.answers[2]}" tabindex="2" required>
      <label for="wrong2">${currentQuestion.answers[2]}</label>
      <input class="inputselect" type="radio" id="wrong3" name="choice" value="${currentQuestion.answers[3]}" tabindex="3" required>
      <label for="wrong3">${currentQuestion.answers[3]}</label>
      <input class="inputselect" type="radio" id="wrong4" name="choice" value="${currentQuestion.answers[4]}" tabindex="4" required>
      <label for="wrong4">${currentQuestion.answers[4]}</label>
      <button class="submitanswerbutton" type="submit">Submit Answer</button>
      </fieldset>
    </form>`;
    return questionHtml;
  }

  // this function listens for a click on the start game button and sets
  // store.firstGame to false. it then resets the questionCounter to 0 if we're on the last page. 

  function handleStartGameClick() {
    $('main').on('click', '.startbutton', function() {
      store.firstGame = false;
      if (store.questionCounter === 5) {
        store.questionCounter = 0;
        store.score = 0;
      } else {
        store.quizStarted = true;
      }
      render();
      console.log('button was clicked');
    });
  }

  // this function is responsible for listening to clicks on the new quiz button, using event delegation. when clicked, it changes firstGame to false (so that welcome page is never shown again) and quizStarted to true then it calls our render function

  function handleNewGameClick() {
    $('main').on('click', '.newquizbutton', function() {
      store.firstGame = false;
      store.quizStarted = true;
      render();
      console.log('button was clicked');
    });
  }

  // this function listens for a submit on our question form, using event delegation. when an answer
  // is submitted, we check if the value of the value of the selected (checked) input is equal
  // to the correctAnswer for the question kept in our store. if it is, we add 1 to the score and 
  // change store.lastQuestionIncorrect to false. if it doesn't match correctAnswer,
  // store.lastQuestionIncorrect is set to true. then we call our render function.

  function handleSubmitAnswerButton() {
    $('main').on('submit', '.questionform', function(event) {
      event.preventDefault();

      if ($('input:checked').val() === store.questions[store.questionCounter].correctAnswer) {
        console.log('correct');
        store.score++;
        store.lastQuestionIncorrect = false;
      } else {
        console.log('incorrect');
        store.lastQuestionIncorrect = true;
      }
      render();
    });
  }

  // this function is responsible for activating all of our other functions

  function buildQuizGame() {
    render();
    handleStartGameClick();
    handleSubmitAnswerButton();
    handleNewGameClick();
    handleNextClick();
  }

  // this function calls our activator function, using jQuery syntax.

  $(buildQuizGame);

});
