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

document.addEventListener('mouseleave', () => {
    if (lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
    }
});

window.addEventListener('blur', () => {
    lightbox.style.display = 'none';
});

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


const imagens = document.querySelectorAll('.galeria img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const fechar = document.querySelector('.fechar');

imagens.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });
});

fechar.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
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

