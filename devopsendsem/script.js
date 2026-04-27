// Login form elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const phoneInput = document.getElementById('phone');
const rememberMe = document.getElementById('rememberMe');
const loginBtn = document.getElementById('loginBtn');

const successMessage = document.getElementById('successMessage');
const errorContainer = document.getElementById('errorContainer');
const logoutBtn = document.getElementById('logoutBtn');

// Load saved credentials if "Remember me" was checked
document.addEventListener('DOMContentLoaded', loadSavedCredentials);

// Form submission
loginForm.addEventListener('submit', handleLogin);

// Real-time validation
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('blur', validatePassword);
phoneInput.addEventListener('blur', validatePhone);

function validateEmail() {
    const email = emailInput.value.trim();
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        emailError.textContent = 'Email is required';
        return false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Invalid email format';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validatePassword() {
    const password = passwordInput.value;
    const passwordError = document.getElementById('passwordError');
    
    if (!password) {
        passwordError.textContent = 'Password is required';
        return false;
    } else if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        return false;
    } else {
        passwordError.textContent = '';
        return true;
    }
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^[0-9]{10}$/;
    
    if (phone && !phoneRegex.test(phone)) {
        phoneError.textContent = 'Phone must be 10 digits';
        return false;
    } else {
        phoneError.textContent = '';
        return true;
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    // Clear previous errors
    errorContainer.textContent = '';
    errorContainer.classList.add('hidden');
    
    // Validate all fields
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const phoneValid = validatePhone();
    
    if (!emailValid || !passwordValid || !phoneValid) {
        showError('Please fix the errors above');
        return;
    }
    
    // Get form data
    const loginData = {
        email: emailInput.value.trim(),
        password: passwordInput.value,
        phone: phoneInput.value.trim(),
        loginTime: new Date().toLocaleString()
    };
    
    // Save to localStorage
    localStorage.setItem('currentLogin', JSON.stringify(loginData));
    
    // Save credentials if remember me is checked
    if (rememberMe.checked) {
        localStorage.setItem('savedEmail', loginData.email);
        localStorage.setItem('savedPhone', loginData.phone);
    } else {
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('savedPhone');
    }
    
    // Show success message
    showSuccessScreen(loginData);
}

function showSuccessScreen(loginData) {
    loginForm.classList.add('hidden');
    successMessage.classList.remove('hidden');
    
    document.getElementById('displayEmail').textContent = loginData.email;
    document.getElementById('displayPhone').textContent = loginData.phone || 'Not provided';
    
    // Log to console for testing
    console.log('Login successful:', loginData);
}

function loadSavedCredentials() {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPhone = localStorage.getItem('savedPhone');
    
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMe.checked = true;
    }
    if (savedPhone) {
        phoneInput.value = savedPhone;
    }
}

logoutBtn.addEventListener('click', function() {
    // Clear form and return to login
    loginForm.reset();
    loginForm.classList.remove('hidden');
    successMessage.classList.add('hidden');
    localStorage.removeItem('currentLogin');
    emailInput.focus();
});

function showError(message) {
    errorContainer.textContent = message;
    errorContainer.classList.remove('hidden');
}

