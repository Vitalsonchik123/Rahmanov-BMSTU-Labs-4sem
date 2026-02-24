// Шаг 1: Инициализация переменных
window.onload = function() {
    // Переменные для хранения чисел и операций
    let a = '';                // Первое число (строка для накопления цифр)
    let b = '';                // Второе число
    let expressionResult = ''; // Результат вычисления
    let selectedOperation = null; // Выбранная операция (+, -, x, /)

    // Максимальное количество символов
    const MAX_DIGITS = 13;


// ШАГ 2: Получение доступа к элементам калькулятора
    // Получаем доступ к экрану калькулятора в поле вывода
    const outputElement = document.getElementById("result");

    // Получаем все цифровые кнопки (id начинаются с "btn_digit_")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');


//ШАГ 3: Функция обработки нажатия на цифровые кнопки
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

//ШАГ 4: Настройка обработчиков событий для кнопок
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

//ШАГ 5: Кнопка очистки
    // Очищаем все значения при нажатии на кнопку C (вешаем обработчик события click на кнопку С)
    document.getElementById("btn_op_clear").onclick = function() {
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        outputElement.innerHTML = '0';
    };

    // ==================== ШАГ 6: Кнопка backspace (del) ====================
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

    // ==================== ШАГ 7: Кнопка смены знака (+/-) ====================
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

    // ==================== ШАГ 8: Кнопка процента (%) ====================
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

    // ==================== ШАГ 9: Функция вычисления результата ====================
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

        // Показываем результат на экране
        outputElement.innerHTML = a;
        return true;
    }

    // ==================== ШАГ 10: Кнопка равно (=) ====================
    document.getElementById("btn_op_equal").onclick = function() {
        calculateResult();
    };

    // ==================== ШАГ 11: Дополнительные функции ====================

    // Функция для обработки клавиатуры (бонус)
    document.addEventListener('keydown', function(event) {
        const key = event.key;

        // Цифры от 0 до 9
        if (key >= '0' && key <= '9') {
            onDigitButtonClicked(key);
        }
        // Десятичная точка
        else if (key === '.') {
            onDigitButtonClicked('.');
        }
        // Операции
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
        // Enter для равно
        else if (key === 'Enter' || key === '=') {
            calculateResult();
        }
        // Escape для очистки
        else if (key === 'Escape' || key === 'c' || key === 'C') {
            document.getElementById("btn_op_clear").onclick();
        }
        // Backspace для удаления последнего символа
        else if (key === 'Backspace') {
            document.getElementById("btn_del").onclick();
        }
    });

    // Небольшая инициализация: убеждаемся, что на экране 0
    outputElement.innerHTML = '0';
};
