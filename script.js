// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Carousel functionality for birthday wishes
let currentWishIndex = 0;
const wishCards = document.querySelectorAll('.wish-card');
const dots = document.querySelectorAll('.dot');

function showWish(index) {
    // Hide all wish cards
    wishCards.forEach(card => {
        card.style.display = 'none';
        card.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current wish card
    if (wishCards[index]) {
        wishCards[index].style.display = 'block';
        wishCards[index].classList.add('active');
    }
    
    // Add active class to current dot
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function changeWish(direction) {
    currentWishIndex += direction;
    
    if (currentWishIndex >= wishCards.length) {
        currentWishIndex = 0;
    } else if (currentWishIndex < 0) {
        currentWishIndex = wishCards.length - 1;
    }
    
    showWish(currentWishIndex);
}

function currentWish(index) {
    currentWishIndex = index - 1;
    showWish(currentWishIndex);
}

// Auto-rotate wishes every 5 seconds
setInterval(() => {
    changeWish(1);
}, 5000);

// Floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart floating-heart';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.color = '#ff6b9d';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.opacity = '0.7';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    
    document.body.appendChild(heart);
    
    const animation = heart.animate([
        { transform: 'translateY(0px) rotate(0deg)', opacity: '0.7' },
        { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: '0' }
    ], {
        duration: Math.random() * 3000 + 3000,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => {
        heart.remove();
    };
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 2000);

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('aos-animate');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Show first wish card
    showWish(0);
    
    // Add click event listeners to navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Add hover effects to memory cards
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create a ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 107, 157, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add confetti effect on page load
    createConfetti();
});

// Confetti animation
function createConfetti() {
    const colors = ['#ff6b9d', '#ffd700', '#667eea', '#f093fb', '#c44569'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '999';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: '1' },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`, opacity: '0' }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            confetti.remove();
        };
    }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .aos-animate {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .wish-card {
        display: none;
    }
    
    .wish-card.active {
        display: block;
    }
    
    .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255,255,255,0.5);
        display: inline-block;
        margin: 0 5px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .dot.active {
        background: #ffd700;
        transform: scale(1.2);
    }
    
    .carousel-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
        gap: 1rem;
    }
    
    .carousel-btn {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        padding: 10px 15px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .carousel-btn:hover {
        background: rgba(255,255,255,0.3);
        transform: scale(1.1);
    }
    
    .floating-hearts {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }
    
    .floating-hearts i {
        position: absolute;
        color: rgba(255,255,255,0.3);
        animation: float-heart 6s ease-in-out infinite;
    }
    
    .heart-1 { top: 20%; left: 10%; animation-delay: 0s; }
    .heart-2 { top: 60%; left: 80%; animation-delay: 1s; }
    .heart-3 { top: 40%; left: 60%; animation-delay: 2s; }
    .heart-4 { top: 80%; left: 20%; animation-delay: 3s; }
    .heart-5 { top: 30%; left: 90%; animation-delay: 4s; }
    
    .scroll-indicator {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 2rem;
        animation: bounce 2s infinite;
        cursor: pointer;
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
        40% { transform: translateX(-50%) translateY(-10px); }
        60% { transform: translateX(-50%) translateY(-5px); }
    }
    
    .hero-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .btn-primary {
        background: linear-gradient(135deg, #ff6b9d, #c44569);
    }
    
    .btn-secondary {
        background: rgba(255,255,255,0.2);
        border: 2px solid white;
    }
    
    .btn-secondary:hover {
        background: rgba(255,255,255,0.3);
    }
    
    .memory-icon {
        margin-bottom: 1rem;
    }
    
    .reason-number {
        font-size: 2rem;
        font-weight: bold;
        color: #ff6b9d;
        margin-bottom: 1rem;
    }
    
    .reason-content h3 {
        margin-bottom: 0.5rem;
    }
    
    .gallery-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 200px;
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        border-radius: 15px;
        transition: all 0.3s ease;
    }
    
    .gallery-item:hover .gallery-placeholder {
        background: linear-gradient(135deg, #ff6b9d, #c44569);
        color: white;
    }
    
    .gallery-item:hover .gallery-placeholder i {
        color: white;
    }
    
    .message-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .message-header i {
        font-size: 3rem;
        color: #ffd700;
        margin-bottom: 1rem;
    }
    
    .message-footer {
        text-align: center;
        margin-top: 2rem;
    }
`;

document.head.appendChild(style);

// Handle missing images gracefully
function handleImageError(img) {
    img.style.display = 'none';
    const parent = img.parentElement;
    if (parent) {
        parent.style.display = 'none';
    }
}

// Add scroll indicator click event
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            scrollToSection('memories');
        });
    }
    
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});
