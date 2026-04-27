// app.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // 2. Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "System Administrator", 
        "DevOps Engineer", 
        "AI Enthusiast", 
        "Problem Solver"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isWaiting) {
            setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
                type();
            }, 2000); // Wait 2 seconds before deleting
            return;
        }

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        // If word is completely typed
        if (!isDeleting && charIndex === currentWord.length) {
            isWaiting = true;
            typeSpeed = 100; // Next call will trigger the wait block
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);

    // 3. Scroll Reveal Animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });

    function revealSections() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        sections.forEach(section => {
            const elementTop = section.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                section.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealSections);
    revealSections(); // Trigger on initial load

    // 4. Active Navigation Link Highlighting
    const navLinksDesktop = document.querySelectorAll('.md\\:block a');
    const navLinksMobile = document.querySelectorAll('#mobile-menu a');
    
    function updateActiveNav() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100; // Offset for navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Add visual cue for active link (Desktop)
        navLinksDesktop.forEach(link => {
            link.classList.remove('text-neon-blue');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('text-neon-blue');
            }
        });
        
        // Add visual cue for active link (Mobile)
        navLinksMobile.forEach(link => {
            link.classList.remove('text-neon-blue');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('text-neon-blue');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
});
