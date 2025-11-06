/**
 * code_checker.js — выполнение и проверка кода
 */

function runUserCode(userCode, levelIndex) {
  const task = window.tasks[levelIndex];

  if (!task || typeof task.check !== 'function') {
    return {
      logs: [],
      result: false,
      error: 'Ошибка: задание не найдено.'
    };
  }

  const logs = [];
  let executionError = null;

  const originalLog = console.log;
  const originalError = console.error;

  console.log = function (...args) {
    logs.push(args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' '));
  };

  console.error = function (...args) {
    logs.push('[ОШИБКА] ' + args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' '));
  };

  try {
    new Function(userCode)();
    const checkResult = task.check(userCode);
    return { logs, result: checkResult, error: null };
  } catch (e) {
    executionError = e.message || String(e);
    return { logs, result: false, error: executionError };
  } finally {
    console.log = originalLog;
    console.error = originalError;
  }
}

function createSandbox() {
  const sandbox = document.createElement('div');
  sandbox.id = 'js-sandbox';
  sandbox.style.display = 'none';
  document.body.appendChild(sandbox);
  return sandbox;
}

function clearSandbox() {
  const sandbox = document.getElementById('js-sandbox');
  if (sandbox) sandbox.remove();
}

window.runUserCode = runUserCode;
window.createSandbox = createSandbox;
window.clearSandbox = clearSandbox;