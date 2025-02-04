document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();

    document.getElementById('addUserForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const user = {
            Login: document.getElementById('login').value,
            Password: document.getElementById('password').value,
            Role: document.getElementById('role').value
        };

        fetch('/api/users.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('user')
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchUsers();
        })
        .catch(error => console.error('Ошибка:', error));
    });
});

function fetchUsers() {
    fetch('/api/users.php', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('user')
        }
    })
    .then(response => response.json())
    .then(data => {
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';
        data.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.textContent = `Логин: ${user.Login}, Роль: ${user.Role}`;
            usersList.appendChild(userDiv);
        });
    })
    .catch(error => console.error('Ошибка:', error));
}