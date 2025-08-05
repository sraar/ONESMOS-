
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const message = document.getElementById('loginMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const role = document.getElementById('role').value;

        if (role === 'admin' && username === 'ona' && password === '@266234300') {
            message.textContent = 'Welcome Admin! Redirecting...';
            message.style.color = 'green';
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1000);
        } else if (role === 'student') {
            message.textContent = 'Welcome Student! Redirecting...';
            message.style.color = 'green';
            setTimeout(() => {
                window.location.href = 'student-dashboard.html';
            }, 1000);
        } else if (role === 'teacher') {
            message.textContent = 'Welcome Teacher! Redirecting...';
            message.style.color = 'green';
            setTimeout(() => {
                window.location.href = 'teacher-dashboard.html';
            }, 1000);
        } else {
            message.textContent = 'Invalid username or password.';
            message.style.color = 'red';
        }
    });
});
