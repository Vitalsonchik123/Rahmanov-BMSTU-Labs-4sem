const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Путь к файлу для хранения данных
const dataPath = path.join(__dirname, '../data/stocks.json');

// Обеспечиваем наличие папки data
if (!fs.existsSync(path.dirname(dataPath))) {
    fs.mkdirSync(path.dirname(dataPath), { recursive: true });
}

// Загрузка данных из файла или создание начальных
let stocks = [];
try {
    const rawData = fs.readFileSync(dataPath);
    stocks = JSON.parse(rawData);
} catch (err) {
    // Если файла нет, создаём начальные данные
    stocks = [
        {
            id: 1,
            src: "https://3dnews.ru/assets/external/illustrations/2014/12/29/907415/ASUS-PQ321QE.jpg",
            title: "Скидка на мониторы",
            text: "Скидка до 50% на все мониторы!",
            category: "комплектующие",
            discount: 50,
            promoCodes: ["sale", "sale50", "screen"],
            modelPath: "./models/computer.glb"
        },
        {
            id: 2,
            src: "https://s.a-5.ru/i/file/161/7/4f/73/4f73f292cd213e35.jpg",
            title: "Акция на флешки",
            text: "Купи 2 флешки - получи 3-ю в подарок!",
            category: "аксессуары",
            discount: 10,
            promoCodes: ["flash", "sale10", "drive"],
            modelPath: "./models/computer.glb"
        },
        {
            id: 3,
            src: "https://img.ixbt.site/live/topics/preview/00/01/10/24/cefc407d3e.jpg",
            title: "Распродажа комплектующих",
            text: "Скидка 30% на весь ассортимент!",
            category: "комплектующие",
            discount: 30,
            promoCodes: ["sale30", "saleAll"],
            modelPath: "./models/computer.glb"
        },
        {
            id: 4,
            src: "https://img.freepik.com/free-psd/birthday-colorful-present-box-design_23-2150318126.jpg",
            title: "Подарок при покупке",
            text: "При заказе от 5000 руб.",
            category: "акции",
            discount: 0,
            promoCodes: ["present"],
            modelPath: "./models/computer.glb"
        },
        {
            id: 5,
            src: "https://eliteextra.com/wp-content/uploads/2022/05/AdobeStock_384368336-scaled.jpeg",
            title: "Бесплатная доставка",
            text: "Бесплатная доставка при заказе от 3000 руб!",
            category: "акции",
            discount: 100,
            promoCodes: ["free", "delivery"],
            modelPath: "./models/computer.glb"
        }
    ];
    saveData();
}

function saveData() {
    fs.writeFileSync(dataPath, JSON.stringify(stocks, null, 2));
}

// CORS для разработки
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

// GET /stocks – список всех карточек
app.get('/stocks', (req, res) => {
    res.json(stocks);
});

// GET /stocks/:id – одна карточка
app.get('/stocks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const stock = stocks.find(s => s.id === id);
    if (stock) res.json(stock);
    else res.status(404).json({ error: "Not found" });
});

// POST /stocks – создание новой карточки
app.post('/stocks', (req, res) => {
    const { title, text, src, category, discount, promoCodes, modelPath } = req.body;
    if (!title || !text) {
        return res.status(400).json({ error: "Missing required fields: title, text" });
    }
    const newId = stocks.length ? Math.max(...stocks.map(s => s.id)) + 1 : 1;
    const newStock = {
        id: newId,
        title,
        text,
        src: src || "https://via.placeholder.com/300x200",
        category: category || "общее",
        discount: discount !== undefined ? discount : 0,
        promoCodes: promoCodes ? (Array.isArray(promoCodes) ? promoCodes : promoCodes.split(',').map(s => s.trim())) : [],
        modelPath: modelPath || "./models/computer.glb"
    };
    stocks.push(newStock);
    saveData();
    res.status(201).json(newStock);
});

// PATCH /stocks/:id – обновление карточки
app.patch('/stocks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = stocks.findIndex(s => s.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    const updated = { ...stocks[index], ...req.body };
    // Если promoCodes пришёл строкой через запятую, преобразуем
    if (req.body.promoCodes && typeof req.body.promoCodes === 'string') {
        updated.promoCodes = req.body.promoCodes.split(',').map(s => s.trim());
    }
    stocks[index] = updated;
    saveData();
    res.json(updated);
});

// DELETE /stocks/:id – удаление карточки
app.delete('/stocks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = stocks.findIndex(s => s.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    stocks.splice(index, 1);
    saveData();
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
