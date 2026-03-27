/**
 * Animations Logic using GSAP
 */
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        
        // Register ScrollTrigger if available
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Hero Animations
        gsap.from('.hero-content h1', {
            y: 50,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from('.hero-content p', {
            y: 30,
            duration: 1,
            delay: 0.2,
            ease: "power3.out"
        });

        gsap.from('.hero-content .btn', {
            y: 20,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.out",
            stagger: 0.1
        });

        // Scroll Animations (using GSAP basic if no ScrollTrigger, but we will assume ScrollTrigger is linked)
        if (typeof ScrollTrigger !== 'undefined') {
            const fadeUps = document.querySelectorAll('.fade-up');
            
            fadeUps.forEach(element => {
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });

            // Staggered lists/cards
            const staggerContainers = document.querySelectorAll('.stagger-container');
            staggerContainers.forEach(container => {
                const items = container.querySelectorAll('.stagger-item');
                if(items.length > 0) {
                    gsap.to(items, {
                        scrollTrigger: {
                            trigger: container,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        },
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: "power2.out"
                    });
                }
            });
        }
    }
});
