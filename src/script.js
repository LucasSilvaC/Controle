// Services
import { checkUser, createUser } from '../services/user-service.js';

// DOM
const controleForm = document.querySelector("#controleForm");

// Inputs
const turmaInput = document.querySelector("#turma");
const nomeInput = document.querySelector("#nome");
const postoInput = document.querySelector("#posto");
const controleHoraInput = document.querySelector("#controle_hora");
const item1Input = document.querySelector("#item1");
const item2Input = document.querySelector("#item2");
const item3Input = document.querySelector("#item3");
const descricaoInput = document.querySelector("#descricao");

// Form submission event
controleForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    // Coleta os dados do formulário
    const inputsData = {
        turma: turmaInput.value.trim(),
        nome: nomeInput.value.trim(),
        posto: postoInput.value.trim(),
        controle_hora: controleHoraInput.value.trim(),
        item1: item1Input.value.trim(),
        item2: item2Input.value.trim(),
        item3: item3Input.value.trim(),
        descricao: descricaoInput.value.trim(),
    };

    // Validação simples: verificar se o campo obrigatório "item1" foi preenchido
    if (!inputsData.item1) {
        alert("É obrigatório preencher pelo menos o campo 'Item 1'.");
        return;
    }

    // Checar se o registro já existe na tabela
    checkUser({
        turma: inputsData.turma,
        nome: inputsData.nome,
        posto: inputsData.posto,
    })
        .then((exists) => {
            if (exists) {
                alert("Um registro com essa combinação de Turma, Nome e Posto já existe!");
                return;
            }

            // Caso não exista, criar um novo registro
            return createUser(inputsData)
                .then((res) => {
                    alert("Registro criado com sucesso!");
                    controleForm.reset(); // Limpa o formulário após o envio
                })
                .catch((err) => {
                    alert(`Erro ao criar o registro: ${err.message}`);
                });
        })
        .catch((err) => {
            alert(`Erro ao verificar registro: ${err.message}`);
        });
});