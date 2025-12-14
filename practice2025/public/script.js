document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('applicationForm');

    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const inputs = form.querySelectorAll('.form-control, .form-select');
            inputs.forEach(input => {
                input.classList.remove('is-invalid');
                const feedback = input.parentNode.querySelector('.invalid-feedback');
                if (feedback) feedback.style.display = 'none';
            });

            const formData = new FormData(form);
            if (formData.get('bot-field')) {
                 alert('Обнаружен спам!');
                 return;
            }

            try {
                const response = await fetch('/submit', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    // Отправка события в Яндекс.Метрику при успешной отправке
                    ym(XXXXXXX, 'reachGoal', 'form_submit'); // Замените 'form_submit' на ваш идентификатор цели
                    // Перенаправление на страницу успеха
                    window.location.href = '/thank-you';

                } else {
                    const errorResult = await response.json();
                    console.error('Ошибка отправки:', errorResult);

                    if (errorResult.errors) {
                        errorResult.errors.forEach(errorMsg => {
                            if (errorMsg.includes('Имя')) {
                                const nameInput = document.getElementById('name');
                                nameInput.classList.add('is-invalid');
                                const feedback = nameInput.parentNode.querySelector('.invalid-feedback');
                                if (feedback) {
                                    feedback.textContent = errorMsg;
                                    feedback.style.display = 'block';
                                }
                            }
                            if (errorMsg.includes('Телефон')) {
                                const phoneInput = document.getElementById('phone');
                                phoneInput.classList.add('is-invalid');
                                const feedback = phoneInput.parentNode.querySelector('.invalid-feedback');
                                if (feedback) {
                                    feedback.textContent = errorMsg;
                                    feedback.style.display = 'block';
                                }
                            }
                        });
                    } else {
                         alert('Произошла ошибка при отправке формы. Попробуйте позже.');
                    }
                }
            } catch (error) {
                console.error('Ошибка сети или парсинга:', error);
                alert('Произошла ошибка при отправке формы. Проверьте подключение к интернету.');
            }
        });
    }

    // Логика для бургер-меню не нужна, так как Bootstrap её предоставляет
});

if (response.ok) {
    // Отправка события в Яндекс.Метрику
    ym(105844439, 'reachGoal', 'form_submit'); // Замени XXXXXXX на ID счётчика, form_submit — на имя цели
    // Перенаправление на страницу успеха
    window.location.href = '/thank-you';
}