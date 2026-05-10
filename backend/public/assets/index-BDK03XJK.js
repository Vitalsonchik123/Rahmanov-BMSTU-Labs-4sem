(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();class g{constructor(t){this.parent=t}getHTML(){return`
            <nav class="navbar navbar-expand-lg bg-success mb-4">
                <div class="container-fluid">
                    <a class="navbar-brand text-white" href="#"> Маркетплейс акций</a>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item me-2">
                                <button id="home-button" class="btn btn-outline-light"> Домой</button>
                            </li>
                            <li class="nav-item">
                                <button id="orders-button" class="btn btn-outline-light"> Заказы комплектующих</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            `}addListeners(t,e){const n=document.getElementById("home-button");n&&n.addEventListener("click",t);const s=document.getElementById("orders-button");s&&s.addEventListener("click",e)}render(t,e){const n=this.getHTML();this.parent.insertAdjacentHTML("afterbegin",n),this.addListeners(t,e)}}class E{constructor(t){this.parent=t}getHTML(t){return`
            <div class="card product-card" style="width: 350px;" data-id="${t.id}">
                <img class="card-img-top"
                     src="${t.src}"
                     alt="картинка"
                     style="height: 220px; object-fit: cover;"
                     onerror="this.src='https://via.placeholder.com/350x220?text=No+Image'">
                <div class="card-body">
                    <h5 class="card-title">${t.title}</h5>
                    <p class="card-text">${t.text}</p>
                    <div class="d-flex flex-column gap-2">
                        <button class="btn btn-success btn-sm detail-btn" data-id="${t.id}">Подробнее</button>
                        <button class="btn btn-orange btn-sm edit-btn" data-id="${t.id}">Редактировать</button>
                        <button class="btn btn-orange btn-sm delete-btn" data-id="${t.id}">Удалить</button>
                    </div>
                </div>
            </div>
        `}addListeners(t,e,n,s){const r=document.querySelector(`.detail-btn[data-id="${t.id}"]`),o=document.querySelector(`.edit-btn[data-id="${t.id}"]`),c=document.querySelector(`.delete-btn[data-id="${t.id}"]`);r&&r.addEventListener("click",d=>{d.stopPropagation(),e(t.id)}),o&&o.addEventListener("click",d=>{d.stopPropagation(),n(t.id)}),c&&c.addEventListener("click",d=>{d.stopPropagation(),s(t.id)})}render(t,e,n,s){const r=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",r),this.addListeners(t,e,n,s)}}class w{constructor(t){this.parent=t}getHTML(t){return`
            <div class="card mb-3" style="max-width: 100%;">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${t.src}"
                             class="img-fluid rounded-start"
                             alt="картинка"
                             style="height: 300px; width: 100%; object-fit: cover;">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h3 class="card-title">${t.title}</h3>
                            <p class="card-text">${t.text}</p>
                            <p class="card-text"><small class="text-muted">ID продукта: ${t.id}</small></p>
                            <hr>
                            <h5>Детали:</h5>
                            <ul>
                                <li>Условия: подробности уточняйте у консультанта</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class T{constructor(t,e){this.parent=t,this.modelPath=e,this.scene=null,this.camera=null,this.renderer=null,this.controls=null,this.model=null,this.THREE=null,this.OrbitControls=null,this.GLTFLoader=null}getHTML(){return`
            <div id="three-container" style="width: 100%; height: 350px; background-color: #111; border-radius: 12px; overflow: hidden; position: relative;">
                <div id="loading-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.7); color: white; border-radius: 12px;">
                    Загрузка 3D модели...
                </div>
            </div>
            <div class="mt-2 text-center">
                <small class="text-muted">Вращайте и маштабируйте модель мышью</small>
            </div>
        `}loadScript(t){return new Promise((e,n)=>{const s=document.createElement("script");s.type="text/javascript",s.src=t,s.onload=e,s.onerror=n,document.head.appendChild(s)})}async loadThreeJS(){await this.loadScript("https://unpkg.com/three@0.128.0/build/three.min.js"),await this.loadScript("https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js"),await this.loadScript("https://unpkg.com/three@0.128.0/examples/js/loaders/GLTFLoader.js"),this.THREE=window.THREE,this.OrbitControls=window.THREE.OrbitControls,this.GLTFLoader=window.THREE.GLTFLoader}initThree(){const t=document.getElementById("three-container");if(!t)return;const e=t.clientWidth,n=350;this.scene=new this.THREE.Scene,this.scene.background=new this.THREE.Color(1118481),this.camera=new this.THREE.PerspectiveCamera(45,e/n,.1,1e3),this.camera.position.set(3,2,4),this.renderer=new this.THREE.WebGLRenderer({antialias:!0}),this.renderer.setSize(e,n),t.appendChild(this.renderer.domElement),this.controls=new this.OrbitControls(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.enableZoom=!0;const s=new this.THREE.AmbientLight(4210784);this.scene.add(s);const r=new this.THREE.DirectionalLight(16777215,1);r.position.set(5,10,7),this.scene.add(r);const o=new this.THREE.GridHelper(5,20,6710886,3355443);o.position.y=-1,this.scene.add(o),this.loadModel()}loadModel(){new this.GLTFLoader().load(this.modelPath,e=>{this.model=e.scene;const n=new this.THREE.Box3().setFromObject(this.model),s=n.getCenter(new this.THREE.Vector3),r=n.getSize(new this.THREE.Vector3);this.model.position.x=-s.x,this.model.position.z=-s.z,this.model.position.y=-n.min.y;const o=Math.max(r.x,r.y,r.z);if(o>2.5){const u=2.5/o;this.model.scale.set(u,u,u)}this.scene.add(this.model);const c=Math.max(r.x,r.z)*1.5;this.camera.position.set(c,c*.6,c),this.controls.target.set(0,r.y/2,0),this.controls.update();const d=document.getElementById("loading-overlay");d&&(d.style.display="none"),this.animate()},void 0,e=>{console.error("Ошибка загрузки модели:",e);const n=document.getElementById("loading-overlay");n&&(n.textContent="Ошибка загрузки")})}animate(){!this.renderer||!this.scene||!this.camera||(requestAnimationFrame(()=>this.animate()),this.controls&&this.controls.update(),this.renderer.render(this.scene,this.camera))}resize(){const t=document.getElementById("three-container");if(t&&this.camera&&this.renderer){const e=t.clientWidth,n=350;this.camera.aspect=e/n,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,n)}}async render(){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),await this.loadThreeJS(),setTimeout(()=>{this.initThree()},100),window.addEventListener("resize",()=>this.resize())}}class y{constructor(t){this.parent=t,this.orders=this.getInitialOrders()}getInitialOrders(){return[{id:1,name:"Процессор AMD Ryzen 9 7950X"},{id:2,name:"Видеокарта NVIDIA GeForce RTX 4080 SUPER"},{id:3,name:"Оперативная память DDR5 32 ГБ (2x16)"},{id:4,name:"SSD NVMe Samsung 990 PRO 2 ТБ"},{id:5,name:"Материнская плата ASUS ROG STRIX B650E-F"},{id:6,name:"Блок питания Corsair RM850x 850W"},{id:7,name:"Кулер Noctua NH-D15"},{id:8,name:"Корпус Fractal Design North"},{id:9,name:'Монитор ASUS ROG Swift 27" 240 Гц'},{id:10,name:"Клавиатура механическая Logitech G Pro X"}]}getHTML(){return`
            <div class="orders-container">
                <div class="orders-title">Заказы комплектующих</div>
                <div class="orders-controls">
                    <button id="add-order-button" class="btn btn-orange"> Добавить заказ</button>
                </div>
                <div class="orders-list" id="orders-list"></div>
            </div>
        `}addOrder(){if(this.orders.length===0)return;const t=this.orders[0],n={id:Math.max(...this.orders.map(s=>s.id))+1,name:`${t.name} (копия)`};this.orders.push(n),this.renderOrders()}deleteOrder(t){this.orders=this.orders.filter(e=>e.id!==t),this.renderOrders()}renderOrders(){const t=document.getElementById("orders-list");t&&(t.innerHTML=this.orders.map(e=>`
            <div class="order-card">
                <div class="order-number">Заказ #${e.id}</div>
                <div class="order-name">${e.name}</div>
                <button class="btn-delete-order" data-id="${e.id}">🗑 Удалить</button>
            </div>
        `).join(""),document.querySelectorAll(".btn-delete-order").forEach(e=>{e.addEventListener("click",n=>{const s=parseInt(e.getAttribute("data-id"));this.deleteOrder(s)})}))}goToHome(){new l(this.parent).render()}render(){this.parent.innerHTML="",new g(this.parent).render(this.goToHome.bind(this),()=>{});const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e);const n=document.getElementById("add-order-button");n&&n.addEventListener("click",()=>this.addOrder()),this.renderOrders()}}class x{async get(t){const e=await fetch(t);if(!e.ok)throw new Error(`HTTP ${e.status}`);return e.json()}async post(t,e){const n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!n.ok)throw new Error(`HTTP ${n.status}`);return n.json()}async patch(t,e){const n=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!n.ok)throw new Error(`HTTP ${n.status}`);return n.json()}async delete(t){const e=await fetch(t,{method:"DELETE"});if(!e.ok)throw new Error(`HTTP ${e.status}`);if(e.status!==204)return e.json()}}const h=new x;class L{constructor(){this.baseUrl="http://localhost:3000"}getStocks(){return`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(t){return`${this.baseUrl}/stocks/${t}`}updateStockById(t){return`${this.baseUrl}/stocks/${t}`}}const m=new L;class P{constructor(t,e){this.parent=t,this.id=parseInt(e)}get pageRoot(){return document.getElementById("product-page")}getHTML(){return`
            <div id="product-page" class="container py-3">
                <div class="mb-3">
                    <button id="back-button" class="btn btn-orange">Назад к акциям</button>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div id="product-info-container"></div>
                    </div>
                    <div class="col-md-6">
                        <h4 class="mb-3">3D Модель товара</h4>
                        <div id="three-model-container"></div>
                    </div>
                </div>
            </div>
        `}async getData(){try{const t=await h.get(m.getStockById(this.id));this.renderData(t)}catch(t){console.error("Ошибка загрузки карточки:",t);const e=document.getElementById("product-info-container");e&&(e.innerHTML='<div class="alert alert-danger">Не удалось загрузить данные акции</div>')}}renderData(t){const e=document.getElementById("product-info-container"),n=document.getElementById("three-model-container");if(!e||!n)return;new w(e).render(t),new T(n,t.modelPath||"./models/computer.glb").render()}goToHome(){new l(this.parent).render()}goBack(){new l(this.parent).render()}goToOrders(){new y(this.parent).render()}render(){this.parent.innerHTML="",new g(this.parent).render(this.goToHome.bind(this),this.goToOrders.bind(this));const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e);const n=document.getElementById("back-button");n&&n.addEventListener("click",()=>this.goBack()),this.getData()}}class f{constructor(t,e=null){this.parent=t,this.id=e?parseInt(e):null,this.stock=null}getHTML(){return`
            <div class="edit-container" style="max-width: 600px; margin: 20px auto;">
                <h2 class="edit-title">${!!this.id?"Редактировать акцию":"Добавить акцию"}</h2>
                <form id="edit-form">
                    <div class="mb-3">
                        <label class="form-label">Название</label>
                        <input type="text" id="title" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Текст</label>
                        <textarea id="text" class="form-control" rows="3" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">URL картинки</label>
                        <input type="text" id="src" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Категория</label>
                        <input type="text" id="category" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Скидка (%)</label>
                        <input type="number" id="discount" class="form-control" value="0">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Промокоды (через запятую)</label>
                        <input type="text" id="promoCodes" class="form-control" placeholder="sale, sale50">
                    </div>
                    <button type="submit" class="btn btn-orange">Сохранить</button>
                    <button type="button" id="cancel-btn" class="btn btn-secondary ms-2">Отмена</button>
                </form>
            </div>
        `}async loadData(){if(this.id)try{this.stock=await h.get(m.getStockById(this.id))}catch{throw new Error("Не удалось загрузить данные")}}populateForm(){this.stock&&(document.getElementById("title").value=this.stock.title||"",document.getElementById("text").value=this.stock.text||"",document.getElementById("src").value=this.stock.src||"",document.getElementById("category").value=this.stock.category||"",document.getElementById("discount").value=this.stock.discount??0,document.getElementById("promoCodes").value=(this.stock.promoCodes||[]).join(", "))}getFormData(){return{title:document.getElementById("title").value,text:document.getElementById("text").value,src:document.getElementById("src").value,category:document.getElementById("category").value,discount:parseInt(document.getElementById("discount").value)||0,promoCodes:document.getElementById("promoCodes").value.split(",").map(t=>t.trim()).filter(t=>t)}}async save(t){t.preventDefault();const e=this.getFormData(),n=this.id?m.updateStockById(this.id):m.createStock(),s=this.id?"patch":"post";try{s==="patch"?await h.patch(n,e):await h.post(n,e),new l(this.parent).render()}catch{alert("Ошибка сохранения")}}cancel(){new l(this.parent).render()}async render(){this.parent.innerHTML="",new g(this.parent).render(()=>{new l(this.parent).render()},()=>{});const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.id&&(await this.loadData(),this.populateForm()),document.getElementById("edit-form").addEventListener("submit",r=>this.save(r)),document.getElementById("cancel-btn").addEventListener("click",()=>this.cancel())}}class l{constructor(t){this.parent=t,this.products=[],this.filteredProducts=[]}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
            <div id="main-page">
                <div class="container">
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <input type="text" id="filter-input" class="form-control filter-input" placeholder="Фильтр по названию...">
                        </div>
                        <div class="col-md-6 text-end">
                            <button id="add-button" class="btn btn-orange">Добавить акцию</button>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-md-4">
                            <div class="card h-100 border-green">
                                <div class="card-header bg-white text-green border-green">
                                    <strong>Задание 1.2</strong>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Подсчет повторяющихся категорий товаров</p>
                                    <button id="task-1-2-btn" class="btn btn-outline-success btn-sm">Вычислить</button>
                                    <div id="task-1-2-result" class="mt-2 small text-muted"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100 border-green">
                                <div class="card-header bg-white text-green border-green">
                                    <strong>Задание 1.8</strong>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Среднее арифметическое скидок по акциям</p>
                                    <button id="task-1-8-btn" class="btn btn-outline-success btn-sm">Вычислить</button>
                                    <div id="task-1-8-result" class="mt-2 small text-muted"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100 border-green">
                                <div class="card-header bg-white text-green border-green">
                                    <strong>Задание 2.10</strong>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Проверка промокодов (префиксы)</p>
                                    <div class="input-group input-group-sm mb-2">
                                        <input type="text" id="promo-input" class="form-control" placeholder="Введите промокод">
                                        <button id="check-promo-btn" class="btn btn-outline-success btn-sm">Проверить</button>
                                    </div>
                                    <div id="promo-result" class="small text-muted"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="products-container" class="d-flex flex-wrap gap-3"></div>
                </div>
            </div>
        `}getFilterInput(){return document.getElementById("filter-input")}getProductsContainer(){return document.getElementById("products-container")}getAddButton(){return document.getElementById("add-button")}async getData(){try{const t=await h.get(m.getStocks());this.products=t,this.filteredProducts=[...this.products],this.renderProducts()}catch(t){console.error("Ошибка загрузки данных:",t);const e=this.getProductsContainer();e&&(e.innerHTML='<div class="alert alert-danger">Не удалось загрузить акции</div>')}}renderProducts(){const t=this.getProductsContainer();if(t){if(t.innerHTML="",this.filteredProducts.length===0){t.innerHTML='<div class="alert alert-orange">Ничего не найдено</div>';return}this.filteredProducts.forEach(e=>{new E(t).render(e,s=>this.goToProduct(s),s=>this.goToEdit(s),s=>this.deleteProduct(s))})}}filterProducts(t){t?this.filteredProducts=this.products.filter(e=>e.title&&e.title.toLowerCase().includes(t.toLowerCase())):this.filteredProducts=[...this.products],this.renderProducts()}addProduct(){new f(this.parent).render()}goToEdit(t){new f(this.parent,t).render()}async deleteProduct(t){try{await h.delete(m.removeStockById(t)),this.getData()}catch{alert("Ошибка удаления")}}goToProduct(t){new P(this.parent,t).render()}goToHome(){this.render()}goToOrders(){new y(this.parent).render()}countDuplicateCategories(){const t=this.products.map(s=>s.category),e=t.reduce((s,r)=>(s[r]=(s[r]||0)+1,s),{}),n=Object.entries(e).filter(([s,r])=>r>1).map(([s,r])=>`${s} (${r} раз)`);return{totalCategories:t.length,uniqueCategories:Object.keys(e).length,duplicateCount:n.length,duplicateDetails:n,hasDuplicates:n.length>0}}calculateAverageDiscount(){const t=this.products.map(n=>n.discount);if(t.length===0)return{average:0};const e=t.reduce((n,s)=>n+s,0);return{average:Math.round(e/t.length*10)/10}}countPrefixPromoCodes(t){if(!t||t.trim()==="")return{count:0,matchingCodes:[]};const e=this.products.flatMap(r=>r.promoCodes||[]),s=[...new Set(e)].filter(r=>r.length<=t.length&&t.startsWith(r));return{count:s.length,matchingCodes:s}}render(){this.parent.innerHTML="",new g(this.parent).render(this.goToHome.bind(this),this.goToOrders.bind(this));const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e);const n=this.getFilterInput();n&&n.addEventListener("input",a=>this.filterProducts(a.target.value));const s=this.getAddButton();s&&s.addEventListener("click",()=>this.addProduct());const r=document.getElementById("task-1-2-btn"),o=document.getElementById("task-1-2-result");r&&o&&r.addEventListener("click",()=>{const a=this.countDuplicateCategories();o.textContent=a.hasDuplicates?`Найдено повторяющихся категорий: ${a.duplicateCount} (${a.duplicateDetails.join(", ")})`:"Повторяющихся категорий не найдено",setTimeout(()=>{o.textContent=""},5e3)});const c=document.getElementById("task-1-8-btn"),d=document.getElementById("task-1-8-result");c&&d&&c.addEventListener("click",()=>{const a=this.calculateAverageDiscount();d.textContent=`Средняя скидка: ${a.average}%`,setTimeout(()=>{d.textContent=""},5e3)});const u=document.getElementById("promo-input"),v=document.getElementById("check-promo-btn"),p=document.getElementById("promo-result");v&&u&&p&&v.addEventListener("click",()=>{const a=u.value,b=this.countPrefixPromoCodes(a);a?b.count>0?p.textContent=`Найдено ${b.count} промокод(ов): ${b.matchingCodes.join(", ")}`:p.textContent=`Не найдено промокодов-префиксов для "${a}"`:p.textContent="Введите промокод",setTimeout(()=>{p.textContent=""},5e3)}),this.getData()}}document.addEventListener("DOMContentLoaded",()=>{const i=document.getElementById("root");if(!i){console.error("Элемент root не найден!");return}new l(i).render()});
