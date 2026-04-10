/**
 * Main Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Fix layout on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                navMenu.style.display = ''; // Reset inline style so desktop flex applies
            }
            if (typeof ScrollTrigger !== 'undefined') {
                setTimeout(() => ScrollTrigger.refresh(), 100);
            }
        });
    }

    // Lazy load images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });

    // Before/After Slider Logic
    const baSliders = document.querySelectorAll('.ba-slider');
    baSliders.forEach(slider => {
        const handle = slider.querySelector('.ba-handle');
        const beforeImg = slider.querySelector('.ba-before');
        let isResizing = false;

        const startResizing = (e) => {
            isResizing = true;
            slider.classList.add('resizing');
        };

        const stopResizing = () => {
            isResizing = false;
            slider.classList.remove('resizing');
        };

        const updateSlider = (e) => {
            if (!isResizing) return;
            let rect = slider.getBoundingClientRect();
            let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
            let width = Math.max(0, Math.min(x, rect.width));
            let percent = (width / rect.width) * 100;
            
            handle.style.left = percent + '%';
            beforeImg.style.width = percent + '%';
        };

        if (handle) {
            handle.addEventListener('mousedown', startResizing);
            window.addEventListener('mouseup', stopResizing);
            window.addEventListener('mousemove', updateSlider);

            handle.addEventListener('touchstart', startResizing);
            window.addEventListener('touchend', stopResizing);
            window.addEventListener('touchmove', updateSlider);
        }
    });
});
