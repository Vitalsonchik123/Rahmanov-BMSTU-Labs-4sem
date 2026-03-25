// Шаг 1: Инициализация переменных
window.onload = function() {
    // Переменные для хранения чисел и операций
    let a = '';                // Первое число (строка для накопления цифр)
    let b = '';                // Второе число
    let expressionResult = ''; // Результат вычисления
    let selectedOperation = null; // Выбранная операция (+, -, x, /)

    // Максимальное количество символов в окне вывода/ввода
    const MAX_DIGITS = 13;

// ШАГ 2: Получение доступа к элементам калькулятора
    // Получаем доступ к экрану калькулятора в поле вывода
    const outputElement = document.getElementById("result");

    // Получаем все цифровые кнопки (id начинаются с "btn_digit_")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

// ШАГ 3: Функция обработки нажатия на цифровые кнопки
    function onDigitButtonClicked(digit) {
        // Если операция не выбрана, работаем с первым числом (a) - после выбора операции начинается ввод второго числа
        if (!selectedOperation) {
            // Проверяем, не превысит ли добавление цифры лимит
            if (a.length >= MAX_DIGITS) {
                return; // Игнорируем нажатие, если достигнут лимит
            }

            // Проверяем, не пытаемся ли мы добавить вторую точку
            if (digit !== '.' || (digit === '.' && !a.includes('.'))) {
                a += digit;
            }
            outputElement.innerHTML = a || '0';
        }
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            // Проверяем, не превысит ли добавление цифры лимит
            if (b.length >= MAX_DIGITS) {
                return;
            }

            if (digit !== '.' || (digit === '.' && !b.includes('.'))) {
                b += digit;
            }
            outputElement.innerHTML = b || '0';
        }
    }

// ШАГ 4: Настройка обработчиков событий для кнопок
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        };
    });

    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') {
            return;
        }
        if (selectedOperation && b !== '') {
            calculateResult();
        }
        selectedOperation = 'x';
    };

    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return;
        if (selectedOperation && b !== '') {
            calculateResult();
        }
        selectedOperation = '+';
    };

    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return;
        if (selectedOperation && b !== '') {
            calculateResult();
        }
        selectedOperation = '-';
    };

    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return;
        if (selectedOperation && b !== '') {
            calculateResult();
        }
        selectedOperation = '/';
    };

// ШАГ 5: Кнопка очистки
    document.getElementById("btn_op_clear").onclick = function() {
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        outputElement.innerHTML = '0';
    };

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

    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a) * -1).toString();
                if (a.length > MAX_DIGITS) {
                    a = a.substring(0, MAX_DIGITS);
                }
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) * -1).toString();
                if (b.length > MAX_DIGITS) {
                    b = b.substring(0, MAX_DIGITS);
                }
                outputElement.innerHTML = b;
            }
        }
    };

    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a) / 100).toString();
                if (a.length > MAX_DIGITS) {
                    a = a.substring(0, MAX_DIGITS);
                }
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) / 100).toString();
                if (b.length > MAX_DIGITS) {
                    b = b.substring(0, MAX_DIGITS);
                }
                outputElement.innerHTML = b;
            }
        }
    };

    function calculateResult() {
        if (a === '' || b === '' || !selectedOperation) {
            return false;
        }

        const num1 = parseFloat(a);
        const num2 = parseFloat(b);

        switch(selectedOperation) {
            case 'x':
                expressionResult = num1 * num2;
                break;
            case '+':
                expressionResult = num1 + num2;
                break;
            case '-':
                expressionResult = num1 - num2;
                break;
            case '/':
                if (num2 === 0) {
                    alert('Ошибка: деление на ноль!');
                    return false;
                }
                expressionResult = num1 / num2;
                break;
            default:
                return false;
        }

        a = expressionResult.toString();
        if (a.length > MAX_DIGITS) {
            a = a.substring(0, MAX_DIGITS);
        }

        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;
        return true;
    }

    document.getElementById("btn_op_equal").onclick = function() {
        calculateResult();
    };

    document.getElementById("btn_op_sqrt").onclick = function() {
        let currentNum = !selectedOperation ? a : b;

        if (currentNum === '') {
            currentNum = expressionResult !== '' ? expressionResult : '0';
        }

        const num = parseFloat(currentNum);

        if (num < 0) {
            alert('Ошибка: нельзя извлечь квадратный корень из отрицательного числа!');
            return;
        }

        const result = Math.sqrt(num).toString();
        const finalResult = result.length > MAX_DIGITS ? result.substring(0, MAX_DIGITS) : result;

        if (!selectedOperation) {
            a = finalResult;
            outputElement.innerHTML = a;
        } else {
            b = finalResult;
            outputElement.innerHTML = b;
        }
    };

    document.getElementById("btn_op_square").onclick = function() {
        let currentNum = !selectedOperation ? a : b;

        if (currentNum === '') {
            currentNum = expressionResult !== '' ? expressionResult : '0';
        }

        const num = parseFloat(currentNum);
        const result = (num * num).toString();
        const finalResult = result.length > MAX_DIGITS ? result.substring(0, MAX_DIGITS) : result;

        if (!selectedOperation) {
            a = finalResult;
            outputElement.innerHTML = a;
        } else {
            b = finalResult;
            outputElement.innerHTML = b;
        }
    };

    document.getElementById("btn_op_factorial").onclick = function() {
        let currentNum = !selectedOperation ? a : b;

        if (currentNum === '') {
            currentNum = expressionResult !== '' ? expressionResult : '0';
        }

        const num = parseFloat(currentNum);

        if (!Number.isInteger(num) || num < 0) {
            alert('Ошибка: факториал вычисляется только для целых неотрицательных чисел!');
            return;
        }

        if (num > 170) {
            alert('Ошибка: число слишком большое для вычисления факториала!');
            return;
        }

        let factorial = 1;
        for (let i = 2; i <= num; i++) {
            factorial *= i;
        }

        const result = factorial.toString();
        const finalResult = result.length > MAX_DIGITS ? result.substring(0, MAX_DIGITS) : result;

        if (!selectedOperation) {
            a = finalResult;
            outputElement.innerHTML = a;
        } else {
            b = finalResult;
            outputElement.innerHTML = b;
        }
    };

    document.getElementById("btn_digit_000").onclick = function() {
        if (!selectedOperation) {
            if (a.length + 3 <= MAX_DIGITS) {
                a += '000';
                outputElement.innerHTML = a;
            }
        } else {
            if (b.length + 3 <= MAX_DIGITS) {
                b += '000';
                outputElement.innerHTML = b;
            }
        }
    };

    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (key >= '0' && key <= '9') {
            onDigitButtonClicked(key);
        }
        else if (key === '.') {
            onDigitButtonClicked('.');
        }
        else if (key === '+') {
            document.getElementById("btn_op_plus").onclick();
        }
        else if (key === '-') {
            document.getElementById("btn_op_minus").onclick();
        }
        else if (key === '*') {
            document.getElementById("btn_op_mult").onclick();
        }
        else if (key === '/') {
            document.getElementById("btn_op_div").onclick();
        }
        else if (key === 'Enter' || key === '=') {
            calculateResult();
        }
        else if (key === 'Escape' || key === 'c' || key === 'C') {
            document.getElementById("btn_op_clear").onclick();
        }
        else if (key === 'Backspace') {
            document.getElementById("btn_del").onclick();
        }
    });

    //Смена темы
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

    // ========== ЛОГИКА ЗАКАЗОВ И МЕНЮ ==========

    const orders = [
        { id: 1, name: "Процессор AMD Ryzen 9 7950X" },
        { id: 2, name: "Видеокарта NVIDIA GeForce RTX 4080 SUPER" },
        { id: 3, name: "Оперативная память DDR5 32 ГБ (2x16)" },
        { id: 4, name: "SSD NVMe Samsung 990 PRO 2 ТБ" },
        { id: 5, name: "Материнская плата ASUS ROG STRIX B650E-F" },
        { id: 6, name: "Блок питания Corsair RM850x 850W" },
        { id: 7, name: "Кулер Noctua NH-D15" },
        { id: 8, name: "Корпус Fractal Design North" },
        { id: 9, name: "Монитор ASUS ROG Swift 27\" 240 Гц" },
        { id: 10, name: "Клавиатура механическая Logitech G Pro X" }
    ];

    function renderOrders() {
        const ordersList = document.getElementById('orders-list');
        if (!ordersList) return;

        ordersList.innerHTML = orders.map(order => `
            <div class="order-card">
                <div class="order-number">Заказ #${order.id}</div>
                <div class="order-name">${order.name}</div>
            </div>
        `).join('');
    }

    function switchPage(pageName) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active-page');
        });

        const activePage = document.getElementById(`${pageName}-page`);
        if (activePage) {
            activePage.classList.add('active-page');
        }

        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === pageName) {
                item.classList.add('active');
            }
        });
    }

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const pageName = item.getAttribute('data-page');
            switchPage(pageName);
        });
    });

    renderOrders();
};
