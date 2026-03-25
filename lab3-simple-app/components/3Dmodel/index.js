export class ThreeModelComponent {
    constructor(parent, modelPath) {
        this.parent = parent;
        this.modelPath = modelPath;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.THREE = null;
        this.OrbitControls = null;
        this.GLTFLoader = null;
    }

    getHTML() {
        return `
            <div id="three-container" style="width: 100%; height: 350px; background-color: #111; border-radius: 12px; overflow: hidden; position: relative;">
                <div id="loading-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.7); color: white; border-radius: 12px;">
                    Загрузка 3D модели...
                </div>
            </div>
            <div class="mt-2 text-center">
                <small class="text-muted">Вращайте и маштабируйте модель мышью</small>
            </div>
        `;
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async loadThreeJS() {
        await this.loadScript('https://unpkg.com/three@0.128.0/build/three.min.js');
        await this.loadScript('https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js');
        await this.loadScript('https://unpkg.com/three@0.128.0/examples/js/loaders/GLTFLoader.js');

        this.THREE = window.THREE;
        this.OrbitControls = window.THREE.OrbitControls;
        this.GLTFLoader = window.THREE.GLTFLoader;
    }

    initThree() {
        const container = document.getElementById('three-container');
        if (!container) return;

        const width = container.clientWidth;
        const height = 350;

        this.scene = new this.THREE.Scene();
        this.scene.background = new this.THREE.Color(0x111111);

        this.camera = new this.THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(3, 2, 4);

        this.renderer = new this.THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        container.appendChild(this.renderer.domElement);

        this.controls = new this.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;

        const ambientLight = new this.THREE.AmbientLight(0x404060);
        this.scene.add(ambientLight);

        const directionalLight = new this.THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7);
        this.scene.add(directionalLight);

        const gridHelper = new this.THREE.GridHelper(5, 20, 0x666666, 0x333333);
        gridHelper.position.y = -1;
        this.scene.add(gridHelper);

        this.loadModel();
    }

    loadModel() {
        const loader = new this.GLTFLoader();

        loader.load(this.modelPath,
            (gltf) => {
                this.model = gltf.scene;

                const box = new this.THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new this.THREE.Vector3());
                const size = box.getSize(new this.THREE.Vector3());

                this.model.position.x = -center.x;
                this.model.position.z = -center.z;
                this.model.position.y = -box.min.y;

                const maxDim = Math.max(size.x, size.y, size.z);
                if (maxDim > 2.5) {
                    const scale = 2.5 / maxDim;
                    this.model.scale.set(scale, scale, scale);
                }

                this.scene.add(this.model);

                const distance = Math.max(size.x, size.z) * 1.5;
                this.camera.position.set(distance, distance * 0.6, distance);
                this.controls.target.set(0, size.y / 2, 0);
                this.controls.update();

                const overlay = document.getElementById('loading-overlay');
                if (overlay) overlay.style.display = 'none';

                this.animate();
            },
            undefined,
            (error) => {
                console.error('Ошибка загрузки модели:', error);
                const overlay = document.getElementById('loading-overlay');
                if (overlay) overlay.textContent = 'Ошибка загрузки';
            }
        );
    }

    animate() {
        if (!this.renderer || !this.scene || !this.camera) return;

        requestAnimationFrame(() => this.animate());
        if (this.controls) this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        const container = document.getElementById('three-container');
        if (container && this.camera && this.renderer) {
            const width = container.clientWidth;
            const height = 350;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        }
    }

    async render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        await this.loadThreeJS();

        setTimeout(() => {
            this.initThree();
        }, 100);

        window.addEventListener('resize', () => this.resize());
    }
}
