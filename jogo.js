placar = 0;
palavraEscolhida = [];
dicaEscolhida = "";
palavraEmbaralhada = [];

const palavras = [
    "casa", "porta", "janela", "carro", "bicicleta", "piscina", "água", "fogo", "terra", "ar", 
    "sol", "lua", "estrela", "gato", "cachorro", "passarinho", "flor", "árvore", "fruta", "pão", 
    "queijo", "arroz", "feijão", "macarrão", "carne", "peixe", "frango", "ovos", "leite", "café", 
    "chá", "suco", "cerveja", "vinho", "vermelho", "azul", "verde", "amarelo", "laranja", "roxo", 
    "preto", "branco", "cinza", "rosa", "bola", "boneca", "carrinho", "brinquedo", "livro", "caneta"
];

const dicas = [
    "Lugar onde se mora", "Pode ser de madeira ou metal", "Permite a entrada de luz", "Meio de transporte", "Veículo de duas rodas", 
    "Local para nadar", "Essencial para a vida", "Produz calor e luz", "Planeta onde vivemos", "Gás indispensável para respiração", 
    "Estrela central do sistema solar", "Corpo celeste que orbita a Terra", "Corpo celeste luminoso", "Animal doméstico", "Animal de estimação", 
    "Ave pequena", "Órgão reprodutor das plantas", "Planta de grande porte", "Alimento natural e saudável", "Alimento básico da dieta", 
    "Alimento rico em proteínas", "Alimento básico da culinária brasileira", "Alimento básico da culinária brasileira", "Alimento básico da culinária italiana", 
    "Alimento rico em proteínas", "Alimento rico em proteínas e ômega-3", "Ave doméstica criada para consumo", "Alimento versátil", "Bebida estimulante", 
    "Bebida quente e reconfortante", "Bebida refrescante", "Bebida alcoólica", "Cor primária", "Cor primária", "Cor secundária", 
    "Cor secundária", "Cor secundária", "Cor secundária", "Cor secundária", "Cor secundária", "Cor secundária", "Objeto redondo", 
    "Brinquedo para menina", "Brinquedo para menino", "Brinquedo para menino", "Item de entretenimento", "Material de escrita", 
    "Material de escrita", "Material de escrita"
];
    
const audioContext = new AudioContext();

document.addEventListener("DOMContentLoaded", function() {
    let btn_iniciar = document.getElementById("button-iniciar");
    btn_iniciar.style.display = "block"; 

    let div_jogo = document.getElementById("div-jogo");
    div_jogo.style.display = "none"; 

    btn_iniciar.addEventListener("click", iniciarJogo);
});


function embaralhar(palavra){
	for (let i = palavra.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [palavra[i], palavra[j]] = [palavra[j], palavra[i]];
    }
    return palavra
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function iniciarJogo() {
    let intro = document.getElementById("div-intro-jogo");
    intro.style.display = "none"; 

    let div_jogo = document.getElementById("div-jogo");
    div_jogo.removeAttribute("hidden")
    div_jogo.style.display = "block"; 

    idRandomico = getRandomIntInclusive(0, palavras.length - 1)
    palavraEscolhida = palavras[idRandomico].split("");
    palavraEmbaralhada = embaralhar([...palavraEscolhida]);
    dicaEscolhida = dicas[idRandomico]

    console.log(palavraEscolhida.join(''));
    console.log(palavraEmbaralhada.join(''));

    criarEspacos(palavraEmbaralhada);
}


function playAudio(audioBuffer) {
    const audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.loop = false;
    audioSource.volume = 1;
    audioSource.connect(audioContext.destination);
    audioSource.start();
}


function verificarResultado() {
    let navbar = document.getElementById("sortable").querySelectorAll("div");

    result = "";
    navbar.forEach(div => {
        result += div.innerText;
    });

    if (result == palavraEscolhida.join('')) {
        console.log("IGUAL");
        placar++;
        document.getElementById("valor-placar").innerText = placar;

        fetch('correto.mp3')
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            playAudio(audioBuffer);
        })
        .catch(error => {
            console.error('Error loading audio:', error);
        });

        iniciarJogo();
    } else {
        console.log("DIF");

        fetch('errado.mp3')
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            playAudio(audioBuffer);
            alert("Resposta incorreta!");
        })
        .catch(error => {
            console.error('Error loading audio:', error);
        });


    }

}

function pularPalavra() {
    iniciarJogo();
}

function mostrarDica() {
    alert(dicaEscolhida)
}

function criarEspacos(palavraEmbaralhada) {
    let ul = document.getElementById('sortable');
    ul.innerHTML = "";

    for (let i = 0; i < palavraEmbaralhada.length; i++) {
        var div = document.createElement("div");
        div.classList.add("btn");
        div.classList.add("btn-outline-secondary");

        ul.append(Object.assign(div, {textContent: palavraEmbaralhada[i]}));
    }   

}