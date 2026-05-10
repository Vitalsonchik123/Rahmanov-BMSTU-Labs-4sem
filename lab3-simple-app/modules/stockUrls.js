export class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks(search = '') {
        let url = `${this.baseUrl}/stocks`;
        if (search) {
            url += `?search=${encodeURIComponent(search)}`;
        }
        return url;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    addComment(id) {
    return `${this.baseUrl}/stocks/${id}/comments`;
}
}

export const stockUrls = new StockUrls();
