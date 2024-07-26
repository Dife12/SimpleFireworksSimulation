/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_loaders_MTLLoader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/MTLLoader.js */ "./node_modules/three/examples/jsm/loaders/MTLLoader.js");
/* harmony import */ var three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/OBJLoader.js */ "./node_modules/three/examples/jsm/loaders/OBJLoader.js");
// 22fi602 ブ センエツ




class ThreeJSContainer {
    scene;
    light;
    fireworks = [];
    lastFireworkTime = 0;
    fireworkInterval;
    fireworkIndex = 0;
    launchSites = [];
    constructor() {
        this.fireworkInterval = this.getRandomInterval();
    }
    getRandomInterval = () => {
        return Math.floor(Math.random() * (1000 - 300 + 1)) + 300;
    };
    // 画面部分の作成(表示する枠ごとに)
    createRendererDOM = (width, height, cameraPos) => {
        let renderer = new three__WEBPACK_IMPORTED_MODULE_3__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_3__.Color(0x13285A));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        let camera = new three__WEBPACK_IMPORTED_MODULE_3__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0, 0));
        let orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        this.loadMultipleHumans(20);
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        let render = (time) => {
            orbitControls.update();
            this.updateFireworks(time);
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_3__.Scene();
        //ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_3__.DirectionalLight(0xffffff);
        let lvec = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        this.createGround();
        this.createRiver();
        this.createClouds();
        this.addLaunchSites(5);
    };
    //地面
    createGround = () => {
        const textureLoader = new three__WEBPACK_IMPORTED_MODULE_3__.TextureLoader();
        const texture = textureLoader.load('ground.jpeg');
        const geometry = new three__WEBPACK_IMPORTED_MODULE_3__.PlaneGeometry(100, 100);
        const material = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({ map: texture });
        const ground = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(geometry, material);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1;
        ground.receiveShadow = true;
        this.scene.add(ground);
    };
    addLaunchSites = (count) => {
        const boxGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry(0.5, 0.5, 0.5);
        const boxMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({ color: 0xff0000 });
        const startPosZ = -18;
        const interval = 7;
        for (let i = 0; i < count; i++) {
            const posX = -3.5;
            const posZ = startPosZ + i * interval;
            const box = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(boxGeometry, boxMaterial);
            box.position.set(posX, -0.75, posZ);
            box.receiveShadow = true;
            this.scene.add(box);
            this.launchSites.push(box);
        }
    };
    //川
    createRiver = () => {
        const textureLoader = new three__WEBPACK_IMPORTED_MODULE_3__.TextureLoader();
        const texture = textureLoader.load('water.jpg');
        texture.wrapS = three__WEBPACK_IMPORTED_MODULE_3__.RepeatWrapping;
        texture.wrapT = three__WEBPACK_IMPORTED_MODULE_3__.RepeatWrapping;
        texture.repeat.set(1, 10);
        const geometry = new three__WEBPACK_IMPORTED_MODULE_3__.PlaneGeometry(10, 100);
        const material = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({ map: texture });
        const river = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(geometry, material);
        river.rotation.x = -Math.PI / 2;
        river.position.y = -0.99;
        river.position.x = -10;
        this.scene.add(river);
        const animateTexture = () => {
            texture.offset.y -= 0.005;
            if (texture.offset.y <= -1) {
                texture.offset.y = 0;
            }
            requestAnimationFrame(animateTexture);
        };
        animateTexture();
        const groundGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.PlaneGeometry(3, 100);
        const groundMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({ color: 0x808080 });
        const leftGround = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(groundGeometry, groundMaterial);
        leftGround.rotation.x = -Math.PI / 2;
        leftGround.position.y = -0.99;
        leftGround.position.x = -16.5;
        this.scene.add(leftGround);
        const rightGround = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(groundGeometry, groundMaterial);
        rightGround.rotation.x = -Math.PI / 2;
        rightGround.position.y = -0.99;
        rightGround.position.x = -3.5;
        this.scene.add(rightGround);
    };
    //雲
    createClouds = () => {
        const cloudMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5, side: three__WEBPACK_IMPORTED_MODULE_3__.DoubleSide });
        for (let i = 0; i < 20; i++) {
            const cloud = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
            const numCuboids = Math.floor(Math.random() * 2);
            for (let j = 0; j < numCuboids; j++) {
                const width = Math.random() * 8 + 5;
                const height = Math.random() * 2 + 3;
                const depth = Math.random() * 8 + 5;
                const cloudGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry(width, height, depth);
                const cuboid = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(cloudGeometry, cloudMaterial);
                const offsetX = Math.random() * 10 - 5;
                const offsetY = Math.random() * 5 - 2.5;
                const offsetZ = Math.random() * 10 - 5;
                cuboid.position.set(offsetX, offsetY, offsetZ);
                cuboid.castShadow = true;
                cloud.add(cuboid);
            }
            cloud.position.set(Math.random() * 90 - 70, Math.random() * 15 + 10, Math.random() * 100 - 70);
            this.scene.add(cloud);
        }
    };
    loadMultipleHumans = (count) => {
        const mtlLoader = new three_examples_jsm_loaders_MTLLoader_js__WEBPACK_IMPORTED_MODULE_1__.MTLLoader();
        mtlLoader.load('simpleHuman.mtl', (materials) => {
            materials.preload();
            const objLoader = new three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_2__.OBJLoader();
            objLoader.setMaterials(materials);
            for (let i = 0; i < count; i++) {
                objLoader.load('simpleHuman.obj', (object) => {
                    let posX, posZ;
                    do {
                        posX = Math.random() * 60 - 30;
                        posZ = Math.random() * 60 - 30;
                    } while (posX > -20 && posX < 0);
                    object.position.set(posX, -1, posZ);
                    this.scene.add(object);
                });
            }
        });
    };
    addFirework = () => {
        switch (this.fireworkIndex) {
            case 0:
                this.addCubeFirework();
                break;
            case 1:
                this.addConeFirework();
                this.addFishFirework();
                break;
            case 2:
                this.addXFirework();
                break;
            case 3:
                this.addStarFirework();
                this.addHeartFirework();
                break;
            case 4:
                this.addRingFirework();
                break;
            case 5:
                this.addConeFirework();
                break;
            case 6:
                this.addHeartFirework();
                break;
            case 7:
                this.addFishFirework();
                break;
            case 8:
                this.addStarFirework();
                this.addXFirework();
                break;
            case 9:
                this.addHeartFirework();
                this.addXFirework();
                this.addStarFirework();
                this.addFishFirework();
                break;
        }
        this.fireworkIndex = (this.fireworkIndex + 1) % 10;
    };
    addCubeFirework = () => {
        const particles = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
        const pMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
            color: Math.random() * 0xffffff,
            size: 0.02
        });
        const pCount = 1000;
        const positions = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 2;
            positions[i + 1] = (Math.random() - 0.5) * 2;
            positions[i + 2] = (Math.random() - 0.5) * 2;
        }
        particles.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(positions, 3));
        const particleSystem = new three__WEBPACK_IMPORTED_MODULE_3__.Points(particles, pMaterial);
        particleSystem.position.z = (Math.random() - 0.5) * 20;
        this.scene.add(particleSystem);
        this.fireworks.push({ system: particleSystem, speed: 0.05, scale: 0.1, scaleSpeed: 0 });
    };
    addConeFirework = () => {
        const particles = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
        const pMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
            color: Math.random() * 0xffffff,
            size: 0.02
        });
        const pCount = 1000;
        const positions = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount * 3; i += 3) {
            const theta = Math.random() * Math.PI * 2;
            const radius = Math.random() * 0.5;
            const y = -Math.abs(radius);
            positions[i] = radius * Math.cos(theta);
            positions[i + 1] = y;
            positions[i + 2] = radius * Math.sin(theta);
        }
        particles.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(positions, 3));
        const particleSystem = new three__WEBPACK_IMPORTED_MODULE_3__.Points(particles, pMaterial);
        particleSystem.position.z = (Math.random() - 0.5) * 20;
        particleSystem.position.y = 0;
        this.scene.add(particleSystem);
        this.fireworks.push({ system: particleSystem, speed: 0.05, scale: 0.4, scaleSpeed: 0 });
    };
    addXFirework = () => {
        const particles = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
        const pMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
            color: Math.random() * 0xffffff,
            size: 0.02
        });
        const pCount = 1000;
        const positions = new Float32Array(pCount * 3);
        //直線1
        for (let i = 0; i < pCount / 2; i++) {
            const offset = (Math.random() - 0.5) * 2;
            positions[i * 3] = 0;
            positions[i * 3 + 1] = offset;
            positions[i * 3 + 2] = offset;
        }
        //直線2
        for (let i = pCount / 2; i < pCount; i++) {
            const offset = (Math.random() - 0.5) * 2;
            positions[i * 3] = 0;
            positions[i * 3 + 1] = offset;
            positions[i * 3 + 2] = -offset;
        }
        particles.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(positions, 3));
        const particleSystem = new three__WEBPACK_IMPORTED_MODULE_3__.Points(particles, pMaterial);
        particleSystem.position.y = 0;
        particleSystem.position.z = (Math.random() - 0.5) * 20;
        this.scene.add(particleSystem);
        this.fireworks.push({ system: particleSystem, speed: 0.05, scale: 0.2, scaleSpeed: 0 });
    };
    addRingFirework = () => {
        const particles1 = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
        const particles2 = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
        const pMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
            color: Math.random() * 0xffffff,
            size: 0.02
        });
        const pCount = 1000;
        const positions1 = new Float32Array(pCount * 3);
        const positions2 = new Float32Array(pCount * 3);
        //リング1
        for (let i = 0; i < pCount * 3; i += 3) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 0.5 + 0.5;
            positions1[i] = 0;
            positions1[i + 1] = distance * Math.cos(angle);
            positions1[i + 2] = distance * Math.sin(angle);
        }
        //リング2
        for (let i = 0; i < pCount * 3; i += 3) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 0.5 + 0.5;
            positions2[i] = distance * Math.cos(angle);
            positions2[i + 1] = 0;
            positions2[i + 2] = distance * Math.sin(angle);
        }
        particles1.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(positions1, 3));
        particles2.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(positions2, 3));
        const particleSystem1 = new three__WEBPACK_IMPORTED_MODULE_3__.Points(particles1, pMaterial);
        const particleSystem2 = new three__WEBPACK_IMPORTED_MODULE_3__.Points(particles2, pMaterial);
        particleSystem1.position.z = (Math.random() - 0.5) * 20;
        particleSystem2.position.z = particleSystem1.position.z;
        this.scene.add(particleSystem1);
        this.scene.add(particleSystem2);
        this.fireworks.push({ system: particleSystem1, speed: 0.05, scale: 0.3, scaleSpeed: 0 });
        this.fireworks.push({ system: particleSystem2, speed: 0.05, scale: 0.3, scaleSpeed: 0 });
    };
    addHeartFirework = () => {
        const particles = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
        const textureLoader = new three__WEBPACK_IMPORTED_MODULE_3__.TextureLoader();
        const texture = textureLoader.load('heartTex.png');
        const pMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
            map: texture,
            size: 0.1,
            transparent: true,
            color: 0xffffff
        });
        const pCount = 1000;
        const positions = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount * 3; i += 3) {
            const t = Math.random() * Math.PI * 2;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            positions[i] = 0;
            positions[i + 1] = y / 10;
            positions[i + 2] = x / 10;
        }
        particles.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(positions, 3));
        const particleSystem = new three__WEBPACK_IMPORTED_MODULE_3__.Points(particles, pMaterial);
        particleSystem.position.y = 0;
        particleSystem.position.z = (Math.random() - 0.5) * 20;
        this.scene.add(particleSystem);
        this.fireworks.push({ system: particleSystem, speed: 0.05, scale: 0.1, scaleSpeed: 0 });
    };
    addFishFirework = () => {
        const particles = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
        const pMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
            color: Math.random() * 0xffffff,
            size: 0.02
        });
        const pCount = 1000;
        const positions = new Float32Array(pCount * 3);
        let index = 0;
        //頭
        const headCount = Math.floor(pCount * 0.1);
        for (let i = 0; i < headCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 0.05 + 0.05;
            positions[index++] = radius * Math.cos(angle) - 0.5;
            positions[index++] = radius * Math.sin(angle);
            positions[index++] = 0.3;
        }
        //体
        const bodyCount = Math.floor(pCount * 0.7);
        for (let i = 0; i < bodyCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radiusX = Math.random() * 0.5 + 0.3;
            const radiusY = Math.random() * 0.3 + 0.1;
            positions[index++] = radiusX * Math.cos(angle) - 0.5;
            positions[index++] = radiusY * Math.sin(angle);
            positions[index++] = 0;
        }
        //尾
        const tailCount = Math.floor(pCount * 0.2);
        for (let i = 0; i < tailCount; i++) {
            const y = (Math.random() - 0.5) * 0.4;
            const x = (Math.random() - 0.5) * 0.2 + 0.5;
            positions[index++] = x;
            positions[index++] = y;
            positions[index++] = 0;
        }
        particles.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(positions, 3));
        //目
        const eyeParticles = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
        const eyeMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
            color: 0xff0000,
            size: 0.1
        });
        const eyePositions = new Float32Array(3);
        eyePositions[0] = -0.5;
        eyePositions[1] = 0;
        eyePositions[2] = 0.3;
        eyeParticles.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(eyePositions, 3));
        const particleSystem = new three__WEBPACK_IMPORTED_MODULE_3__.Points(particles, pMaterial);
        const eyeSystem = new three__WEBPACK_IMPORTED_MODULE_3__.Points(eyeParticles, eyeMaterial);
        particleSystem.position.y = 0;
        particleSystem.position.z = (Math.random() - 0.5) * 20;
        eyeSystem.position.y = particleSystem.position.y;
        eyeSystem.position.z = particleSystem.position.z;
        this.scene.add(particleSystem);
        this.scene.add(eyeSystem);
        this.fireworks.push({ system: particleSystem, speed: 0.05, scale: 0.3, scaleSpeed: 0 });
        this.fireworks.push({ system: eyeSystem, speed: 0.05, scale: 1, scaleSpeed: 0 });
    };
    addStarFirework = () => {
        const particles = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
        const pMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
            color: Math.random() * 0xffffff,
            size: 0.02
        });
        const pCount = 1000;
        const positions = new Float32Array(pCount * 3);
        const starPoints = [];
        const outerRadius = 0.5;
        const innerRadius = 0.2;
        const numPoints = 5;
        //星形の頂点
        for (let i = 0; i < numPoints * 2; i++) {
            const angle = (i / (numPoints * 2)) * Math.PI * 2;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            starPoints.push({
                y: Math.cos(angle) * radius,
                z: Math.sin(angle) * radius
            });
        }
        for (let i = 0; i < pCount; i++) {
            const pointIndex = Math.floor(i / (pCount / starPoints.length));
            const nextPointIndex = (pointIndex + 1) % starPoints.length;
            const t = (i % (pCount / starPoints.length)) / (pCount / starPoints.length);
            const y = starPoints[pointIndex].y * (1 - t) + starPoints[nextPointIndex].y * t;
            const z = starPoints[pointIndex].z * (1 - t) + starPoints[nextPointIndex].z * t;
            positions[i * 3] = 0;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }
        particles.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(positions, 3));
        const particleSystem = new three__WEBPACK_IMPORTED_MODULE_3__.Points(particles, pMaterial);
        particleSystem.position.y = 0;
        particleSystem.position.z = (Math.random() - 0.5) * 20;
        this.scene.add(particleSystem);
        this.fireworks.push({ system: particleSystem, speed: 0.05, scale: 0.5, scaleSpeed: 0 });
    };
    updateFireworks = (time) => {
        if (time - this.lastFireworkTime > this.fireworkInterval) {
            this.addFirework();
            this.lastFireworkTime = time;
            this.fireworkInterval = this.getRandomInterval();
        }
        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const fireworkData = this.fireworks[i];
            const firework = fireworkData.system;
            const positions = firework.geometry.attributes.position.array;
            //花火が高さ4を超えたら拡大開始
            if (firework.position.y > 4) {
                fireworkData.scaleSpeed = 0.05;
            }
            fireworkData.scale += fireworkData.scaleSpeed;
            firework.scale.set(fireworkData.scale, fireworkData.scale, fireworkData.scale);
            for (let j = 0; j < positions.length; j += 3) {
                positions[j + 1] += fireworkData.speed;
                positions[j] += (Math.random() - 0.5) * 0.02;
                positions[j + 2] += (Math.random() - 0.5) * 0.02;
            }
            //高さが10に達したら花火を消す
            if (firework.position.y > 10 || fireworkData.scale > 5) {
                this.scene.remove(firework);
                this.fireworks.splice(i, 1);
            }
            else {
                firework.position.y += fireworkData.speed;
            }
            firework.geometry.attributes.position.needsUpdate = true;
        }
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(28, 10, 21));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_examples_jsm_controls_OrbitControls_js-node_modules_three_examples-5ef33c"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDcEQsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQzVCO1FBRUQsR0FBRztRQUNILE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQzFDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQzFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNyRCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7UUFFRCxHQUFHO1FBQ0gsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZ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LENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEMsQ0FBQzs7Ozs7OztVQ3hqQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gMjJmaTYwMiDjg5Yg44K744Oz44Ko44OEXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xuaW1wb3J0IHsgTVRMTG9hZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvTVRMTG9hZGVyLmpzJztcbmltcG9ydCB7IE9CSkxvYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL09CSkxvYWRlci5qcyc7XG5cbmNsYXNzIFRocmVlSlNDb250YWluZXIge1xuICAgIHByaXZhdGUgc2NlbmU6IFRIUkVFLlNjZW5lO1xuICAgIHByaXZhdGUgbGlnaHQ6IFRIUkVFLkxpZ2h0O1xuICAgIHByaXZhdGUgZmlyZXdvcmtzOiB7IHN5c3RlbTogVEhSRUUuUG9pbnRzOyBzcGVlZDogbnVtYmVyOyBzY2FsZTogbnVtYmVyOyBzY2FsZVNwZWVkOiBudW1iZXI7IH1bXSA9IFtdO1xuICAgIHByaXZhdGUgbGFzdEZpcmV3b3JrVGltZSA9IDA7XG4gICAgcHJpdmF0ZSBmaXJld29ya0ludGVydmFsOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBmaXJld29ya0luZGV4ID0gMDtcbiAgICBwcml2YXRlIGxhdW5jaFNpdGVzOiBUSFJFRS5NZXNoW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmZpcmV3b3JrSW50ZXJ2YWwgPSB0aGlzLmdldFJhbmRvbUludGVydmFsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21JbnRlcnZhbCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMDAwIC0gMzAwICsgMSkpICsgMzAwO1xuICAgIH1cblxuICAgIC8vIOeUu+mdoumDqOWIhuOBruS9nOaIkCjooajnpLrjgZnjgovmnqDjgZTjgajjgaspXG4gICAgcHVibGljIGNyZWF0ZVJlbmRlcmVyRE9NID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjYW1lcmFQb3M6IFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICAgICAgbGV0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgVEhSRUUuQ29sb3IoMHgxMzI4NUEpKTtcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlOyAvL+OCt+ODo+ODieOCpuODnuODg+ODl+OCkuacieWKueOBq+OBmeOCi1xuXG4gICAgICAgIC8v44Kr44Oh44Op44Gu6Kit5a6aXG4gICAgICAgIGxldCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDApO1xuICAgICAgICBjYW1lcmEucG9zaXRpb24uY29weShjYW1lcmFQb3MpO1xuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcblxuICAgICAgICBsZXQgb3JiaXRDb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVTY2VuZSgpO1xuICAgICAgICB0aGlzLmxvYWRNdWx0aXBsZUh1bWFucygyMCk7XG5cbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yMcmVuZGVyXG4gICAgICAgIC8vIHJlcWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxuICAgICAgICBsZXQgcmVuZGVyOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGaXJld29ya3ModGltZSk7XG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8g44K344O844Oz44Gu5L2c5oiQKOWFqOS9k+OBpzHlm54pXG4gICAgcHJpdmF0ZSBjcmVhdGVTY2VuZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gICAgICAgIC8v44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XG4gICAgICAgIGxldCBsdmVjID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgMSkubm9ybWFsaXplKCk7XG4gICAgICAgIHRoaXMubGlnaHQucG9zaXRpb24uc2V0KGx2ZWMueCwgbHZlYy55LCBsdmVjLnopO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZUdyb3VuZCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZVJpdmVyKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQ2xvdWRzKCk7XG4gICAgICAgIHRoaXMuYWRkTGF1bmNoU2l0ZXMoNSk7XG4gICAgfVxuXG4gICAgLy/lnLDpnaJcbiAgICBwcml2YXRlIGNyZWF0ZUdyb3VuZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgdGV4dHVyZUxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCk7XG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSB0ZXh0dXJlTG9hZGVyLmxvYWQoJ2dyb3VuZC5qcGVnJyk7XG5cbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgxMDAsIDEwMCk7XG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgbWFwOiB0ZXh0dXJlIH0pO1xuICAgICAgICBjb25zdCBncm91bmQgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICBncm91bmQucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgICAgICAgZ3JvdW5kLnBvc2l0aW9uLnkgPSAtMTtcbiAgICAgICAgZ3JvdW5kLnJlY2VpdmVTaGFkb3cgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChncm91bmQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkTGF1bmNoU2l0ZXMgPSAoY291bnQ6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBib3hHZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjUsIDAuNSwgMC41KTtcbiAgICAgICAgY29uc3QgYm94TWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHhmZjAwMDAgfSk7XG4gICAgICAgIGNvbnN0IHN0YXJ0UG9zWiA9IC0xODtcbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSA3O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcG9zWCA9IC0zLjU7XG4gICAgICAgICAgICBjb25zdCBwb3NaID0gc3RhcnRQb3NaICsgaSAqIGludGVydmFsO1xuXG4gICAgICAgICAgICBjb25zdCBib3ggPSBuZXcgVEhSRUUuTWVzaChib3hHZW9tZXRyeSwgYm94TWF0ZXJpYWwpO1xuICAgICAgICAgICAgYm94LnBvc2l0aW9uLnNldChwb3NYLCAtMC43NSwgcG9zWik7XG4gICAgICAgICAgICBib3gucmVjZWl2ZVNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChib3gpO1xuICAgICAgICAgICAgdGhpcy5sYXVuY2hTaXRlcy5wdXNoKGJveCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+W3nVxuICAgIHByaXZhdGUgY3JlYXRlUml2ZXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xuICAgICAgICBjb25zdCB0ZXh0dXJlID0gdGV4dHVyZUxvYWRlci5sb2FkKCd3YXRlci5qcGcnKTtcbiAgICAgICAgdGV4dHVyZS53cmFwUyA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nO1xuICAgICAgICB0ZXh0dXJlLndyYXBUID0gVEhSRUUuUmVwZWF0V3JhcHBpbmc7XG4gICAgICAgIHRleHR1cmUucmVwZWF0LnNldCgxLCAxMCk7XG5cbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgxMCwgMTAwKTtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmUgfSk7XG4gICAgICAgIGNvbnN0IHJpdmVyID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgcml2ZXIucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgICAgICAgcml2ZXIucG9zaXRpb24ueSA9IC0wLjk5O1xuICAgICAgICByaXZlci5wb3NpdGlvbi54ID0gLTEwO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChyaXZlcik7XG5cbiAgICAgICAgY29uc3QgYW5pbWF0ZVRleHR1cmUgPSAoKSA9PiB7XG4gICAgICAgICAgICB0ZXh0dXJlLm9mZnNldC55IC09IDAuMDA1O1xuICAgICAgICAgICAgaWYgKHRleHR1cmUub2Zmc2V0LnkgPD0gLTEpIHtcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLm9mZnNldC55ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlVGV4dHVyZSk7XG4gICAgICAgIH1cbiAgICAgICAgYW5pbWF0ZVRleHR1cmUoKTtcblxuICAgICAgICBjb25zdCBncm91bmRHZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDMsIDEwMCk7XG4gICAgICAgIGNvbnN0IGdyb3VuZE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IDB4ODA4MDgwIH0pO1xuXG4gICAgICAgIGNvbnN0IGxlZnRHcm91bmQgPSBuZXcgVEhSRUUuTWVzaChncm91bmRHZW9tZXRyeSwgZ3JvdW5kTWF0ZXJpYWwpO1xuICAgICAgICBsZWZ0R3JvdW5kLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG4gICAgICAgIGxlZnRHcm91bmQucG9zaXRpb24ueSA9IC0wLjk5O1xuICAgICAgICBsZWZ0R3JvdW5kLnBvc2l0aW9uLnggPSAtMTYuNTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQobGVmdEdyb3VuZCk7XG5cbiAgICAgICAgY29uc3QgcmlnaHRHcm91bmQgPSBuZXcgVEhSRUUuTWVzaChncm91bmRHZW9tZXRyeSwgZ3JvdW5kTWF0ZXJpYWwpO1xuICAgICAgICByaWdodEdyb3VuZC5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyO1xuICAgICAgICByaWdodEdyb3VuZC5wb3NpdGlvbi55ID0gLTAuOTk7XG4gICAgICAgIHJpZ2h0R3JvdW5kLnBvc2l0aW9uLnggPSAtMy41O1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChyaWdodEdyb3VuZCk7XG4gICAgfVxuXG4gICAgLy/pm7JcbiAgICBwcml2YXRlIGNyZWF0ZUNsb3VkcyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xvdWRNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yOiAweEZGRkZGRiwgdHJhbnNwYXJlbnQ6IHRydWUsIG9wYWNpdHk6IDAuNSwgc2lkZTogVEhSRUUuRG91YmxlU2lkZSB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNsb3VkID0gbmV3IFRIUkVFLkdyb3VwKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG51bUN1Ym9pZHMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtQ3Vib2lkczsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBNYXRoLnJhbmRvbSgpICogOCArIDU7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5yYW5kb20oKSAqIDIgKyAzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlcHRoID0gTWF0aC5yYW5kb20oKSAqIDggKyA1O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsb3VkR2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkod2lkdGgsIGhlaWdodCwgZGVwdGgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1Ym9pZCA9IG5ldyBUSFJFRS5NZXNoKGNsb3VkR2VvbWV0cnksIGNsb3VkTWF0ZXJpYWwpO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WCA9IE1hdGgucmFuZG9tKCkgKiAxMCAtIDU7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IE1hdGgucmFuZG9tKCkgKiA1IC0gMi41O1xuICAgICAgICAgICAgICAgIGNvbnN0IG9mZnNldFogPSBNYXRoLnJhbmRvbSgpICogMTAgLSA1O1xuICAgICAgICAgICAgICAgIGN1Ym9pZC5wb3NpdGlvbi5zZXQob2Zmc2V0WCwgb2Zmc2V0WSwgb2Zmc2V0Wik7XG4gICAgICAgICAgICAgICAgY3Vib2lkLmNhc3RTaGFkb3cgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgY2xvdWQuYWRkKGN1Ym9pZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsb3VkLnBvc2l0aW9uLnNldChNYXRoLnJhbmRvbSgpICogOTAgLSA3MCwgTWF0aC5yYW5kb20oKSAqIDE1ICsgMTAsIE1hdGgucmFuZG9tKCkgKiAxMDAgLSA3MCk7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChjbG91ZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRNdWx0aXBsZUh1bWFucyA9IChjb3VudDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IG10bExvYWRlciA9IG5ldyBNVExMb2FkZXIoKTtcbiAgICAgICAgbXRsTG9hZGVyLmxvYWQoJ3NpbXBsZUh1bWFuLm10bCcsIChtYXRlcmlhbHMpID0+IHtcbiAgICAgICAgICAgIG1hdGVyaWFscy5wcmVsb2FkKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG9iakxvYWRlciA9IG5ldyBPQkpMb2FkZXIoKTtcbiAgICAgICAgICAgIG9iakxvYWRlci5zZXRNYXRlcmlhbHMobWF0ZXJpYWxzKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIG9iakxvYWRlci5sb2FkKCdzaW1wbGVIdW1hbi5vYmonLCAob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3NYLCBwb3NaO1xuICAgICAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gTWF0aC5yYW5kb20oKSAqIDYwIC0gMzA7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NaID0gTWF0aC5yYW5kb20oKSAqIDYwIC0gMzA7XG4gICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKHBvc1ggPiAtMjAgJiYgcG9zWCA8IDApO1xuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5wb3NpdGlvbi5zZXQocG9zWCwgLTEsIHBvc1opO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChvYmplY3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEZpcmV3b3JrID0gKCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZmlyZXdvcmtJbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ3ViZUZpcmV3b3JrKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDb25lRmlyZXdvcmsoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEZpc2hGaXJld29yaygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkWEZpcmV3b3JrKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTdGFyRmlyZXdvcmsoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEhlYXJ0RmlyZXdvcmsoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFJpbmdGaXJld29yaygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ29uZUZpcmV3b3JrKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRIZWFydEZpcmV3b3JrKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGaXNoRmlyZXdvcmsoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFN0YXJGaXJld29yaygpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkWEZpcmV3b3JrKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRIZWFydEZpcmV3b3JrKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRYRmlyZXdvcmsoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFN0YXJGaXJld29yaygpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRmlzaEZpcmV3b3JrKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maXJld29ya0luZGV4ID0gKHRoaXMuZmlyZXdvcmtJbmRleCArIDEpICUgMTA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRDdWJlRmlyZXdvcmsgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcnRpY2xlcyA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBjb25zdCBwTWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgICAgICAgY29sb3I6IE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZixcbiAgICAgICAgICAgIHNpemU6IDAuMDJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcENvdW50ID0gMTAwMDtcbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwQ291bnQgKiAzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwQ291bnQgKiAzOyBpICs9IDMpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uc1tpXSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDI7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaSArIDFdID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMjtcbiAgICAgICAgICAgIHBvc2l0aW9uc1tpICsgMl0gPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRpY2xlcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShwb3NpdGlvbnMsIDMpKTtcblxuICAgICAgICBjb25zdCBwYXJ0aWNsZVN5c3RlbSA9IG5ldyBUSFJFRS5Qb2ludHMocGFydGljbGVzLCBwTWF0ZXJpYWwpO1xuICAgICAgICBwYXJ0aWNsZVN5c3RlbS5wb3NpdGlvbi56ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMjA7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHBhcnRpY2xlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5maXJld29ya3MucHVzaCh7IHN5c3RlbTogcGFydGljbGVTeXN0ZW0sIHNwZWVkOiAwLjA1LCBzY2FsZTogMC4xLCBzY2FsZVNwZWVkOiAwIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQ29uZUZpcmV3b3JrID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJ0aWNsZXMgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgY29uc3QgcE1hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICAgICAgICAgIGNvbG9yOiBNYXRoLnJhbmRvbSgpICogMHhmZmZmZmYsXG4gICAgICAgICAgICBzaXplOiAwLjAyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBDb3VudCA9IDEwMDA7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkocENvdW50ICogMyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwQ291bnQgKiAzOyBpICs9IDMpIHtcbiAgICAgICAgICAgIGNvbnN0IHRoZXRhID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgY29uc3QgcmFkaXVzID0gTWF0aC5yYW5kb20oKSAqIDAuNTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSAtTWF0aC5hYnMocmFkaXVzKTtcblxuICAgICAgICAgICAgcG9zaXRpb25zW2ldID0gcmFkaXVzICogTWF0aC5jb3ModGhldGEpO1xuICAgICAgICAgICAgcG9zaXRpb25zW2kgKyAxXSA9IHk7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaSArIDJdID0gcmFkaXVzICogTWF0aC5zaW4odGhldGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFydGljbGVzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywgMykpO1xuXG4gICAgICAgIGNvbnN0IHBhcnRpY2xlU3lzdGVtID0gbmV3IFRIUkVFLlBvaW50cyhwYXJ0aWNsZXMsIHBNYXRlcmlhbCk7XG4gICAgICAgIHBhcnRpY2xlU3lzdGVtLnBvc2l0aW9uLnogPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyMDtcbiAgICAgICAgcGFydGljbGVTeXN0ZW0ucG9zaXRpb24ueSA9IDA7XG5cbiAgICAgICAgdGhpcy5zY2VuZS5hZGQocGFydGljbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLmZpcmV3b3Jrcy5wdXNoKHsgc3lzdGVtOiBwYXJ0aWNsZVN5c3RlbSwgc3BlZWQ6IDAuMDUsIHNjYWxlOiAwLjQsIHNjYWxlU3BlZWQ6IDAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRYRmlyZXdvcmsgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcnRpY2xlcyA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBjb25zdCBwTWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgICAgICAgY29sb3I6IE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZixcbiAgICAgICAgICAgIHNpemU6IDAuMDJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcENvdW50ID0gMTAwMDtcbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwQ291bnQgKiAzKTtcblxuICAgICAgICAvL+ebtOe3mjFcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwQ291bnQgLyAyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDI7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaSAqIDNdID0gMDtcbiAgICAgICAgICAgIHBvc2l0aW9uc1tpICogMyArIDFdID0gb2Zmc2V0O1xuICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMl0gPSBvZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL+ebtOe3mjJcbiAgICAgICAgZm9yIChsZXQgaSA9IHBDb3VudCAvIDI7IGkgPCBwQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMjtcbiAgICAgICAgICAgIHBvc2l0aW9uc1tpICogM10gPSAwO1xuICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMV0gPSBvZmZzZXQ7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaSAqIDMgKyAyXSA9IC1vZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJ0aWNsZXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLCAzKSk7XG5cbiAgICAgICAgY29uc3QgcGFydGljbGVTeXN0ZW0gPSBuZXcgVEhSRUUuUG9pbnRzKHBhcnRpY2xlcywgcE1hdGVyaWFsKTtcbiAgICAgICAgcGFydGljbGVTeXN0ZW0ucG9zaXRpb24ueSA9IDA7XG4gICAgICAgIHBhcnRpY2xlU3lzdGVtLnBvc2l0aW9uLnogPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyMDtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQocGFydGljbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLmZpcmV3b3Jrcy5wdXNoKHsgc3lzdGVtOiBwYXJ0aWNsZVN5c3RlbSwgc3BlZWQ6IDAuMDUsIHNjYWxlOiAwLjIsIHNjYWxlU3BlZWQ6IDAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRSaW5nRmlyZXdvcmsgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcnRpY2xlczEgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgY29uc3QgcGFydGljbGVzMiA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBjb25zdCBwTWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgICAgICAgY29sb3I6IE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZixcbiAgICAgICAgICAgIHNpemU6IDAuMDJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcENvdW50ID0gMTAwMDtcbiAgICAgICAgY29uc3QgcG9zaXRpb25zMSA9IG5ldyBGbG9hdDMyQXJyYXkocENvdW50ICogMyk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uczIgPSBuZXcgRmxvYXQzMkFycmF5KHBDb3VudCAqIDMpO1xuXG4gICAgICAgIC8v44Oq44Oz44KwMVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBDb3VudCAqIDM7IGkgKz0gMykge1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGgucmFuZG9tKCkgKiAwLjUgKyAwLjU7XG4gICAgICAgICAgICBwb3NpdGlvbnMxW2ldID0gMDtcbiAgICAgICAgICAgIHBvc2l0aW9uczFbaSArIDFdID0gZGlzdGFuY2UgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICBwb3NpdGlvbnMxW2kgKyAyXSA9IGRpc3RhbmNlICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/jg6rjg7PjgrAyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcENvdW50ICogMzsgaSArPSAzKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5yYW5kb20oKSAqIDAuNSArIDAuNTtcbiAgICAgICAgICAgIHBvc2l0aW9uczJbaV0gPSBkaXN0YW5jZSAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgIHBvc2l0aW9uczJbaSArIDFdID0gMDtcbiAgICAgICAgICAgIHBvc2l0aW9uczJbaSArIDJdID0gZGlzdGFuY2UgKiBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJ0aWNsZXMxLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9uczEsIDMpKTtcbiAgICAgICAgcGFydGljbGVzMi5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShwb3NpdGlvbnMyLCAzKSk7XG5cbiAgICAgICAgY29uc3QgcGFydGljbGVTeXN0ZW0xID0gbmV3IFRIUkVFLlBvaW50cyhwYXJ0aWNsZXMxLCBwTWF0ZXJpYWwpO1xuICAgICAgICBjb25zdCBwYXJ0aWNsZVN5c3RlbTIgPSBuZXcgVEhSRUUuUG9pbnRzKHBhcnRpY2xlczIsIHBNYXRlcmlhbCk7XG5cbiAgICAgICAgcGFydGljbGVTeXN0ZW0xLnBvc2l0aW9uLnogPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyMDtcbiAgICAgICAgcGFydGljbGVTeXN0ZW0yLnBvc2l0aW9uLnogPSBwYXJ0aWNsZVN5c3RlbTEucG9zaXRpb24uejtcblxuICAgICAgICB0aGlzLnNjZW5lLmFkZChwYXJ0aWNsZVN5c3RlbTEpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChwYXJ0aWNsZVN5c3RlbTIpO1xuXG4gICAgICAgIHRoaXMuZmlyZXdvcmtzLnB1c2goeyBzeXN0ZW06IHBhcnRpY2xlU3lzdGVtMSwgc3BlZWQ6IDAuMDUsIHNjYWxlOiAwLjMsIHNjYWxlU3BlZWQ6IDAgfSk7XG4gICAgICAgIHRoaXMuZmlyZXdvcmtzLnB1c2goeyBzeXN0ZW06IHBhcnRpY2xlU3lzdGVtMiwgc3BlZWQ6IDAuMDUsIHNjYWxlOiAwLjMsIHNjYWxlU3BlZWQ6IDAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRIZWFydEZpcmV3b3JrID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJ0aWNsZXMgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgY29uc3QgdGV4dHVyZUxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCk7XG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSB0ZXh0dXJlTG9hZGVyLmxvYWQoJ2hlYXJ0VGV4LnBuZycpO1xuXG4gICAgICAgIGNvbnN0IHBNYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgICAgICBtYXA6IHRleHR1cmUsXG4gICAgICAgICAgICBzaXplOiAwLjEsXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICAgIGNvbG9yOiAweGZmZmZmZlxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwQ291bnQgPSAxMDAwO1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBDb3VudCAqIDMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBDb3VudCAqIDM7IGkgKz0gMykge1xuICAgICAgICAgICAgY29uc3QgdCA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgIGNvbnN0IHggPSAxNiAqIE1hdGgucG93KE1hdGguc2luKHQpLCAzKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSAxMyAqIE1hdGguY29zKHQpIC0gNSAqIE1hdGguY29zKDIgKiB0KSAtIDIgKiBNYXRoLmNvcygzICogdCkgLSBNYXRoLmNvcyg0ICogdCk7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaV0gPSAwO1xuICAgICAgICAgICAgcG9zaXRpb25zW2kgKyAxXSA9IHkgLyAxMDtcbiAgICAgICAgICAgIHBvc2l0aW9uc1tpICsgMl0gPSB4IC8gMTA7XG4gICAgICAgIH1cbiAgICAgICAgcGFydGljbGVzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywgMykpO1xuXG4gICAgICAgIGNvbnN0IHBhcnRpY2xlU3lzdGVtID0gbmV3IFRIUkVFLlBvaW50cyhwYXJ0aWNsZXMsIHBNYXRlcmlhbCk7XG4gICAgICAgIHBhcnRpY2xlU3lzdGVtLnBvc2l0aW9uLnkgPSAwO1xuICAgICAgICBwYXJ0aWNsZVN5c3RlbS5wb3NpdGlvbi56ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMjA7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHBhcnRpY2xlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5maXJld29ya3MucHVzaCh7IHN5c3RlbTogcGFydGljbGVTeXN0ZW0sIHNwZWVkOiAwLjA1LCBzY2FsZTogMC4xLCBzY2FsZVNwZWVkOiAwIH0pO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBhZGRGaXNoRmlyZXdvcmsgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcnRpY2xlcyA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBjb25zdCBwTWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgICAgICAgY29sb3I6IE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZixcbiAgICAgICAgICAgIHNpemU6IDAuMDJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcENvdW50ID0gMTAwMDtcbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwQ291bnQgKiAzKTtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcblxuICAgICAgICAvL+mgrVxuICAgICAgICBjb25zdCBoZWFkQ291bnQgPSBNYXRoLmZsb29yKHBDb3VudCAqIDAuMSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZENvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgY29uc3QgcmFkaXVzID0gTWF0aC5yYW5kb20oKSAqIDAuMDUgKyAwLjA1O1xuICAgICAgICAgICAgcG9zaXRpb25zW2luZGV4KytdID0gcmFkaXVzICogTWF0aC5jb3MoYW5nbGUpIC0gMC41O1xuICAgICAgICAgICAgcG9zaXRpb25zW2luZGV4KytdID0gcmFkaXVzICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICAgICAgcG9zaXRpb25zW2luZGV4KytdID0gMC4zO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/kvZNcbiAgICAgICAgY29uc3QgYm9keUNvdW50ID0gTWF0aC5mbG9vcihwQ291bnQgKiAwLjcpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvZHlDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgIGNvbnN0IHJhZGl1c1ggPSBNYXRoLnJhbmRvbSgpICogMC41ICsgMC4zO1xuICAgICAgICAgICAgY29uc3QgcmFkaXVzWSA9IE1hdGgucmFuZG9tKCkgKiAwLjMgKyAwLjE7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaW5kZXgrK10gPSByYWRpdXNYICogTWF0aC5jb3MoYW5nbGUpIC0gMC41O1xuICAgICAgICAgICAgcG9zaXRpb25zW2luZGV4KytdID0gcmFkaXVzWSAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgICAgIHBvc2l0aW9uc1tpbmRleCsrXSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvL+WwvlxuICAgICAgICBjb25zdCB0YWlsQ291bnQgPSBNYXRoLmZsb29yKHBDb3VudCAqIDAuMik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFpbENvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHkgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjQ7XG4gICAgICAgICAgICBjb25zdCB4ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC4yICsgMC41O1xuICAgICAgICAgICAgcG9zaXRpb25zW2luZGV4KytdID0geDtcbiAgICAgICAgICAgIHBvc2l0aW9uc1tpbmRleCsrXSA9IHk7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaW5kZXgrK10gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFydGljbGVzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywgMykpO1xuXG4gICAgICAgIC8v55uuXG4gICAgICAgIGNvbnN0IGV5ZVBhcnRpY2xlcyA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBjb25zdCBleWVNYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgICAgICBjb2xvcjogMHhmZjAwMDAsXG4gICAgICAgICAgICBzaXplOiAwLjFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZXllUG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheSgzKTtcbiAgICAgICAgZXllUG9zaXRpb25zWzBdID0gLTAuNTtcbiAgICAgICAgZXllUG9zaXRpb25zWzFdID0gMDtcbiAgICAgICAgZXllUG9zaXRpb25zWzJdID0gMC4zO1xuXG4gICAgICAgIGV5ZVBhcnRpY2xlcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShleWVQb3NpdGlvbnMsIDMpKTtcblxuICAgICAgICBjb25zdCBwYXJ0aWNsZVN5c3RlbSA9IG5ldyBUSFJFRS5Qb2ludHMocGFydGljbGVzLCBwTWF0ZXJpYWwpO1xuICAgICAgICBjb25zdCBleWVTeXN0ZW0gPSBuZXcgVEhSRUUuUG9pbnRzKGV5ZVBhcnRpY2xlcywgZXllTWF0ZXJpYWwpO1xuXG4gICAgICAgIHBhcnRpY2xlU3lzdGVtLnBvc2l0aW9uLnkgPSAwO1xuICAgICAgICBwYXJ0aWNsZVN5c3RlbS5wb3NpdGlvbi56ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMjA7XG4gICAgICAgIGV5ZVN5c3RlbS5wb3NpdGlvbi55ID0gcGFydGljbGVTeXN0ZW0ucG9zaXRpb24ueTtcbiAgICAgICAgZXllU3lzdGVtLnBvc2l0aW9uLnogPSBwYXJ0aWNsZVN5c3RlbS5wb3NpdGlvbi56O1xuXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHBhcnRpY2xlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoZXllU3lzdGVtKTtcbiAgICAgICAgdGhpcy5maXJld29ya3MucHVzaCh7IHN5c3RlbTogcGFydGljbGVTeXN0ZW0sIHNwZWVkOiAwLjA1LCBzY2FsZTogMC4zLCBzY2FsZVNwZWVkOiAwIH0pO1xuICAgICAgICB0aGlzLmZpcmV3b3Jrcy5wdXNoKHsgc3lzdGVtOiBleWVTeXN0ZW0sIHNwZWVkOiAwLjA1LCBzY2FsZTogMSwgc2NhbGVTcGVlZDogMCB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFN0YXJGaXJld29yayA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGFydGljbGVzID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgIGNvbnN0IHBNYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgICAgICBjb2xvcjogTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmLFxuICAgICAgICAgICAgc2l6ZTogMC4wMlxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwQ291bnQgPSAxMDAwO1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBDb3VudCAqIDMpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJQb2ludHMgPSBbXTtcbiAgICAgICAgY29uc3Qgb3V0ZXJSYWRpdXMgPSAwLjU7XG4gICAgICAgIGNvbnN0IGlubmVyUmFkaXVzID0gMC4yO1xuICAgICAgICBjb25zdCBudW1Qb2ludHMgPSA1O1xuXG4gICAgICAgIC8v5pif5b2i44Gu6aCC54K5XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUG9pbnRzICogMjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IChpIC8gKG51bVBvaW50cyAqIDIpKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgY29uc3QgcmFkaXVzID0gaSAlIDIgPT09IDAgPyBvdXRlclJhZGl1cyA6IGlubmVyUmFkaXVzO1xuICAgICAgICAgICAgc3RhclBvaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICB5OiBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXMsXG4gICAgICAgICAgICAgICAgejogTWF0aC5zaW4oYW5nbGUpICogcmFkaXVzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcENvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBvaW50SW5kZXggPSBNYXRoLmZsb29yKGkgLyAocENvdW50IC8gc3RhclBvaW50cy5sZW5ndGgpKTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRQb2ludEluZGV4ID0gKHBvaW50SW5kZXggKyAxKSAlIHN0YXJQb2ludHMubGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgdCA9IChpICUgKHBDb3VudCAvIHN0YXJQb2ludHMubGVuZ3RoKSkgLyAocENvdW50IC8gc3RhclBvaW50cy5sZW5ndGgpO1xuXG4gICAgICAgICAgICBjb25zdCB5ID0gc3RhclBvaW50c1twb2ludEluZGV4XS55ICogKDEgLSB0KSArIHN0YXJQb2ludHNbbmV4dFBvaW50SW5kZXhdLnkgKiB0O1xuICAgICAgICAgICAgY29uc3QgeiA9IHN0YXJQb2ludHNbcG9pbnRJbmRleF0ueiAqICgxIC0gdCkgKyBzdGFyUG9pbnRzW25leHRQb2ludEluZGV4XS56ICogdDtcblxuICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzXSA9IDA7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaSAqIDMgKyAxXSA9IHk7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaSAqIDMgKyAyXSA9IHo7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJ0aWNsZXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLCAzKSk7XG5cbiAgICAgICAgY29uc3QgcGFydGljbGVTeXN0ZW0gPSBuZXcgVEhSRUUuUG9pbnRzKHBhcnRpY2xlcywgcE1hdGVyaWFsKTtcbiAgICAgICAgcGFydGljbGVTeXN0ZW0ucG9zaXRpb24ueSA9IDA7XG4gICAgICAgIHBhcnRpY2xlU3lzdGVtLnBvc2l0aW9uLnogPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyMDtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQocGFydGljbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLmZpcmV3b3Jrcy5wdXNoKHsgc3lzdGVtOiBwYXJ0aWNsZVN5c3RlbSwgc3BlZWQ6IDAuMDUsIHNjYWxlOiAwLjUsIHNjYWxlU3BlZWQ6IDAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVGaXJld29ya3MgPSAodGltZTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmICh0aW1lIC0gdGhpcy5sYXN0RmlyZXdvcmtUaW1lID4gdGhpcy5maXJld29ya0ludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEZpcmV3b3JrKCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RGaXJld29ya1RpbWUgPSB0aW1lO1xuICAgICAgICAgICAgdGhpcy5maXJld29ya0ludGVydmFsID0gdGhpcy5nZXRSYW5kb21JbnRlcnZhbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuZmlyZXdvcmtzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJld29ya0RhdGEgPSB0aGlzLmZpcmV3b3Jrc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGZpcmV3b3JrID0gZmlyZXdvcmtEYXRhLnN5c3RlbTtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IGZpcmV3b3JrLmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXkgYXMgRmxvYXQzMkFycmF5O1xuXG4gICAgICAgICAgICAvL+iKseeBq+OBjOmrmOOBlTTjgpLotoXjgYjjgZ/jgonmi6HlpKfplovlp4tcbiAgICAgICAgICAgIGlmIChmaXJld29yay5wb3NpdGlvbi55ID4gNCkge1xuICAgICAgICAgICAgICAgIGZpcmV3b3JrRGF0YS5zY2FsZVNwZWVkID0gMC4wNTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmlyZXdvcmtEYXRhLnNjYWxlICs9IGZpcmV3b3JrRGF0YS5zY2FsZVNwZWVkO1xuICAgICAgICAgICAgZmlyZXdvcmsuc2NhbGUuc2V0KGZpcmV3b3JrRGF0YS5zY2FsZSwgZmlyZXdvcmtEYXRhLnNjYWxlLCBmaXJld29ya0RhdGEuc2NhbGUpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBvc2l0aW9ucy5sZW5ndGg7IGogKz0gMykge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uc1tqICsgMV0gKz0gZmlyZXdvcmtEYXRhLnNwZWVkO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uc1tqXSArPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjAyO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uc1tqICsgMl0gKz0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC4wMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/pq5jjgZXjgYwxMOOBq+mBlOOBl+OBn+OCieiKseeBq+OCkua2iOOBmVxuICAgICAgICAgICAgaWYgKGZpcmV3b3JrLnBvc2l0aW9uLnkgPiAxMCB8fCBmaXJld29ya0RhdGEuc2NhbGUgPiA1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmUoZmlyZXdvcmspO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZXdvcmtzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlyZXdvcmsucG9zaXRpb24ueSArPSBmaXJld29ya0RhdGEuc3BlZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpcmV3b3JrLmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdCk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IG5ldyBUaHJlZUpTQ29udGFpbmVyKCk7XG5cbiAgICBsZXQgdmlld3BvcnQgPSBjb250YWluZXIuY3JlYXRlUmVuZGVyZXJET00oNjQwLCA0ODAsIG5ldyBUSFJFRS5WZWN0b3IzKDI4LCAxMCwgMjEpKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzLTVlZjMzY1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==