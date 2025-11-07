window.tasks = [
  // ============ Часть 1: Основы JavaScript ============

  {
    title: "Вывод в консоль",
    description: `Выведите в консоль фразу:\n"Мой первый код на JavaScript!"`,
    check: (code) => {
      if (!/console\.log\s*\(/.test(code)) {
        return "Используйте console.log() для вывода.";
      }
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) {
        logged = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      };
      try {
        new Function(code)();
        return logged === "Мой первый код на JavaScript!" ? true : "Неверный текст в console.log";
      } catch (e) {
        return "Ошибка: " + e.message;
      } finally {
        console.log = originalLog;
      }
    }
  },

  {
    title: "Переменные",
    description: `Создайте переменную name со значением "Алиса".\nВыведите в консоль: "Привет, Алиса"`,
    check: (code) => {
      if (!/(\blet\b|\bconst\b|\bvar\b)\s+name\b/.test(code)) {
        return "Объявите переменную 'name' с помощью let, const или var.";
      }
      if (!/console\.log\s*\(/.test(code)) {
        return "Используйте console.log() для вывода.";
      }
      if (!/console\.log\s*\(/.test(code)) {
        return "Используйте console.log() для вывода.";
      }
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) {
        logged = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      };
      try {
        new Function(code)();
        return logged === "Привет, Алиса" ? true : "Текст не совпадает";
      } catch (e) {
        return "Ошибка: " + e.message;
      } finally {
        console.log = originalLog;
      }
    }
  },

  {
    title: "Изменение переменной",
    description: `Создайте переменную counter = 0.\nУвеличьте её на 1 двумя способами:\n1. counter = counter + 1;\n2. counter += 1;\nВыведите результат.`,
    check: (code) => {
      if (!/counter\s*=\s*0/.test(code)) return "Объявите counter = 0";
      if (!/counter\s*=\s*counter\s*\+\s*1/.test(code) && !/counter\s*\+=\s*1/.test(code)) {
        return "Используйте один из способов увеличения: counter = counter + 1 или counter += 1";
      }
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) { logged = args.map(String).join(' '); };
      try {
        new Function(code)();
        return logged === "1" ? true : "Результат должен быть 1";
      } finally { console.log = originalLog; }
    }
  },

  {
    title: "Константы",
    description: `Объявите константу GRAVITY = 9.81.\nВыведите: "Ускорение свободного падения: 9.81 м/с²"`,
    check: (code) => {
      if (!/\bconst\s+GRAVITY\s*=\s*9\.81\b/.test(code)) {
        return "Объявите const GRAVITY = 9.81";
      }
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) { logged = args.map(String).join(' '); };
      try {
        new Function(code)();
        return logged === "Ускорение свободного падения: 9.81 м/с²" ? true : "Неверный текст";
      } finally { console.log = originalLog; }
    }
  },

    {
      title: "Проверка типов",
      description: `Создайте:\n- строку: text = "100"\n- число: num = 100\nВыведите типы через typeof: typeof text и typeof num`,
      check: (code) => {
        if (!/text\s*=\s*["']100["']/.test(code)) return "Объявите text = \"100\"";
        if (!/num\s*=\s*100\b/.test(code)) return "Объявите num = 100";
        if (!/typeof\s+text/.test(code) || !/typeof\s+num/.test(code)) {
          return "Используйте typeof text и typeof num";
        }
        let logs = [];
        const originalLog = console.log;
        console.log = function (...args) { logs.push(args.map(String).join(' ')); };
        try {
          new Function(code)();
          return logs.includes("string") && logs.includes("number") ? true : "Должны быть 'string' и 'number'";
        } finally { console.log = originalLog; }
      }
  },

  {
    title: "Арифметика",
    description: `Вычислите:\n- сумму: 15 + 7\n- разность: 20 - 8\n- произведение: 6 * 4\n- частное: 25 / 5\nВыведите все результаты,\nпри помощи console.log без создания переменных`,
    check: (code) => {
      if (!/console\.log\s*\([^)]*15\s*\+\s*7/.test(code)) return "Выведите 15 + 7";
      if (!/console\.log\s*\([^)]*20\s*-\s*8/.test(code)) return "Выведите 20 - 8";
      if (!/console\.log\s*\([^)]*6\s*\*\s*4/.test(code)) return "Выведите 6 * 4";
      if (!/console\.log\s*\([^)]*25\s*\/\s*5/.test(code)) return "Выведите 25 / 5";
      let logs = [];
      const originalLog = console.log;
      console.log = function (...args) { logs.push(args.map(String).join(' ')); };
      try {
        new Function(code)();
        const expected = ["22", "12", "24", "5"];
        return JSON.stringify(logs) === JSON.stringify(expected) ? true : "Неверные вычисления";
      } finally { console.log = originalLog; }
    }
  },

  {
    title: "Остаток от деления",
    description: `Найдите остаток от деления 17 на 5 с помощью %.\nВыведите результат.`,
    check: (code) => {
      if (!/17\s*%\s*5/.test(code)) return "Используйте 17 % 5";
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) { logged = args.map(String).join(' '); };
      try {
        new Function(code)();
        return logged === "2" ? true : "Остаток от 17 / 5 = 2";
      } finally { console.log = originalLog; }
    }
  },

  {
    title: "Приоритет операций",
    description: `Вычислите: 3 + 5 * 2 - 4 / 2\nСначала без скобок, затем с явными скобками: 3 + (5 * 2) - (4 / 2)\nУбедитесь, что результат одинаковый — 11.`,
    check: (code) => {
      if (!/3\s*\+\s*5\s*\*\s*2\s*-\s*4\s*\/\s*2/.test(code)) {
        return "Вычислите выражение без скобок";
      }
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) { logged = args.map(String).join(' '); };
      try {
        new Function(code)();
        return logged === "11" ? true : "Результат должен быть 11";
      } finally { console.log = originalLog; }
    }
  },

  // Задание 5.1: Ввод имени
  {
    title: "Ввод имени",
    description: `Запросите имя с помощью prompt("Как вас зовут?").\nВыведите: "Привет, [имя]!"`,
    check: (code) => {
      if (!/prompt\s*\(\s*["']Как вас зовут\?["']\s*\)/.test(code)) {
        return "Используйте prompt(\"Как вас зовут?\")";
      }
      if (!/console\.log\s*\([^)]*\+\s*name/.test(code)) {
        return "Выведите приветствие с именем / введите текст в соответствием условия задания";
      }
      // Эмулируем ввод
      const originalPrompt = window.prompt;
      window.prompt = () => "Алекс";
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) { logged = args.map(String).join(' '); };
      try {
        new Function(code)();
        return logged === "Привет, Алекс!" ? true : "Формат: \"Привет, [имя]!\"";
      } finally {
        window.prompt = originalPrompt;
        console.log = originalLog;
      }
    }
  },

  // Задание 5.2: Ввод числа и арифметика
  {
    title: "Возраст через 10 лет",
    description: `Запросите текущий возраст через prompt.\nПреобразуйте в число с помощью Number() или +.\nВыведите: "Через 10 лет вам будет [возраст+10]"`,
    check: (code) => {
      if (!/prompt/.test(code)) return "Используйте prompt()";
      if (!/Number\s*\(|\+\s*age/.test(code)) return "Преобразуйте строку в число";
      const originalPrompt = window.prompt;
      window.prompt = () => "25";
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) { logged = args.map(String).join(' '); };
      try {
        new Function(code)();
        return logged === "Через 10 лет вам будет 35" ? true : "Неверный расчёт";
      } finally {
        window.prompt = originalPrompt;
        console.log = originalLog;
      }
    }
  },

  // Задание 5.3: Два числа
  {
    title: "Сумма двух чисел",
    description: `Запросите два числа через prompt.\nВыведите их сумму.`,
    check: (code) => {
      if (!/prompt.*prompt/.test(code.replace(/\s/g, ''))) {
        return "Запросите два числа";
      }
      if (!/\+/.test(code)) return "Используйте + для сложения";
      const originalPrompt = window.prompt;
      let callCount = 0;
      window.prompt = () => (callCount++ === 0) ? "12" : "8";
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) { logged = args.map(String).join(' '); };
      try {
        new Function(code)();
        return logged === "20" ? true : "12 + 8 = 20";
      } finally {
        window.prompt = originalPrompt;
        console.log = originalLog;
      }
    }
  },

  {
    title: "Условия",
    description: `Если переменная age = 20, выведите "Доступ разрешён",\nиначе — "Доступ запрещён".`,
    check: (code) => {
      if (!/\bif\s*\(/.test(code)) {
        return "Используйте условный оператор if.";
      }
      if (!/age\s*=/.test(code)) {
        return "Создайте переменную 'age'.";
      }
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) {
        logged = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      };
      try {
        new Function(code)();
        return logged === "Доступ разрешён" ? true : "Неверное условие";
      } catch (e) {
        return "Ошибка: " + e.message;
      } finally {
        console.log = originalLog;
      }
    }
  },

  {
    title: "Чётное или нечётное",
    description: `Запросите число. Проверьте, чётное ли оно (остаток от деления на 2 === 0).\nВыведите "Чётное" или "Нечётное".`,
    check: (code) => {
      if (!/%\s*2/.test(code)) return "Используйте % 2 для проверки";
      const originalPrompt = window.prompt;
      window.prompt = () => "7";
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) { logged = args.map(String).join(' '); };
      try {
        new Function(code)();
        return logged === "Нечётное" ? true : '7 — нечётное';
      } finally {
        window.prompt = originalPrompt;
        console.log = originalLog;
      }
    }
  },

  {
    title: "Цикл for",
    description: `Выведите числа от 1 до 5 с помощью цикла for.`,
    check: (code) => {
      if (!/\bfor\s*\(/.test(code)) {
        return "Используйте цикл for.";
      }
      let logs = [];
      const originalLog = console.log;
      console.log = function (...args) {
        logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
      };
      try {
        new Function(code)();
        const expected = ["1", "2", "3", "4", "5"];
        return JSON.stringify(logs) === JSON.stringify(expected) ? true : "Числа не от 1 до 5";
      } catch (e) {
        return "Ошибка: " + e.message;
      } finally {
        console.log = originalLog;
      }
    }
  },

  {
    title: "Сумма от 1 до N",
    description: `Запросите число N. Найдите сумму чисел от 1 до N с помощью цикла for.`,
    check: (code) => {
      if (!/\bfor\b/.test(code)) return "Используйте цикл for";
      const originalPrompt = window.prompt;
      window.prompt = () => "4";
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) { logged = args.map(String).join(' '); };
      try {
        new Function(code)();
        return logged === "10" ? true : "1+2+3+4 = 10";
      } finally {
        window.prompt = originalPrompt;
        console.log = originalLog;
      }
    }
  },

  {
    title: "Функции",
    description: `Напишите функцию square(x), возвращающую x * x.\nВыведите результат вызова square(4).`,
    check: (code) => {
      if (!/\bfunction\s+square\s*\(/.test(code) && !/square\s*=\s*\(/.test(code)) {
        return "Объявите функцию 'square'.";
      }
      if (!/square\s*\(\s*4\s*\)/.test(code)) {
        return "Вызовите square(4).";
      }
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) {
        logged = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      };
      try {
        new Function(code)();
        return logged === "16" ? true : "Функция возвращает не 16";
      } catch (e) {
        return "Ошибка: " + e.message;
      } finally {
        console.log = originalLog;
      }
    }
  },

  {
    title: "Среднее трёх чисел",
    description: `Напишите функцию avg(a, b, c), возвращающую (a + b + c) / 3.\nВызовите её с аргументами 3, 6, 9 и выведите результат.`,
    check: (code) => {
      if (!/\bfunction\s+avg\b/.test(code)) return "Объявите функцию avg";
      if (!/avg\s*\(\s*3\s*,\s*6\s*,\s*9\s*\)/.test(code)) return "Вызовите avg(3, 6, 9)";
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) { logged = args.map(String).join(' '); };
      try {
        new Function(code)();
        return logged === "6" ? true : "(3+6+9)/3 = 6";
      } finally { console.log = originalLog; }
    }
  },

  {
    title: "Массивы",
    description: `Создайте массив colors = ["красный", "зелёный", "синий"].\nВыведите второй элемент.`,
    check: (code) => {
      if (!/\bcolors\s*=\s*\[/.test(code)) {
        return "Создайте массив 'colors'.";
      }
      if (!/console\.log\s*\(\s*colors\[1\]\s*\)/.test(code) && !/console\.log\s*\([^)]*1[^)]*\)/.test(code)) {
        return "Выведите второй элемент массива (индекс 1).";
      }
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) {
        logged = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      };
      try {
        new Function(code)();
        return logged === "зелёный" ? true : "Неверный элемент массива";
      } catch (e) {
        return "Ошибка: " + e.message;
      } finally {
        console.log = originalLog;
      }
    }
  },

  {
    title: "Поиск в массиве",
    description: `Создайте массив: numbers = [10, 20, 30, 40].\nИспользуйте цикл, чтобы найти число 30 и вывести его индекс.`,
    check: (code) => {
      if (!/\[10,\s*20,\s*30,\s*40\]/.test(code)) return "Создайте массив [10, 20, 30, 40]";
      if (!/\bfor\b|\bwhile\b/.test(code)) return "Используйте цикл для поиска";
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) { logged = args.map(String).join(' '); };
      try {
        new Function(code)();
        return logged === "2" ? true : "30 находится под индексом 2";
      } finally { console.log = originalLog; }
    }
  },

  {
    title: "Объекты",
    description: `Создайте объект user = { name: "Боб", age: 30 }.\nВыведите значение user.name.`,
    check: (code) => {
      if (!/\buser\s*=\s*\{/.test(code)) {
        return "Создайте объект 'user'.";
      }
      if (!/user\.name/.test(code)) {
        return "Обратитесь к свойству user.name.";
      }
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) {
        logged = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      };
      try {
        new Function(code)();
        return logged === "Боб" ? true : "Неверное свойство объекта";
      } catch (e) {
        return "Ошибка: " + e.message;
      } finally {
        console.log = originalLog;
      }
    }
  },

  // ============ Часть 2: Основы DOM ============

  {
    title: "Создание элемента",
    description: `Создайте div с текстом "Привет, DOM!".\nДобавьте его в document.body.`,
    check: (code) => {
      if (!/document\.createElement\s*\(\s*["']div["']\s*\)/.test(code)) {
        return "Используйте document.createElement('div').";
      }
      if (!/textContent|innerText|innerHTML/.test(code)) {
        return "Установите текст элемента.";
      }
      if (!/document\.body\.appendChild|append/.test(code)) {
        return "Добавьте элемент в document.body.";
      }
      const sandbox = createSandbox();
      try {
        new Function(code)();
        const divs = Array.from(document.querySelectorAll('div'));
        const target = divs.find(el => el.textContent === "Привет, DOM!" && el.parentNode === document.body);
        return target ? true : "Элемент не добавлен в body или текст неверный";
      } catch (e) {
        return "Ошибка: " + e.message;
      } finally {
        clearSandbox();
        document.querySelectorAll('div:not(.header):not(.container):not(.panel):not(.modal):not(#js-sandbox)')
          .forEach(el => {
            if (el.textContent === "Привет, DOM!") el.remove();
          });
      }
    }
  },

  {
    title: "Изменение текста",
    description: `Создайте элемент с id="message" и текстом "Старый текст".\nЗатем измените его текст на "Новый текст".`,
    check: (code) => {
      if (!/id\s*=\s*["']message["']/.test(code)) {
        return "Установите id='message'.";
      }
      if (!/textContent|innerText/.test(code)) {
        return "Используйте textContent для изменения текста.";
      }
      try {
        new Function(code)();
        const el = document.getElementById("message");
        const ok = el && el.textContent === "Новый текст";
        if (el) el.remove();
        return ok ? true : "Текст не изменён на 'Новый текст'";
      } catch (e) {
        return "Ошибка: " + e.message;
      }
    }
  },

  {
    title: "Изменение стиля",
    description: `Создайте div с id="box".\nСделайте его фон зелёным (backgroundColor = "green").`,
    check: (code) => {
      if (!/id\s*=\s*["']box["']/.test(code)) {
        return "Установите id='box'.";
      }
      if (!/style\.backgroundColor\s*=/.test(code)) {
        return "Измените style.backgroundColor.";
      }
      try {
        new Function(code)();
        const box = document.getElementById("box");
        const ok = box && (box.style.backgroundColor === "green" || getComputedStyle(box).backgroundColor === "rgb(0, 128, 0)");
        if (box) box.remove();
        return ok ? true : "Фон не стал зелёным";
      } catch (e) {
        return "Ошибка: " + e.message;
      }
    }
  },

  {
    title: "Выбор элемента",
    description: `Создайте кнопку с id="myBtn" и текстом "Кликни".\nНайдите её с помощью getElementById и измените текст на "Готово!".`,
    check: (code) => {
      if (!/document\.createElement\s*\(\s*["']button["']\s*\)/.test(code)) {
        return "Создайте кнопку через createElement('button').";
      }
      if (!/getElementById\s*\(\s*["']myBtn["']\s*\)/.test(code)) {
        return "Используйте document.getElementById('myBtn').";
      }
      if (!/textContent|innerText/.test(code)) {
        return "Измените текст кнопки.";
      }
      try {
        new Function(code)();
        const btn = document.getElementById("myBtn");
        const ok = btn && btn.textContent === "Готово!";
        if (btn) btn.remove();
        return ok ? true : "Текст кнопки не изменён";
      } catch (e) {
        return "Ошибка: " + e.message;
      }
    }
  },

  {
    title: "Работа с классами",
    description: `Создайте div с id="card".\nДобавьте ему класс "highlight".`,
    check: (code) => {
      if (!/id\s*=\s*["']card["']/.test(code)) {
        return "Установите id='card'.";
      }
      if (!/classList\.add\s*\(\s*["']highlight["']\s*\)/.test(code)) {
        return "Используйте classList.add('highlight').";
      }
      try {
        new Function(code)();
        const card = document.getElementById("card");
        const ok = card && card.classList.contains("highlight");
        if (card) card.remove();
        return ok ? true : "Класс 'highlight' не добавлен";
      } catch (e) {
        return "Ошибка: " + e.message;
      }
    }
  },

  {
    title: "Обработка клика",
    description: `Создайте кнопку с id="clickBtn" и текстом "Нажми".\nПри клике на неё в консоль должно выводиться "Клик выполнен!".`,
    check: (code) => {
      if (!/addEventListener\s*\(\s*["']click["']/.test(code)) {
        return "Используйте addEventListener('click', ...).";
      }
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) {
        logged = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      };
      try {
        new Function(code)();
        const btn = document.getElementById("clickBtn");
        if (!btn) return "Кнопка не создана";
        btn.click();
        const ok = logged === "Клик выполнен!";
        if (btn) btn.remove();
        return ok ? true : "Обработчик клика не работает";
      } catch (e) {
        return "Ошибка: " + e.message;
      } finally {
        console.log = originalLog;
      }
    }
  },

  {
    title: "Поле ввода",
    description: `Создайте input с id="userInput".\nУстановите его значение в "Тест".\nВыведите это значение в консоль.`,
    check: (code) => {
      if (!/document\.createElement\s*\(\s*["']input["']\s*\)/.test(code)) {
        return "Создайте input через createElement('input').";
      }
      if (!/value\s*=/.test(code)) {
        return "Установите значение поля через .value.";
      }
      if (!/console\.log\s*\([^)]*\.value/.test(code)) {
        return "Выведите значение input.value в консоль.";
      }
      let logged = null;
      const originalLog = console.log;
      console.log = function (...args) {
        logged = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      };
      try {
        new Function(code)();
        const input = document.getElementById("userInput");
        const ok = input && logged === "Тест";
        if (input) input.remove();
        return ok ? true : "Значение не выведено или не установлено";
      } catch (e) {
        return "Ошибка: " + e.message;
      } finally {
        console.log = originalLog;
      }
    }
  },

  {
    title: "Счётчик кликов",
    description: `Создайте кнопку и div.\nПри каждом клике по кнопке число в div увеличивается на 1 (начинается с 0).`,
    check: (code) => {
      if (!/addEventListener\s*\(\s*["']click["']/.test(code)) {
        return "Используйте addEventListener для обработки клика.";
      }
      if (!/textContent\s*=/.test(code)) {
        return "Обновляйте текст div через textContent.";
      }
      try {
        new Function(code)();
        const btn = document.querySelector("button");
        const div = document.querySelector("div:not(.header):not(.container):not(.panel):not(.modal):not(#js-sandbox)");
        if (!btn || !div) return "Кнопка или див не созданы";
        btn.click();
        btn.click();
        const ok = div.textContent === "2";
        btn.remove();
        div.remove();
        return ok ? true : "Счётчик не увеличивается";
      } catch (e) {
        return "Ошибка: " + e.message;
      }
    }
  }
];