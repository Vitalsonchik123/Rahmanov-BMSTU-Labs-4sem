// Шаг 1: Инициализация переменных калькулятора
window.onload = function() {
    // ---------- КАЛЬКУЛЯТОР ----------
    let a = '';                // Первое число
    let b = '';                // Второе число
    let expressionResult = ''; // Результат вычисления
    let selectedOperation = null; // Выбранная операция
    const MAX_DIGITS = 13;     // Максимум символов на экране

    const outputElement = document.getElementById("result");
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    // Функция обработки нажатия на цифровую кнопку (общая для мыши и клавиатуры)
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if (a.length >= MAX_DIGITS) return;
            if (digit !== '.' || (digit === '.' && !a.includes('.'))) {
                a += digit;
            }
            outputElement.innerHTML = a || '0';
        } else {
            if (b.length >= MAX_DIGITS) return;
            if (digit !== '.' || (digit === '.' && !b.includes('.'))) {
                b += digit;
            }
            outputElement.innerHTML = b || '0';
        }
    }

    // Назначение обработчиков для цифровых кнопок
    digitButtons.forEach(button => {
        button.onclick = function() {
            onDigitButtonClicked(button.innerHTML);
        };
    });

    // Обработчики операций
    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return;
        if (selectedOperation && b !== '') calculateResult();
        selectedOperation = 'x';
    };
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return;
        if (selectedOperation && b !== '') calculateResult();
        selectedOperation = '+';
    };
    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return;
        if (selectedOperation && b !== '') calculateResult();
        selectedOperation = '-';
    };
    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return;
        if (selectedOperation && b !== '') calculateResult();
        selectedOperation = '/';
    };

    // Очистка всего (C)
    document.getElementById("btn_op_clear").onclick = function() {
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        outputElement.innerHTML = '0';
    };

    // Удаление последнего символа (del)
    document.getElementById("btn_del").onclick = function() {
        if (!selectedOperation) {
            if (a.length > 0) {
                a = a.slice(0, -1);
                outputElement.innerHTML = a || '0';
            }
        } else {
            if (b.length > 0) {
                b = b.slice(0, -1);
                outputElement.innerHTML = b || '0';
            }
        }
    };

    // Смена знака числа (+/-)
    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a) * -1).toString();
                if (a.length > MAX_DIGITS) a = a.substring(0, MAX_DIGITS);
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) * -1).toString();
                if (b.length > MAX_DIGITS) b = b.substring(0, MAX_DIGITS);
                outputElement.innerHTML = b;
            }
        }
    };

    // Процент: Деление числа на 100
    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a) / 100).toString();
                if (a.length > MAX_DIGITS) a = a.substring(0, MAX_DIGITS);
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) / 100).toString();
                if (b.length > MAX_DIGITS) b = b.substring(0, MAX_DIGITS);
                outputElement.innerHTML = b;
            }
        }
    };

    // Вычисление результата для выбранной операции
    function calculateResult() {
        if (a === '' || b === '' || !selectedOperation) return false;
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        switch(selectedOperation) {
            case 'x': expressionResult = num1 * num2; break;
            case '+': expressionResult = num1 + num2; break;
            case '-': expressionResult = num1 - num2; break;
            case '/':
                if (num2 === 0) { alert('Ошибка: деление на ноль!'); return false; }
                expressionResult = num1 / num2; break;
            default: return false;
        }
        a = expressionResult.toString();
        if (a.length > MAX_DIGITS) a = a.substring(0, MAX_DIGITS);
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;
        return true;
    }

    // Кнопка "="
    document.getElementById("btn_op_equal").onclick = () => calculateResult();

    // Возведение в квадратный корень (√)
    document.getElementById("btn_op_sqrt").onclick = function() {
        let currentNum = !selectedOperation ? a : b;
        if (currentNum === '') currentNum = expressionResult !== '' ? expressionResult : '0';
        const num = parseFloat(currentNum);
        if (num < 0) { alert('Ошибка: нельзя извлечь квадратный корень из отрицательного числа!'); return; }
        const result = Math.sqrt(num).toString();
        const finalResult = result.length > MAX_DIGITS ? result.substring(0, MAX_DIGITS) : result;
        if (!selectedOperation) { a = finalResult; outputElement.innerHTML = a; }
        else { b = finalResult; outputElement.innerHTML = b; }
    };

    // Возведение в квадрат (x²)
    document.getElementById("btn_op_square").onclick = function() {
        let currentNum = !selectedOperation ? a : b;
        if (currentNum === '') currentNum = expressionResult !== '' ? expressionResult : '0';
        const num = parseFloat(currentNum);
        const result = (num * num).toString();
        const finalResult = result.length > MAX_DIGITS ? result.substring(0, MAX_DIGITS) : result;
        if (!selectedOperation) { a = finalResult; outputElement.innerHTML = a; }
        else { b = finalResult; outputElement.innerHTML = b; }
    };

    // Факториал (x!)
    document.getElementById("btn_op_factorial").onclick = function() {
        let currentNum = !selectedOperation ? a : b;
        if (currentNum === '') currentNum = expressionResult !== '' ? expressionResult : '0';
        const num = parseFloat(currentNum);
        if (!Number.isInteger(num) || num < 0) { alert('Ошибка: факториал только для целых неотрицательных чисел!'); return; }
        if (num > 170) { alert('Ошибка: число слишком большое для факториала!'); return; }
        let factorial = 1;
        for (let i = 2; i <= num; i++) factorial *= i;
        const result = factorial.toString();
        const finalResult = result.length > MAX_DIGITS ? result.substring(0, MAX_DIGITS) : result;
        if (!selectedOperation) { a = finalResult; outputElement.innerHTML = a; }
        else { b = finalResult; outputElement.innerHTML = b; }
    };

    // Кнопка "000" (добавление трёх нулей)
    document.getElementById("btn_digit_000").onclick = function() {
        if (!selectedOperation) {
            if (a.length + 3 <= MAX_DIGITS) { a += '000'; outputElement.innerHTML = a; }
        } else {
            if (b.length + 3 <= MAX_DIGITS) { b += '000'; outputElement.innerHTML = b; }
        }
    };

    // ===== РЕАЛИЗАЦИЯ ВВОДА ТЕКСТА В КАЛЬКУЛЯТОР С КЛАВИАТУРЫ =====
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (key >= '0' && key <= '9') {
            onDigitButtonClicked(key);           // Цифры
        }
        else if (key === '.') {
            onDigitButtonClicked('.');            // Точка
        }
        else if (key === '+') {
            document.getElementById("btn_op_plus").onclick();   // Сложение
        }
        else if (key === '-') {
            document.getElementById("btn_op_minus").onclick();  // Вычитание
        }
        else if (key === '*') {
            document.getElementById("btn_op_mult").onclick();   // Умножение
        }
        else if (key === '/') {
            document.getElementById("btn_op_div").onclick();    // Деление
        }
        else if (key === 'Enter' || key === '=') {
            calculateResult();                     // Равенство
        }
        else if (key === 'Escape' || key === 'c' || key === 'C') {
            document.getElementById("btn_op_clear").onclick();  // Очистка
        }
        else if (key === 'Backspace') {
            document.getElementById("btn_del").onclick();       // Удаление символа
        }
    });

    // ---------- СМЕНА ТЕМЫ ----------
    const themeButton = document.getElementById('btn_theme');
    const body = document.body;
    body.classList.add('light-theme');
    themeButton.addEventListener('click', function() {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeButton.textContent = 'Светлая тема';
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeButton.textContent = 'Тёмная тема';
        }
    });

    // ---------- ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ ----------
    function switchPage(pageName) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active-page');
        });
        const activePage = document.getElementById(`${pageName}-page`);
        if (activePage) activePage.classList.add('active-page');
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === pageName) item.classList.add('active');
        });
    }

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const pageName = item.getAttribute('data-page');
            switchPage(pageName);
        });
    });

    // ---------- РАСЧЁТ ЗАДЕРЖКИ ПО ПУАССОНУ (M/M/1) ----------
    const calcBtn = document.getElementById('calcPoisson');
    const lambdaInput = document.getElementById('lambda');
    const muInput = document.getElementById('mu');
    const thresholdInput = document.getElementById('threshold');
    const resultDiv = document.getElementById('poissonResult');

    function calculatePoisson() {
        let lambda = parseFloat(lambdaInput.value);
        let mu = parseFloat(muInput.value);
        let T = parseFloat(thresholdInput.value);

        if (isNaN(lambda) || isNaN(mu) || isNaN(T)) {
            resultDiv.innerHTML = 'Ошибка: пожалуйста, введите корректные числа.';
            return;
        }
        if (lambda < 0 || mu <= 0 || T < 0) {
            resultDiv.innerHTML = 'Ошибка: λ ≥ 0, μ > 0, T ≥ 0.';
            return;
        }
        if (lambda >= mu) {
            resultDiv.innerHTML = 'Ошибка: λ должна быть меньше μ (иначе очередь растёт неограниченно).';
            return;
        }

        const avgDelay = 1 / (mu - lambda);
        const probExceeds = Math.exp(-(mu - lambda) * T);

        resultDiv.innerHTML = "Результаты модели M/M/1 (Пуассоновский поток):<br>" +
            "Средняя задержка: " + avgDelay.toFixed(4) + " сек<br>" +
            "Вероятность, что задержка > " + T + " сек: " + (probExceeds * 100).toFixed(2) + "%<br>" +
            "Формула: W = 1/(μ-λ),  P(W>T) = e^{-(μ-λ)T}";
    }

    if (calcBtn) calcBtn.addEventListener('click', calculatePoisson);
    calculatePoisson(); // начальный расчёт
};
