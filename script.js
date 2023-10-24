document.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        savedTasks.forEach(task => {
            addTaskToList(task.text, task.done);
        });
    }
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTaskToList(taskText);
        taskInput.value = "";
    }
}

function addTaskToList(taskText, done = false) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = taskText;
    if (done) {
        p.classList.toggle("done");
    }
    p.onclick = function () {
        p.classList.toggle("done");
    };
    li.appendChild(p);
    addDeleteButtonOnAddTask(taskList, li);

    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = Array.from(document.querySelectorAll("li")).map(li => ({
        text: li.querySelector("p").textContent,
        done: li.querySelector("p").classList.contains("done")
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addDeleteButtonOnAddTask(taskList, li) {
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
        taskList.removeChild(li);
        saveTasks();
    };

    li.appendChild(removeButton);
}


