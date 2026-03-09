export class MainPage {
    constructor(parent) {
        this.parent = parent; // Сохраняем ссылку на родительский DOM-элемент (root)
    }

    render() {
        // Метод для отрисовки страницы
        this.parent.insertAdjacentHTML('beforeend', '<button type="button" class="btn btn-primary">Hello world 3!</button>');
    }
}
