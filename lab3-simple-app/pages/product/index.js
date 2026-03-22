import { HeaderComponent } from "../../components/header/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    getData() {
        // Mock данные для детальной страницы
        const productsData = {
            1: {
                src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=540&h=360&fit=crop",
                title: "Скидка на мониторы",
                text: "Здесь будет представлено подробное описание первой акции"
            },
            2: {
                src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=540&h=360&fit=crop",
                title: "Акция на флешки",
                text: "Здесь будет представлено подробное описание второй акции"
            },
            3: {
                src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=540&h=360&fit=crop",
                title: "Распродажа комплектующих",
                text: "Здесь будет представлено подробное описание третьей акции"
            }
        };

        const defaultData = {
            src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=540&h=360&fit=crop",
            title: `Акция ${this.id}`,
            text: "Подробное описание акции. Здесь может быть много текста с деталями предложения, условиями участия и другой полезной информацией."
        };

        return {
            id: this.id,
            ...(productsData[this.id] || defaultData)
        };
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return (
            `
            <div id="product-page" class="container py-3"></div>
            `
        );
    }

    goToHome() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        console.log(`Рендерим страницу продукта с id: ${this.id}`);

        this.parent.innerHTML = '';

        // Добавляем хедер
        const header = new HeaderComponent(this.parent);
        header.render(this.goToHome.bind(this));

        // Добавляем основное содержимое
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Добавляем детальную информацию о продукте
        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        product.render(data);
    }
}
