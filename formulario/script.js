/*
 * Script responsavel por validar os campos e caso seja invalido dar um retorno visual ao usuario.
 * 
 * Funções error e limpar: resposta visual ao cliente
 * 
 * Funções que começam com validar: verifica as entradas
 * 
*/

const inputSubmit = document.querySelector("input[type=submit]");
const form = document.querySelector("form");

const inputCpf = document.getElementById("cpf");
const inputCep = document.getElementById("cep");
const inputNascimento = document.getElementById("nascimento");
const inputNome = document.getElementById("nome");

const validarEntrada = (event, regex = /[0-9]/) => {
    if (!regex.test(event.key))
        event.preventDefault();
}

const aplicarMascara = (event, regex, mascara) => {
    event.target.value = event.target.value.replace(regex, mascara);
}

const limitarEntrada = (event, limite) => {
    let value = event.target.value.replace(/\D/g, "");

    value = value.toString();
    if (value.length >= limite)
        event.preventDefault();
}

// FIX: o usuario ainda pode colocar apenas o acento ex: ~daniel
inputNome.addEventListener("keypress", event => {
    validarEntrada(event, /[a-z+à-ú+\s]/i)
});

inputCpf.addEventListener("keypress", event => {
    validarEntrada(event);
    limitarEntrada(event, 11);
});

inputCpf.addEventListener("keyup", event => {
    aplicarMascara(event, /^(\d{3})(\d{3})(\d{3})(\d)/g, "$1.$2.$3-$4");
});


inputCep.addEventListener("keypress", event => {
    validarEntrada(event);
    limitarEntrada(event, 8);
});

inputCep.addEventListener("keyup", event => {
    aplicarMascara(event, /^(\d{2})(\d{3})(\d)/g, "$1.$2-$3");
});

inputNascimento.addEventListener("keypress", event => {
    validarEntrada(event);
    limitarEntrada(event, 8);
});

inputNascimento.addEventListener("keyup", event => {
    aplicarMascara(event, /^(\d{2})(\d{2})(\d{4})/g, "$1-$2-$3");
});

// FIX: quando todas as entradas são validas o navegador trava
inputSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    validarCampos();
    validarNome();
    validarCpf();
});

function error(mensagem, elemento) {
    if (!elemento.classList.contains("error")) {
        elemento.classList.add("error");

        let aviso = document.createElement("p");
        aviso.classList.add("error");
        aviso.classList.add(elemento.id);

        aviso.appendChild(document.createTextNode(mensagem));
        form.insertBefore(aviso, elemento);
        elemento.value = "";
    }
}

function limpar(elemento) {
    elemento.classList.remove("error");
    let aviso = document.querySelector("p." + elemento.id);
    form.removeChild(aviso);
}

function validarCampos() {
    let inputs = document.querySelectorAll("form input");

    inputs.forEach((input) => {
        if (!input.value)
            error("campo vazio", input);

        if (input.value && input.classList.contains("error"))
            limpar(input);
    });
}

function validarNome() {
    let nome = inputNome.value.split(" ");

    if (inputNome.value.length < 10 || nome.length <= 1) {
        let mensagem = (nome.length <= 1) ? "inserir nome completo" : "nome muito curto"
        error(mensagem, inputNome);
        return;
    }

    limpar(inputNome)
}

function validarCpf() {
    // função interna para diminuir o codigo
    let pegarResto = (limite) => {
        let soma = 0;
        for (let i = 0; i < limite; i++) {
            soma += cpf[i] * ((limite + 1) - i);
        }

        resto = soma * 10 % 11;

        // NOTE: Se o resto da divisão for igual a 10, nós o consideramos como 0.
        if (resto == 10)
            resto = 0;
        return resto;
    }

    let cpf = inputCpf.value.replace(/\D/g, "");

    if (cpf.length != 11) {
        error("erro de digitação", inputCpf);
        return;
    }

    if (cpf[9] != pegarResto(9) || cpf[10] != pegarResto(10)) {
        error("cpf invalido", inputCpf);
        return;
    }

    limpar(inputCpf)
}

