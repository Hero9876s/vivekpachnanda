document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // THEME TOGGLE LOGIC
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const htmlElement = document.documentElement;
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==========================================
    // NAVBAR STICKY & HAMBURGER MENU
    // ==========================================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // ==========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in class to elements we want to animate
    document.querySelectorAll('.section-title, .card, .timeline-item, .edu-card, .skill-group').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ==========================================
    // MODAL LOGIC FOR CERTIFICATES
    // ==========================================
    const modal = document.getElementById('certModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Close modal when clicking X
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Close modal when clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});

// Certificate Data Store
const certData = {
    'cert-aws': {
        title: 'AWS Academy Graduate',
        desc: 'Cloud Foundations by AWS',
        date: 'Apr\' 25',
        icon: 'fa-aws',
        image: 'Screenshot 2026-03-15 160627.png'
    },
    'cert-oracle-ai': {
        title: 'Oracle Certified Generative AI Professional',
        desc: 'Certification from Oracle University focused on generative AI models and applications.',
        date: 'Jan\' 26',
        icon: 'fa-robot',
        image: 'Screenshot 2026-03-15 160733.png'
    },
    'cert-oracle-arch': {
        title: 'Oracle Certified Architect Associate',
        desc: 'Architect Associate certification from Oracle University.',
        date: 'Oct\' 25',
        icon: 'fa-server',
        image: 'Screenshot 2026-03-15 160819.png'
    },
    'cert-oracle-net': {
        title: 'Oracle Certified Networking Professional',
        desc: 'Certification from Oracle University demonstrating expertise in network architecture and implementation.',
        date: 'Oct\' 25',
        icon: 'fa-network-wired',
        image: 'Screenshot 2026-03-15 160905.png'
    },
    'cert-dsa': {
        title: 'DSA using C++',
        desc: 'Completed training in core Data Structures and Algorithms using C++.',
        date: 'Jun\' 25',
        icon: 'fa-code',
        image: 'Screenshot 2026-03-15 160942.png'
    },
    'cert-runnerup': {
        title: 'Runner Up - Literary Championship',
        desc: 'Achievement as Runner Up in quiz competition in Literary Championship.',
        date: '2025',
        icon: 'fa-trophy',
        image: 'Screenshot 2026-03-15 161106.png'
    },
    'cert-rwd': {
        title: 'Responsive Web Design',
        desc: 'Comprehensive certification in building responsive, mobile-first web applications using HTML5 and CSS3.',
        date: 'Jan\' 24',
        icon: 'fa-mobile-screen',
        image: 'Screenshot 2026-03-15 161233.png'
    },
    'cert-nptel': {
        title: 'Social Networking - MOOC',
        desc: 'Certification by NPTEL - IIT Madras focusing on social networking algorithms and structures.',
        date: 'Apr\' 25',
        icon: 'fa-users',
        image: 'cert-6.png'
    }
};

window.openModal = function(certId) {
    const modal = document.getElementById('certModal');
    const data = certData[certId];
    
    if (data) {
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalDesc').textContent = data.desc;
        document.getElementById('modalDate').textContent = data.date;
        
        // Update Image
        const modalImg = document.getElementById('modalImg');
        if (data.image) {
            modalImg.src = data.image;
            modalImg.style.display = 'block';
        } else {
            modalImg.style.display = 'none';
        }
        
        // Update Icon
        const iconEl = document.querySelector('.modal-header .modal-icon');
        iconEl.className = `fa-solid ${data.icon} modal-icon`; 
        // fallback for brands
        if(data.icon === 'fa-aws' || data.icon === 'fa-hackerrank') {
            iconEl.className = `fa-brands ${data.icon} modal-icon`;
        }
        
        modal.classList.add('show');
    }
};
