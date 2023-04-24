const taskInput = document.querySelector('[data-task-input="new-task"]');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.querySelector('[data-task-list="todo"]');
const completedTasksHolder = document.querySelector('[data-task-list="completed"]');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

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
  deleteButtonImg.width = '30';
  deleteButtonImg.height = '30';
  deleteButtonImg.alt = 'icon of delete with cross inside';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.task__edit-btn');
  const containsClass = listItem.classList.contains('task__item--edit');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }
  listItem.classList.toggle('task__item--edit');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
};

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.task__edit-btn');
  const deleteButton = taskListItem.querySelector('button.task__del-btn');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
};

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
};
