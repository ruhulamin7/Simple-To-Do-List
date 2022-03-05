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
  //   console.log(taskValue);
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
  for (let taskName of tasks) {
    if (taskName.trim() === taskValue) {
      uniqueTask += " ";
    }
  }
  tasks.push(uniqueTask);
  setDataToLocalStorage(tasks);

  //   console.log(taskList);
}

// delete task
taskList.addEventListener("click", function (event) {
  if (event.target.className == "delete") {
    deleteTask(event);
  } else if (event.target.className == "completed") {
    completedTask(event);
  } else if (event.target.className == "edit") {
    editTask(event);
  }
});

// delete task
function deleteTask(event) {
  event.target.parentElement.remove();
  const innerText = event.target.parentElement.firstElementChild.innerText;
  removeDataFromLocalStorage(innerText);
}

// remove from local storage
function removeDataFromLocalStorage(innerText) {
  const tasks = getDataFromLocalStorage();
  const index = tasks.indexOf(innerText);
  console.log(index);
  tasks.splice(index, 1);
  setDataToLocalStorage(tasks);
}

// completed task
function completedTask(event) {
  const li = event.target.parentElement.firstElementChild;
  //   li.classList.toggle("completed_task");

  if ([...li.classList].includes("completed_task")) {
    li.classList.remove("completed_task");
  } else {
    li.classList.add("completed_task");
  }
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
    item.innerHTML = `
  <li>${task}</li>
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
