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

    // Carrega atividades do localStorage ao fazer login
    loadActivities();
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

    const activityItem = {
        text: activityText,
        dueDate: dueDate
    };

    // Salva a atividade no localStorage
    saveActivity(activityItem);

    // Adiciona a atividade na interface
    displayActivity(activityItem);

    // Limpa os campos de entrada
    activityInput.value = "";
    dueDateInput.value = "";
}

// Função para exibir uma atividade na lista
function displayActivity(activityItem) {
    const activityList = document.getElementById("activityList");

    const activityElement = document.createElement("li");
    activityElement.innerHTML = `
        <span>${activityItem.text} - Data de entrega: ${activityItem.dueDate}</span>
        ${isLeader ? '<span class="delete-btn" onclick="deleteActivity(this)">&#10006;</span>' : ''}
    `;

    activityList.appendChild(activityElement);
}

// Função para excluir atividade (apenas para o líder)
function deleteActivity(element) {
    if (!isLeader) {
        alert("Apenas o líder pode remover atividades.");
        return;
    }

    const activityElement = element.parentElement;
    const activityText = activityElement.innerText.split(" - Data de entrega: ")[0];

    // Remove a atividade do localStorage
    removeActivity(activityText);

    // Remove a atividade da interface
    activityElement.remove();
}

// Função para salvar uma atividade no localStorage
function saveActivity(activityItem) {
    const activities = JSON.parse(localStorage.getItem("activities")) || [];
    activities.push(activityItem);
    localStorage.setItem("activities", JSON.stringify(activities));
}

// Função para carregar atividades do localStorage e exibi-las na interface
function loadActivities() {
    const activities = JSON.parse(localStorage.getItem("activities")) || [];
    activities.forEach(activityItem => displayActivity(activityItem));
}

// Função para remover uma atividade do localStorage
function removeActivity(activityText) {
    let activities = JSON.parse(localStorage.getItem("activities")) || [];
    activities = activities.filter(activity => activity.text !== activityText);
    localStorage.setItem("activities", JSON.stringify(activities));
}

// Carrega as atividades ao abrir a página
window.onload = loadActivities;
