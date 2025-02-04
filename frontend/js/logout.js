document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            const confirmLogout = confirm('Вы уверены, что хотите выйти?');
            if (confirmLogout) {
                localStorage.removeItem('user'); // Удаляем данные пользователя
                window.location.href = 'login.html'; // Перенаправляем на страницу входа
            }
        });
    }
});