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