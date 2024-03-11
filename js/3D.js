import * as THREE from "/js/three.js";
import { GLTFLoader } from "/js/GLTFLoader.js";
import { OrbitControls } from "/js/OrbitControls.js";
import { DRACOLoader } from "/js/DRACOLoader.js";
import Stats from "/js/stats.module.js";
import { MeshSurfaceSampler } from "/js/MeshSurfaceSampler.js";
import { TWEEN } from "/js/tween.module.min.js";
const canvas = document.querySelector("canvas.webgl");
const sizes = { width: window.innerWidth, height: window.innerHeight };
const scene = new THREE.Scene();
const loadingManager = new THREE.LoadingManager();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/js/draco/");
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);
var island;
gltfLoader.load("/models/island.glb", function (gltf) {
    island = gltf.scene;
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    scene.add(island);
});
gltfLoader.load("/models/treeline.glb", function (gltf) {
    var surface = gltf.scene.children[0];
    var sampler = new MeshSurfaceSampler(surface).build();
    const tempPosition = new THREE.Vector3();
    const tempObject = new THREE.Object3D();
    gltfLoader.load("/models/flower.glb", function (gltf) {
        var blossom = gltf.scene.getObjectByName("Blossom");
        var stem = gltf.scene.getObjectByName("Stem");
        let blossomMaterial = new THREE.MeshLambertMaterial({ emissive: new THREE.Color(0xbdd1ff).convertSRGBToLinear(), emissiveIntensity: 0.5 });
        const color = new THREE.Color();
        const blossomPalette = [0xbdd1ff, 0xd5e1ff, 0xeef2ff];
        for (let i = 0; i < 500; i++) {
            sampler.sample(tempPosition);
            tempObject.position.set(tempPosition.x, tempPosition.y - 0.03, tempPosition.z);
            tempObject.scale.setScalar(Math.random() * 0.03 + 0.02);
            tempObject.updateMatrix();
            color.setHex(blossomPalette[Math.floor(Math.random() * blossomPalette.length)]);
            var instancedBlossom = new THREE.InstancedMesh(blossom.geometry, blossomMaterial, 1);
            var instancedStem = new THREE.InstancedMesh(stem.geometry, stem.material, 1);
            instancedBlossom.setMatrixAt(0, tempObject.matrix);
            instancedBlossom.position.y = instancedBlossom.position.y - 0.03;
            instancedStem.setMatrixAt(0, tempObject.matrix);
            instancedBlossom.setColorAt(0, color.convertSRGBToLinear());
            instancedBlossom.castShadow = true;
            instancedStem.castShadow = true;
            instancedBlossom.receiveShadow = true;
            scene.add(instancedBlossom);
            scene.add(instancedStem);
        }
    });
});
gltfLoader.load("/models/treeline.glb", function (gltf) {
    var surface = gltf.scene.children[0];
    var sampler = new MeshSurfaceSampler(surface).build();
    const tempPosition = new THREE.Vector3();
    const tempObject = new THREE.Object3D();
    gltfLoader.load("/models/tree.glb", function (gltf) {
        var tree = gltf.scene.getObjectByName("tree");
        let treeMaterial = new THREE.MeshLambertMaterial();
        const color = new THREE.Color();
        const treePalette = [0x320daa, 0x411bc7, 0x5028e3];
        for (let i = 0; i < 80; i++) {
            sampler.sample(tempPosition);
            tempObject.position.set(tempPosition.x, tempPosition.y, tempPosition.z);
            tempObject.rotation.x = Math.PI / 2;
            tempObject.rotation.z = Math.random() * Math.PI;
            tempObject.scale.setScalar(Math.random() * 0.05 + 0.04);
            tempObject.updateMatrix();
            color.setHex(treePalette[Math.floor(Math.random() * treePalette.length)]);
            var instancedTree = new THREE.InstancedMesh(tree.geometry, treeMaterial, 1);
            instancedTree.setMatrixAt(0, tempObject.matrix);
            instancedTree.setColorAt(0, color.convertSRGBToLinear());
            instancedTree.castShadow = true;
            instancedTree.receiveShadow = true;
            scene.add(instancedTree);
        }
    });
});
var car;
gltfLoader.load("/models/scooter.glb", function (gltf) {
    car = gltf.scene;
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    scene.add(car);
    car.scale.set(0.32, 0.32, 0.32);
});
var mug;
gltfLoader.load("/models/mug.glb", function (gltf) {
   
    mug = gltf.scene;
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    scene.add(mug);
    mug.scale.set(1, 1, 1);
    mug.position.set(-6.5, 0, -8);
});


var mixer3;
var action3;
gltfLoader.load("/models/joshua.glb", function (gltf) {
    var joshua = gltf.scene;
    mixer3 = new THREE.AnimationMixer(joshua);
    action3 = mixer3.clipAction(gltf.animations[0]);
    action3.timeScale = 1;
    action3.play();
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    scene.add(joshua);
    joshua.scale.set(1, 1, 1);
    joshua.position.set(-3.5, 0, 10);
    joshua.rotation.y = 0;
});
const shirtColor = new THREE.Color();
const shirtPalette = [0xfa6d6d, 0xffffff];
const skinPalette = [0x8d5524, 0xc68642, 0xe0ac69, 0xf1c27d, 0xffdbac];
for (let i = 0; i < 8; i++) {
    gltfLoader.load("/models/man.glb", function (gltf) {
        var man = gltf.scene;
        man.scale.set(0.49, 0.49, 0.49);
        man.position.set(-8.5 + Math.random() * 2 - 1, -0.01, 4.5 + Math.random() * 2 - 1);
        man.rotation.y = Math.random() * 36;
        gltf.scene.traverse(function (node) {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        gltf.scene.getObjectByName("shirt").traverse(function (node) {
            if (node.isMesh) {
                shirtColor.setHex(shirtPalette[Math.floor(Math.random() * shirtPalette.length)]);
                node.material.color.set(shirtColor).convertSRGBToLinear();
            }
        });
        gltf.scene.getObjectByName("body").traverse(function (node) {
            if (node.isMesh) {
                shirtColor.setHex(skinPalette[Math.floor(Math.random() * skinPalette.length)]);
                node.material.color.set(shirtColor).convertSRGBToLinear();
            }
        });
        scene.add(man);
    });
}
var clapper;
var mixer;
var action;
gltfLoader.load("/models/clapper.glb", function (gltf) {
    clapper = gltf.scene;
    clapper.scale.set(1.4, 1.4, 1.4);
    clapper.position.set(9.5, 0, -1);
    clapper.rotation.y = Math.PI / 8;
    mixer = new THREE.AnimationMixer(clapper);
    action = mixer.clipAction(gltf.animations[0]);
    action.play();
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    scene.add(clapper);
});
var cyclist;
var mixer2;
var action2;
gltfLoader.load("/models/cyclist.glb", function (gltf) {
    cyclist = gltf.scene;
    cyclist.scale.set(0.33, 0.33, 0.33);
    mixer2 = new THREE.AnimationMixer(cyclist);
    action2 = mixer2.clipAction(gltf.animations[0]);
    action2.timeScale = 0;
    action2.play();
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    scene.add(cyclist);
});
var mixer4;
var action4;
gltfLoader.load("/models/stag.glb", function (gltf) {
    var stag = gltf.scene;
    stag.scale.set(0.2, 0.2, 0.2);
    stag.rotation.y = Math.PI / 2;
    stag.position.set(6, 0, -7);
    mixer4 = new THREE.AnimationMixer(stag);
    action4 = mixer4.clipAction(gltf.animations[0]);
    action4.timeScale = 1;
    action4.play();
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    scene.add(stag);
});
var robot;
var mixer5;
var action5;
gltfLoader.load("/models/robo.glb", function (gltf) {
    robot = gltf.scene;
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    mixer5 = new THREE.AnimationMixer(robot);
    action5 = mixer5.clipAction(gltf.animations[14]);
    action5.play();
    robot.scale.set(0.5, 0.5, 0.5);
    robot.position.set(0, 0, -9.5);
    robot.rotation.y = -Math.PI;
    scene.add(robot);
});
const camera = new THREE.PerspectiveCamera(64, sizes.width / sizes.height, 1, 90);
camera.position.set(0, 30, 30);
scene.add(camera);
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.enablePan = false;
controls.minPolarAngle = Math.PI / 2.4;
controls.maxPolarAngle = Math.PI / 2.15;
controls.minDistance = 16;
controls.maxDistance = 30;
controls.enableDamping = true;
controls.rotateSpeed = 0.25;
THREE.Cache.enabled = true;
const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance", canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio * 0.7, 1));
renderer.setClearColor(0xffffff, 0);
scene.background = null;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio * 0.7, 1));
});
function stopUntillLoaded() {
    loadingManager.onLoad = function () {
        const loaderHandle = document.getElementById("loading-modal");
        loaderHandle.classList.add("hidden");
    };
}
window.onload = function () {
    stopUntillLoaded();
    new TWEEN.Tween(camera.position).to({ x: 0, y: 3, z: 16 }, 1000).easing(TWEEN.Easing.Cubic.Out).start();
};
const hemiLight = new THREE.HemisphereLight(0xfff, 0xfff, 0.6);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 500, 0);
scene.add(hemiLight);
let shadowMapSize = 13;
const sunLight = new THREE.DirectionalLight(0xffffff, 1, 100);
sunLight.position.set(0, 12, 12);
sunLight.color.setHSL(0.1, 1, 0.95);
sunLight.visible = true;
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = shadowMapSize * 2;
sunLight.shadow.camera.top = shadowMapSize;
sunLight.shadow.camera.bottom = -shadowMapSize;
sunLight.shadow.camera.left = -shadowMapSize;
sunLight.shadow.camera.right = shadowMapSize;
sunLight.shadow.normalBias = 0.02;
scene.add(sunLight);
scene.add(sunLight.target);
const spotLight = new THREE.SpotLight(0xffffff, 4, 6, Math.PI / 4, 1, 1);
spotLight.position.set(0, 3.5, 0);
spotLight.visible = false;
spotLight.castShadow = false;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 0.5;
spotLight.shadow.camera.far = 2;
spotLight.shadow.normalBias = 0.02;
scene.add(spotLight);
scene.add(spotLight.target);
const cursor = { x: 0, y: 0 };
window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
});
let scrollSpeed = (function () {
    let lastPos, newPos, delta;
    function clear() {
        lastPos = null;
        delta = 0;
    }
    clear();
    return function () {
        newPos = controls.getAzimuthalAngle();
        if (lastPos != null) {
            delta = newPos - lastPos;
        }
        if (delta == 1 || delta == -1) delta = 0;
        if (delta < -1) {
            delta = -delta;
        }
        if (action2) action2.timeScale = delta * 160;
        lastPos = newPos;
        return delta;
    };
})();
const checkbox = document.getElementById("myCheckbox");
const spans = document.getElementById("menuToggle").getElementsByTagName("span");
function checkCheckbox() {
    if (checkbox.checked) {
        spotLight.visible = false;
        spotLight.castShadow = false;
        sunLight.visible = true;
        sunLight.castShadow = true;
        canvas.style.background = "linear-gradient(0deg, hsl(200, 50%,100%) 50%, hsl(214,80%,70%) 100%)";
        hemiLight.intensity = 0.6;
        document.body.style.color = "black";
        for (const span of spans) {
            span.style.background = "black";
        }
    } else {
        spotLight.visible = true;
        spotLight.castShadow = true;
        sunLight.visible = false;
        sunLight.castShadow = false;
        canvas.style.background = "linear-gradient(0deg, hsl(220, 50%,20%) 50%, hsl(220,80%,5%) 100%)";
        hemiLight.intensity = 0.01;
        document.body.style.color = "white";
        for (const span of spans) {
            span.style.background = "white";
        }
    }
}
var today = new Date();
var time = today.getHours();
if (time < 6 || time > 16) {
    checkbox.checked = false;
    checkCheckbox();
} else {
    checkbox.checked = true;
    checkCheckbox();
}
checkbox.addEventListener("change", (event) => {
    checkCheckbox();
});
let azimuthalAngle;
let cyclePos = 0;
let i = 0;
let g = 0.8;
const popups = document.getElementsByClassName("popup");
const clock = new THREE.Clock();
const tick = () => {
    controls.update();
    if (car) {
        car.position.x = -Math.sin(i * Math.PI) * 11.8;
        car.position.z = -Math.cos(i * Math.PI) * 11.8;
        car.rotation.y = i * Math.PI + Math.PI / 2;
        i -= 0.001;
    }
    azimuthalAngle = controls.getAzimuthalAngle();
    cyclePos = azimuthalAngle / (Math.PI * 2);
    if (cyclePos < 0) {
        cyclePos = 0.5 + (0.5 + cyclePos);
    }
    spotLight.position.x = Math.sin(azimuthalAngle) * 12.4;
    spotLight.position.z = Math.cos(azimuthalAngle) * 12.4;
    spotLight.target.position.x = Math.sin(azimuthalAngle) * 9;
    spotLight.target.position.z = Math.cos(azimuthalAngle) * 9;
    if (cyclist) {
        cyclist.position.x = Math.sin(azimuthalAngle) * 11.4;
        cyclist.position.z = Math.cos(azimuthalAngle) * 11.4;
        cyclist.rotation.y = azimuthalAngle;
    }
    if (azimuthalAngle >= 0.1 || azimuthalAngle < -0.1) {
        document.getElementById("instructions").classList.add("hidden");
    }
    for (let i = 0; i < popups.length; i++) {
        if (cyclePos >= 0.025 + i / popups.length && cyclePos < 0.08 + i / popups.length) {
            popups[i].classList.remove("hidden");
            popups[i].classList.add("visible");
        } else {
            popups[i].classList.add("hidden");
            popups[i].classList.remove("visible");
        }
    }
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    if (mixer2) mixer2.update(delta);
    if (mixer3) mixer3.update(delta);
    if (mixer4) mixer4.update(delta);
    if (mixer5) mixer5.update(delta);
    if (mug) {
        mug.rotation.y -= 0.01;
    }
    scrollSpeed();
    TWEEN.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};
tick();