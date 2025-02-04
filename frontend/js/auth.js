document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isRegister = urlParams.has('register');

    const authForm = document.getElementById('authForm');
    const authTitle = document.getElementById('auth-title');
    const authButton = document.getElementById('auth-button');
    const authSwitch = document.getElementById('auth-switch');
    const switchToRegister = document.getElementById('switch-to-register');

    if (isRegister) {
        authTitle.textContent = 'Регистрация';
        authButton.textContent = 'Зарегистрироваться';
        authSwitch.innerHTML = 'Уже есть аккаунт? <a href="login.html">Войдите</a>';
    } else {
        switchToRegister.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = 'login.html?register=true';
        });
    }

    authForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        const endpoint = isRegister ?'/api/users.php' : '/api/auth.php' ;
        const method = isRegister ? 'POST' : 'POST';

        fetch(endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Авторизация успешна" || data.message === "Пользователь добавлен") {
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.user.token); // Сохраняем токен
                window.location.href = 'index.html';
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Ошибка:', error));
    });
});