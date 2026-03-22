import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js"; // Добавляем импорт

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return (
            `
            <div id="main-page" class="d-flex flex-wrap gap-3 p-3"></div>
            `
        );
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=300&h=200&fit=crop",
                title: "Акция 1",
                text: "Такой акции вы еще не видели 1"
            },
            {
                id: 2,
                src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop",
                title: "Акция 2",
                text: "Такой акции вы еще не видели 2"
            },
            {
                id: 3,
                src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
                title: "Акция 3",
                text: "Такой акции вы еще не видели 3"
            },
        ];
    }

    clickCard(e) {
        e.preventDefault();
        const cardId = e.target.dataset.id;
        console.log('Нажата карточка с id:', cardId);

        // Создаем и отображаем страницу продукта
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        console.log('Рендерим главную страницу');

        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const container = this.pageRoot;
        const data = this.getData();

        data.forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}
