import { HeaderComponent } from "../../components/header/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.products = this.getInitialData(); // Хранилище данных
        this.filteredProducts = [...this.products]; // Отфильтрованные данные
    }

    getInitialData() {
        return [
            {
                id: 1,
                src: "https://3dnews.ru/assets/external/illustrations/2014/12/29/907415/ASUS-PQ321QE.jpg",
                title: "Скидка на мониторы",
                text: "Скидка до 50% на все мониторы!",
                category: "комплектующие",           // для задания 1.2
                discount: 50,                       // для задания 1.8
                promoCodes: ["sale", "sale50", "screen"]  // для задания 2.10
            },
            {
                id: 2,
                src: "https://s.a-5.ru/i/file/161/7/4f/73/4f73f292cd213e35.jpg",
                title: "Акция на флешки",
                text: "Купи 2 флешки - получи 3-ю в подарок!",
                category: "аксессуары",           // для задания 1.2
                discount: 10,                       // для задания 1.8
                promoCodes: ["flash", "sale10", "drive"]  // для задания 2.10
            },
            {
                id: 3,
                src: "https://img.ixbt.site/live/topics/preview/00/01/10/24/cefc407d3e.jpg",
                title: "Распродажа комплектующих",
                text: "Скидка 30% на весь ассортимент!",
                category: "комплектующие",           // для задания 1.2
                discount: 30,                       // для задания 1.8
                promoCodes: ["sale30", "saleAll"]  // для задания 2.10
            },
            {
                id: 4,
                src: "https://img.freepik.com/free-psd/birthday-colorful-present-box-design_23-2150318126.jpg",
                title: "Подарок при покупке",
                text: "При заказе от 5000 руб.",
                category: "акции",           // для задания 1.2
                discount: 0,                       // для задания 1.8
                promoCodes: ["present"]  // для задания 2.10
            },
            {
                id: 5,
                src: "https://eliteextra.com/wp-content/uploads/2022/05/AdobeStock_384368336-scaled.jpeg",
                title: "Бесплатная доставка",
                text: "Бесплатная доставка при заказе от 3000 руб!",
                category: "акции",           // для задания 1.2
                discount: 100,                       // для задания 1.8
                promoCodes: ["free", "delivery"]  // для задания 2.10
            },
        ];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return (
            `
            <div id="main-page">
                <div class="container">
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <input type="text" id="filter-input" class="form-control filter-input" placeholder=" Фильтр по названию...">
                        </div>
                        <div class="col-md-6 text-end">
                            <button id="add-button" class="btn btn-success"> Добавить акцию</button>
                        </div>
                    </div>

                    <div class="row mb-4">

                        <div class="col-md-4">
                            <div class="card h-100">
                                <div class="card-header bg-success text-white">
                                    <strong> Задание 1.2</strong>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Подсчет повторяющихся категорий товаров</p>
                                    <button id="task-1-2-btn" class="btn btn-outline-success btn-sm">Вычислить</button>
                                    <div id="task-1-2-result" class="mt-2 small text-muted"></div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card h-100">
                                <div class="card-header bg-success text-white">
                                    <strong> Задание 1.8</strong>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Среднее арифметическое скидок по акциям</p>
                                    <button id="task-1-8-btn" class="btn btn-outline-success btn-sm">Вычислить</button>
                                    <div id="task-1-8-result" class="mt-2 small text-muted"></div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card h-100">
                                <div class="card-header bg-success text-white">
                                    <strong> Задание 2.10</strong>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Проверка промокодов</p>
                                    <div class="input-group input-group-sm mb-2">
                                        <input type="text" id="promo-input" class="form-control" placeholder="Введите промокод">
                                        <button id="check-promo-btn" class="btn btn-outline-success btn-sm">Проверить</button>
                                    </div>
                                    <div id="promo-result" class="small text-muted"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Контейнер для карточек акций -->
                    <div id="products-container" class="d-flex flex-wrap gap-3"></div>
                </div>
            </div>
            `
        );
    }

    getFilterInput() {
        return document.getElementById('filter-input');
    }

    getProductsContainer() {
        return document.getElementById('products-container');
    }

    getAddButton() {
        return document.getElementById('add-button');
    }

    // Фильтрация карточек
    filterProducts(searchText) {
        if (!searchText) {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product =>
                product.title.toLowerCase().includes(searchText.toLowerCase())
            );
        }
        this.renderProducts();
    }

    // Добавление карточки (копирует первую)
    addProduct() {
        if (this.products.length === 0) return;

        const firstProduct = this.products[0];
        const newId = Math.max(...this.products.map(p => p.id)) + 1;

        const newProduct = {
            ...firstProduct,
            id: newId,
            title: `${firstProduct.title} (копия)`,
            text: firstProduct.text
        };

        this.products.push(newProduct);
        this.filterProducts(this.getFilterInput()?.value || '');

        console.log('Добавлена новая акция:', newProduct);
    }

    // Удаление карточки
    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.filterProducts(this.getFilterInput()?.value || '');

        console.log('Удалена акция с id:', id);
    }

    // Переход на страницу продукта
    goToProduct(id) {
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }

    // Возврат на главную (для хедера)
    goToHome() {
        this.render();
    }

    // Отрисовка карточек
    renderProducts() {
        const container = this.getProductsContainer();
        if (!container) return;

        container.innerHTML = '';

        if (this.filteredProducts.length === 0) {
            container.innerHTML = '<div class="alert alert-info">Ничего не найдено</div>';
            return;
        }

        this.filteredProducts.forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(
                item,
                (id) => this.goToProduct(id),
                (id) => this.deleteProduct(id)
            );
        });
    }

    // 1.2 Подсчет повторяющихся элементов в массиве (категорий)
    countDuplicateCategories() {
        const categories = this.products.map(product => product.category); // массив категорий из всех акций

        const categoryCount = {};

        for (const category of categories) {
            if (categoryCount[category]) {
                categoryCount[category]++;
            } else {
                categoryCount[category] = 1;
            }
        }
        let duplicateCount = 0;   // подсчет повторяющихся элементов (тех, у которых count > 1)
        let duplicateNames = [];

        for (const category in categoryCount) {
            if (categoryCount[category] > 1) {
                duplicateCount++;
                duplicateNames.push(`${category} (${categoryCount[category]} раз)`);
            }
        }

        const result = {
            totalCategories: categories.length,
            uniqueCategories: Object.keys(categoryCount).length,
            duplicateCount: duplicateCount,
            duplicateDetails: duplicateNames,
            hasDuplicates: duplicateCount > 0
        };

        return result;
    }

    // 1.8 Среднее арифметическое элементов массива (скидок)
    calculateAverageDiscount() {
        const discounts = this.products.map(product => product.discount);  // массив скидок из всех акций

        if (discounts.length === 0) {
            return {
                average: 0,
                total: 0,
                count: 0,
                message: "Нет данных о скидках"
            };
        }
        let sum = 0;
        let i = 0;

        while (i < discounts.length) {
            sum += discounts[i];
            i++;
        }

        const average = sum / discounts.length;
        const result = {
            total: sum,
            count: discounts.length,
            average: Math.round(average * 10) / 10, // округление до 1 знака
            minDiscount: Math.min(...discounts),
            maxDiscount: Math.max(...discounts)
        };

        return result;
    }

    // 2.10 Подсчет промокодов, являющихся префиксом введенной строки
    countPrefixPromoCodes(enteredCode) {
        if (!enteredCode || enteredCode.trim() === "") {
            return {
                enteredCode: enteredCode || "",
                count: 0,
                matchingCodes: [],
                message: "Введите промокод для проверки"
            };
        }
        const allPromoCodes = this.products.flatMap(product => product.promoCodes || []);
        const uniquePromoCodes = [...new Set(allPromoCodes)]; // убираем дубликаты
        let matchingCodes = [];
        let index = 0;

        while (index < uniquePromoCodes.length) {
            const promoCode = uniquePromoCodes[index];

            if (promoCode.length <= enteredCode.length) {
                let isPrefix = true;
                let j = 0;

                while (j < promoCode.length) {
                    if (promoCode[j] !== enteredCode[j]) {
                        isPrefix = false;
                        break;
                    }
                    j++;
                }

                if (isPrefix) {
                    matchingCodes.push(promoCode);
                }
            }
            index++;
        }
        const result = {
            enteredCode: enteredCode,
            count: matchingCodes.length,
            matchingCodes: matchingCodes,
            allPromoCodes: uniquePromoCodes,
            isSuccessful: matchingCodes.length > 0
        };
        return result;
    }



    render() {
        console.log('Рендерим главную страницу');

        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent); // хедер
        header.render(this.goToHome.bind(this));

        const html = this.getHTML();  // основное содержимое
        this.parent.insertAdjacentHTML('beforeend', html);

        const filterInput = this.getFilterInput();
        if (filterInput) {
            filterInput.addEventListener('input', (e) => {
                this.filterProducts(e.target.value);
            });
        }

        const addButton = this.getAddButton();
        if (addButton) {
            addButton.addEventListener('click', () => {
                this.addProduct();
            });
        }

        this.renderProducts();


        const task12Btn = document.getElementById('task-1-2-btn');  // задание 1.2
        const task12Result = document.getElementById('task-1-2-result');

        if (task12Btn && task12Result) {
            task12Btn.addEventListener('click', () => {
                const result = this.countDuplicateCategories();

                let message = "";

                if (result.hasDuplicates) {
                    message = `Найдено повторяющихся категорий: ${result.duplicateCount}\n ${result.duplicateDetails.join(", ")}`;
                } else {
                    message = `Повторяющихся категорий не найдено`;
                }

                task12Result.textContent = message;

            });
        }

        const task18Btn = document.getElementById('task-1-8-btn');   // задание 1.8
        const task18Result = document.getElementById('task-1-8-result');

        if (task18Btn && task18Result) {
            task18Btn.addEventListener('click', () => {
                const result = this.calculateAverageDiscount();

                const message = `Средняя скидка: ${result.average}%\n` +
                                `Сумма скидок: ${result.total}%\n` +
                                `Количество акций: ${result.count}\n` +
                                `Минимальная: ${result.minDiscount}%\n` +
                                `Максимальная: ${result.maxDiscount}%`;

                task18Result.textContent = message;

            });
        }

        const promoInput = document.getElementById('promo-input');  // задание 2.1
        const checkButton = document.getElementById('check-promo-btn');
        const promoResult = document.getElementById('promo-result');

        if (checkButton && promoInput && promoResult) {
            checkButton.addEventListener('click', () => {
                const enteredCode = promoInput.value;
                const result = this.countPrefixPromoCodes(enteredCode);

                let message = "";

                if (enteredCode === "") {
                    message = "Введите промокод для проверки";
                } else if (result.isSuccessful) {
                    message = `Найдено ${result.count} промокод(ов), являющихся префиксом "${result.enteredCode}":\n` +
                            `${result.matchingCodes.join(", ")}`;
                } else {
                    message = `Промокоды не найдены`;
                }

                promoResult.textContent = message;
            });
        }
    }
}
