placar = 0
palavras = ['oi', 'opa']
palavraEscolhida = palavras[getRandomIntInclusive(0, palavras.length - 1)].split("")
palavraEmbaralhada = embaralhar(palavraEscolhida)
    

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
    var btn_iniciar = document.getElementById("button-iniciar")
    var div_jogo = document.getElementById("div-jogo")

    console.log(palavraEscolhida.join(''))
    console.log(palavraEmbaralhada.join(''))


    btn_iniciar.style.display = "none"
    div_jogo.style.display = "block"
    criarEspacos(palavraEscolhida)
}

function verificarResultado() {
    let navbar = document.getElementById("sortable").querySelectorAll("li");
    resultado = true

    result = ""
    navbar.forEach(li => {
        result += li.innerText
    });

    if (result == palavraEscolhida.join('')) {
        console.log("IGUAL")
    } else {
        console.log("DIF")
    }

    console.log(palavraEscolhida.join(''))
    console.log(result)

    /*
    alert(palavraEmbaralhada.length)
    for (let i = 0; i < palavraEmbaralhada.length; i++) {
        console.log(navbar[i].textContent)
        console.log(Array.from(palavraEscolhida)[i])

        if (navbar[i].innerText != Array.from(palavraEscolhida)[i]) {
            console.log("ENTROU AQUI");
            resultado = false;  // nao é igual
            break;
        }
    }

    if (resultado) {
        console.log("ACERTOU")
    } else {
        console.log("ERROU")
    }
    */

}

function criarEspacos(palavraEmbaralhada) {
    let ul = document.getElementById('sortable');

    for (let i = 0; i < palavraEmbaralhada.length; i++) {
        var liNovo = document.createElement("li")
        ul.append(Object.assign(liNovo, {textContent: palavraEmbaralhada[i]}));
    }   

}