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

lightbox.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        initialDistance = getDistance(e.touches);
    }
});

lightbox.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        let currentDistance = getDistance(e.touches);

        if (initialDistance > 0) {
            let zoom = currentDistance / initialDistance;
            scale = Math.min(Math.max(1, zoom), 3);

            lightboxImg.style.transform = `scale(${scale})`;
        }
    }
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

lightbox.addEventListener('touchend', () => {
    let diferenca = startX - endX;

    //  sensibilidade do swipe
    if (diferenca > 50) {
        proximaImagem(); // swipe pra esquerda
    } else if (diferenca < -50) {
        imagemAnterior(); // swipe pra direita
    }
});

galerias.forEach(galeria => {
    const imgs = galeria.querySelectorAll('img');

    imgs.forEach((img, index) => {
        img.addEventListener('click', () => {

            // pega só as imagens dessa galeria
            imagens = Array.from(imgs).map(i => i.src);

            indexAtual = index;
            abrirImagem();
        });
    });
});

imagens.forEach((img, index) => {
    listaImagens.push(img.src);

    img.addEventListener('click', () => {
        indexAtual = index;
        abrirImagem();
    });
});

function abrirImagem() {
    lightbox.style.display = 'flex';
    lightboxImg.src = listaImagens[indexAtual];
    scale = 1;
    lightboxImg.style.transform = 'scale(1)';
}

function fecharImagem() {
    lightbox.style.display = 'none';
}

function proximaImagem() {
    indexAtual = (indexAtual + 1) % listaImagens.length;
    abrirImagem();
}

function imagemAnterior() {
    indexAtual = (indexAtual - 1 + listaImagens.length) % listaImagens.length;
    abrirImagem();
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
atualizarImagens();

