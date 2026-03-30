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

