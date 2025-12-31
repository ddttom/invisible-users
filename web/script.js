// The Invisible Users - Website JavaScript
// Emphasizing accessibility and agent-friendly patterns

(function() {
    'use strict';

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

            // Toggle menu visibility
            navMenu.classList.toggle('active');

            // Update ARIA attribute for accessibility
            navToggle.setAttribute('aria-expanded', !isExpanded);

            // Visual toggle for hamburger icon
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking menu links
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navToggle.contains(event.target) || navMenu.contains(event.target);

            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
            }
        });
    }

    // Smooth Scroll with offset for fixed nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Don't prevent default for # only (top of page)
            if (href === '#') {
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, href);

                // Focus the target for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation class
    const animatedElements = document.querySelectorAll('.problem-card, .chapter-card, .audience-card, .testimonial-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add basic analytics tracking (placeholder - replace with your analytics)
    function trackEvent(category, action, label) {
        // Example: Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }

        // Console log for development
        console.log('Event tracked:', category, action, label);
    }

    // Track CTA button clicks
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonHref = this.getAttribute('href');
            trackEvent('CTA', 'click', buttonText + ' - ' + buttonHref);
        });
    });

    // Track section visibility
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id || 'unnamed-section';
                trackEvent('Section', 'view', sectionId);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });

    // Form validation (if forms are added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Email signup forms
    const emailForms = document.querySelectorAll('form[data-type="email-signup"]');
    emailForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            // Clear previous error messages
            const existingError = this.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }

            // Validate email
            if (!email) {
                showError(this, 'Email is required');
                return;
            }

            if (!validateEmail(email)) {
                showError(this, 'Please enter a valid email address');
                return;
            }

            // Submit form (replace with actual submission logic)
            console.log('Email submitted:', email);
            trackEvent('Form', 'submit', 'email-signup');

            // Show success message
            showSuccess(this, 'Thanks! Check your email for the free chapter.');

            // Reset form
            this.reset();
        });
    });

    function showError(form, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.setAttribute('role', 'alert');
        errorDiv.style.cssText = 'color: #ef4444; margin-top: 0.5rem; font-size: 0.875rem;';
        errorDiv.textContent = message;

        form.appendChild(errorDiv);

        // Focus the error message for screen readers
        errorDiv.setAttribute('tabindex', '-1');
        errorDiv.focus();
    }

    function showSuccess(form, message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.setAttribute('role', 'alert');
        successDiv.style.cssText = 'color: #10b981; margin-top: 0.5rem; font-size: 0.875rem; font-weight: 600;';
        successDiv.textContent = message;

        form.appendChild(successDiv);

        // Focus the success message for screen readers
        successDiv.setAttribute('tabindex', '-1');
        successDiv.focus();

        // Remove after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Pricing card interaction tracking
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const packageName = this.querySelector('h3').textContent;
            trackEvent('Pricing', 'hover', packageName);
        });
    });

    // Chapter card interaction tracking
    document.querySelectorAll('.chapter-card').forEach(card => {
        card.addEventListener('click', function() {
            const chapterName = this.querySelector('h3').textContent;
            trackEvent('Chapter', 'click', chapterName);
        });
    });

    // Exit intent detection (simple version)
    let exitIntentShown = false;
    document.addEventListener('mouseout', function(e) {
        if (!exitIntentShown && e.clientY < 0) {
            exitIntentShown = true;
            trackEvent('Exit Intent', 'trigger', 'mouse-leave-top');

            // You could show a modal or special offer here
            console.log('Exit intent detected - could show offer modal');
        }
    });

    // Scroll depth tracking
    let scrollDepths = [25, 50, 75, 100];
    let scrollDepthsReached = [];

    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !scrollDepthsReached.includes(depth)) {
                scrollDepthsReached.push(depth);
                trackEvent('Scroll Depth', depth + '%', window.location.pathname);
            }
        });
    });

    // Time on page tracking
    let timeOnPage = 0;
    const timeInterval = setInterval(function() {
        timeOnPage += 10; // Track every 10 seconds

        // Log milestones
        if (timeOnPage === 30 || timeOnPage === 60 || timeOnPage === 120 || timeOnPage === 300) {
            trackEvent('Time on Page', timeOnPage + ' seconds', window.location.pathname);
        }
    }, 10000);

    // Clear interval on page unload
    window.addEventListener('beforeunload', function() {
        clearInterval(timeInterval);
    });

    // Print/PDF detection
    window.addEventListener('beforeprint', function() {
        trackEvent('Page Action', 'print', window.location.pathname);
    });

    // Copy detection (useful for content theft monitoring)
    document.addEventListener('copy', function() {
        const selection = window.getSelection().toString();
        if (selection.length > 50) { // Only track substantial copies
            trackEvent('Content', 'copy', 'text-copied-' + selection.length + '-chars');
        }
    });

    // Keyboard navigation enhancement
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add loading states for external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.hostname.includes(window.location.hostname)) {
            // Add external link indicator for accessibility
            link.setAttribute('rel', 'noopener noreferrer');
            link.setAttribute('target', '_blank');

            // Optional: Add visual indicator
            if (!link.querySelector('.external-icon')) {
                const icon = document.createElement('span');
                icon.className = 'external-icon';
                icon.setAttribute('aria-label', '(opens in new tab)');
                icon.textContent = ' ↗';
                icon.style.cssText = 'font-size: 0.75em; opacity: 0.6;';
                link.appendChild(icon);
            }
        }
    });

    // Initialize on DOM ready
    console.log('The Invisible Users website loaded successfully');
    console.log('Agent-friendly patterns implemented:');
    console.log('- Semantic HTML structure');
    console.log('- ARIA attributes for accessibility');
    console.log('- Clear state indicators');
    console.log('- Keyboard navigation support');
    console.log('- Progressive enhancement');
})();
