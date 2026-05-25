document.addEventListener('DOMContentLoaded', () => {
    
    // --- Loading Screen ---
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);

    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const clickables = document.querySelectorAll('a, button, input, .tab, .chip, .toggle-switch');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // --- Navbar & Mobile Menu ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Animate hamburger lines
        const spans = hamburger.querySelectorAll('span');
        if(mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    /* MOBILE NAV FIX */
    const mobileCloseBtns = document.querySelectorAll('.mobile-close');
    mobileCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // --- Active Nav Link ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Parallax Effect ---
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
        }
    });

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-bar');
    if(statsSection) counterObserver.observe(statsSection);

    // --- Billing Toggle ---
    const toggleSwitch = document.getElementById('billing-toggle');
    const monthlyBtn = document.getElementById('monthly-btn');
    const annualBtn = document.getElementById('annual-btn');
    const amounts = document.querySelectorAll('.amount');
    const periods = document.querySelectorAll('.period');

    if(toggleSwitch) {
        toggleSwitch.addEventListener('click', () => {
            toggleSwitch.classList.toggle('annual');
            
            if (toggleSwitch.classList.contains('annual')) {
                monthlyBtn.classList.remove('active');
                annualBtn.classList.add('active');
                
                amounts.forEach(amount => {
                    amount.innerText = amount.getAttribute('data-annual');
                });
                periods.forEach(period => {
                    period.innerText = '/yr';
                });
            } else {
                annualBtn.classList.remove('active');
                monthlyBtn.classList.add('active');
                
                amounts.forEach(amount => {
                    amount.innerText = amount.getAttribute('data-monthly');
                });
                periods.forEach(period => {
                    period.innerText = '/mo';
                });
            }
        });
    }

    // --- BMI Calculator ---
    const heightSlider = document.getElementById('height-slider');
    const weightSlider = document.getElementById('weight-slider');
    const ageSlider = document.getElementById('age-slider');
    
    const heightVal = document.getElementById('height-val');
    const weightVal = document.getElementById('weight-val');
    const ageVal = document.getElementById('age-val');
    
    const bmiForm = document.getElementById('bmi-form');
    const resultsBox = document.getElementById('results-box');
    const resultPlaceholder = document.querySelector('.result-placeholder');
    const resultData = document.querySelector('.result-data');
    
    const bmiScoreEl = document.getElementById('bmi-score');
    const bmiCategoryEl = document.getElementById('bmi-category');
    const calorieValEl = document.getElementById('calorie-val');

    if(heightSlider) {
        heightSlider.addEventListener('input', (e) => heightVal.innerText = e.target.value);
        weightSlider.addEventListener('input', (e) => weightVal.innerText = e.target.value);
        ageSlider.addEventListener('input', (e) => ageVal.innerText = e.target.value);

        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const height = parseInt(heightSlider.value);
            const weight = parseInt(weightSlider.value);
            const age = parseInt(ageSlider.value);
            const gender = document.querySelector('input[name="gender"]:checked').value;
            
            // BMI Calculation
            const heightInMeters = height / 100;
            const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
            
            // Category
            let category = '';
            let color = '';
            if (bmi < 18.5) { category = 'Underweight'; color = '#00D4FF'; }
            else if (bmi >= 18.5 && bmi <= 24.9) { category = 'Normal Weight'; color = '#00FF88'; }
            else if (bmi >= 25 && bmi <= 29.9) { category = 'Overweight'; color = '#FFD700'; }
            else { category = 'Obese'; color = '#FF3535'; }
            
            // BMR (Mifflin-St Jeor Equation)
            let bmr;
            if (gender === 'male') {
                bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            } else {
                bmr = 10 * weight + 6.25 * height - 5 * age - 161;
            }
            
            // Active calories (Assuming moderate activity for gym goers)
            const calories = Math.round(bmr * 1.55);
            
            // Update UI
            bmiScoreEl.innerText = bmi;
            bmiScoreEl.style.color = color;
            bmiCategoryEl.innerText = category;
            bmiCategoryEl.style.color = color;
            calorieValEl.innerHTML = `${calories.toLocaleString()} <span class="unit">kcal</span>`;
            
            // Show results
            resultPlaceholder.classList.add('hidden');
            resultData.classList.remove('hidden');
            
            // Re-trigger animation
            resultData.style.animation = 'none';
            resultData.offsetHeight; /* trigger reflow */
            resultData.style.animation = null; 
        });
    }

    // --- Simple Particles ---
    const particlesContainer = document.getElementById('particles');
    if(particlesContainer) {
        for(let i=0; i<30; i++) {
            let div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.width = Math.random() * 3 + 'px';
            div.style.height = div.style.width;
            div.style.background = '#fff';
            div.style.borderRadius = '50%';
            div.style.opacity = Math.random() * 0.5;
            div.style.left = Math.random() * 100 + '%';
            div.style.top = Math.random() * 100 + '%';
            div.style.animation = `floatUp ${Math.random() * 10 + 10}s linear infinite`;
            particlesContainer.appendChild(div);
        }
    }
    
    // Add dynamic stylesheet for particles keyframes
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes floatUp {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% { transform: translateY(-100vh); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Filter Chips
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });

    // Gallery Tabs
    const galleryTabs = document.querySelectorAll('.gallery-tabs .tab');
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            galleryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // --- Contact Section Entrance Animations ---
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const letters = contactSection.querySelectorAll('.stagger-word span');
        const formCol = contactSection.querySelector('.contact-form-col');
        const infoCol = contactSection.querySelector('.contact-info-col');
        const infoCards = contactSection.querySelectorAll('.info-card-anim');

        const contactObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // Stagger title letters
                letters.forEach((letter, index) => {
                    setTimeout(() => {
                        letter.style.opacity = '1';
                        letter.style.transform = 'translateY(0)';
                        letter.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    }, 50 * index);
                });

                // Columns slide in
                formCol.style.opacity = '1';
                formCol.style.transform = 'translateX(0)';
                formCol.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

                setTimeout(() => {
                    infoCol.style.opacity = '1';
                    infoCol.style.transform = 'translateX(0)';
                    infoCol.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 200);

                // Info cards stagger
                infoCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, 400 + (index * 100));
                });

                contactObserver.unobserve(contactSection);
            }
        }, { threshold: 0.2 });

        contactObserver.observe(contactSection);

        // --- Custom Select ---
        const customSelects = document.querySelectorAll('.custom-select');
        customSelects.forEach(select => {
            const selected = select.querySelector('.select-selected');
            const items = select.querySelector('.select-items');
            
            selected.addEventListener('click', (e) => {
                e.stopPropagation();
                // close others
                customSelects.forEach(s => {
                    if (s !== select) {
                        s.classList.remove('active');
                        s.querySelector('.select-items').classList.add('select-hide');
                    }
                });
                
                select.classList.toggle('active');
                items.classList.toggle('select-hide');
            });

            const options = items.querySelectorAll('div');
            options.forEach(opt => {
                opt.addEventListener('click', () => {
                    const originalText = selected.innerHTML;
                    const htmlContent = opt.innerHTML;
                    // remove chevron from opt text if needed, or just append chevron
                    selected.innerHTML = htmlContent.replace('<span class="tag-orange">Most Popular</span>', '') + ' <i class="fa-solid fa-chevron-down"></i>';
                    select.dataset.value = opt.dataset.value;
                });
            });
        });

        document.addEventListener('click', () => {
            customSelects.forEach(select => {
                select.classList.remove('active');
                select.querySelector('.select-items').classList.add('select-hide');
            });
        });

        // --- Timing Pills ---
        const timingPills = document.querySelectorAll('.timing-pill');
        timingPills.forEach(pill => {
            pill.addEventListener('click', () => {
                timingPills.forEach(p => p.classList.remove('selected'));
                pill.classList.add('selected');
            });
        });

        // --- Character Counter ---
        const messageInput = document.getElementById('message');
        const charCounter = document.querySelector('.char-counter');
        if (messageInput && charCounter) {
            messageInput.addEventListener('input', () => {
                const len = messageInput.value.length;
                charCounter.innerText = `${len} / 300`;
                
                if (len >= 280) {
                    charCounter.className = 'char-counter error';
                } else if (len >= 200) {
                    charCounter.className = 'char-counter warning';
                } else {
                    charCounter.className = 'char-counter';
                }
            });
        }

        // --- Email Validation & Shake ---
        const emailInput = document.getElementById('email');
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                if (emailInput.value && !validateEmail(emailInput.value)) {
                    emailInput.classList.add('shake-input');
                    setTimeout(() => emailInput.classList.remove('shake-input'), 400);
                }
            });
        }

        // --- Form Submission Animation ---
        const contactForm = document.getElementById('contact-form');
        const submitBtn = document.getElementById('submit-btn');
        
        if (contactForm && submitBtn) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (emailInput && emailInput.value && !validateEmail(emailInput.value)) {
                    emailInput.classList.add('shake-input');
                    setTimeout(() => emailInput.classList.remove('shake-input'), 400);
                    return;
                }

                submitBtn.classList.add('loading');
                
                // Simulate network request
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.classList.add('success');
                    
                    const btnText = submitBtn.querySelector('.btn-text');
                    btnText.innerText = "MESSAGE SENT! WE'LL CALL YOU SOON";
                    btnText.style.opacity = '1';
                    
                    // Reset form
                    contactForm.reset();
                    timingPills.forEach(p => p.classList.remove('selected'));
                    charCounter.innerText = '0 / 300';
                    charCounter.className = 'char-counter';
                    
                    setTimeout(() => {
                        submitBtn.classList.remove('success');
                        btnText.innerText = "SEND MESSAGE";
                    }, 3000);
                    
                }, 1500);
            });
        }

        // --- Live Time Checker ---
        const liveStatusBadge = document.getElementById('live-status-badge');
        const rowMonFri = document.getElementById('row-mon-fri');
        const rowSat = document.getElementById('row-sat');
        const rowSun = document.getElementById('row-sun');
        
        const checkTime = () => {
            const now = new Date();
            const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
            const hour = now.getHours();
            
            // Remove active row
            rowMonFri.classList.remove('active');
            rowSat.classList.remove('active');
            rowSun.classList.remove('active');
            
            let isOpen = false;
            
            if (day >= 1 && day <= 5) {
                rowMonFri.classList.add('active');
                if (hour >= 5 && hour < 23) isOpen = true;
            } else if (day === 6) {
                rowSat.classList.add('active');
                if (hour >= 6 && hour < 22) isOpen = true;
            } else if (day === 0) {
                rowSun.classList.add('active');
                if (hour >= 7 && hour < 20) isOpen = true;
            }
            
            if (liveStatusBadge) {
                if (isOpen) {
                    liveStatusBadge.classList.add('open');
                    liveStatusBadge.classList.remove('closed');
                    liveStatusBadge.querySelector('.status-text').innerText = 'OPEN NOW';
                } else {
                    liveStatusBadge.classList.add('closed');
                    liveStatusBadge.classList.remove('open');
                    liveStatusBadge.querySelector('.status-text').innerText = 'CLOSED';
                }
            }
        };
        
        checkTime();
        setInterval(checkTime, 60000);
    }

    // --- Dark/Light Mode Toggle ---
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const body = document.body;
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('infernexgym-theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            // Add temporary class for smooth transitions across all elements
            body.classList.add('theme-transitioning');
            
            // Toggle light mode
            if (body.classList.contains('light-mode')) {
                body.classList.remove('light-mode');
                localStorage.setItem('infernexgym-theme', 'dark');
            } else {
                body.classList.add('light-mode');
                localStorage.setItem('infernexgym-theme', 'light');
            }

            // Remove transition class after animation completes (400ms)
            setTimeout(() => {
                body.classList.remove('theme-transitioning');
            }, 400);
        });
    });

});
