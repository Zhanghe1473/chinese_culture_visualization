// Enhanced module loader script to fix issues with dynamic content loading

/**
 * Initializes the module loader
 * Binds navigation events, implements module dynamic loading
 */
function initModuleLoader() {
    console.log('Initializing module loader...');

    // Get all navigation items
    const navItems = document.querySelectorAll('.nav-item');

    // Get dynamic content container
    const dynamicContent = document.getElementById('dynamic-content');

    // If dynamic content container not found, exit
    if (!dynamicContent) {
        console.error('Error: Dynamic content container not found!');
        return;
    }

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
            loadModule(moduleId, dynamicContent);

            // Update navigation active state
            updateNavActiveState(this);
        });
    });

    // Handle navigation buttons with data-navigate-to attribute
    const moduleButtons = document.querySelectorAll('[data-navigate-to]');
    moduleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-navigate-to');
            console.log(`Navigation button clicked: ${moduleId}`);

            // Find corresponding navigation item and trigger click event
            const navItem = document.querySelector(`.nav-item[data-module="${moduleId}"]`);
            if (navItem) {
                navItem.click();
            } else {
                console.error(`Error: Navigation item not found: ${moduleId}`);

                // If navigation item not found, load module directly
                loadModule(moduleId, dynamicContent);
            }
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
            // If specified module not found, load home
            const homeNavItem = document.querySelector('.nav-item[data-module="home"]');
            if (homeNavItem) {
                homeNavItem.click();
            } else {
                // If no home navigation item, load module directly
                loadModule(moduleParam, dynamicContent);
            }
        }
    } else {
        console.log('Loading default home module');
        // Load home module by default
        const homeNavItem = document.querySelector('.nav-item[data-module="home"]');
        if (homeNavItem) {
            homeNavItem.click();
        } else {
            // If no home navigation item, load home module directly
            loadModule('home', dynamicContent);
        }
    }
}

/**
 * Loads a specific module's content
 * @param {string} moduleId - The module ID
 * @param {HTMLElement} container - The container element
 */
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
            // Update container content
            container.innerHTML = html;

            // Log the loaded content
            console.log(`Module ${moduleId} content loaded successfully`);

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

            // Initialize charts if echarts is available
            if (typeof echarts !== 'undefined') {
                console.log('Initializing charts...');
                if (typeof initializeCharts === 'function') {
                    setTimeout(initializeCharts, 100);
                }
                if (typeof initializeMoreCharts === 'function') {
                    setTimeout(initializeMoreCharts, 200);
                }
            }

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
                        <button class="btn btn-primary" onclick="retryLoadModule('${moduleId}')">重试</button>
                        <button class="btn btn-secondary" onclick="loadFallbackContent('${moduleId}')">加载简化内容</button>
                    </div>
                </div>
            `;
        })
        .finally(() => {
            // Hide loading indicator
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
            setTimeout(initializeCharts, 100);
        }

        // If more charts initialization function exists, call it
        if (typeof initializeMoreCharts === 'function') {
            setTimeout(initializeMoreCharts, 200);
        }

        // If module has its own initialization function, call it
        const moduleInitFunction = window[`init${moduleId.charAt(0).toUpperCase() + moduleId.slice(1)}`];
        if (typeof moduleInitFunction === 'function') {
            setTimeout(moduleInitFunction, 300);
        }

        // Initialize scroll animations
        setTimeout(initScrollAnimations, 400);

        // Rebind navigation buttons inside the module
        setTimeout(bindNavigationButtons, 500);
    };

    // Load main script files if they're not already loaded
    loadMainScripts();
}