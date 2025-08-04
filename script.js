document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    const feedbackDiv = document.getElementById('form-feedback');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const registerBtn = document.getElementById('register-btn');

    const usernameFeedback = document.getElementById('username-feedback');
    const emailFeedback = document.getElementById('email-feedback');
    const passwordFeedback = document.getElementById('password-feedback');

    const fetchUsersBtn = document.getElementById('fetch-users-btn');
    const userList = document.getElementById('user-list');

    // Load saved data from Local Storage
    usernameInput.value = localStorage.getItem('username') || '';
    emailInput.value = localStorage.getItem('email') || '';
    passwordInput.value = localStorage.getItem('password') || '';

    // Real-time Validation Function
    function validateInputs() {
        let isFormValid = true;

        // Username validation
        if (usernameInput.value.trim().length < 3) {
            usernameFeedback.textContent = 'Must be at least 3 characters.';
            isFormValid = false;
        } else {
            usernameFeedback.textContent = '';
        }

        // Email validation
        const emailValue = emailInput.value.trim();
        if (!emailValue.includes('@') || !emailValue.includes('.')) {
            emailFeedback.textContent = 'Enter a valid email.';
            isFormValid = false;
        } else {
            emailFeedback.textContent = '';
        }

        // Password validation
        if (passwordInput.value.trim().length < 8) {
            passwordFeedback.textContent = 'Must be at least 8 characters.';
            isFormValid = false;
        } else {
            passwordFeedback.textContent = '';
        }

        // Enable/Disable Register Button
        registerBtn.disabled = !isFormValid;
    }

    // Save inputs to Local Storage and Validate in real-time
    usernameInput.addEventListener('input', function () {
        localStorage.setItem('username', usernameInput.value);
        validateInputs();
    });

    emailInput.addEventListener('input', function () {
        localStorage.setItem('email', emailInput.value);
        validateInputs();
    });

    passwordInput.addEventListener('input', function () {
        localStorage.setItem('password', passwordInput.value);
        validateInputs();
    });

    // Initial Validation on Page Load
    validateInputs();

    // Form Submission Handler
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        feedbackDiv.style.display = 'block';
        feedbackDiv.textContent = 'Registration successful!';
        feedbackDiv.style.color = '#28a745';

        // Clear Local Storage and Reset Form
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        form.reset();

        // Disable button again
        validateInputs();
    });

    // Fetch Users from Public API
    fetchUsersBtn.addEventListener('click', function () {
        userList.innerHTML = 'Loading...';

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(users => {
                userList.innerHTML = '';
                users.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = `${user.name} (${user.email})`;
                    userList.appendChild(li);
                });
            })
            .catch(error => {
                userList.innerHTML = 'Failed to fetch users. Please try again later.';
                console.error('Fetch error:', error);
            });
    });
});
