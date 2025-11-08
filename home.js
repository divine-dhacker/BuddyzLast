document.addEventListener('DOMContentLoaded', () => {
  const pastResultsContainer = document.getElementById('past-results-container');
  if (!pastResultsContainer) {
    return;
  }

  function getSavedQuizzes() {
    return JSON.parse(localStorage.getItem('savedQuizzes')) || {};
  }

  const savedQuizzes = getSavedQuizzes();
  const quizIDs = Object.keys(savedQuizzes);

  if (quizIDs.length === 0) {
    pastResultsContainer.innerHTML = '<p>You have not created any quizzes yet.</p>';
    return;
  }

  pastResultsContainer.innerHTML = '<h2>Your Past Quizzes</h2>';

  quizIDs.forEach(quizID => {
    database.ref('quizzes/' + quizID).once('value').then(snapshot => {
      const quizData = snapshot.val();
      if (quizData) {
        const quizResultElement = document.createElement('div');
        quizResultElement.classList.add('quiz-result');

        const quizLink = `${window.location.origin}${window.location.pathname.replace('index.html', 'bffchallenge.html')}?id=${quizID}`;

        let responsesHTML = '<ul>';
        if (quizData.responses) {
          const responses = Object.values(quizData.responses);
          responses.sort((a, b) => b.score - a.score); // Sort by score descending
          responses.forEach(response => {
            responsesHTML += `<li>${response.friendName}: ${response.score}/${quizData.answers.length}</li>`;
          });
        } else {
          responsesHTML += '<li>No responses yet.</li>';
        }
        responsesHTML += '</ul>';

        quizResultElement.innerHTML = `
          <h3>${quizData.name}'s Quiz</h3>
          <p>Share link: <a href="${quizLink}" target="_blank">${quizLink}</a></p>
          <h4>Results:</h4>
          ${responsesHTML}
        `;

        pastResultsContainer.appendChild(quizResultElement);
      }
    });
  });
});
