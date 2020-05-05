// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event Listeners
loadEventListeners();

// Load all event Listeners
function loadEventListeners(){
  // DOM Load event
  document.addEventListener('DOMContentLoaded',getTasks);
  // Add task event
  form.addEventListener('submit',addTask);
  // Remove task event
  taskList.addEventListener('click',removeTask);
  // Clear task event
  clearBtn.addEventListener('click',clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup',filterTasks);
}

// get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create textnode and append to li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content'
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // append the link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
    
  });
}

// Add Task
function addTask(e){
  if(taskInput.value === ''){
    alert('add a task');
  }

  // create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create textnode and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement('a');
  // add class
  link.className = 'delete-item secondary-content'
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>'
  // append the link to li
  li.appendChild(link);
  // append li to ul
  taskList.appendChild(li);

  // store in localstorage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  // console.log(li);

  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task)

  localStorage.setItem('tasks',JSON.stringify(tasks));
}




// Remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you Sure?')){
      e.target.parentElement.parentElement.remove();
    }
    
    // console.log('-delete-item');
    // console.log(e.target.parentElement.parentElement);

    // Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);

  }
  
}

// remove from ls
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));

  // console.log(taskItem);
}

// clear tasks
function clearTasks(){
  taskList.innerHTML = '';

  // Faster
  // while(taskList.firstChild){
  //   taskList.removeChild(taskList.firstChild);
  // }

  clearTasksFromLocalStorage();
}

// clear tasks from ls
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// filter Tasks

function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!= -1){

      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  })
  // console.log(text);
}