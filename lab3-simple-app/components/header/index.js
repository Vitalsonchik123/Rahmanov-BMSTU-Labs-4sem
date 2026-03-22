export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return (
            `<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"> Датацентр. Товары для ПК </a>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <button id="home-button" class="btn btn-outline-light"> Домой</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>`
        );
    }

    addListeners(homeListener) {
        const homeButton = document.getElementById("home-button");
        if (homeButton) {
            homeButton.addEventListener("click", homeListener);
        }
    }

    render(homeListener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('afterbegin', html);
        this.addListeners(homeListener);
    }
}
