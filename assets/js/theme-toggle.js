/**
 * Theme Toggle Logic
 * Saves preference to localStorage
 */
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    
    // Check local storage for theme preference
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateIcon(currentTheme);
    } else {
        // Check system preference if no localStorage theme found
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateIcon('dark');
        }
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });
    });

    // RTL Toggle Support
    const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
    const savedDir = localStorage.getItem('dir');

    if (savedDir) {
        document.documentElement.setAttribute('dir', savedDir);
    }

    rtlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    });

    function updateIcon(theme) {
        toggleBtns.forEach(btn => {
            if (theme === 'dark') {
                btn.innerHTML = '<i class="fas fa-sun"></i>'; // Switch to light icon
            } else {
                btn.innerHTML = '<i class="fas fa-moon"></i>'; // Switch to dark icon
            }
        });
    }
});
