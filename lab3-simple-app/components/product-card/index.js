export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
            <div class="card" style="width: 300px;">
                <img class="card-img-top"
                     src="${data.src}"
                     alt="картинка"
                     style="height: 200px; object-fit: cover;"
                     onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                </div>
            </div>
            `
        );
    }

    addListeners(data, listener) {
        console.log(`Добавляем слушатель для кнопки click-card-${data.id}`);
        const button = document.getElementById(`click-card-${data.id}`);
        if (button) {
            button.addEventListener("click", listener);
            console.log(`Слушатель добавлен для кнопки ${data.id}`);
        } else {
            console.error(`Кнопка click-card-${data.id} не найдена!`);
        }
    }

    render(data, listener) {
        console.log('Рендерим карточку с данными:', data);
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
