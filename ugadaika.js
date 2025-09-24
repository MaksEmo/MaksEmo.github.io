let secretNumber = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;

        function checkGuess() {
            const input = document.getElementById('guessInput');
            const message = document.getElementById('message');
            const attemptsDisplay = document.getElementById('attempts');
            const guess = parseInt(input.value);

            if (isNaN(guess) || guess < 1 || guess > 100) {
                message.textContent = "Пожалуйста, введите число от 1 до 100!";
                message.style.color = "#ff6b6b";
                return;
            }

            attempts++;
            attemptsDisplay.textContent = `Попыток: ${attempts}`;

            if (guess === secretNumber) {
                message.textContent = `🎉 Поздравляем! Вы угадали число ${secretNumber} за ${attempts} попыток!`;
                message.style.color = "#aaffaa";
                input.disabled = true;
            } else if (guess < secretNumber) {
                message.textContent = "🔻 Загаданное число больше!";
                message.style.color = "#ffcc66";
            } else {
                message.textContent = "🔺 Загаданное число меньше!";
                message.style.color = "#ffcc66";
            }

            input.value = '';
            input.focus();
        }

        function newGame() {
            secretNumber = Math.floor(Math.random() * 100) + 1;
            attempts = 0;
            document.getElementById('attempts').textContent = "Попыток: 0";
            document.getElementById('message').textContent = "";
            document.getElementById('guessInput').disabled = false;
            document.getElementById('guessInput').value = '';
            document.getElementById('guessInput').focus();
        }

        document.getElementById('guessInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkGuess();
            }
        });

        window.onload = () => {
            document.getElementById('guessInput').focus();
        };