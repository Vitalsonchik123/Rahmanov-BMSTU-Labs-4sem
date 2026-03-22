import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js"; // Добавляем импорт
import { MainPage } from "../main/index.js"; // Добавляем импорт для возврата

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        return {
            id: this.id,
            src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=540&h=360&fit=crop",
            title: `Детальная страница акции ${this.id}`,
            text: "Подробное описание акции. Здесь может быть много текста с деталями предложения, условиями участия и другой полезной информацией."
        }
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return (
            `
            <div id="product-page" class="p-3"></div>
            `
        );
    }

    clickBack() {
        console.log('Возврат на главную страницу');
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        console.log(`Рендерим страницу продукта с id: ${this.id}`);

        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Добавляем кнопку "Назад"
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        // Добавляем детальную информацию о продукте
        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        product.render(data);
    }
}
