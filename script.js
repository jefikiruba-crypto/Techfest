// Loading Screen

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 2000);
});


// =============================
// THREE.JS 3D STAR BACKGROUND
// =============================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("bg").appendChild(renderer.domElement);


// Create Stars

const geometry = new THREE.BufferGeometry();

const vertices = [];

for (let i = 0; i < 4000; i++) {

    vertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
    );

}

geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
);

const material = new THREE.PointsMaterial({

    color: 0x00e5ff,
    size: 2

});

const stars = new THREE.Points(geometry, material);

scene.add(stars);

camera.position.z = 400;


// Animation Loop

function animate() {

    requestAnimationFrame(animate);

    stars.rotation.x += 0.0004;
    stars.rotation.y += 0.0008;

    renderer.render(scene, camera);

}

animate();


// Resize

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});


// Mouse Movement

document.addEventListener("mousemove", (e) => {

    stars.rotation.y = e.clientX * 0.0003;

    stars.rotation.x = e.clientY * 0.0003;

});


// =============================
// GSAP ANIMATIONS
// =============================

gsap.from(".hero-content h1", {

    y: -80,
    opacity: 0,
    duration: 1.5

});

gsap.from(".hero-content p", {

    y: 60,
    opacity: 0,
    duration: 1.5,
    delay: 0.5

});

gsap.from("button", {

    scale: 0,
    opacity: 0,
    duration: 1,
    delay: 1

});


// Scroll Animation

gsap.utils.toArray("section").forEach(section => {

    gsap.from(section, {

        opacity: 0,
        y: 100,
        duration: 1,

        scrollTrigger: {

            trigger: section,

            start: "top 80%"

        }

    });

});


// Hover Animation

document.querySelectorAll(".event-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        gsap.to(card, {

            scale: 1.08,
            duration: 0.3

        });

    });

    card.addEventListener("mouseleave", () => {

        gsap.to(card, {

            scale: 1,
            duration: 0.3

        });

    });

});


// Floating Animation

gsap.to(".glass", {

    y: -15,

    repeat: -1,

    yoyo: true,

    stagger: 0.2,

    duration: 2

});


// Button Effect

document.querySelector("button").addEventListener("click", () => {

    gsap.to(window, {

        duration: 1,

        scrollTo: "#about"

    });

});