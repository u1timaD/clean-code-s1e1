let taskInput = document.querySelector('[data-task-input="new-task"]');
let addButton = document.getElementsByTagName('button')[0];
let incompleteTaskHolder = document.querySelector('[data-task-list="todo"]');
let completedTasksHolder = document.querySelector('[data-task-list="completed"]');

let createNewTaskElement = function (taskString) {
  let listItem = document.createElement('li');
  let checkBox = document.createElement('input');
  let label = document.createElement('label');
  let editInput = document.createElement('input');
  let editButton = document.createElement('button');
  let deleteButton = document.createElement('button');
  let deleteButtonImg = document.createElement('img');

  listItem.className = 'task__item';
  label.innerText = taskString;
  label.className = 'task__label';
  checkBox.className = 'task__checkbox'
  checkBox.type = 'checkbox';
  editInput.className = 'task__text task__text--outline';
  editInput.type = 'text';

  editButton.innerText = 'Edit';
  editButton.className = 'task__edit-btn btn';
  editButton.type = 'button';
  deleteButton.className = 'task__del-btn btn';
  deleteButton.type = 'button';
  deleteButtonImg.src = './assets/icons/remove.svg';
  deleteButtonImg.alt = 'icon of delete with cross inside';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

let addTask = function () {
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
};

let editTask = function () {
  let listItem = this.parentNode;
  let editInput = listItem.querySelector('input[type=text]');
  let label = listItem.querySelector('label');
  let editBtn = listItem.querySelector('.task__edit-btn');
  let containsClass = listItem.classList.contains('task__item--edit');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }
  listItem.classList.toggle('task__item--edit');
}

let deleteTask = function () {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
}

let taskCompleted = function () {
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

let taskIncomplete = function () {
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector('input[type=checkbox]');
  let editButton = taskListItem.querySelector('button.task__edit-btn');
  let deleteButton = taskListItem.querySelector('button.task__del-btn');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
