const express = require('express');
const app = express();
const port = 3000;

// Разрешаем CORS для разработки (фронтенд на 5500)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

// Начальные данные (те же, что были в ЛР3)
let stocks = [
    { id: 1, title: "Скидка на мониторы", text: "Скидка до 50% на все мониторы!", src: "https://3dnews.ru/assets/external/illustrations/2014/12/29/907415/ASUS-PQ321QE.jpg", category: "комплектующие", discount: 50, promoCodes: ["sale","sale50","screen"], modelPath: "./models/computer.glb" },
    { id: 2, title: "Акция на флешки", text: "Купи 2 флешки - получи 3-ю в подарок!", src: "https://s.a-5.ru/i/file/161/7/4f/73/4f73f292cd213e35.jpg", category: "аксессуары", discount: 10, promoCodes: ["flash","sale10","drive"], modelPath: "./models/computer.glb" },
    { id: 3, title: "Распродажа комплектующих", text: "Скидка 30% на весь ассортимент!", src: "https://img.ixbt.site/live/topics/preview/00/01/10/24/cefc407d3e.jpg", category: "комплектующие", discount: 30, promoCodes: ["sale30","saleAll"], modelPath: "./models/computer.glb" },
    { id: 4, title: "Подарок при покупке", text: "При заказе от 5000 руб.", src: "https://img.freepik.com/free-psd/birthday-colorful-present-box-design_23-2150318126.jpg", category: "акции", discount: 0, promoCodes: ["present"], modelPath: "./models/computer.glb" },
    { id: 5, title: "Бесплатная доставка", text: "Бесплатная доставка при заказе от 3000 руб!", src: "https://eliteextra.com/wp-content/uploads/2022/05/AdobeStock_384368336-scaled.jpeg", category: "акции", discount: 100, promoCodes: ["free","delivery"], modelPath: "./models/computer.glb" }
];

// GET /stocks
app.get('/stocks', (req, res) => {
    res.json(stocks);
});

// GET /stocks/:id
app.get('/stocks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const stock = stocks.find(s => s.id === id);
    if (stock) res.json(stock);
    else res.status(404).json({ error: "Not found" });
});

// POST /stocks
app.post('/stocks', (req, res) => {
    const { title, text, src, category, discount, promoCodes, modelPath } = req.body;
    if (!title || !text) return res.status(400).json({ error: "Missing title/text" });
    const newId = stocks.length ? Math.max(...stocks.map(s => s.id)) + 1 : 1;
    const newStock = {
        id: newId,
        title,
        text,
        src: src || "https://via.placeholder.com/300x200",
        category: category || "общее",
        discount: discount !== undefined ? discount : 0,
        promoCodes: promoCodes || [],
        modelPath: modelPath || "./models/computer.glb"
    };
    stocks.push(newStock);
    res.status(201).json(newStock);
});

// PATCH /stocks/:id
app.patch('/stocks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = stocks.findIndex(s => s.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    stocks[index] = { ...stocks[index], ...req.body };
    res.json(stocks[index]);
});

// DELETE /stocks/:id
app.delete('/stocks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = stocks.findIndex(s => s.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    stocks.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
