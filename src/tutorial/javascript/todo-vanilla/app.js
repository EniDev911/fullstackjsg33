const form = document.getElementById("form");
const input = document.getElementById("input");
const taskList = document.getElementById("tasklist");
const template = document.getElementsById("template").content;
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

form.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target.querySelector('input').value);
    // console.log(input.value);
    saveTask(e);
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
    Object.values(tasks).forEach(task => {
        console.log(task);
        const clone = template.cloneNode(true);
        clone.querySelector('p').textContent = task.text;
        fragment.appendChild(clone);
    })
    taskList.appendChild(fragment);
}