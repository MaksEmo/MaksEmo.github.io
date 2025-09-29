        let score = 0;
    let attempts = 0;

    const answers = ['4', '1', '3', '3', '1', '1', '1', '1', '4', '1'];
    const checked = new Array(10).fill(false);

    function Check(questionNumber) {
        const q = document.getElementById('q' + questionNumber);
        const a = document.getElementById('a' + questionNumber);
        const correctAnswer = answers[questionNumber - 1];
        q.classList.remove('correct', 'incorrect');

        if (a.value.trim() === correctAnswer) {
            score++;
            q.classList.add('correct');
        } else {
            attempts++;
            q.classList.add('incorrect');
        }

        checked[questionNumber - 1] = true;
        updateDisplay();
    }

    function updateDisplay() {
        document.getElementById('attemptsCount').textContent = attempts;
        document.getElementById('scoreCount').textContent = score;
    }