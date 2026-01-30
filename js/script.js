// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update timestamp on home page
    function updateTimestamp() {
        const timestampElement = document.getElementById('timestamp');
        const now = new Date();
        const formattedTime = now.toLocaleString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        timestampElement.textContent = formattedTime;
    }

    // Update timestamp every second
    updateTimestamp();
    setInterval(updateTimestamp, 1000);

    // Prompt for user's name on page load
    function askUserName() {
        const userName = prompt('Silakan masukkan nama Anda:');
        if (userName && userName.trim() !== '') {
            document.getElementById('userName').textContent = userName.trim();
        }
    }

    // Ask for name when page loads
    askUserName();

    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    const resultDisplay = document.getElementById('resultDisplay');

    // Validation functions
    function validateName(name) {
        return name.trim().length > 0;
    }

    function validateBirthDate(date) {
        if (!date) return false;
        const selectedDate = new Date(date);
        const today = new Date();
        return selectedDate < today;
    }

    function validateGender() {
        const gender = document.querySelector('input[name="gender"]:checked');
        return gender !== null;
    }

    function validateMessage(message) {
        return message.trim().length > 0;
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }

    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = '';
    }

    // Real-time validation
    document.getElementById('name').addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            clearError('nameError');
        }
    });

    document.getElementById('birthDate').addEventListener('change', function() {
        if (validateBirthDate(this.value)) {
            clearError('birthDateError');
        }
    });

    document.querySelectorAll('input[name="gender"]').forEach(radio => {
        radio.addEventListener('change', function() {
            clearError('genderError');
        });
    });

    document.getElementById('message').addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            clearError('messageError');
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear all previous errors
        clearError('nameError');
        clearError('birthDateError');
        clearError('genderError');
        clearError('messageError');

        // Get form values
        const name = document.getElementById('name').value;
        const birthDate = document.getElementById('birthDate').value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const message = document.getElementById('message').value;

        let isValid = true;

        // Validate all fields
        if (!validateName(name)) {
            showError('nameError', 'Nama harus diisi');
            isValid = false;
        }

        if (!validateBirthDate(birthDate)) {
            showError('birthDateError', 'Tanggal lahir tidak valid');
            isValid = false;
        }

        if (!validateGender()) {
            showError('genderError', 'Pilih jenis kelamin');
            isValid = false;
        }

        if (!validateMessage(message)) {
            showError('messageError', 'Pesan harus diisi');
            isValid = false;
        }

        // If all validations pass, display the results
        if (isValid) {
            // Get current time
            const now = new Date();
            const currentTime = now.toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short',
                hour12: false
            });

            // Format birth date
            const birthDateObj = new Date(birthDate);
            const formattedBirthDate = birthDateObj.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            // Display results
            document.getElementById('currentTime').textContent = currentTime;
            document.getElementById('displayName').textContent = name;
            document.getElementById('displayBirthDate').textContent = formattedBirthDate;
            document.getElementById('displayGender').textContent = gender.value;
            document.getElementById('displayMessage').textContent = message;

            // Show success message
            alert('Form berhasil disubmit!');

            // Optionally scroll to results
            resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    // Add scroll effect to navbar
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 80) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Add animation on scroll for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.hq-card, .portfolio-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
});