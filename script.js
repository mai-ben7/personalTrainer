// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    }
});

// Session Card Selection on Scheduling Page
const sessionCards = document.querySelectorAll('.session-card');
const sessionTypeSelect = document.getElementById('sessionType');

sessionCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove selected class from all cards
        sessionCards.forEach(c => c.classList.remove('selected'));
        // Add selected class to clicked card
        card.classList.add('selected');
        
        // Update the select dropdown
        const sessionType = card.getAttribute('data-session');
        if (sessionTypeSelect && sessionType) {
            sessionTypeSelect.value = sessionType;
        }
    });
});

// Update session cards when dropdown changes
if (sessionTypeSelect) {
    sessionTypeSelect.addEventListener('change', function() {
        sessionCards.forEach(card => {
            card.classList.remove('selected');
            if (card.getAttribute('data-session') === this.value) {
                card.classList.add('selected');
            }
        });
    });
}

// Form Validation and Submission
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const goals = [];
        
        // Collect selected goals
        document.querySelectorAll('input[name="goals"]:checked').forEach(checkbox => {
            goals.push(checkbox.value);
        });
        
        // Validate required fields
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff0040';
            } else {
                field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
        
        // Check if at least one goal is selected
        if (goals.length === 0) {
            isValid = false;
            alert('Please select at least one training goal.');
            return;
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage();
            
            // In a real application, you would send the data to a server
            console.log('Form submitted successfully:', {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                sessionType: formData.get('sessionType'),
                preferredDate: formData.get('preferredDate'),
                preferredTime: formData.get('preferredTime'),
                experience: formData.get('experience'),
                goals: goals,
                injuries: formData.get('injuries'),
                message: formData.get('message')
            });
        } else {
            showErrorMessage('Please fill in all required fields.');
        }
    });
}

// Success Message Function
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #00bfff, #0099cc);
            color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            max-width: 400px;
            width: 90%;
        ">
            <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem; color: #fff;"></i>
            <h3 style="margin-bottom: 1rem; font-family: 'Oswald', sans-serif;">Booking Request Sent!</h3>
            <p style="margin-bottom: 1.5rem;">Thank you for your interest! Marcus will contact you within 24 hours to confirm your session details.</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: rgba(255, 255, 255, 0.2);
                border: 2px solid white;
                color: white;
                padding: 0.5rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
            ">Close</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9999;
        " onclick="this.parentElement.remove()"></div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Reset form
    if (bookingForm) {
        bookingForm.reset();
        sessionCards.forEach(card => card.classList.remove('selected'));
    }
}

// Error Message Function
function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ff0040, #cc0033);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        ">
            <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
            ${message}
        </div>
    `;
    
    document.body.appendChild(errorMessage);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-menu.active {
        display: flex !important;
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background: rgba(26, 26, 26, 0.98);
        flex-direction: column;
        padding: 2rem 0;
        backdrop-filter: blur(10px);
    }
    
    .nav-menu.active li {
        margin: 0.5rem 0;
        text-align: center;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.program-card, .testimonial-card, .benefit-item, .session-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Set minimum date for booking form
const dateInput = document.getElementById('preferredDate');
if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
}

// Program card hover effects
document.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Testimonial carousel effect (if more testimonials are added later)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    if (testimonials.length > 3) {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.display = 'none';
            if (index >= currentTestimonial && index < currentTestimonial + 3) {
                testimonial.style.display = 'block';
            }
        });
        
        currentTestimonial = (currentTestimonial + 1) % (testimonials.length - 2);
    }
}

// Auto-rotate testimonials every 5 seconds if there are more than 3
if (testimonials.length > 3) {
    setInterval(rotateTestimonials, 5000);
}

// Custom checkbox styling
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const checkmark = this.nextElementSibling;
        if (checkmark && checkmark.classList.contains('checkmark')) {
            if (this.checked) {
                checkmark.style.backgroundColor = '#00bfff';
                checkmark.style.borderColor = '#00bfff';
            } else {
                checkmark.style.backgroundColor = 'transparent';
                checkmark.style.borderColor = '#00bfff';
            }
        }
    });
});

// Add loading state to form submission
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    button.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

// Enhanced form submission with loading state
if (bookingForm) {
    const submitButton = bookingForm.querySelector('button[type="submit"]');
    
    bookingForm.addEventListener('submit', function(e) {
        if (submitButton && !submitButton.disabled) {
            addLoadingState(submitButton);
        }
    });
}

console.log('Elite Strength Coach website loaded successfully! 💪');