// Enhanced module loader script to fix issues with dynamic content loading

/**
 * Loads main scripts needed for the application
 */
function loadMainScripts() {
    console.log('Loading main script files');

    // Check if chart-initializer.js is loaded
    if (!document.getElementById('chart-initializer-script')) {
        const chartScript = document.createElement('script');
        chartScript.id = 'chart-initializer-script';
        chartScript.src = '/static/js/chart-initializer.js';
        document.body.appendChild(chartScript);
    }

    // Check if additional.js is loaded
    if (!document.getElementById('additional-script')) {
        const additionalScript = document.createElement('script');
        additionalScript.id = 'additional-script';
        additionalScript.src = '/static/js/additional.js';
        document.body.appendChild(additionalScript);
    }

    // Check if interactive.js is loaded
    if (!document.getElementById('interactive-script')) {
        const interactiveScript = document.createElement('script');
        interactiveScript.id = 'interactive-script';
        interactiveScript.src = '/static/js/interactive.js';
        document.body.appendChild(interactiveScript);
    }

    // Check if data_summary.js is loaded (for data visualization)
    if (!document.getElementById('data-summary-script')) {
        const dataSummaryScript = document.createElement('script');
        dataSummaryScript.id = 'data-summary-script';
        dataSummaryScript.src = '/static/js/data_summary.js';
        document.body.appendChild(dataSummaryScript);
    }

    // Check if fix-buttons.js is loaded
    if (!document.getElementById('fix-buttons-script')) {
        const fixButtonsScript = document.createElement('script');
        fixButtonsScript.id = 'fix-buttons-script';
        fixButtonsScript.src = '/static/js/fix-buttons.js';
        document.body.appendChild(fixButtonsScript);
    }

    console.log('Main scripts loaded');
}

/**
 * Initializes the module loader
 * Binds navigation events, implements module dynamic loading
 */
function initModuleLoader() {
    console.log('Initializing module loader...');

    // Force initialization on page load
    window.addEventListener('load', function() {
        // Get dynamic content container
        const dynamicContent = document.getElementById('dynamic-content');

        // If dynamic content container not found, create one
        if (!dynamicContent) {
            console.warn('Dynamic content container not found, creating one');
            const newContainer = document.createElement('div');
            newContainer.id = 'dynamic-content';
            document.querySelector('.main-content').appendChild(newContainer);

            // Now use this new container
            initNavigation(newContainer);
        } else {
            // Use existing container
            initNavigation(dynamicContent);
        }
    });

    // This function handles navigation setup
    function initNavigation(container) {
        // Get all navigation items
        const navItems = document.querySelectorAll('.nav-item');

        // Add event listeners to navigation items
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                // Get module ID from data-module attribute
                const moduleId = this.getAttribute('data-module');

                // If no module ID, exit
                if (!moduleId) {
                    console.error('Error: Navigation item has no module ID!');
                    return;
                }

                // Log the click event for debugging
                console.log(`Navigation item clicked: ${moduleId}`);

                // Load the corresponding module
                loadModule(moduleId, container);

                // Update navigation active state
                updateNavActiveState(this);
            });
        });

        // Load default module or from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const moduleParam = urlParams.get('module');

        if (moduleParam) {
            console.log(`Loading module from URL parameter: ${moduleParam}`);
            // If module specified in URL, load it
            const targetNavItem = document.querySelector(`.nav-item[data-module="${moduleParam}"]`);
            if (targetNavItem) {
                targetNavItem.click();
            } else {
                // If specified module not found, load directly
                loadModule(moduleParam, container);
            }
        } else {
            console.log('Loading default home module');
            // Load home module by default
            const homeNavItem = document.querySelector('.nav-item[data-module="home"]');
            if (homeNavItem) {
                homeNavItem.click();
            } else {
                // If no home navigation item, load home module directly
                loadModule('home', container);
            }
        }
    }
}

// Make sure initModuleLoader runs
document.addEventListener('DOMContentLoaded', initModuleLoader);

function loadModule(moduleId, container) {
    console.log(`Loading module: ${moduleId}`);

    // Show loading indicator
    showLoading(container);

    // Request module content via AJAX
    fetch(`/module/${moduleId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Make sure we got some content
            if (!html || html.trim() === '') {
                throw new Error('Received empty content from server');
            }

            console.log(`Module ${moduleId} content loaded successfully (length: ${html.length})`);

            // Update container content
            container.innerHTML = html;

            // Log success
            console.log(`Module ${moduleId} content inserted into DOM`);

            // Load module-specific CSS
            loadModuleCSS(moduleId);

            // Load module-specific JS
            loadModuleJS(moduleId);

            // Update browser history
            updateHistory(moduleId);

            // Trigger module loaded event
            triggerModuleLoadedEvent(moduleId);

            // Handle image errors
            handleImageErrors();

            // Bind navigation buttons inside the loaded module
            bindNavigationButtons();

            // Load main scripts before chart initialization
            loadMainScripts();

            // Initialize charts if echarts is available
            if (typeof echarts !== 'undefined') {
                console.log('Initializing charts...');
                if (typeof initializeCharts === 'function') {
                    setTimeout(initializeCharts, 500);
                }
                if (typeof initializeMoreCharts === 'function') {
                    setTimeout(initializeMoreCharts, 800);
                }
            }

            // Make sure loading indicators are hidden
            hideLoading();

            // Force visibility of the container
            container.style.display = 'block';

            // Scroll to top
            window.scrollTo(0, 0);
        })
        .catch(error => {
            console.error(`Error loading module "${moduleId}":`, error);

            // Show error message
            container.innerHTML = `
                <div class="error-container">
                    <div class="error-icon">
                        <i class="fa fa-exclamation-triangle"></i>
                    </div>
                    <h3 class="error-title">模块加载失败</h3>
                    <p class="error-message">${error.message}</p>
                    <div class="error-actions">
                        <button class="btn btn-primary" onclick="window.location.reload()">刷新页面</button>
                        <button class="btn btn-secondary" onclick="loadModule('home', document.getElementById('dynamic-content'))">返回首页</button>
                    </div>
                </div>
            `;
        })
        .finally(() => {
            // Ensure loading indicator is hidden
            hideLoading();
        });
}
/**
 * Bind navigation buttons inside loaded modules
 */
function bindNavigationButtons() {
    const navButtons = document.querySelectorAll('[data-navigate-to]');
    navButtons.forEach(button => {
        // Remove existing event listeners by cloning the node
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        newButton.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-navigate-to');
            console.log(`Navigation button clicked inside module: ${moduleId}`);

            // Find corresponding navigation item
            const navItem = document.querySelector(`.nav-item[data-module="${moduleId}"]`);
            if (navItem) {
                navItem.click();
            } else {
                // If navigation item not found, load module directly
                const dynamicContent = document.getElementById('dynamic-content');
                if (dynamicContent) {
                    loadModule(moduleId, dynamicContent);
                }
            }
        });
    });
}

/**
 * Updates navigation item active state
 * @param {HTMLElement} activeItem - The current active navigation item
 */
function updateNavActiveState(activeItem) {
    // Remove active class from all navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to current item
    activeItem.classList.add('active');
}

/**
 * Shows loading indicator
 * @param {HTMLElement} container - The content container element
 */
function showLoading(container) {
    // Create loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'module-loading';
    loadingIndicator.innerHTML = `
        <div class="loading-spinner"></div>
        <p>正在加载模块内容...</p>
    `;

    // Clear container and add loading indicator
    container.innerHTML = '';
    container.appendChild(loadingIndicator);
}

/**
 * Hides loading indicator
 */
function hideLoading() {
    // Remove all loading indicators
    document.querySelectorAll('.module-loading').forEach(el => {
        el.remove();
    });
}

/**
 * Update browser history
 * @param {string} moduleId - The module ID
 */
function updateHistory(moduleId) {
    const url = new URL(window.location);
    url.searchParams.set('module', moduleId);
    window.history.pushState({moduleId: moduleId}, '', url);
}

/**
 * Trigger module loaded event
 * @param {string} moduleId - The module ID
 */
function triggerModuleLoadedEvent(moduleId) {
    const event = new CustomEvent('moduleLoaded', {
        detail: {
            moduleId: moduleId
        }
    });
    document.dispatchEvent(event);
}

/**
 * Handle image errors
 */
function handleImageErrors() {
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            // Replace broken image with placeholder
            this.src = '/static/images/placeholder.png';
            this.alt = 'Image not available';
        };
    });
}

/**
 * Loads module-specific CSS
 * @param {string} moduleId - The module ID
 */
function loadModuleCSS(moduleId) {
    // Check if CSS already loaded
    const cssId = `css-module-${moduleId}`;
    if (document.getElementById(cssId)) {
        return; // Already loaded, no need to load again
    }

    // Create link element to load CSS
    const link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.href = `/static/css/modules/${moduleId}.css`;
    link.setAttribute('data-module-resource', 'true');

    // Add to head
    document.head.appendChild(link);

    // Handle loading error
    link.onerror = function() {
        console.log(`Module CSS file does not exist: ${moduleId}.css (This is normal if there is no specific CSS file)`);
        // Remove invalid link element
        this.remove();
    };
}

/**
 * Loads module-specific JS
 * @param {string} moduleId - The module ID
 */
function loadModuleJS(moduleId) {
    // Check if JS already loaded
    const jsId = `js-module-${moduleId}`;
    if (document.getElementById(jsId)) {
        return; // Already loaded, no need to load again
    }

    // Create script element to load JS
    const script = document.createElement('script');
    script.id = jsId;
    script.src = `/static/js/modules/${moduleId}.js`;
    script.setAttribute('data-module-resource', 'true');

    // Add to body end
    document.body.appendChild(script);

    // Handle loading error
    script.onerror = function() {
        console.log(`Module JS file does not exist: ${moduleId}.js (This is normal if there is no specific JS file)`);
        // Remove invalid script element
        this.remove();
    };

    // Initialize charts and animations after JS loaded
    script.onload = function() {
        console.log(`Module JS loaded: ${moduleId}.js`);

        // If chart initialization function exists, call it
        if (typeof initializeCharts === 'function') {
            setTimeout(initializeCharts, 300);
        }

        // If more charts initialization function exists, call it
        if (typeof initializeMoreCharts === 'function') {
            setTimeout(initializeMoreCharts, 500);
        }

        // If module has its own initialization function, call it
        const moduleInitFunction = window[`init${moduleId.charAt(0).toUpperCase() + moduleId.slice(1)}`];
        if (typeof moduleInitFunction === 'function') {
            setTimeout(moduleInitFunction, 700);
        }

        // Initialize scroll animations
        setTimeout(initScrollAnimations, 900);

        // Rebind navigation buttons inside the module
        setTimeout(bindNavigationButtons, 1000);
    };
}

// Initialize scroll animations
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animation');

    if (scrollElements.length === 0) return;

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initial trigger
    handleScrollAnimation();

    console.log('Scroll animations initialized');
}

// Helper function to ensure script runs on page load
window.addEventListener('load', function() {
    console.log('Window loaded, fixing any remaining issues');

    // Fix for image paths
    document.querySelectorAll('img').forEach(img => {
        if (img.src.includes('static/css/static/')) {
            // Fix incorrect path
            img.src = img.src.replace('static/css/static/', 'static/');
        }
    });

    // Fix for video paths
    document.querySelectorAll('video source').forEach(source => {
        if (source.src && source.src.includes('chinese_culture_intro.mp4')) {
            // Check if file exists by creating a test image
            const testImg = new Image();
            testImg.onload = function() {
                // File exists, do nothing
            };
            testImg.onerror = function() {
                // File doesn't exist, use a placeholder
                const video = source.parentElement;
                const placeholder = document.createElement('div');
                placeholder.className = 'video-placeholder';
                placeholder.textContent = '视频加载失败，请检查文件路径';
                if (video.parentElement) {
                    video.parentElement.appendChild(placeholder);
                    video.style.display = 'none';
                }
            };
            testImg.src = '/static/videos/chinese_culture_intro.jpg';
        }
    });

    // Ensure main scripts are loaded
    loadMainScripts();
});