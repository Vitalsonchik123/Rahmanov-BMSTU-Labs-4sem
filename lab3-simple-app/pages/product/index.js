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
                src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=540&h=360&fit=crop",
                title: "Скидка на мониторы",
                text: "Скидка до 50% на все мониторы!",
                modelPath: "./models/computer.glb"
            },
            2: {
                src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=540&h=360&fit=crop",
                title: "Акция на флешки",
                text: "Купи 2 флешки - получи 3-ю в подарок!",
                modelPath: "./models/computer.glb"
            },
            3: {
                src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=540&h=360&fit=crop",
                title: "Распродажа комплектующих",
                text: "Скидка 30% на весь ассортимент!",
                modelPath: "./models/computer.glb"
            }
        };

        const defaultData = {
            src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=540&h=360&fit=crop",
            title: `Акция ${this.id}`,
            text: "Подробное описание акции...",
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
                <div class="row">
                    <div class="col-md-6">
                        <div id="product-info-container"></div>
                    </div>
                    <div class="col-md-6">
                        <h4 class="mb-3"> 3D Модель товара</h4>
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

    // добавлен рендер 3D модели
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
    }
}
