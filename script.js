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



/* ===========================
   LOCAL STORAGE
=========================== */


function carregarContatos(){

    const dados = localStorage.getItem("contatos");

    return dados ? JSON.parse(dados) : [];

}



function salvarContatos(){

    localStorage.setItem(
        "contatos",
        JSON.stringify(contatos)
    );

}




/* ===========================
   ORDENAÇÃO
=========================== */


function ordenarContatos(){

    contatos.sort((a,b)=>
        a.nome.localeCompare(b.nome)
    );

}



/* ===========================
   VALIDAÇÕES
=========================== */


function validarTelefone(telefone){

    return /^[0-9]{11}$/.test(telefone);

}



function validarEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}




function contatoJaExiste(nome, ignorar = -1){

    return contatos.some((contato,index)=>

        contato.nome.toLowerCase() === nome.toLowerCase()
        &&
        index !== ignorar

    );

}



/* ===========================
   MOSTRAR CONTATOS
=========================== */


function mostrarContatos(filtro=""){


    listaContatos.innerHTML="";


    const resultado = contatos.filter(contato=>

        contato.nome
        .toLowerCase()
        .includes(
            filtro.toLowerCase()
        )

    );



    resultado.forEach(contato=>{


        const indice = contatos.indexOf(contato);



        const linha=document.createElement("tr");



        linha.innerHTML=`

            <td>${contato.nome}</td>

            <td>${contato.telefone}</td>

            <td>${contato.email}</td>

            <td>

                <button class="botao-editar">
                    Editar
                </button>


                <button class="botao-remover">
                    Remover
                </button>

            </td>

        `;



        linha
        .querySelector(".botao-editar")
        .addEventListener(
            "click",
            ()=>editarContato(indice)
        );



        linha
        .querySelector(".botao-remover")
        .addEventListener(
            "click",
            ()=>removerContato(indice)
        );



        listaContatos.appendChild(linha);


    });



    totalContatos.textContent =
    `${contatos.length} contato(s)`;



    mensagemVazia.classList.toggle(
        "oculto",
        resultado.length !== 0
    );

}





/* ===========================
   LIMPAR FORMULÁRIO
=========================== */


function limparFormulario(){

    formulario.reset();

    indiceEdicao.value="";


    botaoSalvar.textContent =
    "Cadastrar contato";


    botaoCancelar.classList.add(
        "oculto"
    );


    campoNome.focus();

}




/* ===========================
   CADASTRAR / EDITAR
=========================== */


formulario.addEventListener(
"submit",
evento=>{


    evento.preventDefault();



    const nome =
    campoNome.value.trim();


    const telefone =
    campoTelefone.value.trim();


    const email =
    campoEmail.value.trim();



    if(!nome || !telefone || !email){

        alert(
        "Preencha todos os campos."
        );

        return;

    }



    if(!validarTelefone(telefone)){


        alert(
        "Telefone deve possuir 11 números."
        );


        return;

    }



    if(!validarEmail(email)){


        alert(
        "E-mail inválido."
        );


        return;

    }




    const indice =
    indiceEdicao.value;



    if(indice===""){



        if(contatoJaExiste(nome)){


            alert(
            "Contato já cadastrado."
            );


            return;

        }




        contatos.push({

            nome,
            telefone,
            email

        });



        alert(
        "Contato cadastrado!"
        );



    }else{



        const posicao =
        Number(indice);



        contatos[posicao]={

            nome,
            telefone,
            email

        };



        alert(
        "Contato atualizado!"
        );


    }



    ordenarContatos();

    salvarContatos();

    mostrarContatos(
        campoBusca.value
    );


    limparFormulario();



});





/* ===========================
   EDITAR
=========================== */


function editarContato(indice){


    const contato =
    contatos[indice];



    campoNome.value =
    contato.nome;


    campoTelefone.value =
    contato.telefone;


    campoEmail.value =
    contato.email;



    indiceEdicao.value =
    indice;



    botaoSalvar.textContent =
    "Salvar alterações";



    botaoCancelar.classList.remove(
        "oculto"
    );


}





/* ===========================
   REMOVER
=========================== */


function removerContato(indice){


    const contato =
    contatos[indice];



    if(!confirm(
        `Remover ${contato.nome}?`
    )){

        return;

    }



    contatos.splice(
        indice,
        1
    );



    salvarContatos();


    mostrarContatos(
        campoBusca.value
    );


    limparFormulario();


}





/* ===========================
   EVENTOS
=========================== */


campoBusca.addEventListener(
"input",
()=>{

    mostrarContatos(
        campoBusca.value
    );

});




botaoCancelar.addEventListener(
"click",
limparFormulario
);




ordenarContatos();

mostrarContatos();