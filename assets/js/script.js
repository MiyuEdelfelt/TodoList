// Arreglo para almacenar tareas
let tasks = [
    { id: 16, description: "Hacer mercado", completed: true },
    { id: 60, description: "Estudiar para la prueba", completed: false },
    { id: 24, description: "Sacar a pasear a Tobby", completed: false }
];

// Inicializar el contador de ID basado en el ID más alto de las tareas iniciales para que no muestre uno tan grande
let taskId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;

// Función para renderizar la lista de tareas
function renderTasks() {
    const taskList = document.getElementById("taskList");
    const total = document.getElementById("total");
    const completed = document.getElementById("completed");

    taskList.innerHTML = ""; 
    tasks.forEach(task => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.description}</td>
            <td><input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${task.id})"></td>
            <td><button onclick="deleteTask(${task.id})" class="btn btn-danger btn-sm">&times;</button></td>
        `;
        taskList.appendChild(row);
    });

    // Actualizar contadores
    total.textContent = tasks.length;
    completed.textContent = tasks.filter(task => task.completed).length;
}

// Función para mostrar/ocultar el mensaje de error
function showError(show) {
    const errorMessage = document.getElementById("errorMessage");
    if (show) {
        errorMessage.classList.remove("d-none");
    } else {
        errorMessage.classList.add("d-none");
    }
}

// Función para agregar una nueva tarea
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const input = document.getElementById("newTask");
    if (input.value.trim()) {
        const newTask = {
            id: taskId++, // Incrementa el ID con cada nueva tarea
            description: input.value,
            completed: false
        };
        tasks.push(newTask);
        input.value = ""; 
        renderTasks();
        showError(false); 
    } else {
        showError(true); 
    }
});

// Función para borrar una tarea
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Función para marcar/desmarcar una tarea como completada
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

// Renderizar tareas iniciales
document.addEventListener("DOMContentLoaded", renderTasks);
