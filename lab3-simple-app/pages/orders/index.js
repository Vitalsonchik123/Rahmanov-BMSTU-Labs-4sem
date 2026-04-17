import { HeaderComponent } from "../../components/header/index.js";
import { MainPage } from "../main/index.js";

export class OrdersPage {
    constructor(parent) {
        this.parent = parent;
        this.orders = this.getInitialOrders();
    }

    getInitialOrders() {
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

    getHTML() {
        return `
            <div class="orders-container">
                <div class="orders-title">Заказы комплектующих</div>
                <div class="orders-controls">
                    <button id="add-order-button" class="btn btn-orange"> Добавить заказ</button>
                </div>
                <div class="orders-list" id="orders-list"></div>
            </div>
        `;
    }

    addOrder() {
        if (this.orders.length === 0) return;
        const firstOrder = this.orders[0];
        const newId = Math.max(...this.orders.map(o => o.id)) + 1;
        const newOrder = {
            id: newId,
            name: `${firstOrder.name} (копия)`
        };
        this.orders.push(newOrder);
        this.renderOrders();
    }

    deleteOrder(id) {
        this.orders = this.orders.filter(order => order.id !== id);
        this.renderOrders();
    }

    renderOrders() {
        const ordersList = document.getElementById('orders-list');
        if (!ordersList) return;

        ordersList.innerHTML = this.orders.map(order => `
            <div class="order-card">
                <div class="order-number">Заказ #${order.id}</div>
                <div class="order-name">${order.name}</div>
                <button class="btn-delete-order" data-id="${order.id}">🗑 Удалить</button>
            </div>
        `).join('');

        // Добавляем слушатели на кнопки удаления
        document.querySelectorAll('.btn-delete-order').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.getAttribute('data-id'));
                this.deleteOrder(id);
            });
        });
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
        });

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const addButton = document.getElementById('add-order-button');
        if (addButton) {
            addButton.addEventListener('click', () => this.addOrder());
        }

        this.renderOrders();
    }
}
