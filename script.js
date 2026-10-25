const inputs = document.querySelectorAll('.otp-input');
const otpSection = document.getElementById('otp-section');
const verifyingSection = document.getElementById('verifying-section');
const successSection = document.getElementById('success-section');
const loaderPercent = document.getElementById('loader-percent');

inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
        checkOTP();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && index > 0 && !input.value) {
            inputs[index - 1].focus();
        }
    });
});

function checkOTP() {
    let otp = '';
    inputs.forEach(input => otp += input.value);
    if (otp.length === 4) {
        startVerification();
    }
}

function startVerification() {
    otpSection.classList.add('hidden');
    verifyingSection.classList.remove('hidden');

    let progress = 0;
    const interval = setInterval(() => {
        progress += 4;
        loaderPercent.textContent = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(showSuccess, 500);
        }
    }, 50);
}

function showSuccess() {
    verifyingSection.classList.add('hidden');
    successSection.classList.remove('hidden');
}
