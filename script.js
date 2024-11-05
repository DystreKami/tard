// Configuración básica de la escena de Three.js
const escena = new THREE.Scene();
escena.background = new THREE.Color(0x222222); // Fondo gris oscuro

// Configuración de la cámara
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camara.position.z = 2;

// Configuración del renderizador
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.getElementById('contenedor3D').appendChild(renderizador.domElement); // Añadir al contenedor 3D

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
}, undefined, (error) => {
    console.error('Error al cargar el modelo:', error);
});

// Función de animación
function animar() {
    requestAnimationFrame(animar);

    // Rotar el modelo si está cargado
    if (escena.children[2]) {
        escena.children[2].rotation.y += 0.01; // Gira el modelo lentamente
    }

    renderizador.render(escena, camara);
}
animar();

// Ajuste de la ventana al cambiar tamaño
window.addEventListener('resize', () => {
    renderizador.setSize(window.innerWidth, window.innerHeight);
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
});
