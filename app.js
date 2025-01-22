/*let titulo = document.querySelector('h1');//para selecionar e modificar o h1
titulo.innerHTML = 'Jogo do número secreto';//para se referir ao html e modificar a variavel

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';*/
let listaDeNumerosSorteados = [];
let numeroLimite = 10;//para alterar quanto numeros para acertar 
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
//funcao que recebe como parametro a tag e o texto da tag
    if ('speechSynthesis' in window) {//para acrescentar a voz
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
    //referente a uma importacao ja feita no html.
    }
function exibirMensagemInicial(){
exibirNaTela('h1', 'Jogo do Numero secreto');//chamando a funcao e colocando os parametros
exibirNaTela('p', 'Escolha um número entre 1 e 10');
}


exibirMensagemInicial();

function verificarChute(){//referente ao botao chutar do html
    let chute = document.querySelector('input').value;//para receber o valor do input
    if(chute == numeroSecreto){
        exibirNaTela('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu com ${tentativas} ${palavraTentativa}!`;
        exibirNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');//modifica um elemento do html, pega o id 'reiniciar' e desabilita, aqui remove o atributo que esta desativando o botao
    }else{
        if(chute > numeroSecreto){
            exibirNaTela('p', 'O número é menor' );
        }else{
            exibirNaTela('p','O número é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);//gera numeros aleatorios
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;//a variavem recebe o tamanho da lista
    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];//se o tamanho da lista for 10, lista recebe uma lista vazia
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
        //verifica se o numero gerado ja esta na lista e retorna de novo essa mesma funcao com outro numero aleatorio
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);//inclui o numero na lista
        return numeroEscolhido;
    }
}

function limparCampo(){//para limpar o campo
    chute = document.querySelector('input');
    chute.value = "";//o campo chute vai ficar vazio
}

 function reiniciarJogo(){//essa funcao é chamada quando o botao 'reiniciar jogo' é clicado
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    //faz a desabilitacao do botao 'reiniciar' ficar verdadeiro, ou seja, desabilitado
 }