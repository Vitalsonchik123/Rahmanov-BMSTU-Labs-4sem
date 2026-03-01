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
                // здесь у нас происходит складывание сохраненного уже числа и нажатой цифры. Оба поля string, поэтому
                // каждый раз цифра записывается в конец строки. Например: a = '14', digit = '5',
                // a += digit - это короткая запись a = a + digit - поэтомоу после этой операции a = '145'
                a += digit;
            }
            outputElement.innerHTML = a || '0'; // если a пустое, показываем 0
        }
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            // Проверяем, не превысит ли добавление цифры лимит
            if (b.length >= MAX_DIGITS) {
                return; // Игнорируем нажатие, если достигнут лимит
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
            // берем текст, написанный на кнопке - он и является цифрой
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        };
    });

    // Настраиваем обработчики для кнопок операций - сохраняем выбранную операцию
    // в ранее созданную переменную selectedOperation
    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') {
            return; //если первое число не введено, игнорируем
        }
        if (selectedOperation && b !== '') { //если уже есть выбранная операция и второе число не пустое, сразу вычисляем предыдущую операцию
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
    // Очищаем все значения при нажатии на кнопку C (вешаем обработчик события click на кнопку С)
    document.getElementById("btn_op_clear").onclick = function() {
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        outputElement.innerHTML = '0';
    };

    // Кнопка del
    document.getElementById("btn_del").onclick = function() {
        if (!selectedOperation) {
            // Работаем с первым числом
            if (a.length > 0) {
                a = a.slice(0, -1); // удаляем последний символ
                outputElement.innerHTML = a || '0';
            }
        } else {
            // Работаем со вторым числом
            if (b.length > 0) {
                b = b.slice(0, -1); // удаляем последний символ
                outputElement.innerHTML = b || '0';
            }
        }
    };

    // Кнопка смены знака (+/-)
    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            // Работаем с первым числом
            if (a !== '') {
                a = (parseFloat(a) * -1).toString();
                // Ограничиваем длину результата
                if (a.length > MAX_DIGITS) {
                    a = a.substring(0, MAX_DIGITS);
                }
                outputElement.innerHTML = a;
            }
        } else {
            // Работаем со вторым числом
            if (b !== '') {
                b = (parseFloat(b) * -1).toString();
                // Ограничиваем длину результата
                if (b.length > MAX_DIGITS) {
                    b = b.substring(0, MAX_DIGITS);
                }
                outputElement.innerHTML = b;
            }
        }
    };

    // Кнопка процента (%)
    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            // Если операция не выбрана, просто делим число на 100
            if (a !== '') {
                a = (parseFloat(a) / 100).toString();
                // Ограничиваем длину результата
                if (a.length > MAX_DIGITS) {
                    a = a.substring(0, MAX_DIGITS);
                }
                outputElement.innerHTML = a;
            }
        } else {
            // Если операция выбрана, работаем со вторым числом
            if (b !== '') {
                b = (parseFloat(b) / 100).toString();
                // Ограничиваем длину результата
                if (b.length > MAX_DIGITS) {
                    b = b.substring(0, MAX_DIGITS);
                }
                outputElement.innerHTML = b;
            }
        }
    };

// Функция вычисления результата
    function calculateResult() {
        // Проверяем, что у нас есть оба числа и операция
        if (a === '' || b === '' || !selectedOperation) {
            return false;
        }

        // Преобразуем строки в числа для вычисления
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);

        // Выполняем выбранную операцию
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
                // Проверка деления на ноль
                if (num2 === 0) {
                    alert('Ошибка: деление на ноль!');
                    return false;
                }
                expressionResult = num1 / num2;
                break;
            default:
                return false;
        }

        // Сохраняем результат и очищаем второе число
        a = expressionResult.toString();

        // Ограничиваем длину результата
        if (a.length > MAX_DIGITS) {
            a = a.substring(0, MAX_DIGITS);
        }

        b = '';
        selectedOperation = null;

        outputElement.innerHTML = a;
        return true;
    }

    //Кнопка равно (=)
    document.getElementById("btn_op_equal").onclick = function() {
        calculateResult();
    };

    //Квадратный корень (√)
    document.getElementById("btn_op_sqrt").onclick = function() {
        // Определяем, с каким числом работаем
        let currentNum = !selectedOperation ? a : b;

        if (currentNum === '') {
            // Если число не введено, используем результат или 0
            currentNum = expressionResult !== '' ? expressionResult : '0';
        }

        const num = parseFloat(currentNum);

        if (num < 0) {
            alert('Ошибка: нельзя извлечь квадратный корень из отрицательного числа!');
            return;
        }

        const result = Math.sqrt(num).toString();

        // Ограничиваем длину результата
        const finalResult = result.length > MAX_DIGITS ? result.substring(0, MAX_DIGITS) : result;

        if (!selectedOperation) {
            a = finalResult;
            outputElement.innerHTML = a;
        } else {
            b = finalResult;
            outputElement.innerHTML = b;
        }
    };

    //Возведение в квадрат (x²)
    document.getElementById("btn_op_square").onclick = function() {
        // Определяем, с каким числом работаем
        let currentNum = !selectedOperation ? a : b;

        if (currentNum === '') {
            // Если число не введено, используем результат или 0
            currentNum = expressionResult !== '' ? expressionResult : '0';
        }

        const num = parseFloat(currentNum);
        const result = (num * num).toString();

        // Ограничиваем длину результата
        const finalResult = result.length > MAX_DIGITS ? result.substring(0, MAX_DIGITS) : result;

        if (!selectedOperation) {
            a = finalResult;
            outputElement.innerHTML = a;
        } else {
            b = finalResult;
            outputElement.innerHTML = b;
        }
    };

    //Факториал (x!)
    document.getElementById("btn_op_factorial").onclick = function() {
        // Определяем, с каким числом работаем
        let currentNum = !selectedOperation ? a : b;

        if (currentNum === '') {
            // Если число не введено, используем результат или 0
            currentNum = expressionResult !== '' ? expressionResult : '0';
        }

        const num = parseFloat(currentNum);

        // Проверка, что число целое и неотрицательное
        if (!Number.isInteger(num) || num < 0) {
            alert('Ошибка: факториал вычисляется только для целых неотрицательных чисел!');
            return;
        }

        if (num > 170) { // Факториал чисел больше 170 приводит к бесконечности в JavaScript
            alert('Ошибка: число слишком большое для вычисления факториала!');
            return;
        }

        // Вычисление факториала
        let factorial = 1;
        for (let i = 2; i <= num; i++) {
            factorial *= i;
        }

        const result = factorial.toString();

        // Ограничиваем длину результата
        const finalResult = result.length > MAX_DIGITS ? result.substring(0, MAX_DIGITS) : result;

        if (!selectedOperation) {
            a = finalResult;
            outputElement.innerHTML = a;
        } else {
            b = finalResult;
            outputElement.innerHTML = b;
        }
    };

    //Три нуля
    document.getElementById("btn_digit_000").onclick = function() {
        if (!selectedOperation) {
            // Работаем с первым числом
            if (a.length + 3 <= MAX_DIGITS) {
                a += '000';
                outputElement.innerHTML = a;
            }
        } else {
            // Работаем со вторым числом
            if (b.length + 3 <= MAX_DIGITS) {
                b += '000';
                outputElement.innerHTML = b;
            }
        }
    };

    //Функция для обработки клавиатуры
    document.addEventListener('keydown', function(event) {  //всё время считывать нажате клавиш
        const key = event.key;
        //Цифры от 0 до 9
        if (key >= '0' && key <= '9') {
            onDigitButtonClicked(key);
        }
        //Десятичная точка
        else if (key === '.') {
            onDigitButtonClicked('.');
        }
        //Операции
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
        //Enter для равно
        else if (key === 'Enter' || key === '=') {
            calculateResult();
        }
        //Escape для очистки
        else if (key === 'Escape' || key === 'c' || key === 'C') {
            document.getElementById("btn_op_clear").onclick();
        }
        //Backspace для удаления последнего символа
        else if (key === 'Backspace') {
            document.getElementById("btn_del").onclick();
        }
    });

    //Смена темы
    const themeButton = document.getElementById('btn_theme');
    const body = document.body;

    //Класс светлой темы по умолчанию
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
};
