document.addEventListener('DOMContentLoaded', () => {

    /* ======================================================================
       УТИЛИТЫ
       ====================================================================== */

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function showError(input, show = true) {
        const group = input.closest('.form-group');
        const err = group ? group.querySelector('.field-error') : null;
        if (err) err.classList.toggle('visible', show);
        input.classList.toggle('is-error', show);
    }

    function showSuccess(input, show = true) {
        input.classList.toggle('is-success', show);
    }

    function togglePasswordButtons() {
        document.querySelectorAll('.input-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                const wrap = btn.closest('.input-wrap');
                const input = wrap ? wrap.querySelector('input') : null;
                if (!input) return;
                const isPass = input.type === 'password';
                input.type = isPass ? 'text' : 'password';
                btn.textContent = isPass ? 'Скрыть' : 'Показать';
            });
        });
    }
    togglePasswordButtons();

    /* ======================================================================
       КАПЧА (простая защита от автозаполнения и ботов)
       ====================================================================== */

    function validateCaptcha(captchaBox) {
        if (!captchaBox) return true;
        const cb = captchaBox.querySelector('input[type="checkbox"]');
        const ok = cb && cb.checked;
        captchaBox.classList.toggle('is-error', !ok);
        return ok;
    }

    /* ======================================================================
       ФОРМА ВХОДА
       ====================================================================== */

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const email = document.getElementById('loginEmail');
        const pass  = document.getElementById('loginPassword');
        const captcha = document.getElementById('loginCaptcha');
        const notice = document.getElementById('loginNotice');

        [email, pass].forEach(el => {
            el.addEventListener('input', () => {
                showError(el, false);
                showSuccess(el, false);
            });
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (notice) notice.hidden = true;
            let ok = true;

            if (!emailRe.test(email.value.trim())) { showError(email); ok = false; }
            else showSuccess(email, true);

            if (pass.value.length < 8) { showError(pass); ok = false; }
            else showSuccess(pass, true);

            if (!validateCaptcha(captcha)) ok = false;

            if (!ok) return;

            // Здесь будет запрос на сервер.
            // Имитация неудачного входа:
            if (notice) {
                notice.hidden = false;
                notice.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    /* ======================================================================
       ФОРМА РЕГИСТРАЦИИ
       ====================================================================== */

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const name  = document.getElementById('regName');
        const email = document.getElementById('regEmail');
        const pass  = document.getElementById('regPassword');
        const pass2 = document.getElementById('regPassword2');
        const agree = document.getElementById('agreePrivacy');
        const agreeErr = document.getElementById('agreePrivacyError');
        const captcha = document.getElementById('regCaptcha');
        const strength = document.getElementById('pwdStrength');
        const strengthLabel = document.getElementById('pwdStrengthLabel');

        [name, email, pass, pass2].forEach(el => {
            el.addEventListener('input', () => {
                showError(el, false);
                showSuccess(el, false);
            });
        });

        agree.addEventListener('change', () => {
            if (agree.checked && agreeErr) agreeErr.classList.remove('visible');
        });

        // Оценка надёжности пароля
        pass.addEventListener('input', () => {
            const v = pass.value;
            let score = 0;
            if (v.length >= 8) score++;
            if (/[A-ZА-Я]/.test(v) && /[a-zа-я]/.test(v)) score++;
            if (/\d/.test(v)) score++;
            if (/[^\w\s]/.test(v)) score++;

            strength.classList.remove('weak', 'medium', 'strong');
            if (v.length === 0) {
                strengthLabel.textContent = 'Минимум 8 символов, буквы и цифры';
            } else if (score <= 1) {
                strength.classList.add('weak');
                strengthLabel.textContent = 'Слабый пароль';
            } else if (score === 2 || score === 3) {
                strength.classList.add('medium');
                strengthLabel.textContent = 'Средний пароль';
            } else {
                strength.classList.add('strong');
                strengthLabel.textContent = 'Надёжный пароль';
            }
        });

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let ok = true;

            if (name.value.trim().length < 2) { showError(name); ok = false; }
            else showSuccess(name, true);

            if (!emailRe.test(email.value.trim())) { showError(email); ok = false; }
            else showSuccess(email, true);

            if (pass.value.length < 8) { showError(pass); ok = false; }
            else showSuccess(pass, true);

            if (pass.value !== pass2.value || pass2.value.length < 8) { showError(pass2); ok = false; }
            else showSuccess(pass2, true);

            if (!agree.checked) {
                if (agreeErr) agreeErr.classList.add('visible');
                ok = false;
            }

            if (!validateCaptcha(captcha)) ok = false;

            if (!ok) return;

            // Здесь будет запрос на сервер + редирект на страницу подтверждения email.
            alert('Регистрация успешна. Проверьте почту для подтверждения адреса.');
            window.location.href = 'login.html';
        });
    }

    /* ======================================================================
       ФОРМА ВОССТАНОВЛЕНИЯ ПАРОЛЯ
       ====================================================================== */

    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
        const email = document.getElementById('forgotEmail');
        const captcha = document.getElementById('forgotCaptcha');
        const card = document.getElementById('forgotCard');
        const success = document.getElementById('forgotSuccess');

        email.addEventListener('input', () => {
            showError(email, false);
            showSuccess(email, false);
        });

        forgotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let ok = true;

            if (!emailRe.test(email.value.trim())) { showError(email); ok = false; }
            else showSuccess(email, true);

            if (!validateCaptcha(captcha)) ok = false;

            if (!ok) return;

            // Здесь будет запрос на сервер.
            if (card) card.hidden = true;
            if (success) success.hidden = false;
        });
    }
});