import { HeaderComponent } from "../../components/header/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { ThreeModelComponent } from "../../components/3Dmodel/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

getData() {
    const productsData = {
        1: {
            src: "https://3dnews.ru/assets/external/illustrations/2014/12/29/907415/ASUS-PQ321QE.jpg",
            title: "Скидка на мониторы",
            text: "Скидка до 50% на все мониторы!",
            discount: 50,
            modelPath: "./models/computer.glb"
        },
        2: {
            src: "https://s.a-5.ru/i/file/161/7/4f/73/4f73f292cd213e35.jpg",
            title: "Акция на флешки",
            text: "Купи 2 флешки - получи 3-ю в подарок!",
            discount: 10,
            modelPath: "./models/computer.glb"
        },
        3: {
            src: "https://img.ixbt.site/live/topics/preview/00/01/10/24/cefc407d3e.jpg",
            title: "Распродажа комплектующих",
            text: "Скидка 30% на весь ассортимент!",
            discount: 30,
            modelPath: "./models/computer.glb"
        },
        4: {
            src: "https://img.freepik.com/free-psd/birthday-colorful-present-box-design_23-2150318126.jpg",
            title: "Подарок при покупке",
            text: "При заказе от 5000 руб.",
            discount: 0,
            modelPath: "./models/computer.glb"
        },
        5: {
            src: "https://eliteextra.com/wp-content/uploads/2022/05/AdobeStock_384368336-scaled.jpeg",
            title: "Бесплатная доставка",
            text: "Бесплатная доставка при заказе от 3000 руб!",
            discount: 100,
            modelPath: "./models/computer.glb"
        }
    };

    const defaultData = {
        src: "https://3dnews.ru/assets/external/illustrations/2014/12/29/907415/ASUS-PQ321QE.jpg",
        title: `Акция ${this.id}`,
        text: "Подробное описание акции...",
        discount: 0,
        modelPath: "./models/computer.glb"
    };

        return {
            id: this.id,
            ...(productsData[this.id] || defaultData)
        };
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {  // контейнер для 3D модели
        return (
            `
            <div id="product-page" class="container py-3">
                <!-- кнопка "Назад" -->
                <div class="mb-3">
                    <button id="back-button" class="btn btn-secondary">← Назад к акциям</button>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div id="product-info-container"></div>
                    </div>
                    <div class="col-md-6">
                        <h4 class="mb-3"> 3D Модель </h4>
                        <div id="three-model-container"></div>
                    </div>
                </div>
            </div>
            `
        );
    }

    goToHome() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    // метод кнопки "Назад"
    goBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    // добавляем рендер 3D модели
    render() {
        console.log(`Рендерим страницу продукта с id: ${this.id}`);

        this.parent.innerHTML = '';

        // Добавляем хедер
        const header = new HeaderComponent(this.parent);
        header.render(this.goToHome.bind(this));

        // Добавляем основное содержимое
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Получаем контейнеры
        const productContainer = document.getElementById('product-info-container');
        const modelContainer = document.getElementById('three-model-container');

        // Добавляем информацию о продукте
        const data = this.getData();
        const product = new ProductComponent(productContainer);
        product.render(data);

        // Добавляем 3D модель
        const threeModel = new ThreeModelComponent(modelContainer, data.modelPath);
        threeModel.render();

        // Обработчик для кнопки "Назад"
        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', () => this.goBack());
        }
    }
}
