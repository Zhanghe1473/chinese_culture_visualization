// Fix script to resolve module loading issues
(function() {
    console.log('Executing module fix script');

    // Fix 1: Add the missing loadMainScripts function if it doesn't exist
    if (typeof window.loadMainScripts !== 'function') {
        console.log('Adding missing loadMainScripts function');
        window.loadMainScripts = function() {
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

            // Check if visualization.js is loaded
            if (!document.getElementById('visualization-script')) {
                const vizScript = document.createElement('script');
                vizScript.id = 'visualization-script';
                vizScript.src = '/static/js/visualization.js';
                document.body.appendChild(vizScript);
            }

            // Check if fix-buttons.js is loaded
            if (!document.getElementById('fix-buttons-script')) {
                const fixButtonsScript = document.createElement('script');
                fixButtonsScript.id = 'fix-buttons-script';
                fixButtonsScript.src = '/static/js/fix-buttons.js';
                document.body.appendChild(fixButtonsScript);
            }

            // Check if data_summary.js is loaded
            if (!document.getElementById('data-summary-script')) {
                const dataSummaryScript = document.createElement('script');
                dataSummaryScript.id = 'data-summary-script';
                dataSummaryScript.src = '/static/js/data_summary.js';
                document.body.appendChild(dataSummaryScript);
            }

            console.log('Main scripts loaded');

            // Initialize charts after a delay
            setTimeout(function() {
                if (typeof window.reinitializeCharts === 'function') {
                    window.reinitializeCharts();
                }
            }, 2000);
        };
    }

    // Fix 2: Fix the image path issues
    function fixImagePaths() {
        document.querySelectorAll('img').forEach(img => {
            if (img.src.includes('static/css/static/')) {
                // Fix incorrect path
                const correctedSrc = img.src.replace('static/css/static/', 'static/');
                console.log(`Fixing image path: ${img.src} -> ${correctedSrc}`);
                img.src = correctedSrc;
            }
        });
    }

    // Fix 3: Fix the missing CSS/JS files by creating fallbacks
    function ensureModuleResources() {
        // Create default style tags for missing module CSS files
        const missingCssFiles = [
            'home', 'civilization_overview', 'scientific_achievements',
            'notable_works', 'notable_scholars', 'cultural_stories',
            'cultural_customs', 'data_summary'
        ];

        missingCssFiles.forEach(moduleId => {
            const cssId = `css-module-${moduleId}`;
            if (!document.getElementById(cssId)) {
                const style = document.createElement('style');
                style.id = cssId;
                style.textContent = `/* Fallback CSS for ${moduleId} module */`;
                document.head.appendChild(style);
                console.log(`Created fallback CSS for ${moduleId}`);
            }
        });
    }

    // Fix 4: Fix the module loading function
    function fixModuleLoading() {
        // Check if module loading is working by testing if a container exists
        const dynamicContent = document.getElementById('dynamic-content');
        if (!dynamicContent || dynamicContent.innerHTML.trim() === '') {
            console.log('Dynamic content container is empty, loading default module');

            // Create container if it doesn't exist
            if (!dynamicContent) {
                const newContainer = document.createElement('div');
                newContainer.id = 'dynamic-content';
                document.querySelector('.main-content').appendChild(newContainer);
                console.log('Created dynamic content container');
            }

            // Try to load the home module
            fetch('/module/home')
                .then(response => response.text())
                .then(html => {
                    dynamicContent.innerHTML = html;
                    console.log('Loaded home module manually');

                    // Load scripts after module is loaded
                    loadMainScripts();
                })
                .catch(error => {
                    console.error('Failed to load home module:', error);
                    dynamicContent.innerHTML = '<div class="error-container"><h3>Error loading content</h3><p>Please try refreshing the page.</p></div>';
                });
        }
    }

    // Apply all fixes
    fixImagePaths();
    ensureModuleResources();

    // Wait a bit before fixing module loading
    setTimeout(fixModuleLoading, 1000);

    // Call loadMainScripts to ensure all necessary scripts are loaded
    if (typeof loadMainScripts === 'function') {
        setTimeout(loadMainScripts, 500);
    }

    // Add this script to window object so it can be called again if needed
    window.applyModuleFixes = function() {
        fixImagePaths();
        ensureModuleResources();
        fixModuleLoading();
        if (typeof loadMainScripts === 'function') {
            loadMainScripts();
        }
    };

    console.log('Module fix script completed');
})();