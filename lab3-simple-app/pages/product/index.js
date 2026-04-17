import { HeaderComponent } from "../../components/header/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { ThreeModelComponent } from "../../components/3Dmodel/index.js";
import { MainPage } from "../main/index.js";
import { OrdersPage } from "../orders/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() { /* без изменений */ }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data, status) => {
            if (status === 200 && data) {
                this.renderData(data);
            } else {
                console.error('Ошибка загрузки карточки:', status);
                const container = document.getElementById('product-info-container');
                if (container) {
                    container.innerHTML = '<div class="alert alert-danger">Не удалось загрузить данные акции</div>';
                }
            }
        });
    }

    renderData(item) {
        const productContainer = document.getElementById('product-info-container');
        const modelContainer = document.getElementById('three-model-container');
        if (!productContainer || !modelContainer) return;
        const product = new ProductComponent(productContainer);
        product.render(item);
        const threeModel = new ThreeModelComponent(modelContainer, item.modelPath || './models/computer.glb');
        threeModel.render();
    }

    goToHome() { /* без изменений */ }
    goBack() { /* без изменений */ }
    goToOrders() { /* без изменений */ }

    render() {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent);
        header.render(this.goToHome.bind(this), this.goToOrders.bind(this));
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', () => this.goBack());
        }

        this.getData();
    }
}
