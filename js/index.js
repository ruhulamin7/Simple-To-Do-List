// selecting the require element
function getById(id) {
  return document.getElementById(id);
}

const addBtn = getById("add_btn");
const taskField = getById("task_field");
const taskList = getById("task_list");
// const taskList = document.getElementsByClassName("task_list")[0];

// get value and add task
addBtn.addEventListener("click", function () {
  const taskValue = taskField.value;
  if (!taskValue) {
    alert("Please add a task");
    return;
  }
  addTask(taskValue);
  taskField.value = "";
});

// add task to the task list
function addTask(taskValue) {
  const item = document.createElement("div");
  item.classList.add("item");
  item.innerHTML = `
                    <li>${taskValue}</li>
                    <button class="edit"><i class="fas fa-pen"></i></button>
                    <button class="completed"><i class="fas fa-check"></i></button>
                    <button class="delete"><i class="fas fa-trash"></i></button>
                `;
  taskList.appendChild(item);
  const tasks = getDataFromLocalStorage();
  let uniqueTask = taskValue;
  console.log(tasks);
  for (let taskName of tasks) {
    if (taskName[0].trim() === taskValue) {
      uniqueTask += " ";
    }
  }
  let newTask = [uniqueTask, "active"];
  tasks.push(newTask);
  setDataToLocalStorage(tasks);
}

// modified tast to ui
taskList.addEventListener("click", function (event) {
  if (event.target.className == "delete") {
    deleteTask(event);
  } else if (event.target.className == "completed") {
    completedTask(event);
  } else if (event.target.className == "edit") {
    editTask(event);
  }
});

// delete task form ui
function deleteTask(event) {
  event.target.parentElement.remove();
  const innerText = event.target.parentElement.firstElementChild.innerText;
  removeDataFromLocalStorage(innerText);
}

// remove from local storage
function removeDataFromLocalStorage(innerText) {
  console.log(innerText);
  const tasks = getDataFromLocalStorage();
  let index;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i][0] == innerText) {
      index = i;
    }
  }
  console.log(index);
  tasks.splice(index, 1);
  setDataToLocalStorage(tasks);
}

// completed task
function completedTask(event) {
  const li = event.target.parentElement.firstElementChild;
  li.classList.toggle("completed_task");
  const tasks = getDataFromLocalStorage();
  let index;
  tasks.forEach((task, i) => {
    if (task[0] == li.innerText) {
      index = i;
    }
  });
  let task = tasks[index];

  if (task[1] == "active") {
    task[1] = "completed";
  } else {
    task[1] = "active";
  }
  tasks.splice(index, 1, task);
  setDataToLocalStorage(tasks);

  // if ([...li.classList].includes("completed_task")) {
  //   li.classList.remove("completed_task");
  // } else {
  //   li.classList.add("completed_task");
  // }
}

// edit task
function editTask(event) {
  event.target.style.display = "none";
  const li = event.target.parentElement.firstElementChild;

  const prevText = li.innerText;
  li.innerText = "";
  // create an input field
  const input = document.createElement("input");
  input.style.width = "100%";
  input.style.padding = "16px";
  input.style.height = "20px";
  input.style.fontSize = "18px";
  input.style.border = "none";
  input.style.outline = "none";
  input.style.borderRadius = "5px";
  input.type = "text";
  input.value = prevText;
  li.appendChild(input);

  // set edited task
  input.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      const editedTask = e.target.value;
      li.innerText = editedTask;
      event.target.style.display = "inline";

      // edited task set to local storage
      const tasks = getDataFromLocalStorage();
      let index;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i][0] == prevText) {
          index = i;
        }
      }
      let prevTask = tasks[index];
      prevTask.splice(0, 1, editedTask);

      tasks.splice(index, 1, prevTask);
      setDataToLocalStorage(tasks);
    }
  });
}

// load data from local storage
window.onload = function () {
  const tasks = getDataFromLocalStorage();
  displayToUI(tasks);
};

// get data from localstorage
function getDataFromLocalStorage() {
  let tasks;
  const data = localStorage.getItem("tasks");

  if (data) {
    tasks = JSON.parse(data);
  } else {
    tasks = [];
  }
  return tasks;
}

// data display to the UI
function displayToUI(tasks) {
  tasks.forEach((task) => {
    const item = document.createElement("div");
    item.className = "item";
    let status = "";
    if (task[1] === "completed") {
      status = "completed_task";
    }
    item.innerHTML = `
  <li class=${status}>${task[0]}</li>
  <button class="edit"><i class="fas fa-pen"></i></button>
  <button class="completed"><i class="fas fa-check"></i></button>
  <button class="delete"><i class="fas fa-trash"></i></button>
  `;
    taskList.appendChild(item);
  });
}

// set data to local storage
function setDataToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
