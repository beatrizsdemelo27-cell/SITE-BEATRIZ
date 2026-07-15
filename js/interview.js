/*
======================================================
PRÉ-ACOLHIMENTO
BEATRIZ DE MELO
======================================================
*/


/*
======================================================
PERGUNTAS
======================================================
*/

const perguntas = [

    {
        id: "nome",
        titulo: "Como seu filho(a) se chama?",
        tipo: "text",
        placeholder: "Ex.: Miguel"
    },

    {
        id: "idade",
        titulo: "Qual é a idade da criança?",
        tipo: "number",
        placeholder: "Ex.: 7"
    },

    {
        id: "cidade",
        titulo: "Em qual cidade vocês moram?",
        tipo: "text",
        placeholder: "Ex.: Penha"
    },

    {
        id: "escola",
        titulo: "Qual escola a criança frequenta?",
        tipo: "text",
        placeholder: "Nome da escola"
    },

    {
        id: "serie",
        titulo: "Em qual ano ou série ela está?",
        tipo: "text",
        placeholder: "Ex.: 2º ano"
    },

    {
        id: "laudo",
        titulo: "Existe algum diagnóstico ou laudo?",
        tipo: "select",

        opcoes: [

            "Não possui",

            "Em investigação",

            "TEA",

            "TDAH",

            "Dislexia",

            "TOD",

            "DI",

            "Outro"

        ]

    },

    {
        id: "queixa",
        titulo: "Qual é a principal dificuldade percebida?",
        tipo: "select",

        opcoes: [

            "Leitura",

            "Escrita",

            "Matemática",

            "Atenção",

            "Comportamento",

            "Linguagem",

            "Desenvolvimento",

            "Outro"

        ]

    },

    {
        id: "observacoes",
        titulo: "Conte um pouquinho sobre o que motivou vocês a procurar atendimento.",
        tipo: "textarea",
        placeholder: "Escreva aqui..."
    }

];
/*
======================================================
ESTADO DA ENTREVISTA
======================================================
*/

const respostas = {};

let perguntaAtual = 0;


/*
======================================================
ELEMENTOS DA PÁGINA
======================================================
*/

const container = document.getElementById("question-container");

const barra = document.querySelector(".progress-fill");


/*
======================================================
RENDERIZAR PERGUNTA
======================================================
*/

function renderizarPergunta() {

    const pergunta = perguntas[perguntaAtual];

    let campoHTML = "";

    switch (pergunta.tipo) {

        case "text":

        case "number":

            campoHTML = `
                <input
                    id="resposta"
                    type="${pergunta.tipo}"
                    placeholder="${pergunta.placeholder}"
                    value="${respostas[pergunta.id] || ""}"
                >
            `;
            break;

       case "textarea":

    campoHTML = `
        <textarea
            id="resposta"
            placeholder="${pergunta.placeholder}"
        >${respostas[pergunta.id] ?? ""}</textarea>
    `;

    break;
        case "select":

            campoHTML = `
                <div class="options">

                    ${pergunta.opcoes.map(opcao => `
<label class="option-card">

    <input
        type="radio"
        name="resposta"
        value="${opcao}"
        ${respostas[pergunta.id] === opcao ? "checked" : ""}
    >

    <span>${opcao}</span>

    <div class="check-icon">

        ✓

    </div>

</label>

                    `).join("")}

                </div>
            `;
            break;

    }

  container.innerHTML = `

<div class="question">

    <span class="question-tag">

        Etapa ${perguntaAtual + 1} de ${perguntas.length}

    </span>

    <h2>

        ${pergunta.titulo}

    </h2>

    ${campoHTML}

    <div class="question-buttons"> 

            ${perguntaAtual > 0
                ? `<button id="btn-voltar" class="btn-outline">

                        Voltar

                   </button>`
                : ""
            }

            <button id="btn-continuar" class="btn-primary">

                ${perguntaAtual === perguntas.length - 1
                    ? "Finalizar"
                    : "Continuar"}

            </button>

        </div>
</div>
    `;

    adicionarEventos();

}
/*
======================================================
ADICIONAR EVENTOS
======================================================
*/

function adicionarEventos() {

    const btnContinuar = document.getElementById("btn-continuar");

    const btnVoltar = document.getElementById("btn-voltar");

    if (btnContinuar) {

        btnContinuar.addEventListener("click", proximaPergunta);

    }

    if (btnVoltar) {

        btnVoltar.addEventListener("click", voltarPergunta);

    }

}


/*
======================================================
PRÓXIMA PERGUNTA
======================================================
*/

function proximaPergunta() {

    const pergunta = perguntas[perguntaAtual];

    let valor = "";

    if (pergunta.tipo === "select") {

        const selecionado = document.querySelector('input[name="resposta"]:checked');

        if (!selecionado) {

            alert("Selecione uma opção.");

            return;

        }

        valor = selecionado.value;

    } else {

        const input = document.getElementById("resposta");

        if (!input || !input.value.trim()) {

            if (input) input.focus();

            return;

        }

        valor = input.value.trim();

    }

    respostas[pergunta.id] = valor;

    if (perguntaAtual < perguntas.length - 1) {

        perguntaAtual++;

        renderizarPergunta();

        atualizarProgresso();

    } else {

        mostrarResumo();

    }

}


/*
======================================================
VOLTAR
======================================================
*/

function voltarPergunta() {

    if (perguntaAtual === 0) return;

    perguntaAtual--;

    renderizarPergunta();

    atualizarProgresso();

}
/*
======================================================
ATUALIZAR PROGRESSO
======================================================
*/

function atualizarProgresso() {

    if (!barra) return;

    const porcentagem =
        ((perguntaAtual + 1) / perguntas.length) * 100;

    barra.style.width = `${porcentagem}%`;

}


/*
======================================================
MOSTRAR RESUMO
======================================================
*/

function mostrarResumo() {

    let resumoHTML = "";

    perguntas.forEach(pergunta => {

        resumoHTML += `

            <div class="resume-item">

                <strong>${pergunta.titulo}</strong>

                <p>${respostas[pergunta.id] || "-"}</p>

            </div>

        `;

    });

    container.innerHTML = `

        <span class="question-tag">

            Pré-acolhimento concluído

        </span>

        <h2>

            Confira as informações

        </h2>

        <div class="resume">

            ${resumoHTML}

        </div>

        <div class="question-buttons">

            <button
                id="btn-editar"
                class="btn-outline">

                Editar

            </button>

            <button
                id="btn-enviar"
                class="btn-primary">

                Enviar para WhatsApp

            </button>

        </div>

    `;

    document
        .getElementById("btn-editar")
        .addEventListener("click", editarRespostas);

    document
        .getElementById("btn-enviar")
        .addEventListener("click", enviarWhatsApp);

}
/*
======================================================
EDITAR RESPOSTAS
======================================================
*/

function editarRespostas() {

    perguntaAtual = 0;

    renderizarPergunta();

    atualizarProgresso();

}


/*
======================================================
ENVIAR WHATSAPP
======================================================
*/

function enviarWhatsApp() {

    let mensagem = "🌿 *Pré-acolhimento Neuropsicopedagógico*\n\n";

    perguntas.forEach(pergunta => {

        mensagem += `${pergunta.titulo}\n`;

        mensagem += `${respostas[pergunta.id] || "-"}\n\n`;

    });

    const url =
        `https://wa.me/5547999151699?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");

}


/*
======================================================
INICIALIZAÇÃO
======================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    renderizarPergunta();

    atualizarProgresso();

});