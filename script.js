// Senhas para o líder e para os alunos
const leaderPassword = "105856493"; // Senha do líder de sala
const studentPassword = "aluno123"; // Senha dos alunos

// Variável para verificar o tipo de usuário
let isLeader = false;

// Função de Login
function login() {
    const password = document.getElementById("password").value;

    if (password === leaderPassword) {
        isLeader = true;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("input-section").style.display = "flex";
        alert("Bem-vindo, líder de sala!");
    } else if (password === studentPassword) {
        isLeader = false;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("input-section").style.display = "none";
        alert("Bem-vindo, aluno! Você pode visualizar as atividades.");
    } else {
        alert("Senha incorreta. Tente novamente.");
    }
}

// Função para adicionar atividade (apenas para o líder)
function addActivity() {
    if (!isLeader) {
        alert("Apenas o líder pode adicionar atividades.");
        return;
    }

    const activityInput = document.getElementById("activity");
    const dueDateInput = document.getElementById("dueDate");

    const activityText = activityInput.value;
    const dueDate = dueDateInput.value;

    if (activityText === "" || dueDate === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const activityItem = document.createElement("li");
    activityItem.innerHTML = `
        <span>${activityText} - Data de entrega: ${dueDate}</span>
        ${isLeader ? '<span class="delete-btn" onclick="deleteActivity(this)">&#10006;</span>' : ''}
    `;

    document.getElementById("activityList").appendChild(activityItem);

    activityInput.value = "";
    dueDateInput.value = "";
}

// Função para excluir atividade (apenas para o líder)
function deleteActivity(element) {
    if (!isLeader) {
        alert("Apenas o líder pode remover atividades.");
        return;
    }
    element.parentElement.remove();
}
