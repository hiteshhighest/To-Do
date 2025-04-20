let todoList = JSON.parse(localStorage.getItem('todo'));
if (!todoList) {
    todoList = [];
}

renderTodo();

function addTodo() {
    if (document.getElementById('todo-name').value != '') {
        let newTodo = document.getElementById('todo-name').value;
        document.getElementById('todo-name').value = '';
        todoList.push(newTodo);
    }

    renderTodo();
}

function renderTodo() {
    let FinalHtml = ''

    todoList.forEach(function(todoName, index) {
        let TodoHTML = `
            <div class="list">
                <p>${todoName}</p>
                <button id="remove" onclick="removeTodo(${index})">Remove</button>
            </div>
        `;

        FinalHtml += TodoHTML;
    });

    localStorage.setItem('todo', JSON.stringify(todoList));
    document.getElementById('todo').innerHTML = FinalHtml;
}

function removeTodo(index) {
    todoList.splice(index, 1);

    renderTodo();
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('Service Worker registered:', reg))
            .catch(err => console.error('Service Worker registration failed:', err));
    });
}
