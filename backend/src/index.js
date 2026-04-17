const express = require('express');
const app = express();
const port = 3000;

// CORS для разработки
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

// Моковые данные (можно расширить)
let stocks = [
    { id: 1, title: "Скидка на мониторы", text: "Скидка до 50%", category: "комплектующие", discount: 50, promoCodes: ["sale","sale50"] },
    { id: 2, title: "Акция на флешки", text: "Купи 2 - получи 3-ю", category: "аксессуары", discount: 10, promoCodes: ["flash"] },
    { id: 3, title: "Распродажа комплектующих", text: "Скидка 30%", category: "комплектующие", discount: 30, promoCodes: ["sale30"] }
];

app.get('/stocks', (req, res) => {
    res.json(stocks);
});

app.get('/stocks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const stock = stocks.find(s => s.id === id);
    stock ? res.json(stock) : res.status(404).json({ error: "Not found" });
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
