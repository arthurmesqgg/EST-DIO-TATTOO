let trilho = document.getElementById('trilho');
let body = document.body;

if (trilho) {
    trilho.addEventListener('click', () => {
        trilho.classList.toggle('dark');
        body.classList.toggle('dark');

        // troca imagens
        atualizarImagens();

        // salva tema
        localStorage.setItem('tema', body.classList.contains('dark') ? 'dark' : 'light');
    });
}


function atualizarImagens() {
    const dark = document.body.classList.contains('dark');
    document.getElementById('insta-icon').src = dark ? 'insta-white.png' : 'insta.png';
    document.getElementById('face-icon').src = dark ? 'face-white.png' : 'face.png';
}

const instas = document.querySelectorAll('.insta-icon');
const faces = document.querySelectorAll('.face-icon');

function atualizarImagens() {
    const dark = document.body.classList.contains('dark');

    instas.forEach(img => {
        img.src = dark ? 'insta-white.png' : 'insta.png';
    });

    faces.forEach(img => {
        img.src = dark ? 'face-white.png' : 'face.png';
    });
}


const galerias = document.querySelectorAll('.galeria');
const imagens = document.querySelectorAll('.galeria img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const fechar = document.querySelector('.fechar');
const nextBtn = document.querySelector('.next-img');
const prevBtn = document.querySelector('.prev-img');


let indexAtual = 0;
let listaImagens = [];
let startX = 0;
let endX = 0;
let scale = 1;
let initialDistance = 0;
let isDragging = false;
let currentX = 0;
let moveX = 0;
let scrollCooldown = false;

lightbox.addEventListener('wheel', (e) => {
    if (lightbox.style.display !== 'flex') return;

    const rect = lightboxImg.getBoundingClientRect();

    const mouseDentroDaImagem =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

    // se estiver na imagem, deixa o zoom funcionar
    if (mouseDentroDaImagem) return;

    e.preventDefault();

    if (scrollCooldown) return;
    scrollCooldown = true;

    if (e.deltaY > 0) {
        proximaImagem(); // scroll pra baixo vai pra próxima
    } else {
        imagemAnterior(); // scroll pra cima vai pra anterior
    }

    setTimeout(() => {
        scrollCooldown = false;
    }, 400);
});


lightbox.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    lightboxImg.style.transition = 'none';
});

lightbox.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    currentX = e.touches[0].clientX;
    moveX = currentX - startX;

    // move a imagem junto com o dedo
    lightboxImg.style.transform = `translateX(${moveX}px) scale(${scale})`;
});

lightbox.addEventListener('touchend', () => {
    isDragging = false;

    lightboxImg.style.transition = 'transform 0.3s ease';

    // sensibilidade
    if (moveX > 80) {
        imagemAnterior();
    } else if (moveX < -80) {
        proximaImagem();
    } else {
        // volta pro centro
        lightboxImg.style.transform = `translateX(0) scale(${scale})`;
    }

    moveX = 0;
});



function getDistance(touches) {
    let dx = touches[0].clientX - touches[1].clientX;
    let dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

lightboxImg.addEventListener('wheel', (e) => {
    e.preventDefault();

    const rect = lightboxImg.getBoundingClientRect();

    // posição do mouse dentro da imagem (0 → 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // transforma em %
    const originX = x * 100;
    const originY = y * 100;

    // aplica o ponto do zoom
    lightboxImg.style.transformOrigin = `${originX}% ${originY}%`;

    // zoom
    if (e.deltaY < 0) {
        scale += 0.2;
    } else {
        scale -= 0.2;
    }

    scale = Math.min(Math.max(1, scale), 3);

    lightboxImg.style.transform = `scale(${scale})`;
});

lightboxImg.addEventListener('click', () => {
    scale = 1;
    lightboxImg.style.transform = `scale(1)`;
});

lightbox.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

lightbox.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
});



galerias.forEach(galeria => {
    const imgs = galeria.querySelectorAll('img');

    imgs.forEach((img, index) => {
        img.addEventListener('click', () => {

            listaImagens = Array.from(imgs).map(i => i.src);

            indexAtual = index;

            abrirImagem();
        });
    });
});

function abrirImagem(direcao = 'direita') {
    
    lightboxImg.style.transition = 'none';

    // começa fora da tela
    lightboxImg.style.transform =
        direcao === 'direita'
        ? 'translateX(20%) scale(1)'
        : 'translateX(-20%) scale(1)';

    lightbox.style.display = 'flex';
    lightboxImg.src = listaImagens[indexAtual];

    scale = 1;

    setTimeout(() => {
        lightboxImg.style.transition = 'transform 0.3s ease';
        lightboxImg.style.transform = 'translateX(0) scale(1)';
    }, 10);
}

function fecharImagem() {
    lightbox.style.display = 'none';
}

function proximaImagem() {
    indexAtual = (indexAtual + 1) % listaImagens.length;
    abrirImagem('direita');
}

function imagemAnterior() {
    indexAtual = (indexAtual - 1 + listaImagens.length) % listaImagens.length;
    abrirImagem('esquerda');
}

fechar.addEventListener('click', fecharImagem);
nextBtn.addEventListener('click', proximaImagem);
prevBtn.addEventListener('click', imagemAnterior);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        fecharImagem();
    }
});

/* TECLADO */
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') fecharImagem();
        if (e.key === 'ArrowRight') proximaImagem();
        if (e.key === 'ArrowLeft') imagemAnterior();
    }
});




// aplica tema salvo
let temaSalvo = localStorage.getItem('tema');

if (temaSalvo === 'dark') {
    document.body.classList.add('dark');

    let trilho = document.getElementById('trilho');
    if (trilho) {
        trilho.classList.add('dark');
    }
}

// atualiza imagens ao carregar
document.addEventListener('DOMContentLoaded', () => {
atualizarImagens();
});

