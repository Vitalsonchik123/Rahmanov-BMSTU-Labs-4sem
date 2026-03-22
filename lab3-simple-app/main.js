import { MainPage } from "./pages/main/index.js";

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    if (!root) {
        console.error('Элемент root не найден!');
        return;
    }

    console.log('Страница загружена, создаем MainPage');
    const mainPage = new MainPage(root);
    mainPage.render();
});
