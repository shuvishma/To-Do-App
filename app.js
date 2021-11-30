// let add = document.getElementById('submit');
let text = document.getElementById('input');
let list = document.getElementById('listBox');
let saveIndex = document.getElementById('saveIndex');
let saveTaskButton = document.getElementById('save-task-button');
let addTaskButton = document.getElementById('add-task-button');
let size = document.getElementById('list-size');
let arr = [];


addTaskButton.addEventListener('click', (e) => {
    e.preventDefault();
    let todo = localStorage.getItem('todo');
    if (todo == null) {
        arr = [];
    }
    else {
        arr = JSON.parse(todo);
    }
    arr.push(text.value);
    text.value = '';
    localStorage.setItem('todo', JSON.stringify(arr));
    displayList();
    size.innerText = arr.length;
})

function displayList() {
    let todo = localStorage.getItem('todo');
    if (todo == null) {
        arr = [];
    }
    else {
        arr = JSON.parse(todo);
    }
    let temp = '';
    arr.forEach((list, index) => {
        temp += `<div>
        <input type='checkbox' id=${list}>
        <p>${list}</p>
        <button id=${index} onclick='edit(${index})'>Edit</button>
        <button onclick='deleteTodo(${index})'>Delete</button>
        </div>`
    })
    list.innerHTML = temp;
}

function deleteTodo(index) {
    let todo = localStorage.getItem('todo');
    arr = JSON.parse(todo);
    arr.splice(index, 1);
    localStorage.setItem('todo', JSON.stringify(arr));
    displayList();
    size.innerText= arr.length;
}

function edit(index) {
    saveIndex.value = index;
    let todo = localStorage.getItem('todo');
    arr = JSON.parse(todo);
    text.value = arr[index];
    addTaskButton.style.display = 'none';
    saveTaskButton.style.display = 'block';
}

saveTaskButton.addEventListener('click', () => {
    let todo = localStorage.getItem('todo');
    arr = JSON.parse(todo);
    let id = saveIndex.value;
    todo[id] = text.value;
    addTaskButton.style.display = 'block';
    saveTaskButton.style.display = 'none';
    text.value = '';
    localStorage.setItem('todo', JSON.stringify(arr));
    displayList();
})


