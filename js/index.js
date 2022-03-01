// selecting the require element
function getById(id) {
  return document.getElementById(id);
}

const addBtn = getById("add_btn");
const taskField = getById("task_field");
const taskList = getById("task_list");
// const taskList = document.getElementsByClassName("task_list")[0];

console.log(taskList);

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

  // set edit task
  input.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      const editedTask = e.target.value;
      li.innerText = editedTask;
      event.target.style.display = "block";
    }
  });
  event.target.style.display = "none";
}
