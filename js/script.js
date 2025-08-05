// MOBILE MENU
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.querySelector('ul').classList.toggle('show');
  });
}

// DARK MODE
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
}

// ADMIN LOGIN
const adminForm = document.getElementById('admin-login');
if (adminForm) {
  adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('admin-username').value;
    const pass = document.getElementById('admin-password').value;
    if (user === 'ona' && pass === '@266234300') {
      window.location.href = 'admin-dashboard.html';
    } else {
      document.getElementById('login-status').textContent = 'Invalid credentials!';
    }
  });
}

// FILTER STUDENTS (admin dashboard)
const gradeFilter = document.getElementById('grade-filter');
if (gradeFilter) {
  gradeFilter.addEventListener('change', () => {
    const selected = gradeFilter.value;
    document.querySelectorAll('#students-table tbody tr').forEach(row => {
      if (selected === 'all' || row.children[2].textContent === selected) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

// ADMIN DASHBOARD: SAVE GRADE TO localStorage
const gradeForm = document.querySelector('main.container form');
if (gradeForm && gradeForm.action === '') {
  // Ignore if no action attribute - safer check
}

if (gradeForm && gradeForm.querySelector('input[name="student_email"]')) {
  gradeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = gradeForm.querySelector('input[name="student_email"]').value.trim().toLowerCase();
    const grade = gradeForm.querySelector('input[name="grade"]').value.trim();
    const result = gradeForm.querySelector('input[name="result"]').value.trim();

    if (!email || !grade || !result) {
      alert('Please fill all fields');
      return;
    }

    // Get existing grades from localStorage
    let grades = JSON.parse(localStorage.getItem('grades')) || [];

    // Check if student exists, update or add
    const index = grades.findIndex(g => g.email === email);
    if (index >= 0) {
      grades[index] = { email, grade, result };
    } else {
      grades.push({ email, grade, result });
    }

    localStorage.setItem('grades', JSON.stringify(grades));
    alert('Grade saved successfully!');
    gradeForm.reset();

    // Optional: Update student table dynamically here if you want
  });
}

// GRADES PAGE: LOOKUP GRADE FROM localStorage
const gradesForm = document.getElementById('grades-form');
const gradeResults = document.getElementById('grade-results');

if (gradesForm) {
  gradesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('student-email').value.trim().toLowerCase();

    const grades = JSON.parse(localStorage.getItem('grades')) || [];
    const found = grades.find(student => student.email === emailInput);

    if (found) {
      document.getElementById('result-email').textContent = found.email;
      document.getElementById('result-grade').textContent = found.grade;
      document.getElementById('result-score').textContent = found.result;
      gradeResults.style.display = 'block';
    } else {
      gradeResults.style.display = 'block';
      document.getElementById('result-email').textContent = emailInput;
      document.getElementById('result-grade').textContent = 'Not Found';
      document.getElementById('result-score').textContent = 'Please contact the school';
    }
  });
}
