document.addEventListener('DOMContentLoaded', function () {
    displayTasks();
});

function displayTasks() {
    const todoList = document.getElementById('list-data');
    todoList.innerHTML = '';

    fetch('backend.php')
        .then(response => response.json())
        .then(data => {
            let remainingTodos = 0;

            data.forEach(task => {
                const listItem = document.createElement('li');
                listItem.className = 'todo-item';

                const checkButton = document.createElement('button');
                checkButton.textContent = '✓';
                checkButton.className = 'check';
                checkButton.onclick = function () {
                    listItem.classList.toggle('checked');
                    updateTodoCount();
                };

                const label = document.createElement('label');
                label.textContent = task.task_name;

                const removeButton = document.createElement('button');
                removeButton.textContent = 'X';
                removeButton.className = 'remove';
                removeButton.onclick = function () {
                    removeTodo(task.id);
                };

                listItem.appendChild(label);
                listItem.appendChild(checkButton);
                listItem.appendChild(removeButton);
                todoList.appendChild(listItem);

                if (!task.completed) {
                    remainingTodos++;
                }
            });

            updateTodoCount(remainingTodos);
        });
}

function addItem() {
    const taskInput = document.getElementById('tambahtodo');
    const task = taskInput.value.trim();

    if (task !== '') {
        fetch('backend.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task
                }),
            })
            .then(() => {
                taskInput.value = '';
                displayTasks();
            });
    }
}

function removeTodo(todoId) {
    fetch('backend.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: todoId
        }),
    })
    .then(() => {
        displayTasks();
    });
}

function updateTodoCount() {
    const todoCount = document.getElementById('todo-count');
    const todoItems = document.querySelectorAll('.todo-item:not(.checked)');
    const remaining = todoItems.length;

    todoCount.textContent = remaining;
}
