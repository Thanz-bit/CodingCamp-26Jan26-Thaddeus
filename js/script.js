function askUserName() {
    let userName = prompt("Please enter your name:");
    if (userName && userName.trim() !== "") {
        // Update the welcome message in hero section
        const heroTitle = document.querySelector('.hero .content h1');
        if (heroTitle) {
            heroTitle.textContent = `Hi ${userName}, Welcome To Website`;
        }
    } else {
        // If user cancels or enters empty, use default name
        const heroTitle = document.querySelector('.hero .content h1');
        if (heroTitle) {
            heroTitle.textContent = `Hi Guest, Welcome To Website`;
        }
    }
}

function updateCurrentTime() {
    const now = new Date();
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        timeZoneName: 'short',
        hour12: false
    };
    const formattedTime = now.toLocaleString('en-US', options);
    const currentTimeElement = document.getElementById('currentTime');
    if (currentTimeElement) {
        currentTimeElement.textContent = formattedTime;
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function validateName(name) {
    const namePattern = /^[a-zA-Z\s]+$/;
    return namePattern.test(name);
}

function validateBirthDate(birthDate) {
    const selectedDate = new Date(birthDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only dates
    return selectedDate <= today;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

document.addEventListener('DOMContentLoaded', function() {

    askUserName();
    
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    const nameInput = document.getElementById('name');
    const birthDateInput = document.getElementById('birthDate');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const messageInput = document.getElementById('message');
    const contactForm = document.getElementById('contactForm');
    
    const displayName = document.getElementById('displayName');
    const displayBirthDate = document.getElementById('displayBirthDate');
    const displayGender = document.getElementById('displayGender');
    const displayMessage = document.getElementById('displayMessage');
    
    console.log('Form elements found:', {
        nameInput: !!nameInput,
        birthDateInput: !!birthDateInput,
        genderInputs: genderInputs.length,
        messageInput: !!messageInput,
        displayName: !!displayName,
        displayBirthDate: !!displayBirthDate,
        displayGender: !!displayGender,
        displayMessage: !!displayMessage
    });
    
    if (nameInput && displayName) {
        nameInput.addEventListener('input', function() {
            displayName.textContent = this.value || '-';
            clearError('name');
        });
        
        nameInput.addEventListener('blur', function() {
            if (this.value && !validateName(this.value)) {
                showError('name', 'Name should only contain letters and spaces');
            }
        });
    }
    
    if (birthDateInput && displayBirthDate) {
        birthDateInput.addEventListener('change', function() {
            displayBirthDate.textContent = this.value || '-';
            clearError('birthDate');
            
            if (this.value && !validateBirthDate(this.value)) {
                showError('birthDate', 'Birth date cannot be in the future');
            }
        });
    }
    
    if (genderInputs.length > 0 && displayGender) {
        genderInputs.forEach(input => {
            input.addEventListener('change', function() {
                displayGender.textContent = this.value;
                clearError('gender');
            });
        });
    }
    
    if (messageInput && displayMessage) {
        console.log('Message input found:', messageInput);
        console.log('Display message found:', displayMessage);
        
        messageInput.addEventListener('input', function() {
            const value = this.value || '-';
            console.log('Message input value:', value);
            displayMessage.textContent = value;
            clearError('message');
        });
        
        messageInput.addEventListener('blur', function() {
            if (this.value && !validateMessage(this.value)) {
                showError('message', 'Message should be at least 10 characters long');
            }
        });
        
        messageInput.addEventListener('keyup', function() {
            displayMessage.textContent = this.value || '-';
        });
    } else {
        console.error('Message input or display not found!');
        console.log('messageInput:', messageInput);
        console.log('displayMessage:', displayMessage);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            clearError('name');
            clearError('birthDate');
            clearError('gender');
            clearError('message');
            
            let isValid = true;
            
            const name = nameInput.value.trim();
            const birthDate = birthDateInput.value;
            const gender = document.querySelector('input[name="gender"]:checked');
            const message = messageInput.value.trim();

            if (!name) {
                showError('name', 'Name is required');
                isValid = false;
            } else if (!validateName(name)) {
                showError('name', 'Name should only contain letters and spaces');
                isValid = false;
            }
            
            
            if (!birthDate) {
                showError('birthDate', 'Birth date is required');
                isValid = false;
            } else if (!validateBirthDate(birthDate)) {
                showError('birthDate', 'Birth date cannot be in the future');
                isValid = false;
            }
            
            
            if (!gender) {
                showError('gender', 'Please select a gender');
                isValid = false;
            }
            
            
            if (!message) {
                showError('message', 'Message is required');
                isValid = false;
            } else if (!validateMessage(message)) {
                showError('message', 'Message should be at least 10 characters long');
                isValid = false;
            }
            
            
            if (isValid) {
               
                displayName.textContent = name;
                displayBirthDate.textContent = birthDate;
                displayGender.textContent = gender.value;
                displayMessage.textContent = message;
                
                
                alert('Form submitted successfully! Thank you for your message.');
                
                
            } else {
                
                alert('Please fix the errors in the form before submitting.');
            }
        });
    }
    
   
    document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
   
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav a');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

window.addEventListener('load', function() {
    const displayElements = [
        'displayName',
        'displayBirthDate', 
        'displayGender',
        'displayMessage'
    ];
    
    displayElements.forEach(id => {
        const element = document.getElementById(id);
        if (element && !element.textContent) {
            element.textContent = '-';
        }
    });
});