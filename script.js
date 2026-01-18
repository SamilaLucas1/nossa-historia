let playerName = "";
let currentStory = 0;
let currentMemoryIndex = 0;
let typingInterval = null;
let isTyping = false;


/* HISTÓRIA */
const stories = [
    {
        text: "Algumas histórias não avisam quando começam. Elas simplesmente acontecem...",
        background: "imagens/fundo-historia1.png",
        audio: "audios/audio1.m4a",
        memories: [
            "imagens/lembranca1.png",
            "imagens/lembranca2.png"
        ]
    },
    {
        text: "No começo, eu não entendia. Ou talvez entendesse… mas fingia não perceber...",
        background: "imagens/fundo-historia2.png",
        audio: "audios/audio2.m4a",
        memories: [
            "imagens/lembranca3.png",
            "imagens/lembranca4.png"
        ] 
    },
    {
        text: "E, sem pedir permissão, você foi ficando...",
        background: "imagens/fundo-historia3.png",
        audio: "audios/audio3.m4a",
        memories: [
            "imagens/lembranca5.png",
            "imagens/lembranca6.png"
        ] 
    },
    {
        text: "Quando levamos a conversa para fora daquele mundo, algo mudou...",
        background: "imagens/fundo-historia4.png",
        audio: "audios/audio4.m4a",
        memories: [
            "imagens/lembranca7.png",
            "imagens/lembranca8.png"
        ] 
    },
    {
        text: "Estar junto virou abrigo...",
        background: "imagens/fundo-historia5.png",
        audio: "audios/audio5.m4a",
        memories: [
            "imagens/lembranca9.png",
            "imagens/lembranca10.png"
        ] 
    },
    {
        text: "Até que aconteceu...",
        background: "imagens/fundo-historia6.png",
        audio: "audios/audio6.m4a",
        memories: [
            "imagens/lembranca11.png",
            "imagens/lembranca12.png"
        ] 
    },
    {
        text: "Depois disso, amar ficou menos assustador...",
        background: "imagens/fundo-historia7.png",
        audio: "audios/audio7.m4a",
        memories: [
            "imagens/lembranca13.png",
            "imagens/lembranca14.png"
        ] 
    },
    {
        text: "E então, a vida começou de verdade...",
        background: "imagens/fundo-historia8.png",
        audio: "audios/audio8.m4a",
        memories: [
            "imagens/lembranca15.png",
            "imagens/lembranca16.png"
        ] 
    },
    {
        text: "O tempo passou… e o amor ficou...",
        background: "imagens/fundo-historia9.png",
        audio: "audios/audio9.m4a",
        memories: [
            "imagens/lembranca17.png",
            "imagens/lembranca18.png"
        ] 
    },
    {
        text: "Nem tudo foi leve...",
        background: "imagens/fundo-historia10.png",
        audio: "audios/audio10.m4a",
        memories: [
            "imagens/lembranca19.png",
            "imagens/lembranca20.png"
        ] 
    },
    {
        text: "A nossa história nunca foi perfeita...",
        background: "imagens/fundo-historia11.png",
        audio: "audios/audio11.m4a",
        memories: [
            "imagens/lembranca21.png",
            "imagens/lembranca22.png"
        ] 
    },
    {
        text: "No fim, tudo se resume a isso...",
        background: "imagens/fundo-historia12.png",
        audio: "audios/audio12.m4a",
        memories: [
            "imagens/lembranca23.png",
            "imagens/lembranca24.png"
        ] 
    }
];

/* INICIAR JOGO */

function enterGame() {
    document.getElementById("introScreen").classList.remove("active");
    document.getElementById("storyScreen").classList.add("active");

    loadStory();
}


function goToIntro() {
    const input = document.getElementById("playerName");
    const alertBox = document.getElementById("nameAlert");
    const music = document.getElementById("bgMusic");

    const nomeDigitado = input.value.trim().toLowerCase();
    const nomesPermitidos = ["samy", "joe"];

    // esconder alerta ao digitar
    input.addEventListener("input", () => {
        alertBox.style.display = "none";
        alertBox.classList.remove("show");
    });

    if (nomeDigitado === "") {
        alertBox.innerText = "Digite um nome para começar 🤍";
        alertBox.style.display = "block";
        alertBox.classList.add("show");
        return;
    }

    if (!nomesPermitidos.includes(nomeDigitado)) {
        alertBox.innerText = "Esse jogo é apenas para Samy e Joe ❤️";
        alertBox.style.display = "block";
        alertBox.classList.add("show");
        return;
    }

    // formata o nome
    playerName =
        nomeDigitado.charAt(0).toUpperCase() + nomeDigitado.slice(1);

    // 🎶 INICIA A MÚSICA AQUI
    music.volume = 0.4;
    music.play();

    // vai para a intro
    document.getElementById("startScreen").classList.remove("active");
    document.getElementById("introScreen").classList.add("active");
}



/* CARREGAR HISTÓRIA */
function loadStory() {
    const story = stories[currentStory];

    const storyScreen = document.getElementById("storyScreen");
    storyScreen.style.backgroundImage = `url(${story.background})`;

    const storyTextElement = document.getElementById("storyText");
    const textoFinal = story.text.replace("{nome}", playerName);

    // 🛑 cancela qualquer digitação anterior
    if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
        isTyping = false;
    }

    // ✍️ efeito de digitação
    typeText(storyTextElement, textoFinal, 40);

    const audio = document.getElementById("storyAudio");
    audio.pause();
    audio.currentTime = 0;
    audio.src = story.audio;

    // controlar botão "Anterior"
    const btnPrevious = document.getElementById("btnPrevious");
    btnPrevious.style.display = currentStory === 0 ? "none" : "inline-block";
}


/* TOCAR ÁUDIO */
function playAudio() {
    const storyAudio = document.getElementById("storyAudio");
    const bgMusic = document.getElementById("bgMusic");

    // abaixa suavemente a música de fundo
    if (bgMusic && !bgMusic.paused) {
        bgMusic.volume = 0.02; // volume baixo, mas ainda presente
    }

    storyAudio.play();

    // quando a narração acabar, volta o volume da música
    storyAudio.onended = () => {
        if (bgMusic) {
            bgMusic.volume = 0.4; // volume normal que você já usa
        }
    };
}

function stopStoryAudio() {
    const storyAudio = document.getElementById("storyAudio");

    if (!storyAudio.paused) {
        storyAudio.pause();
        storyAudio.currentTime = 0;
    }

    // volta o volume da música de fundo ao normal
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic) {
        bgMusic.volume = 0.4;
    }
}


/* PRÓXIMA HISTÓRIA */
function nextStory() {
    // 🔴 PARA O ÁUDIO DA HISTÓRIA
    stopStoryAudio();
    // se estiver digitando, termina o texto primeiro
    if (isTyping) {
        const story = stories[currentStory];
        document.getElementById("storyText").innerHTML =
            story.text.replace("{nome}", playerName);

        clearInterval(typingInterval);
        typingInterval = null;
        isTyping = false;
        return;
    }

    currentStory++;

    if (currentStory >= stories.length) {
        document.getElementById("storyScreen").classList.remove("active");
        startVideo();
        return;
    }

    loadStory();
}

document.getElementById("finalVideo").addEventListener("ended", () => {
    goToFinal();
});



/* HISTÓRIA ANTERIOR */
function previousStory() {
    // 🔴 PARA O ÁUDIO DA HISTÓRIA
    stopStoryAudio();
    // se estiver digitando, termina o texto primeiro
    if (isTyping) {
        const story = stories[currentStory];
        document.getElementById("storyText").innerHTML =
            story.text.replace("{nome}", playerName);

        clearInterval(typingInterval);
        typingInterval = null;
        isTyping = false;
        return;
    }

    if (currentStory === 0) return;

    currentStory--;
    loadStory();
}


/* ABRIR LEMBRANÇA */
function openMemory() {
    const memories = stories[currentStory].memories;

    if (!memories || memories.length === 0) return;

    currentMemoryIndex = 0;

    document.getElementById("storyScreen").classList.remove("active");
    document.getElementById("memoryScreen").classList.add("active");

    const hint = document.getElementById("memoryHint");
    hint.style.opacity = "0.55";

    // esconder depois de alguns segundos
    setTimeout(() => {
        hint.style.opacity = "0";
    }, 3000);

    loadMemory();
}

function loadMemory() {
    const memories = stories[currentStory].memories;
    if (!memories) return;

    document.getElementById("memoryImage").src =
        memories[currentMemoryIndex];
}

document.getElementById("memoryImage").addEventListener("click", (e) => {
    const memories = stories[currentStory].memories;
    if (!memories) return;

    const img = e.target;
    const rect = img.getBoundingClientRect();

    const clickX = e.clientX - rect.left;
    const half = rect.width / 2;

    // 👉 clicou do lado direito → próxima
    if (clickX > half) {
        if (currentMemoryIndex < memories.length - 1) {
            currentMemoryIndex++;
            loadMemory();
        }
    }
    // 👈 clicou do lado esquerdo → anterior
    else {
        if (currentMemoryIndex > 0) {
            currentMemoryIndex--;
            loadMemory();
        }
    }
});


/* VOLTAR DA LEMBRANÇA */
function backToStory() {
    document.getElementById("memoryScreen").classList.remove("active");
    document.getElementById("storyScreen").classList.add("active");
}

/* TOCAR VIDEO*/
function startVideo() {
    // parar música de fundo
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }

    // troca de telas
    document.getElementById("storyScreen").classList.remove("active");
    document.getElementById("videoScreen").classList.add("active");

    const video = document.getElementById("finalVideo");
    video.currentTime = 0;
    video.play();

    startVideoHearts(); // ❤️ corações começam
}


function goToFinal() {
    stopVideoHearts();

    const video = document.getElementById("finalVideo");
    video.pause();

    document.getElementById("videoScreen").classList.remove("active");
    document.getElementById("endScreen").classList.add("active");
}

/* SAIR CORAÇÃO*/
let heartInterval = null;

function startVideoHearts() {
    const container = document.getElementById("videoHearts");

    heartInterval = setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("video-heart");

        const hearts = ["❤️", "💗", "💖", "💞"];
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = 18 + Math.random() * 16 + "px";

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 200); // frequência
}

function stopVideoHearts() {
    clearInterval(heartInterval);
    heartInterval = null;

    const container = document.getElementById("videoHearts");
    container.innerHTML = "";
}


/* REINICIAR JOGO */
function restartGame() {
    currentStory = 0;

    document.getElementById("endScreen").classList.remove("active");
    document.getElementById("startScreen").classList.add("active");
}

/*DIGITAÇÃO EFEITO*/
function typeText(element, text, speed = 60) {
    // se já estiver digitando, cancela
    if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
    }

    element.innerHTML = "";
    let index = 0;
    isTyping = true;

    typingInterval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(typingInterval);
            typingInterval = null;
            isTyping = false;
        }
    }, speed);
}

/*EFEITO CORAÇÃO BOTÃO*/
function heartsFromButton(button) {
    const rect = button.getBoundingClientRect();

    for (let i = 0; i < 3; i++) {
        const heart = document.createElement("div");
        heart.classList.add("btn-heart");

        const hearts = ["❤️", "💗", "💖"];
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];

        // posição EXATA do clique
        heart.style.left = rect.left + rect.width / 2 + "px";
        heart.style.top = rect.top + rect.height / 2 + "px";

        // espalhamento leve
        const offsetX = Math.random() * 60 - 30;
        heart.style.setProperty("--x", offsetX + "px");

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1400);
    }
}

