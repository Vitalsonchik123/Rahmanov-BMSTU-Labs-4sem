import { HeaderComponent } from "../../components/header/index.js";
import { MainPage } from "../main/index.js";

export class OrdersPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="orders-container">
                <div class="orders-title">Заказы комплектующих</div>
                <div class="orders-list" id="orders-list"></div>
            </div>
        `;
    }

    getOrdersData() {
        return [
            { id: 1, name: "Процессор AMD Ryzen 9 7950X" },
            { id: 2, name: "Видеокарта NVIDIA GeForce RTX 4080 SUPER" },
            { id: 3, name: "Оперативная память DDR5 32 ГБ (2x16)" },
            { id: 4, name: "SSD NVMe Samsung 990 PRO 2 ТБ" },
            { id: 5, name: "Материнская плата ASUS ROG STRIX B650E-F" },
            { id: 6, name: "Блок питания Corsair RM850x 850W" },
            { id: 7, name: "Кулер Noctua NH-D15" },
            { id: 8, name: "Корпус Fractal Design North" },
            { id: 9, name: "Монитор ASUS ROG Swift 27\" 240 Гц" },
            { id: 10, name: "Клавиатура механическая Logitech G Pro X" }
        ];
    }

    renderOrders() {
        const ordersList = document.getElementById('orders-list');
        if (!ordersList) return;

        const orders = this.getOrdersData();
        ordersList.innerHTML = orders.map(order => `
            <div class="order-card">
                <div class="order-number">Заказ #${order.id}</div>
                <div class="order-name">${order.name}</div>
            </div>
        `).join('');
    }

    goToHome() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent);
        header.render(this.goToHome.bind(this), () => {
            // Обработчик для кнопки "Заказы комплектующих" – остаёмся на этой же странице
            // Но если нужно обновить страницу, можно вызвать this.render() – но она и так уже здесь
            // Ничего не делаем, так как мы уже на странице заказов
        });

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.renderOrders();
    }
}
