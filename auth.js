document.addEventListener('DOMContentLoaded', () => {

    // --- SHARED AUTH LOGIC ---

    // Password Visibility Toggle
    const passToggles = document.querySelectorAll('.toggle-pass');
    passToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.parentElement.querySelector('input');
            const icon = toggle.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Input Validation Styling
    const inputs = document.querySelectorAll('.floating-input input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const parent = input.parentElement;
            if (input.value.length > 0) {
                if (input.type === 'email' && !input.value.includes('@')) {
                    parent.classList.add('error');
                    parent.classList.remove('success');
                } else {
                    parent.classList.add('success');
                    parent.classList.remove('error');
                }
            } else {
                parent.classList.remove('success', 'error');
            }
        });
    });


    // --- LOGIN PAGE LOGIC ---
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const signinBtn = document.getElementById('signin-btn');
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check for empty fields
            let hasError = false;
            loginForm.querySelectorAll('input[required]').forEach(input => {
                if (!input.value) {
                    input.parentElement.classList.add('error');
                    hasError = true;
                }
            });

            if (hasError) return;

            // Loading state
            signinBtn.classList.add('loading');
            
            setTimeout(() => {
                signinBtn.classList.remove('loading');
                signinBtn.classList.add('success');
                signinBtn.querySelector('.btn-text').innerText = 'WELCOME BACK!';
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }, 1500);
        });

        // Forgot Password Modal
        const forgotLink = document.getElementById('forgot-link');
        const modal = document.getElementById('forgot-modal');
        const closeBtn = document.getElementById('close-modal');

        if (forgotLink && modal) {
            forgotLink.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target === closeBtn) {
                    modal.classList.remove('active');
                }
            });
        }
    }


    // --- REGISTER PAGE LOGIC ---

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        // Password Strength
        const passInput = document.getElementById('reg-password');
        const reqs = document.querySelectorAll('.req-item');
        const segments = document.querySelectorAll('.pass-seg');

        if (passInput) {
            passInput.addEventListener('input', (e) => {
                const val = e.target.value;
                let score = 0;

                // Checks
                const hasLen = val.length >= 8;
                const hasUpper = /[A-Z]/.test(val);
                const hasNum = /[0-9]/.test(val);
                const hasSpec = /[^A-Za-z0-9]/.test(val);

                if (hasLen) { score++; reqs[0].classList.add('met'); } else { reqs[0].classList.remove('met'); }
                if (hasUpper) { score++; reqs[1].classList.add('met'); } else { reqs[1].classList.remove('met'); }
                if (hasNum) { score++; reqs[2].classList.add('met'); } else { reqs[2].classList.remove('met'); }
                if (hasSpec) { score++; reqs[3].classList.add('met'); } else { reqs[3].classList.remove('met'); }

                // Update Segments
                segments.forEach(seg => seg.style.background = 'rgba(255,255,255,0.1)');
                
                if (score > 0) segments[0].style.background = '#FF4444';
                if (score > 1) { segments[0].style.background = '#FF8C42'; segments[1].style.background = '#FF8C42'; }
                if (score > 2) { segments[0].style.background = '#FFD700'; segments[1].style.background = '#FFD700'; segments[2].style.background = '#FFD700'; }
                if (score === 4) { segments.forEach(seg => seg.style.background = '#00FF88'); }
            });
        }

        // Multi-step Navigation
        const step1 = document.getElementById('step-1');
        const step2 = document.getElementById('step-2');
        const step3 = document.getElementById('step-3');
        const toStep2Btn = document.getElementById('to-step-2');
        const toStep3Btn = document.getElementById('to-step-3');
        const backToStep1 = document.getElementById('back-to-step-1');
        const dots = document.querySelectorAll('.dot-wrap');

        const updateDots = (step) => {
            dots.forEach((d, i) => {
                d.querySelector('.dot').className = 'dot';
                if (i < step) d.querySelector('.dot').classList.add('completed');
                if (i === step) d.querySelector('.dot').classList.add('active');
            });
        };

        if (toStep2Btn) {
            toStep2Btn.addEventListener('click', (e) => {
                e.preventDefault();
                step1.classList.add('slide-out');
                setTimeout(() => {
                    step1.classList.remove('active', 'slide-out');
                    step2.classList.add('active');
                    updateDots(1);
                }, 400);
            });
        }

        if (backToStep1) {
            backToStep1.addEventListener('click', (e) => {
                e.preventDefault();
                step2.classList.add('slide-out');
                setTimeout(() => {
                    step2.classList.remove('active', 'slide-out');
                    step1.classList.add('active');
                    updateDots(0);
                }, 400);
            });
        }

        // Goals Selection
        const goals = document.querySelectorAll('.goal-card');
        goals.forEach(goal => {
            goal.addEventListener('click', () => {
                goals.forEach(g => g.classList.remove('active'));
                goal.classList.add('active');
            });
        });

        // Plan Selection
        const plans = document.querySelectorAll('.plan-sel-card');
        plans.forEach(plan => {
            plan.addEventListener('click', () => {
                plans.forEach(p => p.classList.remove('active'));
                plan.classList.add('active');
            });
        });

        // Final Submit
        const submitRegBtn = document.getElementById('submit-reg-btn');
        if (submitRegBtn) {
            submitRegBtn.addEventListener('click', (e) => {
                e.preventDefault();
                submitRegBtn.classList.add('loading');
                
                setTimeout(() => {
                    submitRegBtn.classList.remove('loading');
                    submitRegBtn.classList.add('success');
                    submitRegBtn.querySelector('.btn-text').innerText = 'ACCOUNT CREATED! WELCOME TO INFERNEX!';
                    
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                }, 1500);
            });
        }
    }
});
