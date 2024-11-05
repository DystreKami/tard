// Configuración básica de la escena de Three.js
const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderizador.domElement);

// Añadir luz para iluminar el modelo
const luz = new THREE.DirectionalLight(0xffffff, 1);
luz.position.set(2, 2, 5).normalize();
escena.add(luz);

// Cargar el modelo GLTF
const cargador = new THREE.GLTFLoader();
cargador.load('water_bear.glb', (gltf) => {
    const modelo = gltf.scene;
    escena.add(modelo);
    modelo.position.set(0, -0.5, 0);
    modelo.scale.set(0.5, 0.5, 0.5);

    // Añadir animación de rotación
    function animar() {
        requestAnimationFrame(animar);
        modelo.rotation.y += 0.01; // Gira el modelo lentamente
        renderizador.render(escena, camara);
    }
    animar();
}, undefined, (error) => {
    console.error('Error al cargar el modelo:', error);
});

camara.position.z = 2;

// Ajuste de la ventana al cambiar tamaño
window.addEventListener('resize', () => {
    renderizador.setSize(window.innerWidth, window.innerHeight);
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
});