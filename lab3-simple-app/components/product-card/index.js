export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
            <div class="card product-card" style="width: 300px;" data-id="${data.id}">
                <img class="card-img-top"
                     src="${data.src}"
                     alt="картинка"
                     style="height: 200px; object-fit: cover;"
                     onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-success btn-sm detail-btn" data-id="${data.id}"> Подробнее</button>
                        <button class="btn btn-sm delete-btn"
                                data-id="${data.id}"
                                style="background-color: #ff8c00; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
            `
        );
    }

    addListeners(data, detailListener, deleteListener) {
        const detailButton = document.querySelector(`.detail-btn[data-id="${data.id}"]`);
        const deleteButton = document.querySelector(`.delete-btn[data-id="${data.id}"]`);

        if (detailButton) {
            detailButton.addEventListener("click", (e) => {
                e.stopPropagation();
                detailListener(data.id);
            });
        }

        if (deleteButton) {
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteListener(data.id);
            });
        }
    }

    render(data, detailListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, detailListener, deleteListener);
    }
}
