const formulario = document.getElementById("form-contato");

const campoNome = document.getElementById("nome");
const campoTelefone = document.getElementById("telefone");
const campoEmail = document.getElementById("email");
const campoBusca = document.getElementById("campo-busca");
const indiceEdicao = document.getElementById("indice-edicao");

const listaContatos = document.getElementById("lista-contatos");
const totalContatos = document.getElementById("total-contatos");
const mensagemVazia = document.getElementById("mensagem-vazia");

const botaoSalvar = document.getElementById("botao-salvar");
const botaoCancelar = document.getElementById("botao-cancelar");

let contatos = carregarContatos();

function carregarContatos() {
    const dados = localStorage.getItem("contatos");

    if (dados === null) {
        return [];
    }

    return JSON.parse(dados);
}

function salvarContatos() {
    localStorage.setItem(
        "contatos",
        JSON.stringify(contatos)
    );
}

function ordenarContatos() {
    contatos.sort((a, b) =>
        a.nome.localeCompare(b.nome)
    );
}

function mostrarContatos(filtro = "") {
    listaContatos.innerHTML = "";

    const contatosFiltrados = contatos.filter(contato =>
        contato.nome
            .toLowerCase()
            .includes(filtro.toLowerCase())
    );

    contatosFiltrados.forEach(contato => {
        const indiceReal = contatos.indexOf(contato);

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.telefone}</td>
            <td>${contato.email}</td>
            <td>
                <div class="acoes">
                    <button
                        class="botao-editar"
                        onclick="editarContato(${indiceReal})"
                    >
                        Editar
                    </button>

                    <button
                        class="botao-remover"
                        onclick="removerContato(${indiceReal})"
                    >
                        Remover
                    </button>
                </div>
            </td>
        `;

        listaContatos.appendChild(linha);
    });

    totalContatos.textContent =
        `${contatos.length} contato(s)`;

    if (contatosFiltrados.length === 0) {
        mensagemVazia.classList.remove("oculto");
    } else {
        mensagemVazia.classList.add("oculto");
    }
}

function limparFormulario() {
    formulario.reset();
    indiceEdicao.value = "";

    botaoSalvar.textContent = "Cadastrar contato";
    botaoCancelar.classList.add("oculto");

    campoNome.focus();
}

function contatoJaExiste(nome, indiceIgnorado = -1) {
    return contatos.some((contato, indice) =>
        contato.nome.toLowerCase() === nome.toLowerCase()
        && indice !== indiceIgnorado
    );
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const telefone = campoTelefone.value.trim();
    const email = campoEmail.value.trim();

    if (!nome || !telefone || !email) {
        alert("Preencha todos os campos.");
        return;
    }

    const indice = indiceEdicao.value;

    if (indice === "") {
        if (contatoJaExiste(nome)) {
            alert("Já existe um contato com esse nome.");
            return;
        }

        contatos.push({
            nome,
            telefone,
            email
        });

        alert("Contato cadastrado com sucesso.");
    } else {
        const indiceNumero = Number(indice);

        if (contatoJaExiste(nome, indiceNumero)) {
            alert("Já existe outro contato com esse nome.");
            return;
        }

        contatos[indiceNumero] = {
            nome,
            telefone,
            email
        };

        alert("Contato atualizado com sucesso.");
    }

    ordenarContatos();
    salvarContatos();
    mostrarContatos(campoBusca.value);
    limparFormulario();
});

function editarContato(indice) {
    const contato = contatos[indice];

    campoNome.value = contato.nome;
    campoTelefone.value = contato.telefone;
    campoEmail.value = contato.email;
    indiceEdicao.value = indice;

    botaoSalvar.textContent = "Salvar alterações";
    botaoCancelar.classList.remove("oculto");

    campoNome.focus();
}

function removerContato(indice) {
    const contato = contatos[indice];

    const confirmar = confirm(
        `Deseja remover o contato "${contato.nome}"?`
    );

    if (!confirmar) {
        return;
    }

    contatos.splice(indice, 1);

    salvarContatos();
    mostrarContatos(campoBusca.value);
    limparFormulario();
}

campoBusca.addEventListener("input", function() {
    mostrarContatos(campoBusca.value);
});

botaoCancelar.addEventListener("click", function() {
    limparFormulario();
});

ordenarContatos();
mostrarContatos();