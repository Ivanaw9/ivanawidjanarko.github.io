/**
 * Personal Portfolio Website JavaScript
 *
 * This file contains all the interactive functionality for the portfolio website.
 * Main features:
 * - Smooth scrolling navigation
 * - Modal functionality for project details
 * - Responsive behavior enhancements
 * - Performance optimizations
 */

// ===== PROJECT DATA =====
/**
 * Update with actual project information
 * Each project should have: title, description, images, technologies, and links
 */
const projectData = {
    1: {
        title: "SAP ERP Dairy Simulation",
        tags: [
            "Procurement",
            "Inventory Forecasting",
            "Data Visualization",
            "Business Analytics",
            "Supply Chain Optimization",
        ],
        description: `Achieved 2nd place overall by boosting company valuation by over $450,000 through strategic decision-making and supply chain optimization. Managed procurement and inventory for six dairy products across three German regions in a sustainability-focused ERP simulation. 

Forecasted demand, executed push/pull strategies, and reduced carbon tax impact by minimizing the carbon footprint through data-driven logistics planning. Built and integrated real-time dashboards with SAP and Tableau to track performance and support forecasting analysis.`,
        images: [
            "images/Project_1_erp/dashboard.png",
            "images/Project_1_erp/inventory_trend.png",
            "images/Project_1_erp/product_delivered.png",
        ],
        technologies: ["SAP ERP", "Tableau"],
        links: [],
    },
    2: {
        title: "Project Future Interface Prototype",
        tags: [
            "Use Case Modeling",
            "Sequence Diagrams",
            "UI Design",
            "Prototyping",
            "Agile Project Management",
        ],
        description: `A responsive web-based prototype built with HTML, CSS, and Bootstrap to streamline client onboarding, project evaluation, and student recruitment for Project Future. System processes were modeled using use case and sequence diagrams, and development was managed with Jira and agile methods`,
        images: [
            "images/Project_2_prototype/home_page.png",
            "images/Project_2_prototype/accept_student.png",
            "images/Project_2_prototype/submit_final_doc.png",
        ],
        technologies: ["HTML", "CSS", "Jira", "Bootstrap", "Microsoft Visio"],
        links: [
            {
                text: "Live Demo",
                url: "https://ivanaw9.github.io/Project_Future_Prototype/",
                icon: "fas fa-external-link-alt",
            },
            {
                text: "GitHub",
                url: "https://github.com/Ivanaw9/Project_Future_Prototype",
                icon: "fab fa-github",
            },
        ],
    },
    3: {
        title: "Monster Video Database System",
        tags: [
            "Database Design",
            "Relational Schemas",
            "Data Normalization",
            "DDL Scripting",
            "SQL Queries & Views",
            "Data Integrity",
        ],
        description: `A responsive portfolio website showcasing creative work with smooth animations 
        and modern design principles. Features include lazy loading images, optimized performance, 
        SEO-friendly structure, and accessibility compliance. The site includes a content management 
        system for easy updates, contact form integration, and analytics tracking. Built with 
        vanilla technologies for optimal performance and loading speed.`,
        images: [
            "images/Project_3_monster/report.png",
            "images/Project_3_monster/sql_code.png",
            "images/Project_3_monster/relational.png",
            "images/Project_3_monster/erd.png",
        ],
        technologies: ["ERDPlus", "Oracle SQL Developer", "Oracle Apex"],
        links: [],
    },
    4: {
        title: "Accounting System Upgrade Proposal",
        tags: [
            "Business Case Development",
            "Financial Analysis",
            "Project Management",
            "Agile & Waterfall SDLC",
            "Risk Management",
            "Process Improvement",
        ],
        description: `An ERP implementation and upgrade project transitioning from QuickBooks to Oracle NetSuite. Features include business case development, budgeting and risk mitigation, stakeholder governance, project scheduling, resource allocation, and hybrid Waterfall-Agile SDLC planning. The project enhances scalability, compliance, and operational efficiency while providing long-term financial savings and improved process management.`,
        images: [
            "images/Project_4_AIS/microsoft_project.png",
            "images/Project_4_AIS/gantt_chart.png",
        ],
        technologies: ["Oracle NetSuite", "Microsoft Project", "Agile"],
        links: [],
    },
    5: {
        title: "Bloomcha Bakes Website Prototype",
        tags: ["Github Copilot", "UI/UX Design, Role-based Security"],
        description: `A responsive website prototype for a local baking shop using GitHub Copilot prompting, designed to showcase the menu while incorporating role-based security. The system allows customers to browse the menu and submit inquiries through a contact form, while administrators can log in to manage items—adding or removing products, updating availability, and keeping information accurate.`,
        images: [
            "images/Project_5_bloomcha/homepage.png",
            "images/Project_5_bloomcha/cart.png",
            "images/Project_5_bloomcha/chatbox.png",
        ],
        technologies: [
            "HTML", "CSS", "Python", "Flask Application", "SQLAlchemy", "GitHub Copilot",
        ],
        links: [
            {
                text: "Prototype",
                url: "https://your-prototype-link.com",
                icon: "fas fa-mobile-alt",
            },
            {
                text: "GitHub",
                url: "https://github.com/Ivanaw9/flask-app",
                icon: "fab fa-github",
            },
        ],
    },
    6: {
        title: "Audio-Interactive Bubble Visualization",
        tags: [
            "Audio Visualization",
            "Generative Design",
            "Interactive Media",
            "Real-Time Graphics",
        ],
        description: `an audio-reactive visual installation using TouchDesigner, where colored bubbles dynamically move and change behaviors based on the rhythm and beat of a song. It integrates sound analysis with generative visuals, producing a responsive and immersive experience that blends music with interactive design. The bubbles’ motion and color variation provide a real-time visual interpretation of audio input.`,
        images: [
            "images/Project_6_Interactive/audio.png",
            "images/Project_6_Interactive/gif.gif",
        ],
        technologies: ["TouchDesigner"],
        links: [],
    },
};

// ===== GLOBAL VARIABLES =====
let currentModal = null;
let isModalOpen = false;
let isMobileMenuOpen = false;

// ===== UTILITY FUNCTIONS =====

/**
 * Smooth scroll to a specific section
 * @param {string} sectionId - The ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 80; // Account for fixed navbar height
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });

        // Close mobile menu when navigating
        closeMobileMenu();
    }
}

/**
 * Debounce function to limit the rate of function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Whether to execute immediately
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

/**
 * Check if an element is in the viewport
 * @param {Element} element - The element to check
 * @returns {boolean} - Whether the element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    const navLinks = document.querySelector(".nav-links");
    const mobileToggle = document.querySelector(".mobile-menu-toggle");

    isMobileMenuOpen = !isMobileMenuOpen;

    if (isMobileMenuOpen) {
        navLinks.classList.add("active");
        mobileToggle.classList.add("active");
    } else {
        navLinks.classList.remove("active");
        mobileToggle.classList.remove("active");
    }
}

/**
 * Close mobile menu when clicking on a nav link
 */
function closeMobileMenu() {
    const navLinks = document.querySelector(".nav-links");
    const mobileToggle = document.querySelector(".mobile-menu-toggle");

    navLinks.classList.remove("active");
    mobileToggle.classList.remove("active");
    isMobileMenuOpen = false;
}

// ===== MODAL FUNCTIONALITY =====

/**
 * Open project modal with specific project data
 * @param {number} projectId - The ID of the project to display
 */
function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) {
        console.error(`Project with ID ${projectId} not found`);
        return;
    }

    // Get modal elements
    const modalOverlay = document.getElementById("modalOverlay");
    const modalTitle = document.getElementById("modalTitle");
    const modalTags = document.getElementById("modalTags");
    const modalImages = document.getElementById("modalImages");
    const modalDescription = document.getElementById("modalDescription");
    const modalTechStack = document.getElementById("modalTechStack");
    const modalLinks = document.getElementById("modalLinks");

    // Populate modal content
    modalTitle.textContent = project.title;

    // Add tags
    modalTags.innerHTML = "";
    project.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.className = "modal-tag";
        tagElement.textContent = tag;
        modalTags.appendChild(tagElement);
    });

    // Add images
    modalImages.innerHTML = "";
    project.images.forEach((imageSrc, index) => {
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = `${project.title} - Image ${index + 1}`;
        img.className = "modal-image";
        img.loading = "lazy"; // Lazy loading for performance
        modalImages.appendChild(img);
    });

    // Add description
    modalDescription.textContent = project.description;

    // Add technology stack
    modalTechStack.innerHTML = "";
    project.technologies.forEach((tech) => {
        const techElement = document.createElement("span");
        techElement.className = "tech-item";
        techElement.textContent = tech;
        modalTechStack.appendChild(techElement);
    });

    // Add links
    modalLinks.innerHTML = "";
    project.links.forEach((link) => {
        const linkElement = document.createElement("a");
        linkElement.href = link.url;
        linkElement.className = "modal-link";
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer";
        linkElement.innerHTML = `<i class="${link.icon}"></i> ${link.text}`;
        modalLinks.appendChild(linkElement);
    });

    // Show modal
    modalOverlay.classList.add("active");
    currentModal = projectId;
    isModalOpen = true;

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";

    // Focus management for accessibility
    const modalElement = document.getElementById("projectModal");
    modalElement.focus();
}

/**
 * Close the currently open modal
 */
function closeModal() {
    const modalOverlay = document.getElementById("modalOverlay");
    modalOverlay.classList.remove("active");
    currentModal = null;
    isModalOpen = false;

    // Restore body scrolling
    document.body.style.overflow = "";

    // Return focus to the trigger button for accessibility
    const triggerButton = document.querySelector(
        `[onclick="openModal(${currentModal})"]`,
    );
    if (triggerButton) {
        triggerButton.focus();
    }
}

// ===== KEYBOARD NAVIGATION =====

/**
 * Handle keyboard events for modal navigation
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyboardNavigation(event) {
    if (!isModalOpen) return;

    switch (event.key) {
        case "Escape":
            closeModal();
            break;
        case "Tab":
            // Trap focus within modal
            trapFocus(event);
            break;
    }
}

/**
 * Trap focus within the modal for accessibility
 * @param {KeyboardEvent} event - The keyboard event
 */
function trapFocus(event) {
    const modal = document.getElementById("projectModal");
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
        if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
        }
    } else {
        if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
        }
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====

/**
 * Initialize intersection observer for scroll animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-in");
            }
        });
    }, observerOptions);

    // Observe project cards for staggered animations
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe other elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        ".hero-content, .section-header",
    );
    animatedElements.forEach((element) => observer.observe(element));
}

// ===== RESPONSIVE BEHAVIOR =====

/**
 * Handle responsive behavior changes
 */
function handleResponsiveChanges() {
    const screenWidth = window.innerWidth;

    // Adjust modal behavior for mobile
    if (screenWidth <= 768) {
        // Add touch-friendly modal behaviors
        addMobileModalBehavior();
    }
}

/**
 * Add mobile-specific modal behaviors
 */
function addMobileModalBehavior() {
    const modalOverlay = document.getElementById("modalOverlay");
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    // Add touch events for mobile modal dismissal
    modalOverlay.addEventListener("touchstart", (e) => {
        startY = e.touches[0].clientY;
        isDragging = true;
    });

    modalOverlay.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        currentY = e.touches[0].clientY;
        const diffY = currentY - startY;

        // If swiping down significantly, close modal
        if (diffY > 100) {
            closeModal();
            isDragging = false;
        }
    });

    modalOverlay.addEventListener("touchend", () => {
        isDragging = false;
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====

/**
 * Lazy load images for better performance
 */
function initializeLazyLoading() {
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove("lazy-loading");
                    imageObserver.unobserve(img);
                }
            });
        });

        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll("img[data-src]");
        lazyImages.forEach((img) => imageObserver.observe(img));
    }
}

/**
 * Preload critical resources
 */
function preloadCriticalResources() {
    // Preload hero section background images if any
    const heroImages = document.querySelectorAll(".hero-image img");
    heroImages.forEach((img) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = img.src;
        document.head.appendChild(link);
    });
}

// ===== EVENT LISTENERS =====

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Modal close events
    const modalOverlay = document.getElementById("modalOverlay");
    const modalCloseButton = document.querySelector(".modal-close");

    // Close modal when clicking overlay (but not the modal content)
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal with close button
    modalCloseButton.addEventListener("click", closeModal);

    // Keyboard navigation
    document.addEventListener("keydown", handleKeyboardNavigation);

    // Responsive behavior
    const debouncedResize = debounce(handleResponsiveChanges, 250);
    window.addEventListener("resize", debouncedResize);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            scrollToSection(targetId);
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
        const navLinks = document.querySelector(".nav-links");
        const mobileToggle = document.querySelector(".mobile-menu-toggle");

        if (
            isMobileMenuOpen &&
            !navLinks.contains(e.target) &&
            !mobileToggle.contains(e.target)
        ) {
            closeMobileMenu();
        }
    });

    // Form submission (if contact form exists)
    const contactForm = document.querySelector("#contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", handleFormSubmission);
    }
}

/**
 * Handle contact form submission
 * REPLACE: Implement your actual form handling logic
 * @param {Event} event - The form submission event
 */
function handleFormSubmission(event) {
    event.preventDefault();

    // Add your form handling logic here
    // For example: send to your backend, use a service like Formspree, etc.

    console.log("Form submitted - implement your handling logic");

    // Show success message
    alert("Thank you for your message! I'll get back to you soon.");

    // Reset form
    event.target.reset();
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

/**
 * Enhance accessibility features
 */
function enhanceAccessibility() {
    // Add skip navigation link
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.textContent = "Skip to main content";
    skipLink.className = "skip-link";
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-accent);
        color: white;
        padding: 8px;
        text-decoration: none;
        transition: top 0.3s;
        z-index: 1000;
    `;

    skipLink.addEventListener("focus", () => {
        skipLink.style.top = "6px";
    });

    skipLink.addEventListener("blur", () => {
        skipLink.style.top = "-40px";
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Announce modal state changes to screen readers
    const announceElement = document.createElement("div");
    announceElement.setAttribute("aria-live", "polite");
    announceElement.setAttribute("aria-atomic", "true");
    announceElement.className = "sr-only";
    announceElement.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    `;
    document.body.appendChild(announceElement);

    // Store reference for use in modal functions
    window.announceElement = announceElement;
}

// ===== INITIALIZATION =====

/**
 * Initialize the entire application when DOM is loaded
 */
function initializeApp() {
    console.log("Portfolio website initialized");

    // Initialize all components
    initializeEventListeners();
    initializeScrollAnimations();
    initializeLazyLoading();
    enhanceAccessibility();
    preloadCriticalResources();

    // Handle initial responsive state
    handleResponsiveChanges();

    // Add loaded class to body for CSS animations
    document.body.classList.add("loaded");
}

// ===== APPLICATION STARTUP =====

// Wait for DOM to be fully loaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
} else {
    // DOM is already loaded
    initializeApp();
}

// ===== ERROR HANDLING =====

/**
 * Global error handler for uncaught errors
 */
window.addEventListener("error", (event) => {
    console.error("Global error caught:", event.error);
    // You can add error reporting here (e.g., to a service like Sentry)
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
    // You can add error reporting here
});

// ===== EXPORT FOR TESTING (if needed) =====
// Uncomment if you need to test functions
/*
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openModal,
        closeModal,
        scrollToSection,
        projectData
    };
}
*/
