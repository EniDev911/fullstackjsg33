// SELECTORS
const taskInput = document.getElementById("input"),
  taskAddBtn = document.getElementById("push"),
  selectSearchTask = document.getElementById("select"),
  tasksList = document.getElementById("tasks-list"),
  tasksTotal = document.getElementById("total"),
  tasksDone = document.getElementById("done"),
  tasks = [
    {
      id: 1000,
      name: "tarea demo 1",
      done: false,
    },
    {
      id: 1001,
      name: "tarea demo 2",
      done: false,
    },
    {
      id: 1002,
      name: "tarea demo 3",
      done: true,
    },
  ];

// Validar entrada
function validateInput(text) {
  if (text === "") {
    alert("No se puede añadir una tarea vacía");
  } else if (text.length < 5) {
    alert("La tarea debe tener una longitud minima de 5 caracteres");
  }
  return text != "" && text.length > 5;
}

// Renderizar página
function renderPage() {
  let template = "";
  let total = 0;
  let done = 0;
  tasks.forEach((task) => {
    let style = "";
    if (task.done) {
      done++;
      style = "line-through";
    }
    template += `
      <div class="task ${style}">
        <div class="task-text">
          <p id="task-id">${task.id}</p> 
          <p>${task.name}</p>
        </div> 
        <div class="btns-actions"> 
          <button class="btn update" onclick="{updateTask(${task.id})}"><i class="fa-solid fa-check"></i></button>
          <button class="btn delete" onclick="{deleteTask(${task.id})}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `;
    total++;
  });
  tasksList.innerHTML = template;
  tasksTotal.innerHTML = total;
  tasksDone.innerHTML = done;
  taskInput.value = "";
}

// Añadir nueva tarea
function addNewTask(task) {
  if (!validateInput(task)) {
    return;
  }
  let newTask = {
    id: tasks.length + 1000,
    name: task,
    done: false,
  };
  tasks.push(newTask);
  renderPage();
}

// Eliminar una tarea
function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id == id);
  if (confirm(`¿Estas seguro de elimar la tarea ${tasks[index].name}?`)) {
    tasks.splice(index, 1);
    renderPage();
  }
}
// Acutalizar tarea
function updateTask(id) {
  const index = tasks.findIndex((task) => task.id == id);
  if (tasks[index].done) {
    tasks[index].done = false;
  } else {
    tasks[index].done = true;
  }
  renderPage();
}

// Guardar en LocalStorage
function saveLocalStorage() {
  let name = "EniDev911";
  let enidev911 = {
    name: "marco antonio",
    age: 31,
    interests: ["música", "deportes", "lectura"],
  };
  localStorage.setItem("name", name);
  localStorage.setItem("enidev911", JSON.stringify(enidev911));
}

saveLocalStorage();
getLocalStorage();

function getLocalStorage() {
  console.log(localStorage.getItem("nombre"));
  console.log(JSON.parse(localStorage.getItem("persona")));
}

taskAddBtn.addEventListener("click", () => {
  addNewTask(taskInput.value);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addNewTask(taskInput.value);
  }
});

renderPage();
