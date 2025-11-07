let currentLevel = 0;
const completedLevels = new Set();

document.addEventListener('DOMContentLoaded', () => {
  if (!window.tasks || window.tasks.length === 0) {
    document.getElementById('terminal').textContent = '> ❌ Задания не загружены.';
    return;
  }

  // Загрузка прогресса
  const savedLevel = localStorage.getItem('jsMethodichkaLevel');
  if (savedLevel !== null) {
    const level = parseInt(savedLevel, 10);
    if (!isNaN(level) && level >= 0 && level < window.tasks.length) {
      currentLevel = level;
      for (let i = 0; i < currentLevel; i++) {
        completedLevels.add(i);
      }
    }
  }

  // DOM-элементы
  const taskTextEl = document.getElementById('task-text');
  const levelNumEl = document.getElementById('level-num');
  const codeEditorEl = document.getElementById('code-editor');
  const terminalEl = document.getElementById('terminal');
  const feedbackEl = document.getElementById('feedback');
  const runBtn = document.getElementById('run-btn');
  const helpBtn = document.getElementById('help-btn');
  const closeModalBtn = document.getElementById('close-modal');
  const referenceModal = document.getElementById('reference-modal');
  const referenceContentEl = document.getElementById('reference-content');
  const resetBtn = document.getElementById('reset-progress-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  loadLevel();

  // Навигация
  prevBtn.addEventListener('click', () => {
    if (currentLevel > 0) {
      currentLevel--;
      loadLevel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (completedLevels.has(currentLevel)) {
      currentLevel++;
      loadLevel();
    }
  });

  // Выполнение кода
  runBtn.addEventListener('click', () => {
    const userCode = codeEditorEl.value.trim();
    if (!userCode) {
      terminalEl.textContent = '> ❌ Код пуст.';
      feedbackEl.innerHTML = '<div class="feedback incorrect">❌ Напишите код.</div>';
      return;
    }

    // Сохраняем код текущего задания
    localStorage.setItem(`jsMethodichkaCode_${currentLevel}`, userCode);

    const formattedCode = userCode.split('\n').map(l => `  ${l}`).join('\n');
    let output = `> <strong>Код:</strong>\n${formattedCode}\n\n> <strong>Результат:</strong>\n`;

    const { logs, result, error } = runUserCode(userCode, currentLevel);

    if (logs && logs.length > 0) {
      output += logs.join('\n') + '\n\n';
    } else if (!error && result !== true) {
      output += '(вывод отсутствует)\n\n';
    }

    if (error) {
      output += `❌ ${error}`;
      feedbackEl.innerHTML = '<div class="feedback incorrect">❌ Ошибка.</div>';
    } else if (result === true) {
      output += '✅ Верно!';
      feedbackEl.innerHTML = '<div class="feedback correct">✅ Задание выполнено!</div>';
      
      // Отмечаем как пройденное
      completedLevels.add(currentLevel);
      localStorage.setItem('jsMethodichkaLevel', String(currentLevel + 1));

      // Разблокируем кнопку "Вперёд", если есть следующее задание
      if (currentLevel + 1 < window.tasks.length) {
        nextBtn.disabled = false;
      }
    } else {
      output += `❌ ${result}`;
      feedbackEl.innerHTML = '<div class="feedback incorrect">❌ Неверно.</div>';
    }

    terminalEl.innerHTML = output;
  });

  // Справочник
  helpBtn?.addEventListener('click', () => {
    referenceModal.style.display = 'flex';
  });

  closeModalBtn?.addEventListener('click', () => {
    referenceModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === referenceModal) {
      referenceModal.style.display = 'none';
    }
  });

  // Сброс прогресса
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Сбросить весь прогресс и начать сначала?')) {
        currentLevel = 0;
        completedLevels.clear();
        localStorage.removeItem('jsMethodichkaLevel');
        // Удаляем все сохранённые коды
        for (let i = 0; i < window.tasks.length; i++) {
          localStorage.removeItem(`jsMethodichkaCode_${i}`);
        }
        loadLevel();
        runBtn.disabled = false;
        feedbackEl.innerHTML = '<div class="feedback correct">🔄 Прогресс сброшен!</div>';
      }
    });
  }

  // Загрузка задания
  function loadLevel() {
    const task = window.tasks[currentLevel];
    levelNumEl.textContent = currentLevel + 1;
    taskTextEl.innerHTML = (task.description || task.title).replace(/\n/g, '<br>');
    codeEditorEl.value = localStorage.getItem(`jsMethodichkaCode_${currentLevel}`) || '';
    terminalEl.innerHTML = '> Готов к выполнению.';
    feedbackEl.textContent = '';
    updateReference(currentLevel);

    // Обновляем состояние кнопок навигации
    prevBtn.disabled = (currentLevel === 0);
    nextBtn.disabled = !completedLevels.has(currentLevel) || (currentLevel === window.tasks.length - 1);
  }

 function updateReference(levelIndex) {
  let html = '';

  // ============ ОСНОВЫ JAVASCRIPT ============
  html += `
    <div class="ref-item">
      <h3>console.log(значение)</h3>
      <p>Выводит данные в консоль для отладки.</p>
      <pre class="ref-example">console.log("Привет!");<br>console.log(42);<br>console.log("Ответ:", 100);</pre>
    </div>

    <div class="ref-item">
      <h3>let, const, var</h3>
      <p><code>let</code> — изменяемая переменная.<br><code>const</code> — константа (неизменяемая).<br><code>var</code> — устаревшее (не рекомендуется).</p>
      <pre class="ref-example">let age = 25;        // можно изменить<br>age = 26;<br><br>const PI = 3.14;     // нельзя изменить<br>// PI = 3.1415; ← ошибка!</pre>
    </div>

    <div class="ref-item">
      <h3>Типы данных</h3>
      <p>Основные типы: строка, число, булево, null, undefined.</p>
      <pre class="ref-example">let text = "Привет";   // string<br>let num = 42;         // number<br>let isDone = true;    // boolean<br>let nothing = null;    // null<br>let undef;             // undefined</pre>
    </div>

    <div class="ref-item">
      <h3>typeof</h3>
      <p>Проверяет тип значения.</p>
      <pre class="ref-example">console.log(typeof "текст"); // "string"<br>console.log(typeof 42);      // "number"<br>console.log(typeof true);    // "boolean"</pre>
    </div>

    <div class="ref-item">
      <h3>Арифметические операции</h3>
      <p>Основные действия с числами.</p>
      <pre class="ref-example">let a = 10, b = 3;<br>console.log(a + b); // 13<br>console.log(a - b); // 7<br>console.log(a * b); // 30<br>console.log(a / b); // 3.333...<br>console.log(a % b); // 1 ← остаток</pre>
    </div>

    <div class="ref-item">
      <h3>Приоритет операций</h3>
      <p>Умножение/деление выполняются раньше сложения/вычитания.</p>
      <pre class="ref-example">console.log(3 + 5 * 2);   // 13<br>console.log((3 + 5) * 2); // 16 ← скобки меняют порядок</pre>
    </div>

    <div class="ref-item">
      <h3>Ввод данных: prompt()</h3>
      <p>Показывает диалоговое окно для ввода текста.</p>
      <pre class="ref-example">let name = prompt("Как вас зовут?");<br>console.log("Привет, " + name + "!");<br><br>// Ввод числа:<br>let age = Number(prompt("Ваш возраст?"));</pre>
    </div>

    <div class="ref-item">
      <h3>Преобразование типов</h3>
      <p>Как превратить строку в число и наоборот.</p>
      <pre class="ref-example">// Строка → число<br>let str = "123";<br>let num = Number(str); // 123<br>let num2 = +str;       // 123 ← краткая форма<br><br>// Число → строка<br>let n = 42;<br>let s = String(n); // "42"<br>let s2 = n + "";   // "42"</pre>
    </div>

    <div class="ref-item">
      <h3>if / else</h3>
      <p>Выполняет код только если условие истинно.</p>
      <pre class="ref-example">let age = 20;<br>if (age >= 18) {<br>  console.log("Можно голосовать");<br>} else {<br>  console.log("Еще рано");<br>}</pre>
    </div>

    <div class="ref-item">
      <h3>Цикл for</h3>
      <p>Повторяет действия заданное число раз.</p>
      <pre class="ref-example">for (let i = 1; i <= 5; i++) {<br>  console.log(i);<br>}<br>// Выведет: 1, 2, 3, 4, 5</pre>
    </div>

    <div class="ref-item">
      <h3>Функции</h3>
      <p>Группа команд с именем. Можно вызывать многократно.</p>
      <pre class="ref-example">function square(x) {<br>  return x * x;<br>}<br><br>console.log(square(4)); // 16</pre>
    </div>

    <div class="ref-item">
      <h3>Массивы</h3>
      <p>Список значений. Нумерация с 0.</p>
      <pre class="ref-example">let fruits = ["яблоко", "банан", "апельсин"];<br>console.log(fruits[0]); // "яблоко"<br>fruits.push("киви");     // добавить в конец<br>console.log(fruits.length); // 4</pre>
    </div>

    <div class="ref-item">
      <h3>Объекты</h3>
      <p>Хранят данные в виде "ключ: значение".</p>
      <pre class="ref-example">let user = {<br>  name: "Алиса",<br>  age: 30<br>};<br>console.log(user.name); // "Алиса"<br>user.city = "Москва";    // добавить свойство</pre>
    </div>
  `;

  // ============ РАБОТА С DOM (появляется с 12-го задания) ============
{
    html += `
      <div class="ref-item">
        <h3>Создание элемента</h3>
        <p>Как создать новый HTML-элемент из JavaScript.</p>
        <pre class="ref-example">const div = document.createElement("div");<br>div.textContent = "Новый блок";<br>document.body.appendChild(div);</pre>
      </div>

      <div class="ref-item">
        <h3>Изменение текста</h3>
        <p>Установка или получение текста внутри элемента.</p>
        <pre class="ref-example">// Установить<br>el.textContent = "Новый текст";<br><br>// Получить<br>console.log(el.textContent);</pre>
      </div>

      <div class="ref-item">
        <h3>Изменение стилей</h3>
        <p>Как менять CSS-стили через JavaScript.</p>
        <pre class="ref-example">el.style.color = "red";<br>el.style.backgroundColor = "lightblue";<br>el.style.fontSize = "18px";<br>// Важно: fontSize, а не font-size!</pre>
      </div>

      <div class="ref-item">
        <h3>Поиск элемента по id</h3>
        <p>Быстрый способ найти один элемент на странице.</p>
        <pre class="ref-example">const btn = document.getElementById("myButton");<br>if (btn) {<br>  btn.style.display = "none";<br>}</pre>
      </div>

      <div class="ref-item">
        <h3>Работа с классами</h3>
        <p>Добавление, удаление и переключение CSS-классов.</p>
        <pre class="ref-example">el.classList.add("active");<br>el.classList.remove("hidden");<br>el.classList.toggle("dark"); // вкл/выкл</pre>
      </div>

      <div class="ref-item">
        <h3>Обработка событий</h3>
        <p>Как реагировать на действия пользователя.</p>
        <pre class="ref-example">// Клик по кнопке<br>btn.addEventListener("click", () => {<br>  console.log("Кнопка нажата!");<br>});<br><br>// Ввод в поле<br>input.addEventListener("input", (e) => {<br>  console.log("Текущее значение:", e.target.value);<br>});</pre>
      </div>

      <div class="ref-item">
        <h3>Работа с формами</h3>
        <p>Как получать и устанавливать значения полей ввода.</p>
        <pre class="ref-example">// Получить значение<br>const text = input.value;<br><br>// Установить значение<br>input.value = "Новое значение";<br><br>// Очистить<br>input.value = "";</pre>
      </div>

      <div class="ref-item">
        <h3>Совет: как отлаживать</h3>
        <p>Если что-то не работает:<br>1. Проверьте, существует ли элемент<br>2. Используйте <code>console.log(el)</code><br>3. Смотрите вкладку "Elements" в DevTools</p>
        <pre class="ref-example">const el = document.getElementById("test");<br>console.log("Элемент:", el);<br>if (el) el.style.color = "green";</pre>
      </div>
    `;
  }

  referenceContentEl.innerHTML = html;
}
});