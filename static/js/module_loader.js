// Enhanced module loader script to implement the specifications from readme1.md

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

            // Load the corresponding module
            loadModule(moduleId, dynamicContent);

            // Update navigation active state
            updateNavActiveState(this);
        });
    });

    // Handle navigation buttons on homepage
    const moduleButtons = document.querySelectorAll('[data-navigate-to]');
    moduleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-navigate-to');

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
        // If chart initialization function exists, call it
        if (typeof initializeCharts === 'function') {
            initializeCharts();
        }

        // If more charts initialization function exists, call it
        if (typeof initializeMoreCharts === 'function') {
            initializeMoreCharts();
        }

        // If module has its own initialization function, call it
        const moduleInitFunction = window[`init${moduleId.charAt(0).toUpperCase() + moduleId.slice(1)}`];
        if (typeof moduleInitFunction === 'function') {
            moduleInitFunction();
        }

        // Initialize scroll animations
        initScrollAnimations();
    };
}

/**
 * Updates browser history
 * @param {string} moduleId - The module ID
 */
function updateHistory(moduleId) {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('module', moduleId);

    // Update URL without reloading page
    window.history.pushState({moduleId: moduleId}, '', newUrl);
}

/**
 * Triggers module loaded event
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
 * Handles image loading errors
 */
function handleImageErrors() {
    // Add onerror handler to all images
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            // Add default style when image loading fails
            this.classList.add('img-error');
            this.alt = this.alt || 'Image loading failed';

            // Try to extract file name from original path as alternate text
            const pathParts = this.src.split('/');
            const fileName = pathParts[pathParts.length - 1];

            // Set default style
            this.style.backgroundColor = '#f8f4e6';
            this.style.border = '1px dashed #ccc';
            this.style.padding = '10px';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.minHeight = '100px';
            this.style.position = 'relative';

            // Insert error message
            const parent = this.parentNode;
            const errorMsg = document.createElement('div');
            errorMsg.className = 'img-error-msg';
            errorMsg.textContent = `图片加载失败: ${fileName}`;
            errorMsg.style.position = 'absolute';
            errorMsg.style.top = '50%';
            errorMsg.style.left = '50%';
            errorMsg.style.transform = 'translate(-50%, -50%)';
            errorMsg.style.color = '#9d2933';
            errorMsg.style.fontSize = '12px';
            errorMsg.style.textAlign = 'center';
            errorMsg.style.width = '80%';
            parent.appendChild(errorMsg);
        };
    });
}

/**
 * Initializes scroll animations
 */
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

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initially trigger scroll animation check
    handleScrollAnimation();
}

/**
 * Retries loading a module
 * @param {string} moduleId - The module ID
 */
function retryLoadModule(moduleId) {
    console.log(`Retrying module loading: ${moduleId}`);

    // Get dynamic content container
    const dynamicContent = document.getElementById('dynamic-content');

    if (dynamicContent) {
        // Reload module
        loadModule(moduleId, dynamicContent);
    }
}

/**
 * Loads fallback content for a module
 * @param {string} moduleId - The module ID
 */
function loadFallbackContent(moduleId) {
    const dynamicContent = document.getElementById('dynamic-content');
    if (!dynamicContent) return;

    // Provide simplified content for each module
    switch(moduleId) {
        case 'home':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>华夏瑰宝</h2>
                    <p>探索中华五千年文明的灿烂瑰宝</p>
                    <div class="simple-buttons">
                        <button class="btn" onclick="loadModule('civilization_overview', document.getElementById('dynamic-content'))">文明概述</button>
                        <button class="btn" onclick="loadModule('scientific_achievements', document.getElementById('dynamic-content'))">科学成就</button>
                    </div>
                </div>
            `;
            break;
        case 'civilization_overview':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>中华文明概述</h2>
                    <p>中华文明是世界上历史最悠久的文明之一，从距今约5000年前的新石器时代晚期开始，经历了黄河流域和长江流域文明的诞生与融合，逐渐形成了统一的文化体系。</p>
                </div>
            `;
            break;
        case 'scientific_achievements':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>中国古代科学成就</h2>
                    <p>中国古代科学技术在世界科技发展史上占有重要地位，在天文、数学、医学、农学、工艺等领域取得了丰硕成果，其中尤以四大发明为代表。</p>
                    <h3>四大发明</h3>
                    <ul>
                        <li>造纸术</li>
                        <li>印刷术</li>
                        <li>火药</li>
                        <li>指南针</li>
                    </ul>
                </div>
            `;
            break;
        case 'notable_works':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>中国古代杰出著作</h2>
                    <p>中国古代留下了大量珍贵的典籍著作，包括经史子集四大类。</p>
                </div>
            `;
            break;
        case 'notable_scholars':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>中国古代杰出学者</h2>
                    <p>中国历史上涌现出众多杰出的思想家、科学家、文学家和艺术家，他们的成就对中国和世界产生了深远影响。</p>
                </div>
            `;
            break;
        case 'cultural_stories':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>中国古代文化典故</h2>
                    <p>中国古代流传下来的文化典故蕴含丰富的历史知识和哲理智慧，是中华文化的重要组成部分。</p>
                </div>
            `;
            break;
        case 'cultural_customs':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>中国传统文化习俗</h2>
                    <p>中国传统节日和习俗是中华文化的重要组成部分，体现了中国人的生活方式和价值观念。</p>
                </div>
            `;
            break;
        case 'data_summary':
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>中华文明数据汇总</h2>
                    <p>通过数据可视化的方式，展示中华文明在各个方面的成就和影响。</p>
                </div>
            `;
            break;
        default:
            dynamicContent.innerHTML = `
                <div class="simple-card">
                    <h2>${moduleId.replace(/_/g, ' ')}</h2>
                    <p>简化内容正在加载中...</p>
                </div>
            `;
    }
}

// Listen for browser back/forward button events
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.moduleId) {
        // Get dynamic content container
        const dynamicContent = document.getElementById('dynamic-content');

        if (dynamicContent) {
            // Load module from history
            const moduleId = event.state.moduleId;

            // Update navigation active state
            const navItem = document.querySelector(`.nav-item[data-module="${moduleId}"]`);
            if (navItem) {
                updateNavActiveState(navItem);
            }

            // Load module
            loadModule(moduleId, dynamicContent);
        }
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize once
    if (typeof window.moduleLoaderInitialized === 'undefined') {
        window.moduleLoaderInitialized = true;
        initModuleLoader();
    }
});