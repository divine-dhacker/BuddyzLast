document.addEventListener('DOMContentLoaded', () => {
  const pastResultsContainer = document.getElementById('result-board-container');
  if (!pastResultsContainer) {
    return;
  }

  function getSavedQuizzes() {
    return JSON.parse(localStorage.getItem('savedQuizzes')) || {};
  }

  function removeQuiz(quizID) {
    const savedQuizzes = getSavedQuizzes();
    delete savedQuizzes[quizID];
    localStorage.setItem('savedQuizzes', JSON.stringify(savedQuizzes));
    database.ref('quizzes/' + quizID).remove();
  }

  function displayQuizzes() {
    const savedQuizzes = getSavedQuizzes();
    const quizIDs = Object.keys(savedQuizzes);

    pastResultsContainer.style.display = 'flex';
    if (quizIDs.length === 0) {
      pastResultsContainer.innerHTML = '<p>You have not created any quizzes yet.</p>';
      return;
    }

    pastResultsContainer.style.display = 'flex';
    pastResultsContainer.innerHTML = '<h2 id="quiz-heading">Your Past Quizzes</h2><ul id="result-list"></ul>';
    const resultList = pastResultsContainer.querySelector('#result-list');
    resultList.innerHTML = '';

    quizIDs.forEach(quizID => {
      database.ref('quizzes/' + quizID).once('value').then(snapshot => {
        const quizData = snapshot.val();
        if (quizData) {
          const quizResultElement = document.createElement('li');

          const quizLink = `${window.location.origin}${window.location.pathname.replace('index.html', 'bffchallenge.html')}?id=${quizID}`;

          let responsesHTML = `
            <div class="result-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
          `;
          if (quizData.responses) {
            const responses = Object.values(quizData.responses);
            responses.sort((a, b) => b.score - a.score); // Sort by score descending
            responses.forEach((response, index) => {
              responsesHTML += `
                <tr>
                  <td>${index + 1}</td>
                  <td>${response.friendName}</td>
                  <td>${response.score}/${quizData.answers.length}</td>
                </tr>
              `;
            });
          } else {
            responsesHTML += '<tr><td colspan="3">No responses yet.</td></tr>';
          }
          responsesHTML += `
                </tbody>
              </table>
            </div>
          `;

          quizResultElement.innerHTML = `
            <div class="result-info">
              <strong>${quizData.name}'s Quiz</strong>
              <p>Share link: <a href="${quizLink}" target="_blank">Copy Link</a></p>
            </div>
            <button class="delete-btn" data-quiz-id="${quizID}"><i class="fas fa-trash"></i></button>
            ${responsesHTML}
          `;

          resultList.appendChild(quizResultElement);

          const deleteButton = quizResultElement.querySelector('.delete-btn');
          deleteButton.addEventListener('click', (e) => {
            const quizIdToDelete = e.target.getAttribute('data-quiz-id');
            if (confirm('Are you sure you want to delete this quiz permanently?')) {
              removeQuiz(quizIdToDelete);
              displayQuizzes();
            }
          });
        }
      });
    });
  }

  displayQuizzes();
});
