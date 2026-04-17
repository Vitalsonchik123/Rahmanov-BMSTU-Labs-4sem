import { HeaderComponent } from "../../components/header/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { OrdersPage } from "../orders/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.products = this.getInitialData();
        this.filteredProducts = [...this.products];
    }

    getInitialData() {
        return [
            {
                id: 1,
                src: "https://3dnews.ru/assets/external/illustrations/2014/12/29/907415/ASUS-PQ321QE.jpg",
                title: "Скидка на мониторы",
                text: "Скидка до 50% на все мониторы!",
                category: "комплектующие",
                discount: 50,
                promoCodes: ["sale", "sale50", "screen"]
            },
            {
                id: 2,
                src: "https://s.a-5.ru/i/file/161/7/4f/73/4f73f292cd213e35.jpg",
                title: "Акция на флешки",
                text: "Купи 2 флешки - получи 3-ю в подарок!",
                category: "аксессуары",
                discount: 10,
                promoCodes: ["flash", "sale10", "drive"]
            },
            {
                id: 3,
                src: "https://img.ixbt.site/live/topics/preview/00/01/10/24/cefc407d3e.jpg",
                title: "Распродажа комплектующих",
                text: "Скидка 30% на весь ассортимент!",
                category: "комплектующие",
                discount: 30,
                promoCodes: ["sale30", "saleAll"]
            },
            {
                id: 4,
                src: "https://img.freepik.com/free-psd/birthday-colorful-present-box-design_23-2150318126.jpg",
                title: "Подарок при покупке",
                text: "При заказе от 5000 руб.",
                category: "акции",
                discount: 0,
                promoCodes: ["present"]
            },
            {
                id: 5,
                src: "https://eliteextra.com/wp-content/uploads/2022/05/AdobeStock_384368336-scaled.jpeg",
                title: "Бесплатная доставка",
                text: "Бесплатная доставка при заказе от 3000 руб!",
                category: "акции",
                discount: 100,
                promoCodes: ["free", "delivery"]
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
                            <button id="add-button" class="btn btn-orange"> Добавить акцию</button>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <div class="col-md-4">
                            <div class="card h-100 border-green">
                                <div class="card-header bg-white text-green border-green">
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
                            <div class="card h-100 border-green">
                                <div class="card-header bg-white text-green border-green">
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
                            <div class="card h-100 border-green">
                                <div class="card-header bg-white text-green border-green">
                                    <strong> Задание 2.10</strong>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Проверка промокодов (префиксы)</p>
                                    <div class="input-group input-group-sm mb-2">
                                        <input type="text" id="promo-input" class="form-control" placeholder="Введите промокод">
                                        <button id="check-promo-btn" class="btn btn-outline-success btn-sm">Проверить</button>
                                    </div>
                                    <div id="promo-result" class="small text-muted"></div>
                                </div>
                            </div>
                        </div>
                    </div>

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
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.filterProducts(this.getFilterInput()?.value || '');
    }

    goToProduct(id) {
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }

    goToHome() {
        this.render();
    }

    goToOrders() {
        const ordersPage = new OrdersPage(this.parent);
        ordersPage.render();
    }

    renderProducts() {
        const container = this.getProductsContainer();
        if (!container) return;

        container.innerHTML = '';

        if (this.filteredProducts.length === 0) {
            container.innerHTML = '<div class="alert alert-orange">Ничего не найдено</div>';
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

    countDuplicateCategories() {
        const categories = this.products.map(product => product.category);
        const categoryCount = categories.reduce((acc, category) => {
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});
        const duplicates = Object.entries(categoryCount)
            .filter(([_, count]) => count > 1)
            .map(([category, count]) => `${category} (${count} раз)`);
        return {
            totalCategories: categories.length,
            uniqueCategories: Object.keys(categoryCount).length,
            duplicateCount: duplicates.length,
            duplicateDetails: duplicates,
            hasDuplicates: duplicates.length > 0
        };
    }

    calculateAverageDiscount() {
        const discounts = this.products.map(product => product.discount);
        if (discounts.length === 0) return { average: 0 };
        const sum = discounts.reduce((a, b) => a + b, 0);
        return { average: Math.round(sum / discounts.length * 10) / 10 };
    }

    countPrefixPromoCodes(enteredCode) {
        if (!enteredCode || enteredCode.trim() === "") {
            return { count: 0, matchingCodes: [] };
        }
        const allPromoCodes = this.products.flatMap(product => product.promoCodes || []);
        const uniquePromoCodes = [...new Set(allPromoCodes)];
        const matchingCodes = uniquePromoCodes.filter(code =>
            code.length <= enteredCode.length && enteredCode.startsWith(code)
        );
        return { count: matchingCodes.length, matchingCodes };
    }

    render() {
        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent);
        header.render(this.goToHome.bind(this), this.goToOrders.bind(this));

        const html = this.getHTML();
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

        const task12Btn = document.getElementById('task-1-2-btn');
        const task12Result = document.getElementById('task-1-2-result');
        if (task12Btn && task12Result) {
            task12Btn.addEventListener('click', () => {
                const res = this.countDuplicateCategories();
                task12Result.textContent = res.hasDuplicates
                    ? ` Найдено повторяющихся категорий: ${res.duplicateCount}\n ${res.duplicateDetails.join(", ")}`
                    : ` Повторяющихся категорий не найдено`;
                setTimeout(() => { task12Result.textContent = ""; }, 5000);
            });
        }

        const task18Btn = document.getElementById('task-1-8-btn');
        const task18Result = document.getElementById('task-1-8-result');
        if (task18Btn && task18Result) {
            task18Btn.addEventListener('click', () => {
                const res = this.calculateAverageDiscount();
                task18Result.textContent = ` Средняя скидка: ${res.average}%`;
                setTimeout(() => { task18Result.textContent = ""; }, 5000);
            });
        }

        const promoInput = document.getElementById('promo-input');
        const checkButton = document.getElementById('check-promo-btn');
        const promoResult = document.getElementById('promo-result');
        if (checkButton && promoInput && promoResult) {
            checkButton.addEventListener('click', () => {
                const entered = promoInput.value;
                const res = this.countPrefixPromoCodes(entered);
                if (!entered) {
                    promoResult.textContent = " Введите промокод";
                } else if (res.count > 0) {
                    promoResult.textContent = ` Найдено ${res.count} промокод(ов): ${res.matchingCodes.join(", ")}`;
                } else {
                    promoResult.textContent = ` Не найдено промокодов-префиксов для "${entered}"`;
                }
                setTimeout(() => { promoResult.textContent = ""; }, 5000);
            });
        }

        this.renderProducts();
    }
}
