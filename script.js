// script.js

document.addEventListener('DOMContentLoaded', (event) => {
    // Mobile Navigation Toggle
    const toggler = document.querySelector('#toggler');
    const navbar = document.querySelector('.navbar');

    if (toggler && navbar) { // Check if elements exist
        toggler.addEventListener('change', function() {
            navbar.classList.toggle('active'); // Simplified toggle
        });
    }


    // Scrolling and Active Section Highlighting (with debouncing)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    let scrollTimeout;

    function handleScroll() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 60) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        }, 100); // Debounce delay of 100ms
    }


    window.addEventListener('scroll', handleScroll); // Attach scroll listener to window



    // Add to Cart Functionality (with Local Storage)
    const cartBtns = document.querySelectorAll('.cart-btn');
    const cartCount = document.querySelector('.fas.fa-shopping-cart');

    function updateCartCount() {
        let count = localStorage.getItem('cartCount') || 0;
        count = parseInt(count); // Ensure count is a number

        cartCount.setAttribute('data-count', count);
        if (count > 0) {
            cartCount.classList.add('active');
        } else {
            cartCount.classList.remove('active');
        }

    }
    updateCartCount();


    cartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let count = localStorage.getItem('cartCount') || 0;
            count = parseInt(count) + 1; // Increment after parsing
            localStorage.setItem('cartCount', count); // Store updated count
            updateCartCount();
        });

    });


    // Heart Icon Toggle (with Local Storage)
    const heartIcons = document.querySelectorAll('.fa-heart');

    heartIcons.forEach(icon => {
        const itemId = icon.getAttribute('data-item-id');  // Assuming you add data-item-id to icons
        const isFavorite = localStorage.getItem(`favorite_${itemId}`) === 'true'; // Check local storage
        icon.classList.toggle('active', isFavorite); // Set initial state

        icon.addEventListener('click', () => {
            icon.classList.toggle('active'); // Toggle visually
            localStorage.setItem(`favorite_${itemId}`, icon.classList.contains('active')); // Update storage
        });
    });




    // User Icon Placeholder
    const userIcon = document.querySelector('.fas.fa-user');

    if(userIcon){  // Check if userIcon element exists
        userIcon.addEventListener('click', () => {
            alert('User profile feature coming soon!');
        });
    }

});

