/*
 * [+] O nome deve ter 16 letras, pelo menos;
 *
 * [+] O usuário deve fornecer nome e sobrenome, de forma que se ele informar apenas o primeiro nome, você deve apresentar uma marcação de erro.
 *
 * [+] valide o cpf
 *
 * [] valide os telefones de acordo com a regra do trabalho
 *
 * [+] Se algo estiver errado, imprima uma mensagem em vermelho acima do campo com erro. Ou, marque a borda do (dos) campos com erro na cor vermelha.
*/


/*
 * As funções error e limpar são utilizadas para evitar repetição de codigo nas funções de validação,
 * todas as funções de validação são chamadas a partir do click no botão submit.
 *
*/
const inputSubmit = document.querySelector("input[type=submit]");

inputSubmit.addEventListener("click", (e) => {
    // impede do navegador recarregar ao clicar no submit
    e.preventDefault()


    validarCampos();
    validarNome();
    validarCpf();
});

function error(mensagem, elemento) {
    if (!elemento.classList.contains("error")) {
        elemento.classList.add("error");
        elemento.placeholder = mensagem;
        elemento.value = "";
    }
}

function limpar(elemento) {
    elemento.classList.remove("error");
    elemento.placeholder = "";
}


function validarCampos() {
    var inputs = document.querySelectorAll("form input");

    inputs.forEach((input) => {
        if (!input.value)
            error("campo vazio", input);

        if (input.value && input.classList.contains("error"))
            limpar(input);
    });
}

function validarNome() {
    var inputNome = document.getElementById("nome");

    var nome = inputNome.value.split(" ");

    if (inputNome.value.length < 16 || nome.length <= 1) {
        mensagem = (nome.length <= 1) ? "inserir nome completo" : "nome muito curto"
        error(mensagem, inputNome);
        return;
    }

    limpar(inputNome)

}

function validarCpf() {
    // função interna para diminuir o codigo
    var pegarResto = (n) => {
        var soma = 0;
        for (let i = 0; i < cpf.length - n; i++) {
            soma += cpf[i] * ((12 - n) - i);
        }

        resto = soma * 10 % 11;

        //Observação Importante: Se o resto da divisão for igual a 10, nós o consideramos como 0.
        if (resto == 10)
            resto = 0;
        return resto;
    }

    var inputCpf = document.getElementById("cpf");
    var cpf = inputCpf.value;

    if (cpf.length != 11) {
        error("erro de digitação", inputCpf);
        return;
    }

    if (cpf[9] != pegarResto(2) || cpf[10] != pegarResto(1)) {
        error("cpf invalido", inputCpf);
        return;
    }

    limpar(inputCpf)
}
