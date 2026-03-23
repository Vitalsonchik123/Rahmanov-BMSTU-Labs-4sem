// Удалите эти строки:
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ThreeModelComponent {
    constructor(parent, modelPath) {
        this.parent = parent;
        this.modelPath = modelPath;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        // Удалите эти свойства:
        // this.THREE = null;
        // this.OrbitControls = null;
        // this.GLTFLoader = null;
    }

    getHTML() {
        return `
            <div id="three-container" style="width: 100%; height: 350px; background-color: #111; border-radius: 12px; overflow: hidden; position: relative;">
                <div id="loading-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.7); color: white; border-radius: 12px; z-index: 10;">
                    Загрузка...
                </div>
            </div>
            <div class="mt-2 text-center">
                <small class="text-muted">Вращайте модель мышью</small>
            </div>
        `;
    }

    initThree() {
        const container = document.getElementById('three-container');
        if (!container) return;

        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.style.display = 'none';

        const width = container.clientWidth;
        const height = 350;

        // Используем глобальный THREE
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x111111);

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(3, 2, 4);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        container.appendChild(this.renderer.domElement);

        // Используем глобальные OrbitControls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;

        const ambientLight = new THREE.AmbientLight(0x404060);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7);
        this.scene.add(directionalLight);

        const gridHelper = new THREE.GridHelper(5, 20, 0x666666, 0x333333);
        gridHelper.position.y = -1;
        this.scene.add(gridHelper);

        this.loadModel();
    }

    loadModel() {
        // Используем глобальный GLTFLoader
        const loader = new THREE.GLTFLoader();

        loader.load(this.modelPath,
            (gltf) => {
                this.model = gltf.scene;

                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

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

                this.animate();
            },
            undefined,
            (error) => {
                console.error('Ошибка загрузки модели:', error);
                const overlay = document.getElementById('loading-overlay');
                if (overlay) overlay.textContent = 'Ошибка загрузки модели';
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

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Проверяем, загружены ли Three.js библиотеки
        if (typeof THREE === 'undefined') {
            console.error('Three.js не загружен!');
            return;
        }

        setTimeout(() => {
            this.initThree();
        }, 100);

        window.addEventListener('resize', () => this.resize());
    }
}
