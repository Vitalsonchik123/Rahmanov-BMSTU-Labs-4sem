import { MainPage } from "./pages/main/index.js";

const root = document.getElementById('root');

// Проверка: нашелся ли элемент root?
console.log('Root element:', root);

const mainPage = new MainPage(root);
mainPage.render();

// Проверка: добавилась ли кнопка?
console.log('After render, root innerHTML:', root.innerHTML);
