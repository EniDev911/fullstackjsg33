const form = document.getElementById("form");
const input = document.getElementById("input");
const taskList = document.getElementById("tasklist");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();

let tasks = {
    1654303719564: {
        id: 1654303719564,
        text: "Task 1",
        state: false
    },
    1654303804562: {
        id: 1654303804562,
        text: "Task 2",
        state: false
    }
}


document.addEventListener("DOMContentLoaded", () => {
    showTasks();
})

form.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target.querySelector('input').value);
    // console.log(input.value);
    saveTask(e);
})

tasklist.addEventListener('click', (e) => {
    btnAction(e);
})



const saveTask = e => {

    if (input.value.trim() === '') {
        console.log('Task cannot be empty');
        return
    }

    const task = {
        id: Date.now(),
        text: input.value,
        state: false
    }

    tasks[task.id] = task

    form.reset();
    input.focus();
    // console.log(tasks);
    // console.log("Save Task");
    showTasks();
}

const showTasks = () => {
    taskList.innerHTML = "";
    Object.values(tasks).forEach(task => {
        console.log(task);
        const clone = template.cloneNode(true);
        clone.querySelector('p').textContent = task.text;
        clone.querySelectorAll('.fas')[0].dataset.id = task.id;
        clone.querySelectorAll('.fas')[1].dataset.id = task.id;
        fragment.appendChild(clone);
    })
    taskList.appendChild(fragment);
}

const btnAction = (e) => {
    // console.log(e.target.classList.contains('fa-check-circle'));
    if (e.target.classList.contains('fa-check-circle')) {
        console.log(e.target.dataset.id);
    }
    e.stopPropagation();
}

const style = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 3em;'
console.log("%cEniDev911", style);

// console.table({ Nombre: "Marco", Apellido: "Contreras" });
function Contact(email, phone) {
    /**
     * @param {string} email
     * @param {string} phone
     */
    this.email = email;
    this.phone = phone;
}
var developer = {};
developer.Contact = new Contact("enidev911@gmail.com", "56 939131909");
console.table(`%c${developer}`, style);