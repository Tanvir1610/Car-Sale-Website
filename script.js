// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only scroll if the href is not just '#'
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add active class to current navigation item
const currentLocation = location.href;
const menuItems = document.querySelectorAll('nav a');
const dropdownItems = document.querySelectorAll('.dropdown-content a');

menuItems.forEach(item => {
    if(item.href === currentLocation) {
        item.classList.add('active');
        // If the active item is in a dropdown, also activate the parent
        const parentDropdown = item.closest('.dropdown');
        if(parentDropdown) {
            parentDropdown.querySelector('.dropbtn').classList.add('active');
        }
    }
});

dropdownItems.forEach(item => {
    if(item.href === currentLocation) {
        item.classList.add('active');
        // Activate the parent dropdown button
        const parentDropdown = item.closest('.dropdown');
        if(parentDropdown) {
            parentDropdown.querySelector('.dropbtn').classList.add('active');
        }
    }
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');

if(mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Add hover effect for dropdowns on mobile
if(window.innerWidth <= 768) {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            const content = dropdown.querySelector('.dropdown-content');
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
}

function toggleMenu() {
    document.getElementById("mobileNav").classList.add("active");
}

function closeMenu() {
    document.getElementById("mobileNav").classList.remove("active");
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const popup = document.getElementById('popupOverlay');
        const popupContent = popup.querySelector('.popup-content');
        
        // Add animation class based on screen size
        if (window.innerWidth <= 640) {
            popupContent.style.animation = 'popIn 0.3s ease-out forwards';
        } else {
            popupContent.style.animation = 'popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        }
        
        popup.classList.add('active');
        
        // Adjust popup position based on screen size
        adjustPopupPosition();
    }, 500);
});

// Handle window resize
window.addEventListener('resize', () => {
    if (document.getElementById('popupOverlay').classList.contains('active')) {
        adjustPopupPosition();
    }
});

// Function to adjust popup position
function adjustPopupPosition() {
    const popup = document.getElementById('popupOverlay');
    const popupContent = popup.querySelector('.popup-content');
    
    // Reset any previous styles
    popupContent.style.height = '';
    popupContent.style.maxHeight = '';
    
    // Adjust based on screen size
    if (window.innerHeight <= 600) {
        // For very small screens, use full height
        popupContent.style.height = '100%';
        popupContent.style.maxHeight = '100vh';
    } else if (window.innerWidth <= 640) {
        // For mobile screens
        popupContent.style.maxHeight = '95vh';
    } else {
        // For larger screens
        popupContent.style.maxHeight = '90vh';
    }
}

// Close popup function with animation
function closePopup() {
    const popup = document.getElementById('popupOverlay');
    const popupContent = popup.querySelector('.popup-content');
    
    // Add closing animation
    popupContent.style.animation = 'popIn 0.3s ease-in reverse';
    
    // Remove active class after animation
    setTimeout(() => {
        popup.classList.remove('active');
        popupContent.style.animation = '';
    }, 300);
}

// Add mouse movement effect to 3D text
document.addEventListener('mousemove', (e) => {
    const texts = document.querySelectorAll('.text-3d, .text-3d-sub');
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;

    texts.forEach(text => {
        text.style.transform = `rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
    });
});